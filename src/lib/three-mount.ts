import type * as ThreeNs from "three";

export type Three = typeof ThreeNs;

export interface SceneApi {
  /** Called every rendered frame. `dt` is seconds since the previous frame. */
  update: (time: number, dt: number) => void;
  /** When it returns true the frame is skipped entirely (nothing changed). */
  idle?: () => boolean;
  resize?: (width: number, height: number) => void;
  dispose?: () => void;
}

export interface SceneContext {
  THREE: Three;
  renderer: ThreeNs.WebGLRenderer;
  container: HTMLElement;
  width: number;
  height: number;
  /** Cheap devices get lighter scenes (fewer particles, simpler geometry). */
  lite: boolean;
}

interface MountOptions {
  /** Upper bound for the device pixel ratio. */
  maxDpr?: number;
  /** Render a single still frame and never animate. */
  still?: boolean;
  /** Frame-rate ceiling on lite devices (phones / low-core CPUs). */
  liteFps?: number;
}

/**
 * Mounts a Three.js scene into `container`. The library is imported lazily so
 * it never touches the main bundle, the loop only runs while the container is
 * on screen and the tab is visible, and everything is disposed on cleanup.
 * Resolves to a cleanup function (a no-op when WebGL is unavailable).
 */
export async function mountThree(
  container: HTMLElement,
  setup: (ctx: SceneContext) => SceneApi | Promise<SceneApi>,
  { maxDpr = 1.75, still = false, liteFps = 30 }: MountOptions = {},
): Promise<() => void> {
  const THREE = await import("three");

  let renderer: ThreeNs.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return () => {};
  }

  const lite =
    window.matchMedia("(max-width: 1023px)").matches ||
    window.matchMedia("(pointer: coarse)").matches ||
    (navigator.hardwareConcurrency ?? 8) <= 4;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? Math.min(maxDpr, 1.25) : maxDpr));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);

  const rect = () => {
    const r = container.getBoundingClientRect();
    return { w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) };
  };
  let { w, h } = rect();
  renderer.setSize(w, h, false);

  const api = await setup({ THREE, renderer, container, width: w, height: h, lite });

  let disposed = false;
  let visible = true;
  let raf = 0;
  let last = performance.now();
  const start = last;

  const minGap = lite ? 1000 / liteFps - 2 : 0;
  const frame = (now: number) => {
    raf = 0;
    if (disposed) return;
    const gap = now - last;
    if (!still && gap < minGap) {
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
      return;
    }
    const dt = Math.min(gap / 1000, 0.1);
    last = now;
    if (still || !api.idle?.()) api.update((now - start) / 1000, dt);
    if (!still && visible && !document.hidden) raf = requestAnimationFrame(frame);
  };
  const kick = () => {
    if (!raf && !disposed && !still) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };

  const ro = new ResizeObserver(() => {
    ({ w, h } = rect());
    renderer.setSize(w, h, false);
    api.resize?.(w, h);
    // resizing clears the canvas, so always repaint even when the scene reports idle
    api.update((performance.now() - start) / 1000, 0.016);
  });
  ro.observe(container);
  api.resize?.(w, h);

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) kick();
  });
  io.observe(container);

  const onVisibility = () => {
    if (!document.hidden) kick();
  };
  document.addEventListener("visibilitychange", onVisibility);

  frame(performance.now());
  if (!still) kick();

  return () => {
    disposed = true;
    if (raf) cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    api.dispose?.();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  };
}

/**
 * Like `mountThree`, but waits until the container is near the viewport, so
 * WebGL setup (and the three.js chunk) never competes with first paint for
 * scenes that start far below the fold. Returns a synchronous cleanup.
 */
export function mountThreeWhenNear(
  container: HTMLElement,
  setup: (ctx: SceneContext) => SceneApi | Promise<SceneApi>,
  options: MountOptions = {},
  margin = "400px",
): () => void {
  let cleanup: (() => void) | undefined;
  let cancelled = false;
  let started = false;

  const start = () => {
    if (started || cancelled) return;
    started = true;
    mountThree(container, setup, options).then((c) => {
      if (cancelled) c();
      else cleanup = c;
    });
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        io.disconnect();
        start();
      }
    },
    { rootMargin: margin },
  );
  io.observe(container);

  return () => {
    cancelled = true;
    io.disconnect();
    cleanup?.();
  };
}
