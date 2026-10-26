export type BiStr = { ar: string; en: string };

export const C = {
  brand: { name: "AURELIS", nameAr: "أوريليس" },

  nav: {
    home: { ar: "الرئيسية", en: "Home" },
    explore: { ar: "استعرض السيارات", en: "Explore Cars" },
    electric: { ar: "كهربائي", en: "Electric" },
    performance: { ar: "أداء", en: "Performance" },
    about: { ar: "عنّا", en: "About" },
    contact: { ar: "تواصل", en: "Contact" },
    cta: { ar: "احجز تجربة قيادة", en: "Book a Drive" },
    ctaBrowse: { ar: "تصفّح الموديلات", en: "Browse the Models" },
    menu: { ar: "القائمة", en: "Menu" },
    close: { ar: "إغلاق", en: "Close" },
    switchTo: { ar: "English", en: "العربية" },
    langLabel: { ar: "تغيير اللغة", en: "Change language" },
    search: { ar: "بحث", en: "Search" },
    skip: { ar: "تخطَّ إلى المحتوى", en: "Skip to content" },
  },

  hero: {
    eyebrow: { ar: "حملة إطلاق ٢٠٢٦ — تجربة تصويرية", en: "2026 Launch Film — A Cinematic Experience" },
    title: { ar: "مش مجرد عربية. دي تجربة.", en: "ENGINEERED TO MOVE YOU." },
    sub: {
      ar: "فيديو سينمائي، كارثة تفاعلية، وتفاصيل مصنوعة بدقة. انزل تحت وخُد راحتك.",
      en: "A cinematic drive, stacked storytelling and details cut to perfection. Scroll down and take the wheel.",
    },
    primary: { ar: "استعرض الموديلات", en: "Explore the Fleet" },
    secondary: { ar: "ابدأ الفيلم", en: "Start the Film" },
    scroll: { ar: "انزل", en: "Scroll" },
    pause: { ar: "إيقاف الفيديو", en: "Pause video" },
    play: { ar: "تشغيل الفيديو", en: "Play video" },
  },

  reveal: {
    scene: { ar: "المشهد الأول — الكشف", en: "Scene 01 — The Reveal" },
    title: { ar: "من قلب العتمة.", en: "OUT OF THE DARKNESS." },
    body: {
      ar: "كل سيارة تبدأ كخط في الضلمة. مع أول ضوء، الكتلة بتاخد مكانها والظل بيرجع للخلف.",
      en: "Every car begins as a line in the dark. With the first light, the mass takes its place and the shadow steps back.",
    },
    stat1: { ar: "٠١ / الإضاءة", en: "01 / Light" },
    stat2: { ar: "٠٢ / الكتلة", en: "02 / Mass" },
    stat3: { ar: "٠٣ / الحضور", en: "03 / Presence" },
  },

  design: {
    scene: { ar: "المشهد الثاني — التصميم", en: "Scene 02 — The Design" },
    title: { ar: "كل خط ليه سبب.", en: "EVERY LINE HAS A REASON." },
    body: {
      ar: "الجانب الكامل: من مقدمة منخفضة إلى ذيل ممدود. الهواء بيعدي زي ما مفيش حاجة قدامه.",
      en: "The full profile: from a low nose to a stretched tail. Air moves across it as if nothing stands in the way.",
    },
    callouts: [
      { ar: "ديناميكا هوائية نشطة", en: "Active aerodynamics" },
      { ar: "هيكل مونوكوك خفيف", en: "Lightweight monocoque" },
      { ar: "توقيع إضاءة ضيّق", en: "Slim light signature" },
    ],
    caption: { ar: "صورة توضيحية — لقطة استوديو", en: "Illustrative — studio frame" },
  },

  details: {
    scene: { ar: "المشهد الثالث — التفاصيل", en: "Scene 03 — The Details" },
    title: { ar: "الحرفية، عن قرب.", en: "CRAFT, UP CLOSE." },
    body: {
      ar: "الزجاج، المعدن، الجلد والخيوط. تفاصيل صغيرة بتشوفها كل يوم من غير ما تحس.",
      en: "Glass, metal, leather and stitch. The small things you see every day without noticing.",
    },
    items: [
      { title: { ar: "توقيع الإضاءة", en: "Light signature" }, body: { ar: " حواف دقيقة ترسم الشكل قبل ما تشوفه.", en: "Thin edges that draw the shape before you see it." } },
      { title: { ar: "العجل والفرامل", en: "Wheel & brake" }, body: { ar: "كتلة خفيفة قدر ما تتحمل الحرارة.", en: "Mass kept low, heat kept under control." } },
      { title: { ar: "الشبكة الأمامية", en: "Front grille" }, body: { ar: "تهوية محسوبة للسوبر شارج.", en: "Cooling measured for sustained boost." } },
      { title: { ar: "المقصورة", en: "The cabin" }, body: { ar: "مواد دافية وملمس مصنوع لليمين والشمال.", en: "Warm materials, finished to read left or right." } },
      { title: { ar: "لوحة العدّادات", en: "Driver display" }, body: { ar: "كل معلومة في مكانها الصح.", en: "Every readout exactly where the eye expects it." } },
    ],
  },

  performance: {
    scene: { ar: "المشهد الرابع — الأداء", en: "Scene 04 — Performance" },
    title: { ar: "أرقام بتحس بيها.", en: "NUMBERS THAT FEEL." },
    body: {
      ar: "الأداء مش جدول. ده إحساس بين التعشيق والتيل.",
      en: "Performance is not a spreadsheet. It is the pulse between throttle and tarmac.",
    },
    disclaimer: {
      ar: "أرقام توضيحية لأغراض العرض فقط — ليست مواصفات مصنّع رسمية.",
      en: "Illustrative demo figures for presentation only — not official manufacturer specifications.",
    },
    stats: [
      { value: "2.6", unit: { ar: "ثانية", en: "sec" }, label: { ar: "٠ إلى ١٠٠ كم/س", en: "0–100 km/h" } },
      { value: "1020", unit: { ar: "حصان", en: "hp" }, label: { ar: "القوة المعلنة", en: "Claimed output" } },
      { value: "350", unit: { ar: "كم/س", en: "km/h" }, label: { ar: "السرعة القصوى", en: "Top speed" } },
      { value: "700", unit: { ar: "كم", en: "km" }, label: { ar: "المدى التقديري", en: "Estimated range" } },
    ],
  },

  final: {
    scene: { ar: "المشهد الأخير — الكشف النهائي", en: "Scene 05 — The Final Reveal" },
    title: { ar: "الطريق مستنيك.", en: "THE ROAD IS WAITING." },
    body: {
      ar: "اختار عربيتك، اقرا تفاصيلها، وخد أول خطوة ناحية الرحلة الجاية.",
      en: "Choose a machine, read its story, and take the first step toward the next drive.",
    },
    cta: { ar: "شوف المجموعة", en: "View the Collection" },
    secondary: { ar: "كل موديل", en: "All models" },
  },

  stack: {
    label: { ar: "تسلسل الموديلات", en: "The Stacked Lineup" },
    title: { ar: "خمس حكايات. شاشة واحدة.", en: "Five machines. One screen." },
    body: {
      ar: "اسحب لفوق وبطّل كل كارت فوق اللي تحته — كل واحدة بتحكي قصة مختلفة.",
      en: "Scroll and each card settles over the last — five different stories, one continuous drive.",
    },
    cta: { ar: "استكشف الموديل", en: "Explore the Model" },
    progress: { ar: "الجزء", en: "Part" },
    cards: [
      {
        index: "01",
        kicker: { ar: "السوبر كار", en: "The Supercar" },
        title: { ar: "اتصنعت عشان تكسر الحدود.", en: "BUILT TO BREAK LIMITS." },
        body: {
          ar: "محرك وسطي، هيكل خفيف، ورد فعل فوري. عربية مصنوعة عشان تفضل ماسكة الطريق.",
          en: "Mid-engine balance, a featherweight shell and a throttle that answers instantly. Built to hold the road and the moment.",
        },
        specs: [
          { ar: "محرك وسطي", en: "Mid-engine" },
          { ar: "كربون", en: "Carbon shell" },
          { ar: "٠–١٠٠ في ٢٫٦ث", en: "0–100 in 2.6s" },
        ],
        accent: "#ff6a2b",
        image: "/media/images/card-supercar.jpg",
        alt: { ar: "سوبر كار برتقالي بإضاءة دافئة", en: "Orange supercar under warm light" },
        slug: "lamborghini-huracan-evo",
      },
      {
        index: "02",
        kicker: { ar: "المستقبل الكهربائي", en: "The Electric Future" },
        title: { ar: "الصمت. تقابل القوة.", en: "SILENCE. MEET POWER." },
        body: {
          ar: "عزم بييجي من غير صوت. كهربة بتحكمت بالكامل، وتصميم بيتكلم بلغة الضوء الأزرق.",
          en: "Torque without theatre. Full electrical control, dressed in a light signature that speaks in blue.",
        },
        specs: [
          { ar: "دفع كهربائي", en: "Electric drive" },
          { ar: "شحن سريع", en: "Rapid charge" },
          { ar: "٧٠٠ كم", en: "700 km range" },
        ],
        accent: "#4da3ff",
        image: "/media/images/card-electric.jpg",
        alt: { ar: "سيارة رياضية زرقاء على خلفية سوداء", en: "Blue sports car against a black backdrop" },
        slug: "tesla-roadster",
      },
      {
        index: "03",
        kicker: { ar: "السيدان الفاخرة", en: "The Luxury Sedan" },
        title: { ar: "الراحة، بشكل جديد.", en: "COMFORT, REDEFINED." },
        body: {
          ar: "مقصورة هادئة، تعليق بيتكلم مع الشارع، وحضور رصين في كل خطوة.",
          en: "A quiet cabin, a suspension that reads the street, and a presence that never raises its voice.",
        },
        specs: [
          { ar: "مقصورة معزولة", en: "Isolated cabin" },
          { ar: "جلد مخيط", en: "Hand-stitched" },
          { ar: "٤ مناخب", en: "Four zones" },
        ],
        accent: "#c9ceda",
        image: "/media/images/card-luxury.jpg",
        alt: { ar: "سيدان فاخرة برتوبية داكنة", en: "Dark executive sedan in profile" },
        slug: "bmw-7-series",
      },
      {
        index: "04",
        kicker: { ar: "آلة الطرق الوعرة", en: "The Off-Road Machine" },
        title: { ar: "ورا كل طريق.", en: "BEYOND EVERY ROAD." },
        body: {
          ar: "تضاريس صعبة، ضوء آخر النهار، وسيارة مش عارفة كلمة مستحيل.",
          en: "Hard terrain, last-of-day light, and a machine that has never learned the word impossible.",
        },
        specs: [
          { ar: "دفع رباعي", en: "All-wheel drive" },
          { ar: "تعليق طويل", en: "Long travel" },
          { ar: "عزل حراري", en: "Thermal lining" },
        ],
        accent: "#e1a33f",
        image: "/media/images/card-offroad.jpg",
        alt: { ar: "دفع رباعي في صحراء صخرية", en: "SUV crossing red-rock desert" },
        slug: "mercedes-g63",
      },
      {
        index: "05",
        kicker: { ar: "مستقبل القيادة", en: "The Future of Driving" },
        title: { ar: "الغد يبدأ من هنا.", en: "TOMORROW STARTS HERE." },
        body: {
          ar: "خطوط نقية، إضاءة محيطة، وتقنية مخبّأة تحت السطح. دي المعايير اللي جاية.",
          en: "Clean surfaces, wraparound light and technology hidden under the skin. A preview of what comes next.",
        },
        specs: [
          { ar: "تصميم كونسبت", en: "Concept form" },
          { ar: "قيادة نصف ذاتية", en: "Semi-autonomous" },
          { ar: "واجهة ضوئية", en: "Light interface" },
        ],
        accent: "#8fa9ff",
        image: "/media/images/card-future.jpg",
        alt: { ar: "كار كونسبت في استوديو معتم", en: "Concept car in a darkened studio" },
        slug: "tesla-roadster",
      },
    ],
  },

  marquee: {
    items: [
      { ar: "سوبر كار", en: "SUPERCARS" },
      { ar: "كهربائي", en: "ELECTRIC" },
      { ar: "فخامة", en: "LUXURY" },
      { ar: "دفع رباعي", en: "SUVS" },
      { ar: "كونسبت", en: "CONCEPTS" },
      { ar: "أداء عالي", en: "PERFORMANCE" },
      { ar: "ج touring", en: "GRAN TOURING" },
      { ar: "سباقات", en: "MOTORSPORT" },
    ],
    note: { ar: "فئات تجريبية المعروضة لأغراض العرض", en: "Categories shown for presentation purposes" },
  },

  engineering: {
    eyebrow: { ar: "مختبر الهندسة", en: "Engineering Lab" },
    title: { ar: "الشكل بييجي بعد الأداء.", en: "FORM FOLLOWS PHYSICS." },
    body: {
      ar: "كل ظرف في الشكل موجود عشان يحل مشكلة: حرارة، هواء، وزن، أو صوت.",
      en: "Every crease in the body solves a problem: heat, air, mass or noise.",
    },
    tiles: [
      {
        title: { ar: "ديناميكا الهواء", en: "Aerodynamics" },
        body: { ar: "قنوات هوائية بتتحكم بالضغط على المحور الخلفي من غير ما تزوّد السحب.", en: "Air channels that steer pressure over the rear axle without adding drag." },
        image: "/media/images/car-huracan-side.jpg",
        alt: { ar: "جانب سيارة رياضية يوضح الخطوط الهوائية", en: "Sports car flank showing its aero lines" },
        tag: { ar: "٠٫٢٩ معامل السحب", en: "0.29 drag coefficient" },
      },
      {
        title: { ar: "المواد", en: "Materials" },
        body: { ar: "خليط من الألومنيوم والألياف اللي بيقلّل الوزن من غير ما يضحي بالصلابة.", en: "A blend of aluminium and fibre that cuts mass without giving up rigidity." },
        image: "/media/images/detail-texture.jpg",
        alt: { ar: "نسيج مادة داكنة ملمسها خشن", en: "Dark technical material texture" },
        tag: { ar: "١٨٧ كجم تم توفيرها", en: "187 kg saved" },
      },
      {
        title: { ar: "الأنظمة", en: "Intelligence" },
        body: { ar: "موديولات كهربية بتقرأ الطريق وتجاوب في أقل من جزء من الثانية.", en: "Control modules that read the road and answer in less than a heartbeat." },
        image: "/media/images/lab-tech.jpg",
        alt: { ar: "لوحة إلكترونية وأدوات قياس في المختبر", en: "Electronics and test gear on a lab bench" },
        tag: { ar: "١٢٠٠ اختبار", en: "1200 test cycles" },
      },
    ],
  },

  future: {
    eyebrow: { ar: "الحركة المستقبلية", en: "Future Mobility" },
    title: { ar: "الأفق الكهربائي.", en: "THE ELECTRIC HORIZON." },
    body: {
      ar: "من شاحن لطيف في الشارع لمشوار طويل على الساحلة — القيادة الكهربائية بقت هادية، وسريعة، ومتصلة.",
      en: "From a quiet kerbside charge to a long coastal run — electric driving has become silent, immediate and connected.",
    },
    stats: [
      { value: "18", unit: { ar: "دقيقة", en: "min" }, label: { ar: "من ١٠٪ إلى ٨٠٪", en: "10% to 80%" } },
      { value: "700", unit: { ar: "كم", en: "km" }, label: { ar: "المدى التقديري", en: "Estimated range" } },
      { value: "0", unit: { ar: "انبعاثات", en: "emissions" }, label: { ar: "في القيادة", en: "While driving" } },
    ],
    note: { ar: "أرقام توضيحية لأغراض العرض.", en: "Illustrative demo figures." },
    cta: { ar: "افصل الكهربائي", en: "Enter the Electric Chapter" },
  },

  showcase: {
    eyebrow: { ar: "تجربة تفاعلية", en: "Interactive Experience" },
    title: { ar: "اختار وشوف.", en: "PICK YOUR FOCUS." },
    body: {
      ar: "اختر موديل من الشريط وشوف الصورة والتفاصيل بتتحرك مع بعض.",
      en: "Choose a machine from the strip and watch image and data move together.",
    },
    view: { ar: "تفاصيل الموديل", en: "View model details" },
    imageOf: { ar: "صورة", en: "Image" },
    specsLabel: { ar: "المواصفات", en: "Specifications" },
    demo: { ar: "بيانات تجريبية", en: "Demo data" },
  },

  collection: {
    eyebrow: { ar: "المجموعة", en: "The Collection" },
    title: { ar: "اختار رفيق الطريق.", en: "CHOOSE YOUR COMPANION." },
    body: {
      ar: "موديلات مرتبة بالفئة — وبيانات المعروض تجريبية لحد ما تتربط بمخزون حقيقي.",
      en: "Machines arranged by category — every listing is demonstration data until live inventory is connected.",
    },
    filters: [
      { key: "all", ar: "الكل", en: "All vehicles" },
      { key: "sports", ar: "رياضية", en: "Sports cars" },
      { key: "luxury", ar: "فخامة", en: "Luxury" },
      { key: "suv", ar: "دفع رباعي", en: "SUVs" },
      { key: "electric", ar: "كهربائية", en: "Electric" },
    ],
    count: { ar: "موديل", en: "models" },
    view: { ar: "شوف التفاصيل", en: "View details" },
    empty: { ar: "مفيش موديلات في الفئة دي.", en: "No models in this category." },
    note: {
      ar: "قوائم تجريبية للعرض فقط — مش مخزون متاح للبيع.",
      en: "Demonstration listings for presentation only — not available inventory.",
    },
    year: { ar: "موديل", en: "Year" },
    price: { ar: "السعر", en: "Price" },
  },

  experience: {
    eyebrow: { ar: "اختار التجربة", en: "Experience Selector" },
    title: { ar: "إيه نوع يومك؟", en: "WHAT KIND OF DAY IS IT?" },
    body: {
      ar: "اضغط على التجربة وشوف الصورة والمزاج والمحتوى بيتغيروا مع بعض.",
      en: "Pick an experience and watch the imagery, mood and copy change together.",
    },
    items: [
      {
        key: "performance",
        title: { ar: "أداء", en: "Performance" },
        tag: { ar: "يوم سباق", en: "Track day" },
        body: { ar: "خط تعشيق، فرامل سخنة، وصوت محرك في كل لفة.", en: "A shifting line, warm brakes and an engine note on every corner." },
        image: "/media/images/car-aventador-doors.jpg",
        alt: { ar: "سيارة رياضية بأبوابها مرفوعة في الغروب", en: "Sports car with doors raised at sunset" },
        accent: "#ff6a2b",
      },
      {
        key: "luxury",
        title: { ar: "فخامة", en: "Luxury" },
        tag: { ar: "مساء هادي", en: "Quiet evening" },
        body: { ar: "مقصورة معزولة، صوت منخفض، ورحلة بتمشي بثبات.", en: "An isolated cabin, a low voice and a journey that settles around you." },
        image: "/media/images/car-amg-harbor.jpg",
        alt: { ar: "سيارة فاخرة راسية بجانب المرفأ", en: "Luxury coupe parked by the harbour" },
        accent: "#c9ceda",
      },
      {
        key: "adventure",
        title: { ar: "مغامرة", en: "Adventure" },
        tag: { ar: "طريق بعيد", en: "Far road" },
        body: { ar: "أرض وعرة، إمداد كامل، ومسافة مفتوحة قدامك.", en: "Rough ground, full traction and a wide horizon ahead." },
        image: "/media/images/car-gwagon.jpg",
        alt: { ar: "دفع رباعي أنيق في الشارع", en: "Rugged luxury SUV on the street" },
        accent: "#e1a33f",
      },
      {
        key: "electric",
        title: { ar: "كهربائي", en: "Electric" },
        tag: { ar: "مشوار صافي", en: "Clean run" },
        body: { ar: "عزم متاح من أول لحظة وصمت مريح على الطريق.", en: "Torque on demand and a hush that suits the road." },
        image: "/media/images/car-modely-sunset.jpg",
        alt: { ar: "سيارة كهربائية في ضوء الغروب", en: "Electric car in sunset light" },
        accent: "#4da3ff",
      },
    ],
  },

  finalCta: {
    eyebrow: { ar: "الخطوة الجاية", en: "The Next Step" },
    title: { ar: "رحلتك الجاية تبدأ من هنا.", en: "YOUR NEXT DRIVE STARTS HERE." },
    body: {
      ar: "اتصفّح المجموعة كاملة، أو كلّمنا ونساعدك تختار الموديل المناسب ليك.",
      en: "Browse the full collection, or talk to us and we will help you narrow it down.",
    },
    primary: { ar: "افتح المجموعة", en: "Open the Collection" },
    secondary: { ar: "كلّمنا", en: "Talk to us" },
  },

  finale: {
    home: {
      eyebrow: { ar: "المشهد الأخير — الإشعال", en: "Final Scene — Ignition" },
      title: { ar: "أوّل ضغطة… والطريق بيولّع.", en: "ONE PRESS LIGHTS THE ROAD." },
      hint: { ar: "أمسك الزر لحد ما الدائرة تكمل.", en: "Press and hold until the circle completes." },
      hold: { ar: "تشغيل", en: "Start" },
      spooling: { ar: "بيولّع…", en: "Igniting…" },
      live: { ar: "الأنظمة شغّالة", en: "Systems live" },
      idle: { ar: "بانتظار الإشعال", en: "Awaiting ignition" },
      reset: { ar: "أعد الإشعال", en: "Ignite again" },
      status: [
        { ar: "الشبكة الكهربائية", en: "Power grid" },
        { ar: "أنظمة الفرملة", en: "Brake systems" },
        { ar: "تليمتري الطريق", en: "Road telemetry" },
      ],
    },
    explore: {
      eyebrow: { ar: "قرعة الموديلات", en: "The Model Draw" },
      title: { ar: "الشريط بيلف… والموديل يختار نفسه.", en: "SPIN THE STRIP. THE MODEL PICKS ITSELF." },
      hint: { ar: "لفّة واحدة… وشوف مين وقف قدام الكاميرا.", en: "One spin — see which machine stops in frame." },
      spin: { ar: "لفّ العجلة", en: "Spin the strip" },
      spinning: { ar: "بلفّ…", en: "Spinning…" },
      result: { ar: "اختيار اللحظة", en: "Pick of the moment" },
      view: { ar: "شوف الموديل", en: "View this model" },
      frame: { ar: "نافذة الاختيار", en: "Draw window" },
    },
    electric: {
      eyebrow: { ar: "الشاحن الأخير", en: "The Last Charge" },
      title: { ar: "ملي الشحن… وافتح الطريق.", en: "CHARGE IT. OPEN THE ROAD." },
      hint: { ar: "أمسك لحد ما توصل ١٠٠٪.", en: "Hold it until the pack reads 100%." },
      charging: { ar: "بيتشحن…", en: "Charging…" },
      full: { ar: "مشحون بالكامل", en: "Fully charged" },
      reset: { ar: "أعد الشحن", en: "Charge again" },
      rangeNote: { ar: "المدى التقديري بعد الشحن", en: "Estimated range once charged" },
    },
    performance: {
      eyebrow: { ar: "التحكم في الانطلاق", en: "Launch Control" },
      title: { ar: "أمسك… لحد خط الحدود.", en: "HOLD IT TO THE REDLINE." },
      hint: { ar: "أمسك دواسة القياس لحد ما الإبرة تدخل المنطقة الحمرا.", en: "Hold the rev pad until the needle enters the red." },
      revving: { ar: "المحرك بيرف…", en: "Reving…" },
      ready: { ar: "جاهز", en: "Ready" },
      redline: { ar: "خط الحدود — انطلق!", en: "Redline — launch!" },
      armed: { ar: "الانطلاق مسلّح", en: "Launch armed" },
      reset: { ar: "أعد القياس", en: "Rev again" },
      telemetry: { ar: "قريات مباشرة", en: "Live telemetry" },
    },
    about: {
      eyebrow: { ar: "التتر الأخير", en: "The Final Roll" },
      title: { ar: "الأسماء ورا الحكاية.", en: "THE NAMES BEHIND THE STORY." },
      hint: { ar: "مرّر فوق التتر عشان يقف مكانه.", en: "Hover the roll to hold it still." },
      creditsLabel: { ar: "طاقم أوريليس", en: "The Aurelis crew" },
      signature: { ar: "من القاهرة للرياض لدبي — بشاشة واحدة.", en: "From Cairo to Riyadh to Dubai — on one screen." },
      credits: [
        { role: { ar: "الإخراج", en: "Direction" }, name: { ar: "أوريليس ستوديو", en: "Aurelis Studio" } },
        { role: { ar: "القصة", en: "Story" }, name: { ar: "قصة قبل المواصفات", en: "Story before specs" } },
        { role: { ar: "اللغة", en: "Language" }, name: { ar: "عربي وإنجليزي من الأساس", en: "Arabic & English from the core" } },
        { role: { ar: "الحركة", en: "Motion" }, name: { ar: "حركات خفيفة، بدون زحمة", en: "Light motion, no clutter" } },
        { role: { ar: "الكاميرا", en: "Camera" }, name: { ar: "تصوير Unsplash", en: "Photography via Unsplash" } },
        { role: { ar: "الموسيقى", en: "Score" }, name: { ar: "٨٥٠٠ لفة في الدقيقة", en: "8,500 rpm" } },
        { role: { ar: "الإضاءة", en: "Lighting" }, name: { ar: "كشافات أوريليس", en: "Aurelis headlamps" } },
        { role: { ar: "شكر خاص", en: "Special thanks" }, name: { ar: "ليك… وصلت للآخر", en: "To you — for making it here" } },
      ],
    },
    contact: {
      eyebrow: { ar: "القناة مفتوحة", en: "Channel Open" },
      title: { ar: "ابعت إشارة… إحنا على الموجة.", en: "SEND A SIGNAL. WE ARE LISTENING." },
      hint: { ar: "اختار عقدة على الرادار أو ابعت إشارة.", en: "Pick a node on the radar — or send a signal." },
      ping: { ar: "ابعت إشارة", en: "Send a signal" },
      sent: { ar: "تم بثّ الإشارة", en: "Signal broadcast" },
      signals: { ar: "إشارة", en: "signals" },
      channel: { ar: "القناة", en: "Channel" },
    },
    car: {
      eyebrow: { ar: "ضوء الكاشف", en: "Spotlight" },
      title: { ar: "حرّك الضوء… وشوفها تبان.", en: "MOVE THE LIGHT. REVEAL IT." },
      hint: { ar: "حرّك المؤشر فوق اللقطة — الضوء بيجي وراك.", en: "Move across the frame — the light follows." },
      tracking: { ar: "الكاشف بيتبعك", en: "Spotlight tracking" },
    },
  },

  footer: {
    tagline: { ar: "تجربة سيارات سينمائية — من التصميم للتشغيل.", en: "A cinematic automotive experience — from design to drive." },
    columns: [
      { title: { ar: "السيارات", en: "Machines" }, links: [
        { label: { ar: "استعرض الكل", en: "Explore all" }, href: "/explore" },
        { label: { ar: "كهربائي", en: "Electric" }, href: "/electric" },
        { label: { ar: "أداء", en: "Performance" }, href: "/performance" },
      ]},
      { title: { ar: "الشركة", en: "Company" }, links: [
        { label: { ar: "عنّا", en: "About" }, href: "/about" },
        { label: { ar: "تواصل", en: "Contact" }, href: "/contact" },
        { label: { ar: "الرئيسية", en: "Home" }, href: "/" },
      ]},
    ],
    rights: { ar: "© ٢٠٢٦ أوريليس. مشروع تصميم تجريبي.", en: "© 2026 Aurelis. A design demonstration project." },
    disclaimer: {
      ar: "كل السيارات المعروضة تجريبية للعرض فقط ومش معروضة للبيع. الصور من Unsplash والفيديو من Coverr.",
      en: "All vehicles shown are demonstration content and are not for sale. Photography via Unsplash, footage via Coverr.",
    },
    credit: { ar: "الصور: Unsplash · الفيديو: Coverr", en: "Images: Unsplash · Footage: Coverr" },
  },

  car: {
    back: { ar: "رجوع للمجموعة", en: "Back to collection" },
    specs: { ar: "المواصفات", en: "Specifications" },
    priceLabel: { ar: "السعر التقديري", en: "Indicative price" },
    demo: { ar: "نموذج تجريبي — غير معروض للبيع", en: "Demo listing — not for sale" },
    inquire: { ar: "استفسر عن الموديل", en: "Enquire about this model" },
    related: { ar: "موديلات قريبة", en: "Similar machines" },
    detail: { ar: "تفاصيل الموديل", en: "Model details" },
    demoBody: {
      ar: "كل بيان هنا توضيحي للعرض — مش مواصفات مصنّع رسمية ولا مخزون متاح.",
      en: "Every figure here is illustrative — not official specifications and not available inventory.",
    },
  },

  pages: {
    explore: {
      eyebrow: { ar: "كل الموديلات", en: "Every model" },
      title: { ar: "استعرض كل موديل.", en: "EXPLORE EVERY MODEL." },
      body: { ar: "كل التصنيفات في مكان واحد، مع فلاتر سريعة ونتائج بتتحرك بسلاسة.", en: "Every category in one place, with fast filters and results that move smoothly." },
    },
    electric: {
      eyebrow: { ar: "الفصل الكهربائي", en: "The Electric Chapter" },
      title: { ar: "هدوء. عزم. مدى.", en: "SILENCE. TORQUE. RANGE." },
      body: { ar: "موديلات كهربائية بتشارك نفس اللغة: استجابة فورية، مقصورة نظيفة، وشحن سريع.", en: "Electric machines that share one language: instant response, a clean cabin and rapid charging." },
      listTitle: { ar: "الموديلات الكهربائية", en: "Electric models" },
    },
    performance: {
      eyebrow: { ar: "فصل الأداء", en: "The Performance Chapter" },
      title: { ar: "الأداء في كل تفصيلة.", en: "PERFORMANCE, EVERYWHERE." },
      body: { ar: "من الكربون للتعليق — الجزء اللي بيخلّي القيادة إحساس.", en: "From carbon to calibration — the parts that turn driving into feeling." },
      listTitle: { ar: "موديلات الأداء", en: "Performance models" },
    },
    about: {
      eyebrow: { ar: "عن أوريليس", en: "About Aurelis" },
      title: { ar: "بنسوق مش عربيات. بنسوق إحساس القيادة.", en: "WE DON'T SELL CARS. WE FRAME THE DRIVE." },
      body: {
        ar: "أوريليس مشروع تصميم لتجربة رقمية سينمائية للسيارات: قصص، حركة، وتفاصيل مصنوعة بدقة — بالعربي والإنجليزي.",
        en: "Aurelis is a design project exploring a cinematic digital automotive experience: storytelling, motion and crafted detail in Arabic and English.",
      },
      points: [
        { title: { ar: "قصة قبل المواصفات", en: "Story before specs" }, body: { ar: "بنرتب المشاهد عشان تحس السيارة قبل ما تقرأ أرقامها.", en: "Scenes are sequenced so you feel the machine before you read its numbers." } },
        { title: { ar: "ثنائي اللغة من الأساس", en: "Bilingual at the core" }, body: { ar: "العربي لغة أولى مش ترجمة متأخرة — والاتجاه بينعكس في كل مكان.", en: "Arabic is a first-class language, not an afterthought — direction flows through every layout." } },
        { title: { ar: "أداء من غير زحمة", en: "Performance without clutter" }, body: { ar: "حركات transform فقط، تحميل كسول للصور، ودعم كامل لـ reduced motion.", en: "Transform-only motion, lazy media and full reduced-motion support." } },
      ],
    },
    contact: {
      eyebrow: { ar: "تواصل", en: "Contact" },
      title: { ar: "خلّينا نتكلم.", en: "LET'S TALK." },
      body: { ar: "عندك سؤال عن موديل أو تجربة قيادة؟ ابعتلنا وهنرد خلال يوم عمل.", en: "Question about a model or a test drive? Send a note and we will reply within one business day." },
      name: { ar: "الاسم", en: "Name" },
      email: { ar: "البريد الإلكتروني", en: "Email" },
      subject: { ar: "الموضوع", en: "Subject" },
      message: { ar: "الرسالة", en: "Message" },
      submit: { ar: "ابعت الرسالة", en: "Send message" },
      sending: { ar: "بيتبعت…", en: "Sending…" },
      sent: { ar: "تم فتح تطبيق البريد عندك بالرسالة جاهزة.", en: "Your mail app opened with the message ready to send." },
      errorRequired: { ar: "من فضلك املأ كل الحقول المطلوبة.", en: "Please fill in all required fields." },
      errorEmail: { ar: "من فضلك اكتب بريد إلكتروني صحيح.", en: "Please enter a valid email address." },
      mailTo: { ar: "ابعت بريد مباشر", en: "Email us directly" },
      studio: { ar: "الاستوديو", en: "Studio" },
      studioValue: { ar: "الرياض · دبي · عن بُعد", en: "Riyadh · Dubai · Remote" },
      hours: { ar: "مواعيد العمل", en: "Hours" },
      hoursValue: { ar: "الأحد – الخميس · ٩ ص – ٦ م", en: "Sun – Thu · 9am – 6pm" },
      demoNote: { ar: "النموذج بيفتح تطبيق البريد عندك — مفيش خادم مخفي ورا الكواليس.", en: "The form opens your mail client — there is no hidden backend behind it." },
    },
    notFound: {
      title: { ar: "الموديل ده مش موجود.", en: "This model is not here." },
      body: { ar: "يمكن الرابط اتغيّر. جرّب المجموعة كاملة.", en: "The link may have moved. Try the full collection." },
      cta: { ar: "رجوع للمجموعة", en: "Back to collection" },
      eyebrow: { ar: "إشارة ضائعة — ٤٠٤", en: "Signal lost — 404" },
      hint: {
        ar: "أمسك زر التشغيل لحد ما العجل يشتغل تاني.",
        en: "Hold the starter until the engine turns over again.",
      },
      hold: { ar: "أمسك عشان تولّع", en: "Hold to ignite" },
      cranking: { ar: "بيولّع…", en: "Cranking…" },
      live: { ar: "المحرك شغّال — رجعنا للطريق", en: "Engine running — back on the road" },
    },
  },
} as const;

export type Content = typeof C;
