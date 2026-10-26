"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/lib/motion";

export interface VideoHandle {
  toggle: () => void;
  isPlaying: boolean;
}

interface CinematicVideoProps {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  videoClassName?: string;
  posterClassName?: string;
  /** When false the media never plays (used by user-facing pause control). */
  handleRef?: RefObject<VideoHandle | null>;
  /** Reports play state changes to the parent (button icons, labels). */
  onPlayingChange?: (playing: boolean) => void;
}

/**
 * Full-bleed cinematic media layer.
 *
 * A poster image always renders underneath, so the scene looks complete before
 * the video buffers, when autoplay is blocked, when the file is missing and for
 * users who prefer reduced motion (who never receive the <video> element).
 */
export default function CinematicVideo({
  src,
  poster,
  alt,
  className = "",
  videoClassName = "",
  posterClassName = "",
  handleRef,
  onPlayingChange,
}: CinematicVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const onPlayingChangeRef = useRef(onPlayingChange);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [allowed, setAllowed] = useState(false);

  /* The multi-megabyte clip is optional polish: it only loads once the page is
     idle, and never on phones, data-saver or slow connections. */
  useEffect(() => {
    if (reduced) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const slow = nav.connection?.saveData || /(^|-)2g$/.test(nav.connection?.effectiveType ?? "");
    if (slow || !window.matchMedia("(min-width: 768px)").matches) return;
    const id = window.setTimeout(() => setAllowed(true), 1800);
    return () => window.clearTimeout(id);
  }, [reduced]);

  useEffect(() => {
    onPlayingChangeRef.current = onPlayingChange;
  }, [onPlayingChange]);

  useEffect(() => {
    onPlayingChangeRef.current?.(playing);
  }, [playing]);

  useEffect(() => {
    if (handleRef) {
      handleRef.current = {
        isPlaying: playing,
        toggle: () => {
          const video = videoRef.current;
          if (!video) return;
          if (playing) {
            userPausedRef.current = true;
            video.pause();
          } else {
            userPausedRef.current = false;
            void video.play().catch(() => setPlaying(false));
          }
        },
      };
    }
  }, [handleRef, playing]);

  useEffect(() => {
    if (reduced || !allowed) return;
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      if (userPausedRef.current) return;
      const attempt = video.play();
      if (attempt) attempt.catch(() => setPlaying(false));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) tryPlay();
          else video.pause();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reduced, allowed]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="100vw"
        priority
        className={`object-cover ${posterClassName}`}
      />
      {!reduced && allowed && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            playing ? "opacity-100" : "opacity-0"
          } ${videoClassName}`}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setPlaying(false)}
        />
      )}
    </div>
  );
}
