"use client";

import { useEffect, useRef, useState } from "react";
import { mountThreeWhenNear } from "@/lib/three-mount";
import { usePrefersReducedMotion } from "@/lib/motion";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform vec2 uMouse;
  uniform float uTime, uVel, uAspect, uImgAspect, uIntro, uScroll;
  varying vec2 vUv;

  vec2 cover(vec2 uv) {
    vec2 s = vec2(1.0);
    if (uAspect > uImgAspect) s.y = uImgAspect / uAspect; else s.x = uAspect / uImgAspect;
    uv.y += uScroll * 0.04;
    return (uv - 0.5) * s * (1.0 - 0.08 * (1.0 - uIntro)) * 0.96 + 0.5;
  }

  void main() {
    vec2 uv = vUv;
    vec2 d = uv - uMouse;
    d.x *= uAspect;
    float dist = length(d);
    float wave = sin(dist * 30.0 - uTime * 3.0) * exp(-dist * 4.0) * (0.006 + uVel * 0.02);
    uv += normalize(d + 1e-4) * wave;
    float split = 0.0014 + uVel * 0.012;
    float r = texture2D(uTex, cover(uv + vec2(split, 0.0))).r;
    float g = texture2D(uTex, cover(uv)).g;
    float b = texture2D(uTex, cover(uv - vec2(split, 0.0))).b;
    vec3 col = vec3(r, g, b) * uIntro;
    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * An image drawn through WebGL so it ripples around the pointer and splits
 * into RGB when the page scrolls fast. Sits on top of the regular <Image>
 * (pass the same src) which remains the fallback and the first paint.
 */
export default function ShaderImage({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let cancelled = false;

    const dispose = mountThreeWhenNear(
      el,
      async ({ THREE, renderer, width, height }) => {
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const tex = await new THREE.TextureLoader().loadAsync(src);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        const img = tex.image as { width: number; height: number };
        const uniforms = {
          uTex: { value: tex },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uTime: { value: 0 },
          uVel: { value: 0 },
          uAspect: { value: width / height },
          uImgAspect: { value: img.width / img.height },
          uIntro: { value: 0 },
          uScroll: { value: 0 },
        };
        const plane = new THREE.Mesh(
          new THREE.PlaneGeometry(2, 2),
          new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG, depthTest: false }),
        );
        scene.add(plane);

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
        let announced = false;

        return {
          update(time, dt) {
            if (!announced) {
              announced = true;
              if (!cancelled) setReady(true);
            }
            intro = Math.min(1, intro + dt * 1.1);
            const sy = window.scrollY;
            const v = Math.min(Math.abs(sy - lastY) / Math.max(dt * 1000, 8) / 3, 1.4);
            lastY = sy;
            vel += (v - vel) * Math.min(1, dt * 6);
            mouse.lerp(target, Math.min(1, dt * 4));
            const r = el.getBoundingClientRect();
            uniforms.uScroll.value = Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight));
            uniforms.uMouse.value.copy(mouse);
            uniforms.uTime.value = time;
            uniforms.uVel.value = vel;
            uniforms.uIntro.value = 1 - Math.pow(1 - intro, 3);
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
          },
        };
      },
      { maxDpr: 1.5 },
    );

    return () => {
      cancelled = true;
      dispose();
    };
  }, [src, reduced]);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"} ${className}`}
      aria-hidden="true"
    />
  );
}
