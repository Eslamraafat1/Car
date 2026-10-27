"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { mountThreeWhenNear } from "@/lib/three-mount";

export interface CarouselApi {
  /** Starts a transition to slide `index`; `dir` is +1 when the new slide enters from the right. */
  go: (index: number, dir: 1 | -1) => void;
}

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uA, uB;
  uniform vec2 uMouse;
  uniform float uP, uDir, uAspect, uAspA, uAspB, uTime, uVel, uIntro, uTaps;
  varying vec2 vUv;

  vec2 cover(vec2 uv, float imgAsp, float zoom) {
    vec2 s = vec2(1.0);
    if (uAspect > imgAsp) s.y = imgAsp / uAspect; else s.x = uAspect / imgAsp;
    return (uv - 0.5) * s * zoom + 0.5;
  }

  vec3 sampleBlur(sampler2D t, vec2 uv, float asp, float amt, float zoom, float split) {
    vec3 c = vec3(0.0);
    for (int i = 0; i < 8; i++) {
      if (float(i) >= uTaps) break;
      float o = (float(i) / max(uTaps - 1.0, 1.0) - 0.5) * amt;
      float r = texture2D(t, cover(uv + vec2(o + split, 0.0), asp, zoom)).r;
      float g = texture2D(t, cover(uv + vec2(o, 0.0), asp, zoom)).g;
      float b = texture2D(t, cover(uv + vec2(o - split, 0.0), asp, zoom)).b;
      c += vec3(r, g, b);
    }
    return c / max(uTaps, 1.0);
  }

  void main() {
    vec2 uv = vUv;

    // pointer ripple
    vec2 d = uv - uMouse;
    d.x *= uAspect;
    float dist = length(d);
    float wave = sin(dist * 34.0 - uTime * 3.2) * exp(-dist * 4.5) * (0.005 + uVel * 0.02);
    uv += normalize(d + 1e-4) * wave;

    float e = uP;
    float motion = sin(e * 3.14159265);
    float shift = 1.06;
    vec2 uvA = uv + vec2(uDir * e * shift, 0.0);
    vec2 uvB = uv - vec2(uDir * (1.0 - e) * shift, 0.0);
    float mA = step(0.0, uvA.x) * step(uvA.x, 1.0);
    float mB = step(0.0, uvB.x) * step(uvB.x, 1.0);

    float amt = motion * 0.12 + uVel * 0.01;
    float split = motion * 0.012 + 0.0012 + uVel * 0.01;
    vec3 col;
    if (e < 0.999 || uVel > 0.02) {
      vec3 colA = sampleBlur(uA, uvA, uAspA, amt, 1.0 - 0.05 * e, split);
      vec3 colB = sampleBlur(uB, uvB, uAspB, amt, 1.0 - 0.05 * (1.0 - e), split);
      col = colA * mA + colB * mB;
    } else {
      // at rest: one plain fetch
      col = texture2D(uB, cover(uv, uAspB, 1.0)).rgb;
    }

    // light bar where the two frames meet
    float edgeA = uDir > 0.0 ? (1.0 - e * shift) : (e * shift);
    float bar = exp(-abs(vUv.x - edgeA) * 38.0) * motion;
    col += vec3(0.25, 0.55, 1.0) * bar * 0.9;

    // grade
    col = pow(col, vec3(1.06));
    col = mix(col, col * vec3(0.9, 0.96, 1.1), 0.3);
    float vig = smoothstep(1.2, 0.2, length((vUv - 0.5) * vec2(1.0, 0.9)));
    col *= mix(0.5, 1.0, vig);
    col *= uIntro;
    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * WebGL carousel: slides are textures on one plane. A transition drags the
 * outgoing frame off with horizontal motion blur and an RGB split while the
 * next car sweeps in, with a blade of light where the frames meet. Light dust
 * and speed streaks drift behind it all, and the pointer ripples the image.
 */
export default function HeroCarouselScene({
  urls,
  apiRef,
  onReady,
}: {
  urls: string[];
  apiRef: MutableRefObject<CarouselApi | null>;
  onReady: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    const dispose = mountThreeWhenNear(
      el,
      async ({ THREE, renderer, lite, width, height }) => {
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const loader = new THREE.TextureLoader();
        const textures: (import("three").Texture | null)[] = urls.map(() => null);

        const load = async (i: number) => {
          if (textures[i]) return textures[i]!;
          const tex = await loader.loadAsync(urls[i]);
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.minFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          textures[i] = tex;
          return tex;
        };

        const first = await load(0);
        const aspect = (t: import("three").Texture) => {
          const img = t.image as { width: number; height: number };
          return img.width / img.height;
        };

        const uniforms = {
          uA: { value: first },
          uB: { value: first },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uP: { value: 1 },
          uDir: { value: 1 },
          uAspect: { value: width / height },
          uAspA: { value: aspect(first) },
          uAspB: { value: aspect(first) },
          uTime: { value: 0 },
          uVel: { value: 0 },
          uIntro: { value: 0 },
          uTaps: { value: lite ? 4 : 8 },
        };
        const plane = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG, depthTest: false }),
        );
        scene.add(plane);

        /* dust */
        const COUNT = lite ? 0 : 130;
        const pos = new Float32Array(COUNT * 3);
        const speed = new Float32Array(COUNT);
        for (let i = 0; i < COUNT; i++) {
          pos[i * 3] = Math.random() * 2 - 1;
          pos[i * 3 + 1] = Math.random() * 2 - 1;
          speed[i] = 0.02 + Math.random() * 0.07;
        }
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const dust = new THREE.Points(
          dustGeo,
          new THREE.PointsMaterial({ size: lite ? 2 : 2.4, sizeAttenuation: false, color: 0xbcd8ff, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthTest: false }),
        );
        scene.add(dust);

        const mouse = new THREE.Vector2(0.5, 0.5);
        const target = new THREE.Vector2(0.5, 0.5);
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
        };
        if (!lite) window.addEventListener("pointermove", onMove, { passive: true });

        // transition state
        let current = 0;
        let t0 = -1;
        const dur = 1.15;
        let busyTo = -1;
        const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

        apiRef.current = {
          go: async (index, dir) => {
            if (index === current && uniforms.uP.value >= 1) return;
            busyTo = index;
            const next = await load(index);
            if (busyTo !== index) return;
            uniforms.uA.value = textures[current] ?? first;
            uniforms.uAspA.value = aspect(uniforms.uA.value);
            uniforms.uB.value = next;
            uniforms.uAspB.value = aspect(next);
            uniforms.uDir.value = dir;
            uniforms.uP.value = 0;
            t0 = -2; // set on next frame
            current = index;
          },
        };

        // warm the rest of the textures once the first frame is up
        const warm = window.setTimeout(() => urls.forEach((_, i) => void load(i)), 1200);

        let lastY = window.scrollY;
        let vel = 0;
        let intro = 0;
        let announced = false;

        return {
          idle: () => lite && t0 !== -2 && uniforms.uP.value >= 1 && intro >= 1 && vel < 0.02,
          update(time, dt) {
            if (!announced) {
              announced = true;
              if (!cancelled) onReadyRef.current();
            }
            intro = Math.min(1, intro + dt * 0.9);
            const sy = window.scrollY;
            const v = Math.min(Math.abs(sy - lastY) / Math.max(dt * 1000, 8) / 3, 1.4);
            lastY = sy;
            vel += (v - vel) * Math.min(1, dt * 6);

            if (t0 === -2) t0 = time;
            if (t0 >= 0 && uniforms.uP.value < 1) {
              const x = Math.min(1, (time - t0) / dur);
              uniforms.uP.value = ease(x);
              if (x >= 1) uniforms.uP.value = 1;
            }

            mouse.lerp(target, Math.min(1, dt * 4));
            uniforms.uMouse.value.copy(mouse);
            uniforms.uTime.value = time;
            uniforms.uVel.value = vel;
            uniforms.uIntro.value = 1 - Math.pow(1 - intro, 3);

            const moving = uniforms.uP.value < 1 ? 1 : 0;
            const p = dustGeo.attributes.position as import("three").BufferAttribute;
            for (let i = 0; i < COUNT; i++) {
              let x = p.getX(i) - speed[i] * dt * (1 + vel * 8 + moving * 14) * uniforms.uDir.value;
              if (x < -1.05) x = 1.05;
              if (x > 1.05) x = -1.05;
              p.setXYZ(i, x, p.getY(i) + Math.sin(time * 0.4 + i) * 0.0006, 0);
            }
            if (COUNT) p.needsUpdate = true;

            renderer.render(scene, camera);
          },
          resize(w, h) {
            uniforms.uAspect.value = w / h;
          },
          dispose() {
            window.clearTimeout(warm);
            window.removeEventListener("pointermove", onMove);
            apiRef.current = null;
            textures.forEach((t) => t?.dispose());
            plane.geometry.dispose();
            (plane.material as import("three").Material).dispose();
            dustGeo.dispose();
            (dust.material as import("three").Material).dispose();
          },
        };
      },
      { maxDpr: 1.5 },
    );

    return () => {
      cancelled = true;
      dispose();
    };
  }, [urls, apiRef]);

  return <div ref={ref} className="absolute inset-0" aria-hidden="true" />;
}
