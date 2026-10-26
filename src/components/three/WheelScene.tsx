"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { mountThree } from "@/lib/three-mount";

export interface WheelProgress {
  /** 0 → 1 across the pinned section. */
  value: number;
}

/**
 * A procedural performance wheel — tyre, barrel, ten spokes, drilled disc and
 * caliper — that spins with the page, pulls apart into an exploded view in the
 * middle of the scroll and snaps back together. Built from primitives, so it
 * ships no model files.
 */
export default function WheelScene({ progress }: { progress: MutableRefObject<WheelProgress> }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    mountThree(
      el,
      async ({ THREE, renderer, lite, width, height }) => {
        const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");

        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;

        const scene = new THREE.Scene();
        const pmrem = new THREE.PMREMGenerator(renderer);
        const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
        scene.environment = envRT.texture;
        scene.environmentIntensity = 0.9;

        const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 50);

        const key = new THREE.DirectionalLight(0xffffff, 2.2);
        key.position.set(3, 4, 5);
        const rim = new THREE.PointLight(0x4da3ff, 60, 14);
        rim.position.set(-3.2, 1.4, -1.2);
        const warm = new THREE.PointLight(0xff8a4d, 28, 12);
        warm.position.set(3, -1.6, 2);
        scene.add(key, rim, warm);

        const seg = lite ? 48 : 96;
        const metal = (color: number, rough: number) => new THREE.MeshStandardMaterial({ color, metalness: 1, roughness: rough });
        const alloy = metal(0xc9ced6, 0.22);
        const dark = metal(0x1b1d22, 0.38);
        const steel = metal(0x8d939c, 0.34);
        const rubber = new THREE.MeshStandardMaterial({ color: 0x0c0c0e, metalness: 0, roughness: 0.92 });
        const accent = new THREE.MeshStandardMaterial({ color: 0x1f7bff, metalness: 0.55, roughness: 0.28 });
        const disposables: { dispose: () => void }[] = [alloy, dark, steel, rubber, accent, envRT, pmrem];

        const wheel = new THREE.Group();
        scene.add(wheel);
        const parts = {
          tire: new THREE.Group(),
          barrel: new THREE.Group(),
          spokes: new THREE.Group(),
          disc: new THREE.Group(),
          caliper: new THREE.Group(),
        };
        Object.values(parts).forEach((g) => wheel.add(g));

        const add = (group: import("three").Group, geo: import("three").BufferGeometry, mat: import("three").Material, setup?: (m: import("three").Mesh) => void) => {
          const m = new THREE.Mesh(geo, mat);
          setup?.(m);
          group.add(m);
          disposables.push(geo);
          return m;
        };

        /* tyre — lathe profile revolved around the wheel axis (z) */
        const tireProfile = [
          [0.8, -0.3], [0.9, -0.34], [1.12, -0.31], [1.2, -0.2], [1.22, 0], [1.2, 0.2], [1.12, 0.31], [0.9, 0.34], [0.8, 0.3],
        ].map(([x, y]) => new THREE.Vector2(x, y));
        add(parts.tire, new THREE.LatheGeometry(tireProfile, seg), rubber, (m) => (m.rotation.x = Math.PI / 2));
        for (let i = 0; i < 72; i += 1) {
          // tread blocks
          if (lite && i % 2) continue;
          const a = (i / 72) * Math.PI * 2;
          add(parts.tire, new THREE.BoxGeometry(0.05, 0.5, 0.06), rubber, (m) => {
            m.position.set(Math.cos(a) * 1.225, Math.sin(a) * 1.225, 0);
            m.rotation.z = a;
          });
        }

        /* rim barrel */
        const barrelProfile = [
          [0.74, -0.32], [0.84, -0.34], [0.86, -0.28], [0.8, -0.2], [0.78, 0], [0.8, 0.2], [0.86, 0.28], [0.84, 0.34], [0.74, 0.32],
        ].map(([x, y]) => new THREE.Vector2(x, y));
        add(parts.barrel, new THREE.LatheGeometry(barrelProfile, seg), alloy, (m) => (m.rotation.x = Math.PI / 2));

        /* spokes — ten tapered, bevelled extrusions */
        const spokeShape = new THREE.Shape();
        spokeShape.moveTo(0.12, -0.075);
        spokeShape.lineTo(0.8, -0.13);
        spokeShape.lineTo(0.8, 0.13);
        spokeShape.lineTo(0.12, 0.075);
        spokeShape.closePath();
        const spokeGeo = new THREE.ExtrudeGeometry(spokeShape, { depth: 0.11, bevelEnabled: true, bevelSize: 0.018, bevelThickness: 0.018, bevelSegments: 3 });
        disposables.push(spokeGeo);
        for (let i = 0; i < 10; i++) {
          const m = new THREE.Mesh(spokeGeo, alloy);
          m.rotation.z = (i / 10) * Math.PI * 2;
          m.position.z = -0.05;
          parts.spokes.add(m);
        }
        add(parts.spokes, new THREE.CylinderGeometry(0.2, 0.24, 0.16, 48), alloy, (m) => (m.rotation.x = Math.PI / 2));
        add(parts.spokes, new THREE.CylinderGeometry(0.11, 0.11, 0.05, 40), accent, (m) => { m.rotation.x = Math.PI / 2; m.position.z = 0.1; });
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2;
          add(parts.spokes, new THREE.CylinderGeometry(0.024, 0.024, 0.06, 6), steel, (m) => {
            m.rotation.x = Math.PI / 2;
            m.position.set(Math.cos(a) * 0.165, Math.sin(a) * 0.165, 0.1);
          });
        }

        /* brake disc with drilled holes */
        const discShape = new THREE.Shape();
        discShape.absarc(0, 0, 0.62, 0, Math.PI * 2, false);
        const bore = new THREE.Path();
        bore.absarc(0, 0, 0.2, 0, Math.PI * 2, true);
        discShape.holes.push(bore);
        const holes = lite ? 18 : 30;
        for (let i = 0; i < holes; i++) {
          const a = (i / holes) * Math.PI * 2;
          const r = i % 2 ? 0.5 : 0.43;
          const h = new THREE.Path();
          h.absarc(Math.cos(a) * r, Math.sin(a) * r, 0.022, 0, Math.PI * 2, true);
          discShape.holes.push(h);
        }
        add(parts.disc, new THREE.ExtrudeGeometry(discShape, { depth: 0.05, bevelEnabled: false, curveSegments: 20 }), dark, (m) => (m.position.z = -0.18));

        /* caliper — a bright sector hugging the disc */
        const cal = new THREE.Shape();
        cal.absarc(0, 0, 0.7, -0.5, 0.5, false);
        cal.absarc(0, 0, 0.44, 0.5, -0.5, true);
        add(parts.caliper, new THREE.ExtrudeGeometry(cal, { depth: 0.2, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 }), accent, (m) => (m.position.z = -0.3));

        const explode = { tire: 1.3, barrel: 0.62, spokes: 0, disc: -0.65, caliper: -1.3 } as const;
        const smooth = (v: number) => v * v * (3 - 2 * v);

        const pointer = new THREE.Vector2();
        const onMove = (e: PointerEvent) => {
          pointer.set((e.clientX / window.innerWidth - 0.5) * 2, (e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        const fit = (w: number, h: number) => {
          camera.aspect = w / h;
          camera.fov = w / h < 0.9 ? 42 : 32;
          // pull back on narrow screens so the whole wheel (and its explosion) stays in frame
          const dist = 8.2 / Math.min(1, Math.max(0.55, (w / h) * 1.15));
          camera.position.set(0, 0, dist);
          camera.updateProjectionMatrix();
        };
        fit(width, height);

        let spin = 0;
        let cur = 0;

        return {
          update(time, dt) {
            const target = progress.current.value;
            cur += (target - cur) * Math.min(1, dt * 5);
            const p = still ? 0.5 : cur;

            // 0–.25 assemble & spin · .25–.6 explode · .6–.8 hold · .8–1 re-assemble
            const ex = p < 0.25 ? 0 : p < 0.5 ? smooth((p - 0.25) / 0.25) : p < 0.72 ? 1 : 1 - smooth(Math.min(1, (p - 0.72) / 0.22));
            (Object.keys(parts) as (keyof typeof parts)[]).forEach((k) => {
              parts[k].position.z = explode[k] * ex * 1.15;
            });

            spin += dt * (0.25 + (1 - ex) * 0.35);
            const yaw = -0.55 - ex * 0.62 + Math.sin(time * 0.5) * 0.06 + pointer.x * 0.22;
            wheel.rotation.y += (yaw - wheel.rotation.y) * Math.min(1, dt * 4);
            wheel.rotation.x += (0.18 + pointer.y * 0.12 - wheel.rotation.x) * Math.min(1, dt * 4);
            parts.tire.rotation.z = spin;
            parts.barrel.rotation.z = spin;
            parts.spokes.rotation.z = spin;
            parts.disc.rotation.z = spin * 0.4;
            wheel.position.y = Math.sin(time * 0.8) * 0.04;
            rim.intensity = 60 + ex * 40;

            renderer.render(scene, camera);
          },
          resize: fit,
          dispose() {
            window.removeEventListener("pointermove", onMove);
            disposables.forEach((d) => d.dispose());
          },
        };
      },
      { maxDpr: 2, still },
    ).then((c) => {
      if (cancelled) c();
      else cleanup = c;
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [progress]);

  return <div ref={ref} className="absolute inset-0" aria-hidden="true" />;
}
