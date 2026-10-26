import type { BiStr } from "@/lib/content";

export interface StillContent {
  image: string;
  alt: BiStr;
  eyebrow: BiStr;
  title: BiStr;
  caption?: BiStr;
  timecode?: string;
  accent?: string;
}

export interface StatContent {
  image: string;
  alt: BiStr;
  eyebrow: BiStr;
  value: number;
  suffix?: string;
  decimals?: number;
  label: BiStr;
  title: BiStr;
  body?: BiStr;
  accent?: string;
  flip?: boolean;
}

export interface DetailItem {
  image: string;
  alt: BiStr;
  num: string;
  label: BiStr;
}

export interface DetailContent {
  eyebrow: BiStr;
  title: BiStr;
  items: DetailItem[];
  accent?: string;
}

export interface EditorialContent {
  image: string;
  alt: BiStr;
  index: string;
  eyebrow: BiStr;
  title: BiStr;
  body: BiStr;
  quote?: BiStr;
  flip?: boolean;
  accent?: string;
}

export interface Pin {
  x: number;
  y: number;
  label: BiStr;
  value?: string;
}

export interface PinsContent {
  image: string;
  alt: BiStr;
  eyebrow: BiStr;
  title: BiStr;
  pins: Pin[];
  accent?: string;
}

export interface LineupItem {
  image: string;
  alt: BiStr;
  name: string;
  tag?: BiStr;
  href?: string;
}

export interface LineupContent {
  eyebrow: BiStr;
  title: BiStr;
  items: LineupItem[];
  accent?: string;
}

export type ShowcaseSection =
  | ({ kind: "still" } & StillContent)
  | ({ kind: "stat" } & StatContent)
  | ({ kind: "detail" } & DetailContent)
  | ({ kind: "editorial" } & EditorialContent)
  | ({ kind: "pins" } & PinsContent)
  | ({ kind: "lineup" } & LineupContent);
