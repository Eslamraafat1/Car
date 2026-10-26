import type { BiStr } from "@/lib/content";

export type Category = "sports" | "luxury" | "suv" | "electric";

export interface Spec {
  label: BiStr;
  value: string;
}

export interface Vehicle {
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: Category;
  price: string;
  accent: string;
  image: string;
  alt: BiStr;
  tagline: BiStr;
  description: BiStr;
  specs: Spec[];
}

export const CATEGORY_LABELS: Record<Category, BiStr> = {
  sports: { ar: "رياضية", en: "Sports" },
  luxury: { ar: "فخامة", en: "Luxury" },
  suv: { ar: "دفع رباعي", en: "SUV" },
  electric: { ar: "كهربائية", en: "Electric" },
};

export const VEHICLES: Vehicle[] = [
  {
    slug: "lamborghini-huracan-evo",
    brand: "Lamborghini",
    model: "Huracán EVO",
    year: 2025,
    category: "sports",
    price: "$268,000",
    accent: "#ff6a2b",
    image: "/media/images/car-huracan-side.jpg",
    alt: { ar: "لامبورغيني هوراكان إيفو برتقالية من الجانب", en: "Orange Lamborghini Huracán in profile" },
    tagline: { ar: "خطوط حادة وحضور لا يُنسى.", en: "Sharp lines, unmistakable presence." },
    description: {
      ar: "محرك وسطي، قاعدة عجلات عريضة ووزن منخفض — سيارة تمنحك الأداء بثقة هادئة.",
      en: "A mid-engine layout, wide track and low mass — performance delivered with calm confidence.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "Mid-engine" },
      { label: { ar: "الدفع", en: "Drivetrain" }, value: "AWD" },
      { label: { ar: "الموديل", en: "Year" }, value: "2025" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$268,000" },
    ],
  },
  {
    slug: "ferrari-laferrari",
    brand: "Ferrari",
    model: "LaFerrari",
    year: 2015,
    category: "sports",
    price: "$3,200,000",
    accent: "#e8232a",
    image: "/media/images/car-laferrari.jpg",
    alt: { ar: "فيراري حمراء داخل صالة عرض", en: "Red Ferrari in a showroom" },
    tagline: { ar: "هجين بقلب أحمر.", en: "Hybrid power, red heart." },
    description: {
      ar: "سيارة رائدة تجمع محرك V12 الخلفي بدعم كهربائي، وتمثّل قمة هذه الفئة.",
      en: "A flagship pairing a rear V12 with electric assist — the pinnacle of its class.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "Hypercar" },
      { label: { ar: "المحرك", en: "Engine" }, value: "V12 hybrid" },
      { label: { ar: "الموديل", en: "Year" }, value: "2015" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$3,200,000" },
    ],
  },
  {
    slug: "porsche-911-turbo-s",
    brand: "Porsche",
    model: "911 Turbo S",
    year: 2024,
    category: "sports",
    price: "$232,000",
    accent: "#c9ceda",
    image: "/media/images/car-911-black.jpg",
    alt: { ar: "بورشه ٩١١ سوداء بجوار الجبال", en: "Black Porsche 911 beside the mountains" },
    tagline: { ar: "رؤية بعيدة تعرف الطريق.", en: "The long view that knows the road." },
    description: {
      ar: "أسطح هادئة وجنوط بلون المعدن الدافئ — بورشه ٩١١ تحافظ على أناقتها حتى أقصى حدودها.",
      en: "Calm surfaces and warm-metal wheels — a 911 that stays composed at its limits.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "Sports" },
      { label: { ar: "الدفع", en: "Drivetrain" }, value: "AWD" },
      { label: { ar: "الموديل", en: "Year" }, value: "2024" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$232,000" },
    ],
  },
  {
    slug: "porsche-911-gt3",
    brand: "Porsche",
    model: "911 GT3",
    year: 2023,
    category: "sports",
    price: "$182,000",
    accent: "#f5f5f7",
    image: "/media/images/car-gt3-white.jpg",
    alt: { ar: "بورشه ٩١١ بيضاء على جانب الطريق", en: "White Porsche 911 parked roadside" },
    tagline: { ar: "أبيض نقي ومسار واحد.", en: "Clean white, one racing line." },
    description: {
      ar: "نسخة مصممة للحلبات بقنوات تهوية ظاهرة وجناح خلفي ثابت.",
      en: "A track-focused build with exposed ducting and a fixed rear wing.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "Track sports" },
      { label: { ar: "الدفع", en: "Drivetrain" }, value: "RWD" },
      { label: { ar: "الموديل", en: "Year" }, value: "2023" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$182,000" },
    ],
  },
  {
    slug: "ferrari-f8-tributo",
    brand: "Ferrari",
    model: "F8 Tributo",
    year: 2022,
    category: "sports",
    price: "$298,000",
    accent: "#e8232a",
    image: "/media/images/car-f8-red.jpg",
    alt: { ar: "فيراري إف ٨ حمراء في ضوء الصباح", en: "Red Ferrari F8 in morning light" },
    tagline: { ar: "أحمر تحت أوراق الشجر.", en: "Red beneath green leaves." },
    description: {
      ar: "محرك V8 خلفي-وسطي وهيكل مصمم لتمرير الهواء بسلاسة فوق الجسم.",
      en: "A mid-rear V8 with bodywork shaped to pass air smoothly over the deck.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "Sports" },
      { label: { ar: "المحرك", en: "Engine" }, value: "V8 twin-turbo" },
      { label: { ar: "الموديل", en: "Year" }, value: "2022" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$298,000" },
    ],
  },
  {
    slug: "mercedes-amg-c63",
    brand: "Mercedes-AMG",
    model: "C 63 S",
    year: 2024,
    category: "luxury",
    price: "$86,000",
    accent: "#4da3ff",
    image: "/media/images/car-c63-neon.jpg",
    alt: { ar: "مرسيدس إيه إم جي تحت إضاءة النيون", en: "Mercedes-AMG in a neon-lit bay" },
    tagline: { ar: "نيون ملوّن فوق مقصورة هادئة.", en: "Neon light over a hushed cabin." },
    description: {
      ar: "سيدان بأداء رياضي يجمع بين رفاهية الاستخدام اليومي وروح السباق.",
      en: "A performance sedan balancing daily luxury with racing spirit.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "Performance luxury" },
      { label: { ar: "الدفع", en: "Drivetrain" }, value: "RWD" },
      { label: { ar: "الموديل", en: "Year" }, value: "2024" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$86,000" },
    ],
  },
  {
    slug: "bmw-7-series",
    brand: "BMW",
    model: "7 Series",
    year: 2024,
    category: "luxury",
    price: "$108,000",
    accent: "#c9ceda",
    image: "/media/images/car-sedan-teal.jpg",
    alt: { ar: "سيدان تنفيذية رمادية في ضوء النهار", en: "Grey executive sedan in daylight" },
    tagline: { ar: "الراحة بتعريف جديد.", en: "Comfort, redefined." },
    description: {
      ar: "مقصورة رحبة وهدوء لافت في كل مكان — الخيار الأمثل لمن يقدّر الفخامة الهادئة.",
      en: "A spacious cabin and remarkable quiet — made for those who value understated luxury.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "Executive" },
      { label: { ar: "المقاعد", en: "Seats" }, value: "5" },
      { label: { ar: "الموديل", en: "Year" }, value: "2024" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$108,000" },
    ],
  },
  {
    slug: "mercedes-amg-gt",
    brand: "Mercedes-AMG",
    model: "GT",
    year: 2023,
    category: "luxury",
    price: "$145,000",
    accent: "#c9ceda",
    image: "/media/images/car-amg-harbor.jpg",
    alt: { ar: "كوبيه فاخرة بجانب الميناء", en: "Luxury coupe by the harbour" },
    tagline: { ar: "انسيابية طويلة ووقفة واثقة.", en: "A long sweep, a confident stance." },
    description: {
      ar: "جراند توريزمو بخطوط منخفضة ومقدمة ممتدة، مصممة لرحلات الطرق الطويلة.",
      en: "A grand tourer with low lines and a long nose, built for effortless long-distance driving.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "Grand tourer" },
      { label: { ar: "الدفع", en: "Drivetrain" }, value: "RWD" },
      { label: { ar: "الموديل", en: "Year" }, value: "2023" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$145,000" },
    ],
  },
  {
    slug: "mercedes-g63",
    brand: "Mercedes-Benz",
    model: "G 63 AMG",
    year: 2024,
    category: "suv",
    price: "$185,000",
    accent: "#e1a33f",
    image: "/media/images/car-gwagon.jpg",
    alt: { ar: "سيارة دفع رباعي فاخرة بتصميم مربّع", en: "Boxy luxury SUV on the street" },
    tagline: { ar: "تتجاوز كل طريق.", en: "Beyond every road." },
    description: {
      ar: "هيكل مربّع وإطار احتياطي خلفي وحضور يُعرف من بعيد.",
      en: "A boxy shell, a rear-mounted spare and a presence recognised from afar.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "Luxury SUV" },
      { label: { ar: "الدفع", en: "Drivetrain" }, value: "4WD" },
      { label: { ar: "الموديل", en: "Year" }, value: "2024" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$185,000" },
    ],
  },
  {
    slug: "audi-q7-quattro",
    brand: "Audi",
    model: "Q7 quattro",
    year: 2023,
    category: "suv",
    price: "$72,000",
    accent: "#4da3ff",
    image: "/media/images/car-q7-snow.jpg",
    alt: { ar: "سيارة دفع رباعي بيضاء في أجواء باردة", en: "White SUV in cold light" },
    tagline: { ar: "ثبات على الثلج بلا قلق.", en: "Snow, without the worry." },
    description: {
      ar: "دفع رباعي يحافظ على ثباته فوق الأسطح الزلقة بثقة تامة.",
      en: "All-wheel drive that stays composed on slippery surfaces.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "SUV" },
      { label: { ar: "الدفع", en: "Drivetrain" }, value: "AWD" },
      { label: { ar: "الموديل", en: "Year" }, value: "2023" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$72,000" },
    ],
  },
  {
    slug: "tesla-roadster",
    brand: "Tesla",
    model: "Roadster (concept)",
    year: 2026,
    category: "electric",
    price: "$200,000",
    accent: "#4da3ff",
    image: "/media/images/car-roadster.jpg",
    alt: { ar: "سيارة كهربائية رياضية بيضاء في استوديو", en: "White electric sports car in a studio" },
    tagline: { ar: "صمت يخفي قوة هائلة.", en: "Silence that hides immense power." },
    description: {
      ar: "تصميم نظيف بفتحات رفيعة ودون شبكة أمامية تقليدية — رؤية للمستقبل الكهربائي.",
      en: "A clean shape with slim apertures and no conventional grille — a vision of the electric future.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "Electric concept" },
      { label: { ar: "الشحن", en: "Charging" }, value: "DC fast" },
      { label: { ar: "الموديل", en: "Year" }, value: "2026" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$200,000" },
    ],
  },
  {
    slug: "tesla-model-3",
    brand: "Tesla",
    model: "Model 3",
    year: 2024,
    category: "electric",
    price: "$42,000",
    accent: "#4da3ff",
    image: "/media/images/car-model3.jpg",
    alt: { ar: "سيدان كهربائية بيضاء على سفح تل", en: "White electric sedan on a hillside" },
    tagline: { ar: "مدى كبير بتصميم بسيط.", en: "Generous range, simple design." },
    description: {
      ar: "سيدان كهربائية بتصميم عملي ومدى مناسب للاستخدام اليومي.",
      en: "An electric sedan with a practical design and a range made for everyday use.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "Electric sedan" },
      { label: { ar: "المدى التقريبي", en: "Est. range" }, value: "560 km" },
      { label: { ar: "الموديل", en: "Year" }, value: "2024" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$42,000" },
    ],
  },
  {
    slug: "tesla-model-y",
    brand: "Tesla",
    model: "Model Y",
    year: 2024,
    category: "electric",
    price: "$48,000",
    accent: "#4da3ff",
    image: "/media/images/car-modely-sunset.jpg",
    alt: { ar: "كروس أوفر كهربائية عند الغروب", en: "Electric crossover in sunset light" },
    tagline: { ar: "للعائلة، كهربائية وهادئة.", en: "Family-ready, electric and quiet." },
    description: {
      ar: "كروس أوفر مرتفعة بأسطح ناعمة ومساحة رحبة للأسرة.",
      en: "A raised crossover with soft surfacing and generous space for the family.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "Electric crossover" },
      { label: { ar: "المدى التقريبي", en: "Est. range" }, value: "510 km" },
      { label: { ar: "الموديل", en: "Year" }, value: "2024" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$48,000" },
    ],
  },
  {
    slug: "bmw-i8",
    brand: "BMW",
    model: "i8",
    year: 2020,
    category: "electric",
    price: "$148,000",
    accent: "#8fa9ff",
    image: "/media/images/car-i8.jpg",
    alt: { ar: "سيارة هجينة رياضية بيضاء على جانب الطريق", en: "White hybrid sports car at the kerb" },
    tagline: { ar: "خطوط من المستقبل.", en: "Lines from the future." },
    description: {
      ar: "سيارة هجينة بدعم كهربائي وأبواب تُفتح للأعلى.",
      en: "A hybrid with electric assist and upward-opening doors.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "Plug-in hybrid" },
      { label: { ar: "الدفع", en: "Drivetrain" }, value: "AWD assist" },
      { label: { ar: "الموديل", en: "Year" }, value: "2020" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$148,000" },
    ],
  },
  {
    slug: "dodge-challenger",
    brand: "Dodge",
    model: "Challenger",
    year: 2023,
    category: "sports",
    price: "$68,000",
    accent: "#ff6a2b",
    image: "/media/images/car-challenger-neon.jpg",
    alt: { ar: "سيارة ماسل أمريكية في ممر مضاء بالنيون", en: "American muscle car in a neon corridor" },
    tagline: { ar: "قوة وصوت وحضور.", en: "Power, sound and presence." },
    description: {
      ar: "سيارة ماسل حديثة بطابع داكن وحضور قوي على الطريق.",
      en: "A modern muscle car with a dark character and commanding road presence.",
    },
    specs: [
      { label: { ar: "الفئة", en: "Category" }, value: "Muscle" },
      { label: { ar: "الدفع", en: "Drivetrain" }, value: "RWD" },
      { label: { ar: "الموديل", en: "Year" }, value: "2023" },
      { label: { ar: "السعر التقريبي", en: "Indicative price" }, value: "$68,000" },
    ],
  },
];

export function getVehicle(slug: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.slug === slug);
}

export function vehiclesByCategory(category: Category): Vehicle[] {
  return VEHICLES.filter((v) => v.category === category);
}

const SPEC_VALUES_AR: Record<string, string> = {
  Sports: "رياضية",
  "Track sports": "رياضية للحلبات",
  "Mid-engine": "محرك وسطي",
  Hypercar: "هايبركار",
  "Performance luxury": "فخامة بأداء رياضي",
  Executive: "تنفيذية",
  "Grand tourer": "جراند توريزمو",
  SUV: "دفع رباعي",
  "Luxury SUV": "دفع رباعي فاخرة",
  Muscle: "ماسل",
  "Plug-in hybrid": "هجينة قابلة للشحن",
  "Electric sedan": "سيدان كهربائية",
  "Electric crossover": "كروس أوفر كهربائية",
  "Electric concept": "نموذج كهربائي",
  "V8 twin-turbo": "V8 بتوربينين",
  "V12 hybrid": "V12 هجين",
  "DC fast": "شحن سريع DC",
  "AWD assist": "دفع رباعي مساند",
  "4WD": "دفع رباعي",
  AWD: "دفع رباعي",
  RWD: "دفع خلفي",
};

/** Spec values are stored in English; Arabic readers get a localised label where one exists. */
export function specValue(value: string, lang: "ar" | "en"): string {
  if (lang === "en") return value;
  const known = SPEC_VALUES_AR[value];
  if (known) return known;
  return value.replace(/ km$/, " كم");
}
