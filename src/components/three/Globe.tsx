"use client";

import { useEffect, useRef } from "react";
import { mountThree } from "@/lib/three-mount";

/** [lat, lon] of cities Evay serves. The first two are the studios. */
const CITIES: [number, number][] = [
  [24.71, 46.67], // Riyadh
  [25.2, 55.27], // Dubai
  [21.54, 39.17], // Jeddah
  [25.29, 51.53], // Doha
  [30.04, 31.24], // Cairo
  [29.38, 47.99], // Kuwait
];

/**
 * A rotating dotted globe with glowing city markers and arcs between them.
 * Drag to spin it. Uses the theme's accent colour and follows theme changes.
 */
export default function Globe() {
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
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 50);
        const fit = (w: number, h: number) => {
          camera.aspect = w / h;
          camera.position.set(0, 0, 7.7 / Math.min(1, w / h));
          camera.updateProjectionMatrix();
        };
        fit(width, height);

        const readAccent = () => {
          const v = getComputedStyle(document.documentElement).getPropertyValue("--c-volt").trim() || "#0b63d6";
          return new THREE.Color(v);
        };
        const accent = readAccent();
        const dark = () => document.documentElement.classList.contains("dark");

        const globe = new THREE.Group();
        scene.add(globe);

        const toVec = (lat: number, lon: number, r: number) => {
          const phi = ((90 - lat) * Math.PI) / 180;
          const theta = ((lon + 180) * Math.PI) / 180;
          return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
        };

        /* dotted sphere (Fibonacci lattice) */
        const N = lite ? 900 : 2200;
        const pos = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
          const y = 1 - (i / (N - 1)) * 2;
          const rr = Math.sqrt(1 - y * y);
          const a = i * Math.PI * (3 - Math.sqrt(5));
          pos.set([Math.cos(a) * rr * 2, y * 2, Math.sin(a) * rr * 2], i * 3);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const dotMat = new THREE.PointsMaterial({ size: lite ? 0.05 : 0.042, color: accent.clone(), transparent: true, opacity: 0.95, sizeAttenuation: true, depthWrite: false });
        globe.add(new THREE.Points(geo, dotMat));

        /* graticule rings */
        const ringMat = new THREE.LineBasicMaterial({ color: accent.clone(), transparent: true, opacity: 0.28 });
        const ringGeos: import("three").BufferGeometry[] = [];
        [-40, -20, 0, 20, 40, 60].forEach((lat) => {
          const pts: import("three").Vector3[] = [];
          for (let i = 0; i <= 96; i++) pts.push(toVec(lat, (i / 96) * 360 - 180, 2.01));
          const g = new THREE.BufferGeometry().setFromPoints(pts);
          ringGeos.push(g);
          globe.add(new THREE.Line(g, ringMat));
        });

        /* faint core so the back dots dim */
        const core = new THREE.Mesh(new THREE.SphereGeometry(1.97, 48, 48), new THREE.MeshBasicMaterial({ color: dark() ? 0x070809 : 0xf4f4f6, transparent: true, opacity: 0.9 }));
        globe.add(core);

        /* markers + arcs */
        const markerMat = new THREE.MeshBasicMaterial({ color: accent.clone() });
        const markers: { mesh: import("three").Mesh; ring: import("three").Mesh }[] = [];
        CITIES.forEach(([lat, lon], i) => {
          const p = toVec(lat, lon, 2.0);
          const m = new THREE.Mesh(new THREE.SphereGeometry(i < 2 ? 0.055 : 0.04, 16, 16), markerMat);
          m.position.copy(p);
          const ring = new THREE.Mesh(new THREE.RingGeometry(0.06, 0.075, 32), new THREE.MeshBasicMaterial({ color: accent.clone(), transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
          ring.position.copy(p);
          ring.lookAt(p.clone().multiplyScalar(2));
          globe.add(m, ring);
          markers.push({ mesh: m, ring });
        });

        const arcMat = new THREE.LineBasicMaterial({ color: accent.clone(), transparent: true, opacity: 0.7 });
        const arcGeos: import("three").BufferGeometry[] = [];
        for (let i = 1; i < CITIES.length; i++) {
          const a = toVec(CITIES[0][0], CITIES[0][1], 2.0);
          const b = toVec(CITIES[i][0], CITIES[i][1], 2.0);
          const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(2.0 + a.distanceTo(b) * 0.45);
          const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
          const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
          arcGeos.push(g);
          globe.add(new THREE.Line(g, arcMat));
        }

        // face the Gulf
        const baseY = -((46.67 + 180) * Math.PI) / 180 + Math.PI * 1.5;
        globe.rotation.set(0.35, baseY, 0);

        let dragging = false;
        let lastX = 0;
        let vel = 0.18;
        const onDown = (e: PointerEvent) => {
          dragging = true;
          lastX = e.clientX;
          el.setPointerCapture(e.pointerId);
        };
        const onMove = (e: PointerEvent) => {
          if (!dragging) return;
          vel = (e.clientX - lastX) * 0.012;
          globe.rotation.y += (e.clientX - lastX) * 0.008;
          lastX = e.clientX;
        };
        const onUp = () => {
          dragging = false;
        };
        el.addEventListener("pointerdown", onDown);
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerup", onUp);
        el.addEventListener("pointercancel", onUp);

        const sync = () => {
          const c = readAccent();
          dotMat.color.copy(c);
          ringMat.color.copy(c);
          markerMat.color.copy(c);
          arcMat.color.copy(c);
          markers.forEach((m) => (m.ring.material as import("three").MeshBasicMaterial).color.copy(c));
          (core.material as import("three").MeshBasicMaterial).color.set(dark() ? 0x070809 : 0xf4f4f6);
        };
        const mo = new MutationObserver(sync);
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return {
          update(time, dt) {
            if (!dragging && !still) {
              vel += (0.18 - vel) * Math.min(1, dt * 1.5);
              globe.rotation.y += vel * dt;
            }
            markers.forEach((m, i) => {
              const s = 1 + ((time * 0.9 + i * 0.3) % 1) * 2.2;
              m.ring.scale.setScalar(s);
              (m.ring.material as import("three").MeshBasicMaterial).opacity = 0.8 * (1 - ((time * 0.9 + i * 0.3) % 1));
            });
            renderer.render(scene, camera);
          },
          resize: fit,
          dispose() {
            mo.disconnect();
            el.removeEventListener("pointerdown", onDown);
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerup", onUp);
            el.removeEventListener("pointercancel", onUp);
            geo.dispose();
            dotMat.dispose();
            core.geometry.dispose();
            (core.material as import("three").Material).dispose();
            arcGeos.forEach((g) => g.dispose());
            ringGeos.forEach((g) => g.dispose());
            ringMat.dispose();
            arcMat.dispose();
            markerMat.dispose();
            markers.forEach((m) => {
              m.mesh.geometry.dispose();
              m.ring.geometry.dispose();
              (m.ring.material as import("three").Material).dispose();
            });
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
  }, []);

  return <div ref={ref} className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing" aria-hidden="true" />;
}
