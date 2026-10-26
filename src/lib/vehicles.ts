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
    alt: { ar: "لامبورغيني هوراكان برتقالي من الجانب", en: "Orange Lamborghini Huracán in profile" },
    tagline: { ar: "خطوط حادة وإضاءة برتقالية.", en: "Sharp lines, warm light." },
    description: {
      ar: "صورة توضيحية لسيارة وسطية بمقصورة مركّزة على السائق — عجلات واسعة، كتلة منخفضة، وحضور ما بيلخبطش.",
      en: "An illustrative mid-engine frame: wide track, low mass and a presence that never overstates itself.",
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
    alt: { ar: "فيراري حمراء في صالة عرض", en: "Red Ferrari in a showroom" },
    tagline: { ar: "هجين بنيوي في قلب أحمر.", en: "Hybrid structure, red heart." },
    description: {
      ar: "سيارة فرمانية تجمّع بين محرك خلفي ومساعد كهربائي — هون بنعرضها كمثال تحريري على تصميم فرعي.",
      en: "A flagship pairing a rear V12 with electric assist — shown here as an editorial example of the breed.",
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
    alt: { ar: "بورشه ٩١١ سوداء بجانب جبلي", en: "Black Porsche 911 beside the mountains" },
    tagline: { ar: "المنظور الطويل اللي بيعرف كل حاجة.", en: "The long view that knows the road." },
    description: {
      ar: "خطوط هادئة، جنوط ذهبية، وظل طويل — بورشه ٩١١ بتفضل أنيقة حتى وهي في حدودها.",
      en: "Calm surfaces, warm-metal wheels and a long shadow — a 911 that stays composed at its limits.",
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
    tagline: { ar: "أبيض متسخ، وخط واحد للمسار.", en: "Clean white, one racing line." },
    description: {
      ar: "نسخة مركّزة على الحلبة بتهوية مكشوفة وجناح خلفي ثابت — لقطة توضيحية.",
      en: "A track-focused frame with exposed ducting and a fixed rear wing — illustrative photography.",
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
    alt: { ar: "فيراري ف٨ حمراء في ضوء الصبح", en: "Red Ferrari F8 in morning light" },
    tagline: { ar: "أحمر تحت شجر خضراء.", en: "Red under green leaves." },
    description: {
      ar: "محرك خلفي وسطي وخطوط مصممة لتمرير الهواء فوق الجسم — لقطة شارع توضيحية.",
      en: "A mid-rear V8 with bodywork shaped to pass air over the deck — an illustrative street frame.",
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
    alt: { ar: "مرسيدس AMG في ممر بضوء نيون", en: "Mercedes-AMG in a neon-lit bay" },
    tagline: { ar: "نيون أحمر وأزرق على مقصورة هادئة.", en: "Red and blue neon over a hushed cabin." },
    description: {
      ar: "سيدان أداء بتتقفل في ضوء استوديو — توازن بين رفاهية يومية وسلوك رياضي.",
      en: "A performance sedan framed by studio light — the balance of daily luxury and sporting intent.",
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
    alt: { ar: "سيدان فاخرة رمادية في ضوء النهار", en: "Grey executive sedan in daylight" },
    tagline: { ar: "الراحة، بشكل جديد.", en: "Comfort, redefined." },
    description: {
      ar: "مقصورة طويلة، ظلال ناعمة، وتقف هادية في أي مكان — صورة توضيحية لسيدان تنفيذية.",
      en: "A long cabin, soft shadows and a quiet stance anywhere it parks — an illustrative executive sedan.",
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
    alt: { ar: "كوبيه فاخر بجانب المرفأ", en: "Luxury coupe by the harbour" },
    tagline: { ar: "قوس طويل ووقفة هادية.", en: "A long arch, a still stance." },
    description: {
      ar: "جران توريزمو بخطوط منخفضة ومقدم ممتدة — لقطة ميناء توضيحية.",
      en: "A gran tourer with low curves and a long nose — an illustrative harbour frame.",
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
    alt: { ar: "دفع رباعي مربّع الشكل في الشارع", en: "Boxy luxury SUV on the street" },
    tagline: { ar: "ورا كل طريق.", en: "Beyond every road." },
    description: {
      ar: "شكل صندوقي، ظهير خلفي بارز، وحضور بيتعرف من نص الشارع — لقطة مدينة توضيحية.",
      en: "A boxy shell, a rear spare and a silhouette recognised mid-street — an illustrative city frame.",
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
    alt: { ar: "دفع رباعي أبيض في جوّ بارد", en: "White SUV in cold light" },
    tagline: { ar: "على التلج من غير توتر.", en: "Snow, without the tension." },
    description: {
      ar: "دفع رباعي بيشتغل على أسطح زجاجية بثبات — صورة توضيحية لشتوية باردة.",
      en: "All-wheel drive holding a glassy surface with composure — an illustrative cold-weather frame.",
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
    alt: { ar: "سيارة رياضية كهربائية بيضاء في استوديو", en: "White electric sports car in a studio" },
    tagline: { ar: "الصمت. تقابل القوة.", en: "Silence. Meet power." },
    description: {
      ar: "شكل نظيف وخطوط ضيقة بدون شبكة تقليدية — عرض توضيحية لتصميم كهربائي مستقبلي.",
      en: "A clean shape with slim apertures and no conventional grille — an illustrative electric concept.",
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
    alt: { ar: "سيدان كهربائية بيضاء على تلّ", en: "White electric sedan on a hillside" },
    tagline: { ar: "مدى مريح وخطوط بسيطة.", en: "Range with restraint." },
    description: {
      ar: "سيدان كهربائية بلغة بسيطة ومدى عملي للاستخدام اليومي — لقطة توضيحية.",
      en: "An electric sedan with a plain-spoken shape and everyday range — an illustrative frame.",
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
    alt: { ar: "كروس أوفر كهربائي في ضوء الغروب", en: "Electric crossover in sunset light" },
    tagline: { ar: "عائلي، كهربائي، هادي.", en: "Family, electric, quiet." },
    description: {
      ar: "كروس أوفر مرتفع بخطوط ناعمة وضوء دافئ — صورة توضيحية لاستخدام يومي.",
      en: "A raised crossover with soft surfacing and warm light — an illustrative daily-driver frame.",
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
    alt: { ar: "سيارة رياضية هجينة بيضاء على الرصيف", en: "White hybrid sports car at the kerb" },
    tagline: { ar: "خطوط من المستقبل لسه شغالة.", en: "Future lines, still running." },
    description: {
      ar: "هجين بمحرك كهربائي مساعد وأبواب ترتفع — لقطة شارع توضيحية.",
      en: "A hybrid with electric assist and rising doors — an illustrative street frame.",
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
    alt: { ar: "موصلي أمريكي في ممر بإضاءة نيون", en: "American muscle car in a neon corridor" },
    tagline: { ar: "كتلة، صوت، وضوء.", en: "Mass, note and light." },
    description: {
      ar: "موصلي كلاسيكي بلون داكن وإضاءة استوديو — صورة توضيحية.",
      en: "A dark modern muscle car under studio lighting — an illustrative frame.",
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
