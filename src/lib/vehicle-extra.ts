import type { BiStr } from "@/lib/content";
import type { Category, Vehicle } from "@/lib/vehicles";

/** Indicative performance figures used by the gauges (not official manufacturer data). */
export interface Perf {
  hp: number;
  /** 0–100 km/h in seconds */
  accel: number;
  /** km/h */
  top: number;
  /** electric range in km, where it applies */
  range?: number;
}

export const PERF: Record<string, Perf> = {
  "lamborghini-huracan-evo": { hp: 631, accel: 2.9, top: 325 },
  "ferrari-laferrari": { hp: 950, accel: 2.6, top: 350 },
  "porsche-911-turbo-s": { hp: 640, accel: 2.7, top: 330 },
  "porsche-911-gt3": { hp: 510, accel: 3.4, top: 318 },
  "ferrari-f8-tributo": { hp: 710, accel: 2.9, top: 340 },
  "mercedes-amg-c63": { hp: 503, accel: 3.9, top: 250 },
  "bmw-7-series": { hp: 544, accel: 4.1, top: 250 },
  "mercedes-amg-gt": { hp: 585, accel: 3.7, top: 318 },
  "mercedes-g63": { hp: 577, accel: 4.5, top: 220 },
  "audi-q7-quattro": { hp: 340, accel: 5.9, top: 250 },
  "tesla-roadster": { hp: 1100, accel: 1.9, top: 400, range: 1000 },
  "tesla-model-3": { hp: 283, accel: 6.1, top: 225, range: 510 },
  "tesla-model-y": { hp: 350, accel: 5.0, top: 217, range: 560 },
  "bmw-i8": { hp: 362, accel: 4.4, top: 250, range: 55 },
  "dodge-challenger": { hp: 485, accel: 4.2, top: 280 },
};

const FALLBACK: Perf = { hp: 400, accel: 4.5, top: 250 };
export const perfOf = (v: Vehicle): Perf => PERF[v.slug] ?? FALLBACK;

/** "$268,000" → 268000 */
export const priceNumber = (v: Vehicle): number => Number(v.price.replace(/[^0-9.]/g, "")) || 0;

export type Highlight = { icon: "gauge" | "zap" | "shield" | "sparkles" | "leaf" | "mountain" | "wind" | "cpu" | "armchair" | "route" | "layers" | "users"; title: BiStr; body: BiStr };

export const HIGHLIGHTS: Record<Category, Highlight[]> = {
  sports: [
    { icon: "gauge", title: { ar: "ديناميكية للحلبات", en: "Track-bred dynamics" }, body: { ar: "هيكل مضبوط وتوجيه حاد يمنحك تحكمًا كاملًا في المنعطفات.", en: "A tuned chassis and sharp steering for total control through the bends." } },
    { icon: "wind", title: { ar: "انسيابية هوائية", en: "Aero efficiency" }, body: { ar: "خطوط مصممة لتمرير الهواء وتثبيت السيارة عند السرعات العالية.", en: "Lines shaped to move air and keep the car planted at speed." } },
    { icon: "layers", title: { ar: "مواد خفيفة", en: "Lightweight materials" }, body: { ar: "ألياف الكربون والألومنيوم لخفض الوزن ورفع الاستجابة.", en: "Carbon fibre and aluminium to cut mass and sharpen response." } },
    { icon: "sparkles", title: { ar: "صوت لا يُنسى", en: "An unforgettable sound" }, body: { ar: "عادم رياضي يعطي كل تسارع طابعًا خاصًا.", en: "A sport exhaust that gives every launch its own character." } },
  ],
  luxury: [
    { icon: "armchair", title: { ar: "مقصورة مصنوعة يدويًا", en: "Hand-finished cabin" }, body: { ar: "جلود فاخرة وتفاصيل دقيقة في كل ركن.", en: "Fine leathers and detail in every corner." } },
    { icon: "route", title: { ar: "تعليق هوائي متكيّف", en: "Adaptive air suspension" }, body: { ar: "نعومة استثنائية على الطرق الطويلة.", en: "Exceptional comfort over long journeys." } },
    { icon: "cpu", title: { ar: "مساعدات ذكية", en: "Intelligent assistance" }, body: { ar: "أنظمة قيادة مساندة تجعل كل رحلة أكثر أمانًا.", en: "Driver-assist systems that make every trip safer." } },
    { icon: "sparkles", title: { ar: "هدوء تام", en: "Whisper-quiet ride" }, body: { ar: "عزل صوتي متقدم يمنحك صمتًا فاخرًا.", en: "Advanced acoustic insulation for a calm cabin." } },
  ],
  suv: [
    { icon: "mountain", title: { ar: "قدرة على كل الطرق", en: "Capable anywhere" }, body: { ar: "دفع رباعي وقدرة عالية على الطرق الوعرة.", en: "All-wheel drive with real off-road ability." } },
    { icon: "users", title: { ar: "مساحة للعائلة", en: "Room for the family" }, body: { ar: "مقصورة رحبة ومقاعد مريحة للجميع.", en: "A spacious cabin with comfortable seating for all." } },
    { icon: "shield", title: { ar: "ثبات وأمان", en: "Poise and safety" }, body: { ar: "ثبات على الأسطح الصعبة وأنظمة أمان متكاملة.", en: "Composure on difficult surfaces with full safety systems." } },
    { icon: "route", title: { ar: "رحلات طويلة", en: "Long-haul comfort" }, body: { ar: "راحة كبيرة وقدرة على حمل الأمتعة والسحب.", en: "Comfort, cargo space and towing capability." } },
  ],
  electric: [
    { icon: "zap", title: { ar: "عزم فوري", en: "Instant torque" }, body: { ar: "تسارع قوي وسلس من أول لحظة.", en: "Strong, seamless acceleration from the first moment." } },
    { icon: "leaf", title: { ar: "بدون انبعاثات", en: "Zero tailpipe emissions" }, body: { ar: "قيادة نظيفة وهادئة داخل المدينة وخارجها.", en: "Clean, quiet driving in the city and beyond." } },
    { icon: "cpu", title: { ar: "تحديثات عن بُعد", en: "Over-the-air updates" }, body: { ar: "تحسينات مستمرة للسيارة دون زيارة الورشة.", en: "Continuous improvements without a workshop visit." } },
    { icon: "route", title: { ar: "شحن سريع", en: "Fast charging" }, body: { ar: "تغطية واسعة لمحطات الشحن السريع.", en: "Wide access to rapid-charging networks." } },
  ],
};
