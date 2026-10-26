"use client";

import { useEffect, useRef, useState } from "react";
import { mountThree } from "@/lib/three-mount";
import { usePrefersReducedMotion } from "@/lib/motion";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform vec2 uMouse;
  uniform float uTime, uVel, uAspect, uImgAspect, uIntro;
  varying vec2 vUv;

  vec2 cover(vec2 uv) {
    vec2 s = vec2(1.0);
    if (uAspect > uImgAspect) s.y = uImgAspect / uAspect; else s.x = uAspect / uImgAspect;
    return (uv - 0.5) * s * (1.0 - 0.06 * uIntro) + 0.5;
  }

  void main() {
    vec2 uv = vUv;
    vec2 d = uv - uMouse;
    d.x *= uAspect;
    float dist = length(d);
    float amp = 0.006 + uVel * 0.02;
    float wave = sin(dist * 34.0 - uTime * 3.2) * exp(-dist * 4.5) * amp;
    uv += normalize(d + 1e-4) * wave;
    uv.y += sin(uv.x * 7.0 + uTime * 0.7) * 0.0014;

    float split = 0.0016 + uVel * 0.012;
    float r = texture2D(uTex, cover(uv + vec2(split, 0.0))).r;
    float g = texture2D(uTex, cover(uv)).g;
    float b = texture2D(uTex, cover(uv - vec2(split, 0.0))).b;
    vec3 col = vec3(r, g, b);

    // cinematic grade: lift contrast, cool shadows, vignette
    col = pow(col, vec3(1.08));
    col = mix(col, col * vec3(0.86, 0.94, 1.12), 0.35);
    float vig = smoothstep(1.15, 0.25, length((vUv - 0.5) * vec2(1.0, 0.9)));
    col *= mix(0.45, 1.0, vig);
    col *= uIntro;
    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * Hero backdrop: the car photograph on a WebGL plane that ripples around the
 * pointer, splits into RGB when you scroll fast, and drifts through light dust
 * and speed streaks. The DOM poster underneath keeps it looking complete
 * before WebGL is ready, or when it is unavailable.
 */
export default function HeroScene({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    mountThree(
      el,
      async ({ THREE, renderer, lite, width, height }) => {
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const tex = await new THREE.TextureLoader().loadAsync(src);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        tex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());

        const uniforms = {
          uTex: { value: tex },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uTime: { value: 0 },
          uVel: { value: 0 },
          uAspect: { value: width / height },
          uImgAspect: { value: tex.image.width / tex.image.height },
          uIntro: { value: 0 },
        };
        const plane = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG, depthTest: false }),
        );
        scene.add(plane);

        /* light dust */
        const COUNT = lite ? 70 : 150;
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
          new THREE.PointsMaterial({ size: lite ? 2 : 2.4, sizeAttenuation: false, color: 0xbcd8ff, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthTest: false }),
        );
        scene.add(dust);

        /* speed streaks */
        const STREAKS = lite ? 6 : 12;
        const sp = new Float32Array(STREAKS * 6);
        const sMeta = Array.from({ length: STREAKS }, () => ({ y: Math.random() * 2 - 1, x: Math.random() * 2 - 1, len: 0.12 + Math.random() * 0.3, v: 0.5 + Math.random() * 1.3 }));
        const streakGeo = new THREE.BufferGeometry();
        streakGeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
        const streaks = new THREE.LineSegments(
          streakGeo,
          new THREE.LineBasicMaterial({ color: 0x7db4ff, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthTest: false }),
        );
        scene.add(streaks);

        const mouse = new THREE.Vector2(0.5, 0.5);
        const target = new THREE.Vector2(0.5, 0.5);
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        let lastY = window.scrollY;
        let vel = 0;
        let intro = 0;
        let first = true;

        return {
          update(time, dt) {
            if (first) {
              first = false;
              if (!cancelled) setReady(true);
            }
            intro = Math.min(1, intro + dt * 0.9);
            const sy = window.scrollY;
            const v = Math.min(Math.abs(sy - lastY) / Math.max(dt * 1000, 8) / 3, 1.4);
            lastY = sy;
            vel += (v - vel) * Math.min(1, dt * 6);

            mouse.lerp(target, Math.min(1, dt * 4));
            uniforms.uMouse.value.copy(mouse);
            uniforms.uTime.value = time;
            uniforms.uVel.value = vel;
            uniforms.uIntro.value = 1 - Math.pow(1 - intro, 3);

            const p = dustGeo.attributes.position as import("three").BufferAttribute;
            for (let i = 0; i < COUNT; i++) {
              let x = p.getX(i) - speed[i] * dt * (1 + vel * 8);
              let y = p.getY(i) + Math.sin(time * 0.4 + i) * 0.0006;
              if (x < -1.05) { x = 1.05; y = Math.random() * 2 - 1; }
              p.setXYZ(i, x + (mouse.x - 0.5) * 0.0004, y, 0);
            }
            p.needsUpdate = true;

            const s = streakGeo.attributes.position as import("three").BufferAttribute;
            sMeta.forEach((m, i) => {
              m.x += dt * m.v * (0.6 + vel * 5);
              if (m.x - m.len > 1.1) { m.x = -1.2; m.y = Math.random() * 2 - 1; }
              s.setXYZ(i * 2, m.x - m.len, m.y, 0);
              s.setXYZ(i * 2 + 1, m.x, m.y, 0);
            });
            s.needsUpdate = true;
            (streaks.material as import("three").LineBasicMaterial).opacity = 0.16 + vel * 0.5;

            renderer.render(scene, camera);
          },
          resize(w, h) {
            uniforms.uAspect.value = w / h;
          },
          dispose() {
            window.removeEventListener("pointermove", onMove);
            tex.dispose();
            plane.geometry.dispose();
            (plane.material as import("three").Material).dispose();
            dustGeo.dispose();
            (dust.material as import("three").Material).dispose();
            streakGeo.dispose();
            (streaks.material as import("three").Material).dispose();
          },
        };
      },
      { maxDpr: 1.5 },
    ).then((c) => {
      if (cancelled) c();
      else cleanup = c;
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [src, reduced]);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    />
  );
}
