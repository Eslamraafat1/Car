import type { BiStr } from "@/lib/content";

export type BlogCategory = "guides" | "electric" | "care" | "performance";

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, BiStr> = {
  guides: { ar: "أدلة الشراء", en: "Buying guides" },
  electric: { ar: "كهربائية", en: "Electric" },
  care: { ar: "الصيانة", en: "Care" },
  performance: { ar: "الأداء", en: "Performance" },
};

export interface BlogSection {
  heading?: BiStr;
  paragraphs: BiStr[];
}

export interface BlogPost {
  slug: string;
  category: BlogCategory;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readMinutes: number;
  accent: string;
  image: string;
  alt: BiStr;
  title: BiStr;
  excerpt: BiStr;
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-inspect-a-used-car",
    category: "guides",
    date: "2026-09-18",
    readMinutes: 6,
    accent: "#d7b078",
    image: "/media/images/lab-tech.jpg",
    alt: { ar: "أجهزة فحص على طاولة عمل", en: "Inspection gear on a workshop bench" },
    title: {
      ar: "كيف تفحص سيارة مستعملة قبل أن تشتريها",
      en: "How to inspect a used car before you buy it",
    },
    excerpt: {
      ar: "قائمة عملية من الخطوات التي نتبعها في إيفاي، يمكنك تطبيقها بنفسك قبل أي قرار.",
      en: "A practical checklist of the steps we follow at Evay — ones you can apply yourself before any decision.",
    },
    sections: [
      {
        paragraphs: [
          {
            ar: "الفحص الجيد يوفّر عليك أكثر مما تتخيل. الفكرة ليست أن تصبح ميكانيكيًا، بل أن تعرف أين تنظر وما الأسئلة التي يجب أن تطرحها.",
            en: "A good inspection saves you more than you might expect. The goal isn't to become a mechanic — it's to know where to look and which questions to ask.",
          },
        ],
      },
      {
        heading: { ar: "ابدأ بالسجل والأوراق", en: "Start with the history and paperwork" },
        paragraphs: [
          {
            ar: "اطلب سجل الصيانة وتأكد أن رقم الهيكل يطابق الأوراق. أي تردد في تقديم السجل علامة تستحق التوقف.",
            en: "Ask for the service history and confirm the chassis number matches the documents. Any hesitation to share the records is a sign worth pausing on.",
          },
          {
            ar: "قارن عدد الكيلومترات بحالة المقصورة والدواسات والمقود، فالتآكل الظاهر يحكي قصة لا يمكن إخفاؤها بسهولة.",
            en: "Compare the mileage with the wear on the cabin, pedals and steering wheel — visible wear tells a story that is hard to hide.",
          },
        ],
      },
      {
        heading: { ar: "افحص الهيكل والطلاء", en: "Check the body and paint" },
        paragraphs: [
          {
            ar: "انظر إلى السيارة تحت ضوء النهار، وراقب اختلاف درجة اللون بين الألواح والفراغات غير المتساوية بين الأبواب، فقد تدل على إصلاح سابق.",
            en: "View the car in daylight and watch for colour differences between panels and uneven gaps between doors — they can point to earlier repairs.",
          },
        ],
      },
      {
        heading: { ar: "جرّب القيادة بعين ناقدة", en: "Drive it with a critical eye" },
        paragraphs: [
          {
            ar: "جرّب السيارة على طرق مختلفة وبسرعات متفاوتة. أصغِ لأي اهتزاز أو صوت غير معتاد، وتأكد أن الفرامل تستجيب بثبات.",
            en: "Drive on different roads and at varying speeds. Listen for vibration or unusual noise, and make sure the brakes respond steadily.",
          },
          {
            ar: "وفي النهاية، لا تتردد في طلب فحص فني مستقل. السيارة الجيدة لا تخشى الفحص.",
            en: "Finally, don't hesitate to ask for an independent inspection. A good car has nothing to fear from one.",
          },
        ],
      },
    ],
  },
  {
    slug: "electric-or-hybrid-which-fits-you",
    category: "electric",
    date: "2026-09-02",
    readMinutes: 5,
    accent: "#75d6c3",
    image: "/media/images/car-modely-sunset.jpg",
    alt: { ar: "سيارة كهربائية عند الغروب", en: "An electric car at sunset" },
    title: {
      ar: "كهربائية أم هجينة: أيهما يناسب نمط حياتك؟",
      en: "Electric or hybrid: which fits your lifestyle?",
    },
    excerpt: {
      ar: "لا توجد إجابة واحدة صحيحة، لكن هناك أسئلة بسيطة تقودك إلى الاختيار الأنسب.",
      en: "There is no single right answer — but a few simple questions will point you to the better choice.",
    },
    sections: [
      {
        paragraphs: [
          {
            ar: "السؤال الأول ليس عن التقنية، بل عن يومك: كم تقطع من مسافة، وأين تتوقف، وهل يتوفر لديك شاحن في المنزل أو العمل؟",
            en: "The first question isn't about technology — it's about your day: how far you drive, where you park, and whether you can charge at home or work.",
          },
        ],
      },
      {
        heading: { ar: "متى تكون الكهربائية الخيار الأفضل", en: "When electric makes the most sense" },
        paragraphs: [
          {
            ar: "إذا كان لديك مكان ثابت للشحن ومسافات يومية معتادة، فالكهربائية تمنحك قيادة هادئة وتكلفة تشغيل أقل وصيانة أبسط.",
            en: "With a reliable place to charge and predictable daily distances, electric offers quiet driving, lower running costs and simpler servicing.",
          },
        ],
      },
      {
        heading: { ar: "متى تكون الهجينة أنسب", en: "When a hybrid fits better" },
        paragraphs: [
          {
            ar: "إذا كنت تسافر كثيرًا لمسافات طويلة أو لا تتوفر لديك نقطة شحن ثابتة، فالهجينة تمنحك مرونة دون قلق من نفاد الشحن.",
            en: "If you often travel long distances or lack a regular charging point, a hybrid gives you flexibility without range anxiety.",
          },
          {
            ar: "تعال إلى استشارة مجانية وسنساعدك على مقارنة الخيارين بحسب استخدامك الفعلي.",
            en: "Book a consultation and we'll compare both options against how you actually drive.",
          },
        ],
      },
    ],
  },
  {
    slug: "after-handover-care-checklist",
    category: "care",
    date: "2026-08-21",
    readMinutes: 4,
    accent: "#b7a1ff",
    image: "/media/images/detail-interior.jpg",
    alt: { ar: "مقصورة سيارة بتفاصيل جلدية", en: "A car cabin with leather detailing" },
    title: {
      ar: "ما بعد التسليم: قائمة العناية بسيارتك في أول سنة",
      en: "After handover: your first-year car care checklist",
    },
    excerpt: {
      ar: "عادات بسيطة في السنة الأولى تحافظ على قيمة سيارتك وتُبقيها في أفضل حال.",
      en: "A few simple habits in the first year protect your car's value and keep it in top shape.",
    },
    sections: [
      {
        paragraphs: [
          {
            ar: "السنة الأولى هي الأهم. ما تفعله فيها يحدد كيف ستبدو سيارتك وتعمل بعد سنوات.",
            en: "The first year matters most. What you do in it shapes how your car looks and performs years from now.",
          },
        ],
      },
      {
        heading: { ar: "التزم بجدول الصيانة", en: "Keep to the service schedule" },
        paragraphs: [
          {
            ar: "اتبع الفواصل الموصى بها من الشركة المصنّعة، واحتفظ بكل فاتورة. السجل المنتظم يرفع قيمة إعادة البيع.",
            en: "Follow the manufacturer's recommended intervals and keep every invoice. A consistent record raises resale value.",
          },
        ],
      },
      {
        heading: { ar: "راقب الإطارات والسوائل", en: "Watch tyres and fluids" },
        paragraphs: [
          {
            ar: "افحص ضغط الإطارات شهريًا، وراجع مستوى الزيت وسائل التبريد بين الصيانات. عادة قصيرة تمنع مشاكل مكلفة.",
            en: "Check tyre pressure monthly and glance at oil and coolant levels between services. A short habit that prevents costly problems.",
          },
        ],
      },
      {
        heading: { ar: "احمِ التفاصيل", en: "Protect the details" },
        paragraphs: [
          {
            ar: "الغسيل المنتظم وحماية الطلاء وتنظيف المقصورة من الشمس والغبار تحافظ على المظهر كأنها جديدة.",
            en: "Regular washing, paint protection and keeping the cabin clear of sun and dust keep the car looking new.",
          },
        ],
      },
    ],
  },
  {
    slug: "choosing-your-first-performance-car",
    category: "performance",
    date: "2026-08-05",
    readMinutes: 7,
    accent: "#ff6a2b",
    image: "/media/images/car-huracan-side.jpg",
    alt: { ar: "سيارة رياضية برتقالية من الجانب", en: "Orange sports car in profile" },
    title: {
      ar: "اختيار أول سيارة رياضية: ما الذي يهم فعلًا؟",
      en: "Choosing your first performance car: what really matters",
    },
    excerpt: {
      ar: "القوة الحصانية ليست المقياس الوحيد. إليك ما يجب أن تفكر فيه قبل أن تُغريك الأرقام.",
      en: "Horsepower isn't the only measure. Here's what to think about before the numbers tempt you.",
    },
    sections: [
      {
        paragraphs: [
          {
            ar: "السيارة الرياضية الأولى تجربة عاطفية قبل أن تكون قرارًا ماليًا، ولهذا نشجّعك على الجمع بين الحماس والعقلانية.",
            en: "A first performance car is an emotional experience before it is a financial decision — so we encourage balancing excitement with realism.",
          },
        ],
      },
      {
        heading: { ar: "فكّر في التكلفة الكاملة", en: "Think about the full cost" },
        paragraphs: [
          {
            ar: "السعر ليس سوى جزء من الصورة. احسب التأمين والصيانة والإطارات والوقود قبل أن تقرر.",
            en: "The price tag is only part of the picture. Factor in insurance, servicing, tyres and fuel before you decide.",
          },
        ],
      },
      {
        heading: { ar: "اختر ما تستطيع الاستمتاع به يوميًا", en: "Pick what you can enjoy every day" },
        paragraphs: [
          {
            ar: "سيارة رائعة على الورق قد تكون مرهقة في زحام المدينة. جرّبها في طرقك المعتادة، لا على طريق مثالي فقط.",
            en: "A car that's brilliant on paper can be tiring in city traffic. Try it on your usual roads, not only on an ideal one.",
          },
          {
            ar: "إذا لم تكن متأكدًا، فنحن نرحّب بأن ننصحك بصراحة، حتى لو كانت النصيحة أن تنتظر.",
            en: "If you're unsure, we're happy to advise you honestly — even when the advice is to wait.",
          },
        ],
      },
    ],
  },
  {
    slug: "understanding-car-warranties",
    category: "guides",
    date: "2026-07-14",
    readMinutes: 5,
    accent: "#d7b078",
    image: "/media/images/detail-texture.jpg",
    alt: { ar: "نسيج جلدي داكن عن قرب", en: "Dark leather texture up close" },
    title: {
      ar: "ضمان السيارة: ما الذي يغطيه وما الذي لا يغطيه؟",
      en: "Car warranties: what they cover and what they don't",
    },
    excerpt: {
      ar: "اقرأ شروط الضمان قبل التوقيع. نشرح لك البنود التي تستحق الانتباه.",
      en: "Read the warranty terms before you sign. We explain the clauses worth paying attention to.",
    },
    sections: [
      {
        paragraphs: [
          {
            ar: "كلمة «ضمان» تبدو مطمئنة، لكن التفاصيل هي ما يحدد قيمته الحقيقية. اطلب دائمًا النص الكامل مكتوبًا.",
            en: "The word “warranty” sounds reassuring, but the details determine its real value. Always ask for the full text in writing.",
          },
        ],
      },
      {
        heading: { ar: "اعرف المدة والحدود", en: "Know the term and the limits" },
        paragraphs: [
          {
            ar: "تأكد من مدة الضمان وحد الكيلومترات، وهل يشمل المحرك وناقل الحركة والإلكترونيات أم أجزاء محددة فقط.",
            en: "Confirm the length of cover and the mileage limit, and whether it includes the engine, gearbox and electronics or only specific parts.",
          },
        ],
      },
      {
        heading: { ar: "انتبه للاستثناءات", en: "Watch the exclusions" },
        paragraphs: [
          {
            ar: "غالبًا ما تُستثنى المستهلكات مثل الفرامل والإطارات، وقد يشترط الضمان الصيانة في مراكز معتمدة. اسأل عن هذا قبل التعاقد.",
            en: "Wear items such as brakes and tyres are often excluded, and cover may require servicing at approved centres. Ask about this before you commit.",
          },
        ],
      },
    ],
  },
  {
    slug: "winter-and-summer-driving-tips",
    category: "care",
    date: "2026-06-30",
    readMinutes: 4,
    accent: "#75d6c3",
    image: "/media/images/night-city.jpg",
    alt: { ar: "شارع مدينة ليلًا", en: "A city street at night" },
    title: {
      ar: "القيادة في الحر والبرد: نصائح للحفاظ على سيارتك",
      en: "Driving in heat and cold: tips to look after your car",
    },
    excerpt: {
      ar: "تغيّر الفصول يؤثر على البطارية والإطارات والتكييف. هذه خطوات بسيطة للاستعداد.",
      en: "Changing seasons affect the battery, tyres and air conditioning. These simple steps help you prepare.",
    },
    sections: [
      {
        paragraphs: [
          {
            ar: "الحرارة العالية والبرودة كلتاهما تضغطان على سيارتك بطرق مختلفة، والاستعداد المسبق أرخص من الإصلاح.",
            en: "Both high heat and cold stress your car in different ways, and preparing ahead is cheaper than repairing.",
          },
        ],
      },
      {
        heading: { ar: "في الأيام الحارة", en: "In hot weather" },
        paragraphs: [
          {
            ar: "افحص سائل التبريد والتكييف، وتجنّب ترك السيارة تحت الشمس لفترات طويلة، واستخدم واقيًا للزجاج لحماية المقصورة.",
            en: "Check the coolant and air conditioning, avoid leaving the car in direct sun for long periods, and use a windscreen shade to protect the cabin.",
          },
        ],
      },
      {
        heading: { ar: "في الأيام الباردة", en: "In cold weather" },
        paragraphs: [
          {
            ar: "تأكد من صحة البطارية وضغط الإطارات، فالبرد يخفض الضغط ويضعف البطارية القديمة.",
            en: "Make sure the battery is healthy and tyre pressure is correct — cold lowers pressure and weakens an ageing battery.",
          },
        ],
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function relatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameCategory = BLOG_POSTS.filter(
    (candidate) => candidate.category === post.category && candidate.slug !== post.slug,
  );
  const others = BLOG_POSTS.filter(
    (candidate) => candidate.category !== post.category && candidate.slug !== post.slug,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/** Deterministic across server and client: always formatted in UTC. */
export function formatPostDate(iso: string, lang: "ar" | "en"): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
