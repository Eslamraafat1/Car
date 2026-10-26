import type { ShowcaseSection } from "@/lib/showcase-types";

export type ShowcasePage =
  | "home"
  | "explore"
  | "car"
  | "electric"
  | "performance"
  | "about"
  | "contact";

const IMG = "/media/images";

/**
 * Four editorial, car-first sections per page. The mix changes per page so no
 * two pages read the same, and every plate uses a real high-resolution photo.
 */
export const SECTIONS: Record<ShowcasePage, ShowcaseSection[]> = {
  home: [
    {
      kind: "still",
      image: `${IMG}/night-city.jpg`,
      alt: { ar: "سيارة تشقّ شوارع المدينة ليلاً", en: "A car cutting through the city at night" },
      eyebrow: { ar: "الفصل الليلي", en: "The Night Chapter" },
      title: { ar: "المدينة تنام. هي لا تهدأ.", en: "The city sleeps. It doesn’t." },
      caption: {
        ar: "حين تهدأ الأسفلت، تظهر الحقيقة — انعكاس المصابيح، دفء المحرك، وصمت القيادة وحدها.",
        en: "When the asphalt quiets, the truth appears — headlights on wet stone, engine warmth, and the silence of driving alone.",
      },
      timecode: "02:14:07",
    },
    {
      kind: "stat",
      image: `${IMG}/performance-car.jpg`,
      alt: { ar: "سيارة رياضية في حركة سريعة", en: "A sports car mid-motion" },
      eyebrow: { ar: "الزمن", en: "The Number" },
      value: 2.9,
      decimals: 1,
      suffix: "s",
      label: { ar: "من ٠ إلى ١٠٠ كم/س", en: "0 to 100 km/h" },
      title: { ar: "السرعة مش رقم. دي لحظة.", en: "Speed isn’t a number. It’s a moment." },
      body: {
        ar: "ثلاث ثوانٍ تكفي لتغيير نبضك. كل تفصيلة في الموقع ده مصنوعة لتصل للحظة دي.",
        en: "Three seconds is enough to change your pulse. Everything here is built to reach that instant.",
      },
    },
    {
      kind: "detail",
      eyebrow: { ar: "الحِرَفة", en: "The Craft" },
      title: { ar: "الجمال في التفاصيل الصغيرة", en: "Beauty lives in the small things" },
      items: [
        {
          image: `${IMG}/detail-wheel.jpg`,
          alt: { ar: "عجلة رياضية عن قرب", en: "Close-up of an alloy wheel" },
          num: "01",
          label: { ar: "العجلة والفرامل", en: "Wheel & brake" },
        },
        {
          image: `${IMG}/detail-headlight.jpg`,
          alt: { ar: "مصباح أمامي عن قرب", en: "Close-up of a headlight" },
          num: "02",
          label: { ar: "توقيع الإضاءة", en: "Lighting signature" },
        },
        {
          image: `${IMG}/detail-grille.jpg`,
          alt: { ar: "شبكة أمامية عن قرب", en: "Close-up of a front grille" },
          num: "03",
          label: { ar: "الشبكة الأمامية", en: "Front grille" },
        },
      ],
    },
    {
      kind: "editorial",
      image: `${IMG}/design-profile.jpg`,
      alt: { ar: "الخط الجانبي الكامل لسيارة", en: "Full side profile of a car" },
      index: "04",
      eyebrow: { ar: "الفلسفة", en: "Philosophy" },
      title: { ar: "الخط واحد. الباقي صمت.", en: "One line. The rest is silence." },
      body: {
        ar: "مش بنصنع حشو. بنحذف كل ما لا يخدم الحركة، ليبقى الخط الجانبي وحده يقول كل شيء.",
        en: "We don’t add. We remove everything that doesn’t serve motion — until a single silhouette says it all.",
      },
      quote: { ar: "أفضل تصميم هو اللي تحسّه قبل ما تشرحه.", en: "The best design is the one you feel before you explain it." },
    },
  ],

  explore: [
    {
      kind: "lineup",
      eyebrow: { ar: "الأسطول", en: "The Range" },
      title: { ar: "تشكيلة مُنتقاة بعناية", en: "A curated range" },
      items: [
        { image: `${IMG}/car-huracan-side.jpg`, alt: { ar: "لامبورغيني هوراكان", en: "Lamborghini Huracán" }, name: "Lamborghini Huracán", tag: { ar: "رياضية · محرك أوسط", en: "Sports · Mid-engine" }, href: "/cars/lamborghini-huracan-evo" },
        { image: `${IMG}/car-laferrari.jpg`, alt: { ar: "فيراري LaFerrari", en: "Ferrari LaFerrari" }, name: "Ferrari LaFerrari", tag: { ar: "هايبركار · V12 هايبرد", en: "Hypercar · V12 hybrid" }, href: "/cars/ferrari-laferrari" },
        { image: `${IMG}/car-911-black.jpg`, alt: { ar: "بورش 911", en: "Porsche 911" }, name: "Porsche 911 Turbo S", tag: { ar: "رياضية · دفع رباعي", en: "Sports · AWD" }, href: "/cars/porsche-911-turbo-s" },
        { image: `${IMG}/car-gwagon.jpg`, alt: { ar: "مرسيدس G-Wagon", en: "Mercedes G-Wagon" }, name: "Mercedes G-Wagon", tag: { ar: "دفع رباعي · فاخرة", en: "SUV · Luxury" } },
      ],
    },
    {
      kind: "pins",
      image: `${IMG}/reveal-car.jpg`,
      alt: { ar: "سيارة معالم تقنية عليها", en: "A car annotated with technical points" },
      eyebrow: { ar: "التشريح", en: "Anatomy" },
      title: { ar: "كل نقطة لها سبب", en: "Every point has a reason" },
      pins: [
        { x: 22, y: 62, label: { ar: "شبكة تهوئة أمامية", en: "Front cooling intake" }, value: "01" },
        { x: 52, y: 40, label: { ar: "خط السقف المنخفض", en: "Low roofline" }, value: "02" },
        { x: 78, y: 66, label: { ar: "جناح خلفي", en: "Rear aero blade" }, value: "03" },
      ],
    },
    {
      kind: "editorial",
      image: `${IMG}/car-warehouse.jpg`,
      alt: { ar: "سيارات في مستودع مضاء", en: "Cars in a lit warehouse" },
      index: "02",
      eyebrow: { ar: "الانتقاء", en: "Curation" },
      title: { ar: "مش كل عربية تستاهل القائمة", en: "Not every car makes the list" },
      body: {
        ar: "نختار بالخط، والإحساس بالقيادة، والحضور. ما يبقى هنا هو ما نفخر به وحده.",
        en: "We choose by silhouette, by how it drives, by presence. What stays here is what we’d stand behind alone.",
      },
    },
    {
      kind: "still",
      image: `${IMG}/car-911-black.jpg`,
      alt: { ar: "بورش 911 سوداء", en: "A black Porsche 911" },
      eyebrow: { ar: "اختيار المحرّر", en: "Editor’s pick" },
      title: { ar: "توازن نادر", en: "A rare balance" },
      caption: {
        ar: "٩١١ هي المسطرة اللي نقيس بيها الباقي — يومية بما يكفي للطريق، وحادة بما يكفي للحلبة.",
        en: "The 911 is the ruler we measure others by — everyday enough for the road, sharp enough for the track.",
      },
      timecode: "00:58:22",
    },
  ],

  car: [
    {
      kind: "stat",
      image: `${IMG}/performance-car.jpg`,
      alt: { ar: "سيارة رياضية في حركة", en: "A sports car in motion" },
      eyebrow: { ar: "الأداء", en: "Performance" },
      value: 610,
      suffix: "hp",
      label: { ar: "قدرة قصوى", en: "Peak output" },
      title: { ar: "القلب الذي يحرّك كل شيء", en: "The heart that moves it all" },
      body: {
        ar: "رقاقة الأداء مش أرقام على ورق — دي الإحساس تحت القدم والصوت في المنعطف.",
        en: "Performance isn’t numbers on paper — it’s the feel underfoot and the sound through a corner.",
      },
    },
    {
      kind: "pins",
      image: `${IMG}/reveal-car.jpg`,
      alt: { ar: "سيارة مع مواضع مميزة", en: "A car with highlighted features" },
      eyebrow: { ar: "التفاصيل", en: "Highlights" },
      title: { ar: "مهندس لتكون ملحوظة", en: "Engineered to be noticed" },
      pins: [
        { x: 20, y: 58, label: { ar: "مصابيح ليزر", en: "Laser headlights" }, value: "600 m" },
        { x: 55, y: 36, label: { ar: "فتحات تهوئة", en: "Air vents" }, value: "Aero" },
        { x: 80, y: 64, label: { ar: "عادم رياضي", en: "Sport exhaust" }, value: "Valved" },
      ],
    },
    {
      kind: "detail",
      eyebrow: { ar: "التشطيب", en: "Trim" },
      title: { ar: "لمسات تُلمس قبل أن تُرى", en: "Touches you feel before you see" },
      items: [
        { image: `${IMG}/detail-interior.jpg`, alt: { ar: "مقصورة داخلية", en: "Interior cabin" }, num: "01", label: { ar: "المقصورة", en: "The cabin" } },
        { image: `${IMG}/detail-cockpit.jpg`, alt: { ar: "لوحة قيادة", en: "Driver cockpit" }, num: "02", label: { ar: "لوحة القيادة", en: "The cockpit" } },
        { image: `${IMG}/detail-texture.jpg`, alt: { ar: "خامة مادة عن قرب", en: "Material texture close-up" }, num: "03", label: { ar: "الخامة", en: "The material" } },
      ],
    },
    {
      kind: "still",
      image: `${IMG}/final-reveal.jpg`,
      alt: { ar: "كشف نهائي عن سيارة", en: "A final car reveal" },
      eyebrow: { ar: "اللحظة", en: "The Moment" },
      title: { ar: "الكاملة تُكشف مرة واحدة", en: "Revealed only once" },
      caption: {
        ar: "كل تفصيلة اجتمعت لتوٍ — والآن، الطريق هو الحكم.",
        en: "Every detail has come together — and now the road is the judge.",
      },
      timecode: "03:41:19",
    },
  ],

  electric: [
    {
      kind: "still",
      image: `${IMG}/card-electric.jpg`,
      alt: { ar: "سيارة كهربائية", en: "An electric car" },
      eyebrow: { ar: "الفصل الكهربائي", en: "The Electric Chapter" },
      title: { ar: "صمت مُكهرب", en: "A charged silence" },
      caption: {
        ar: "لا عادم، لا اهتزاز — فقط انزلاق نظيف عبر الليل ونبض كهربائي تحت الجلد.",
        en: "No exhaust, no vibration — just a clean glide through the night and an electric pulse beneath the skin.",
      },
      timecode: "04:02:55",
    },
    {
      kind: "stat",
      image: `${IMG}/car-model3.jpg`,
      alt: { ar: "سيارة كهربائية على الطريق", en: "An EV on the road" },
      eyebrow: { ar: "المدى", en: "Range" },
      value: 610,
      suffix: "km",
      label: { ar: "مشيّة واحدة", en: "On a single charge" },
      title: { ar: "المدى اللي يفكّرك", en: "Range that frees you" },
      body: {
        ar: "اشحن ليلًا، وانطلق صباحًا بلا تخطيط. الكهرباء مش بديل — دي رُتبة جديدة.",
        en: "Charge overnight, leave in the morning without a plan. Electricity isn’t a substitute — it’s a new rank.",
      },
    },
    {
      kind: "editorial",
      image: `${IMG}/card-future.jpg`,
      alt: { ar: "مستقبل التنقل", en: "The future of mobility" },
      index: "03",
      eyebrow: { ar: "الفلسفة", en: "Philosophy" },
      title: { ar: "قوة بلا ضجيج", en: "Power without noise" },
      body: {
        ar: "القيادة الكهربائية تُعيد تعريف السرعة — استجابة فورية، ومركز ثقل منخفض، وهدوء مطلق.",
        en: "Electric driving redefines speed — instant response, a low centre of gravity, and total calm.",
      },
    },
    {
      kind: "pins",
      image: `${IMG}/car-i8.jpg`,
      alt: { ar: "سيارة كهربائية مميزة", en: "A distinctive electric car" },
      eyebrow: { ar: "التقنية", en: "Technology" },
      title: { ar: "مصمّمة حول البطارية", en: "Built around the battery" },
      pins: [
        { x: 24, y: 60, label: { ar: "حزمة بطارية", en: "Battery pack" }, value: "Floor" },
        { x: 56, y: 42, label: { ar: "شحن سريع", en: "Fast charge" }, value: "18 min" },
        { x: 78, y: 60, label: { ar: "استرجاع الطاقة", en: "Regen braking" }, value: "One-pedal" },
      ],
    },
  ],

  performance: [
    {
      kind: "stat",
      image: `${IMG}/performance-car.jpg`,
      alt: { ar: "سيارة أداء عالي", en: "A high-performance car" },
      eyebrow: { ar: "القوة", en: "Power" },
      value: 640,
      suffix: "hp",
      label: { ar: "قدرات مُطلقة", en: "Horsepower unleashed" },
      title: { ar: "أداء بلا اعتذار", en: "Performance without apology" },
      body: {
        ar: "كل حصان هنا له وظيفة. كل جرام يخدم المنعطف. لا شيء للزينة.",
        en: "Every horse here has a job. Every gram serves the corner. Nothing is decorative.",
      },
    },
    {
      kind: "still",
      image: `${IMG}/car-challenger-neon.jpg`,
      alt: { ar: "سيارة تحت إضاءة نيون", en: "A car under neon light" },
      eyebrow: { ar: "الحلبة", en: "The Circuit" },
      title: { ar: "حيث تُختبر الحقيقة", en: "Where the truth is tested" },
      caption: {
        ar: "على الحلبة لا تكذب الأرقام — الحرارة، الفرامل، والقوس كلها تتحدث.",
        en: "On a circuit the numbers don’t lie — heat, brakes and apex all speak up.",
      },
      timecode: "01:27:40",
    },
    {
      kind: "detail",
      eyebrow: { ar: "الهندسة", en: "Engineering" },
      title: { ar: "مصنوعة لتتحمل", en: "Built to endure" },
      items: [
        { image: `${IMG}/detail-wheel.jpg`, alt: { ar: "عجلة ونظام فرامل", en: "Wheel and brake" }, num: "01", label: { ar: "فرامل كربون", en: "Carbon brakes" } },
        { image: `${IMG}/detail-grille.jpg`, alt: { ar: "شبكة تهوئة", en: "Cooling grille" }, num: "02", label: { ar: "تهوئة المحرك", en: "Engine cooling" } },
        { image: `${IMG}/detail-texture.jpg`, alt: { ar: "خامة كربون", en: "Carbon texture" }, num: "03", label: { ar: "ألياف الكربون", en: "Carbon fibre" } },
      ],
    },
    {
      kind: "editorial",
      image: `${IMG}/car-gt3-white.jpg`,
      alt: { ar: "سيارة حلبة بيضاء", en: "A white track car" },
      index: "04",
      eyebrow: { ar: "القصة", en: "The Story" },
      title: { ar: "من الحلبة إلى الشارع", en: "From circuit to street" },
      body: {
        ar: "ما تقوده يوميًا وُلد في حلبة. الهندسة نفسها، والانضباط نفسه، بهدوء يناسب الحياة.",
        en: "What you drive daily was born on a circuit. The same engineering, the same discipline — made livable.",
      },
      quote: { ar: "الحلبة لا تُحسّن السيارة. بل تكشف نوايا المصمّم.", en: "A circuit doesn’t improve a car. It reveals the designer’s intent." },
    },
  ],

  about: [
    {
      kind: "editorial",
      image: `${IMG}/lab-tech.jpg`,
      alt: { ar: "تقني يعمل على سيارة", en: "A technician working on a car" },
      index: "01",
      eyebrow: { ar: "البداية", en: "The Beginning" },
      title: { ar: "بدأنا بسؤال واحد", en: "We started with one question" },
      body: {
        ar: "ما الذي يجعل السيارة تستحق أن تُروى؟ الجواب لم يكن في السرعة وحدها، بل في التفصيلة والقصة.",
        en: "What makes a car worth telling a story about? Not speed alone — but detail, and the story behind it.",
      },
      quote: { ar: "لسنا معرضًا. نحن قصّاصون.", en: "We’re not a showroom. We’re storytellers." },
    },
    {
      kind: "still",
      image: `${IMG}/car-warehouse.jpg`,
      alt: { ar: "مستودع سيارات", en: "A car warehouse" },
      eyebrow: { ar: "الورشة", en: "The Atelier" },
      title: { ar: "حيث تُصقل التفاصيل", en: "Where details are polished" },
      caption: {
        ar: "مساحة هادئة للضوء والصورة والصبر — كل سيارة تُصوَّر كما لو كانت الوحيدة.",
        en: "A quiet space for light, frame and patience — every car shot as if it were the only one.",
      },
      timecode: "00:12:03",
    },
    {
      kind: "detail",
      eyebrow: { ar: "المعايير", en: "Our Standards" },
      title: { ar: "لا نقبل القريب من الكمال", en: "We don’t accept near-perfect" },
      items: [
        { image: `${IMG}/detail-headlight.jpg`, alt: { ar: "تفصيلة مصباح", en: "Headlight detail" }, num: "01", label: { ar: "الإضاءة", en: "Lighting" } },
        { image: `${IMG}/detail-interior.jpg`, alt: { ar: "تفصيلة مقصورة", en: "Cabin detail" }, num: "02", label: { ar: "الداخل", en: "Interior" } },
        { image: `${IMG}/detail-wheel.jpg`, alt: { ar: "تفصيلة عجلة", en: "Wheel detail" }, num: "03", label: { ar: "العجلات", en: "Wheels" } },
      ],
    },
    {
      kind: "lineup",
      eyebrow: { ar: "الإرث", en: "The Legacy" },
      title: { ar: "سنوات من الاختيار", en: "Years of choosing" },
      items: [
        { image: `${IMG}/car-f8-red.jpg`, alt: { ar: "فيراري حمراء", en: "A red Ferrari" }, name: "Ferrari F8" },
        { image: `${IMG}/car-gt3-white.jpg`, alt: { ar: "بورش GT3 بيضاء", en: "A white Porsche GT3" }, name: "Porsche GT3" },
        { image: `${IMG}/car-aventador-doors.jpg`, alt: { ar: "لامبورغيني بأبواب مرفوعة", en: "Lamborghini with doors up" }, name: "Lamborghini" },
        { image: `${IMG}/car-amg-harbor.jpg`, alt: { ar: "مرسيدس AMG", en: "Mercedes AMG" }, name: "Mercedes-AMG" },
      ],
    },
  ],

  contact: [
    {
      kind: "still",
      image: `${IMG}/hero-poster.jpg`,
      alt: { ar: "لقطة افتتاحية لسيارة", en: "A cinematic car opener" },
      eyebrow: { ar: "أهلاً بك", en: "Welcome" },
      title: { ar: "ابدأ الحديث", en: "Start the conversation" },
      caption: {
        ar: "سواء كنت تبحث عن سيارة، أو تجربة قيادة، أو مجرد حديث عن العجلات — نحن هنا.",
        en: "Whether you’re after a car, a test drive, or just a conversation about wheels — we’re here.",
      },
      timecode: "00:00:01",
    },
    {
      kind: "editorial",
      image: `${IMG}/car-amg-harbor.jpg`,
      alt: { ar: "سيارة عند الميناء", en: "A car by the harbour" },
      index: "01",
      eyebrow: { ar: "الزيارة", en: "The Visit" },
      title: { ar: "تعال شوفها عن قرب", en: "Come see it up close" },
      body: {
        ar: "لا شيء يتفوّق على الوقوف أمام السيارة. احجز زيارة لمعرضنا وخذ وقتك.",
        en: "Nothing beats standing in front of one. Book a showroom visit and take your time.",
      },
    },
    {
      kind: "stat",
      image: `${IMG}/car-warehouse.jpg`,
      alt: { ar: "معرض سيارات", en: "A car showroom" },
      eyebrow: { ar: "الحضور", en: "Presence" },
      value: 12,
      suffix: "معرض",
      label: { ar: "حول المنطقة", en: "Across the region" },
      title: { ar: "قريب منك أينما كنت", en: "Close to you, wherever you are" },
    },
    {
      kind: "lineup",
      eyebrow: { ar: "شوفهم بنفسك", en: "See them in person" },
      title: { ar: "الأسطول بانتظارك", en: "The range is waiting" },
      items: [
        { image: `${IMG}/car-laferrari.jpg`, alt: { ar: "فيراري", en: "Ferrari" }, name: "Ferrari LaFerrari" },
        { image: `${IMG}/car-modely-sunset.jpg`, alt: { ar: "تسلا عند الغروب", en: "Tesla at sunset" }, name: "Tesla Model Y" },
        { image: `${IMG}/car-q7-snow.jpg`, alt: { ar: "SUV في الثلج", en: "An SUV in the snow" }, name: "Audi Q7" },
        { image: `${IMG}/car-roadster.jpg`, alt: { ar: "روودستر", en: "A roadster" }, name: "Roadster" },
      ],
    },
  ],
};
