export type BiStr = { ar: string; en: string };

export const C = {
  brand: { name: "AURELIS", nameAr: "أوريليس" },

  nav: {
    home: { ar: "الرئيسية", en: "Home" },
    explore: { ar: "موديلاتنا", en: "Our Models" },
    about: { ar: "عنّا", en: "About" },
    contact: { ar: "تواصل", en: "Contact" },
    cta: { ar: "تواصل معنا", en: "Get in touch" },
    ctaBrowse: { ar: "شوف موديلاتنا", en: "See our models" },
    menu: { ar: "القائمة", en: "Menu" },
    close: { ar: "إغلاق", en: "Close" },
    switchTo: { ar: "English", en: "العربية" },
    langLabel: { ar: "تغيير اللغة", en: "Change language" },
    search: { ar: "بحث", en: "Search" },
    skip: { ar: "تخطَّ إلى المحتوى", en: "Skip to content" },
  },

  hero: {
    eyebrow: { ar: "بروفايل الشركة — منذ ٢٠١٢", en: "Company profile — since 2012" },
    title: { ar: "نصمّم تجربة السيارات اللي تستاهلها.", en: "WE CRAFT THE WAY YOU MEET YOUR CAR." },
    sub: {
      ar: "أوريليس شركة متخصصة في عرض وتسويق السيارات الفاخرة والكهربائية — بخبرة، وشفافية، واهتمام بكل تفصيلة.",
      en: "Aurelis is a premium automotive partner for luxury, performance and electric vehicles — built on expertise, transparency and care for every detail.",
    },
    primary: { ar: "شوف موديلاتنا", en: "See our models" },
    secondary: { ar: "تعرّف علينا", en: "Who we are" },
    scroll: { ar: "انزل", en: "Scroll" },
    pause: { ar: "إيقاف الفيديو", en: "Pause video" },
    play: { ar: "تشغيل الفيديو", en: "Play video" },
  },

  intro: {
    eyebrow: { ar: "من نحن", en: "Who we are" },
    title: { ar: "شريكك في عالم السيارات.", en: "YOUR PARTNER IN THE AUTOMOTIVE WORLD." },
    body: {
      ar: "من الاستشارة لحد التسليم، فريق أوريليس بيمشي معاك خطوة بخطوة. بنختار الموديلات بعناية، ونقدّمها بشفافية كاملة، ونهتم بتجربتك بعد الشراء كمان.",
      en: "From first consultation to final handover, the Aurelis team walks every step with you. We curate carefully, present with full transparency and care about the experience long after the sale.",
    },
    cta: { ar: "اقرأ قصتنا", en: "Read our story" },
    stats: [
      { value: 12, suffix: "+", label: { ar: "سنة خبرة", en: "Years of experience" } },
      { value: 850, suffix: "+", label: { ar: "عميل سعيد", en: "Happy clients" } },
      { value: 14, suffix: "", label: { ar: "موديل مختار", en: "Curated models" } },
      { value: 3, suffix: "", label: { ar: "مدن نخدمها", en: "Cities served" } },
    ],
    note: { ar: "أرقام توضيحية لأغراض العرض.", en: "Illustrative figures for presentation." },
  },







  marquee: {
    items: [
      { ar: "سوبر كار", en: "SUPERCARS" },
      { ar: "كهربائي", en: "ELECTRIC" },
      { ar: "فخامة", en: "LUXURY" },
      { ar: "دفع رباعي", en: "SUVS" },
      { ar: "كونسبت", en: "CONCEPTS" },
      { ar: "أداء عالي", en: "PERFORMANCE" },
      { ar: "جراند توريزمو", en: "GRAN TOURING" },
      { ar: "سباقات", en: "MOTORSPORT" },
    ],
    note: { ar: "الفئات اللي بنتعامل معاها", en: "The categories we work with" },
  },

  engineering: {
    eyebrow: { ar: "خدماتنا", en: "What we do" },
    title: { ar: "خدمة متكاملة، من أول خطوة.", en: "END-TO-END SERVICE, FROM DAY ONE." },
    body: {
      ar: "ثلاث ركائز بنشتغل عليها مع كل عميل — عشان تختار وإنت مطمّن.",
      en: "Three pillars we apply with every client — so you can choose with confidence.",
    },
    tiles: [
      {
        title: { ar: "اختيار منتقى", en: "Curated sourcing" },
        body: { ar: "بنفحص السوق ونرشّح لك الموديلات الأنسب لاحتياجك وميزانيتك، من غير زحمة خيارات.", en: "We scan the market and shortlist the models that fit your needs and budget — without the noise." },
        image: "/media/images/car-huracan-side.jpg",
        alt: { ar: "سيارة رياضية برتقالية من الجانب", en: "Orange sports car in profile" },
        tag: { ar: "٣٠٠+ نقطة فحص", en: "300+ inspection points" },
      },
      {
        title: { ar: "شفافية كاملة", en: "Full transparency" },
        body: { ar: "تقارير واضحة وأسعار معلنة وتاريخ كامل للسيارة قبل ما تاخد أي قرار.", en: "Clear reports, upfront pricing and a complete history before you make any decision." },
        image: "/media/images/detail-texture.jpg",
        alt: { ar: "نسيج مادة داكنة عن قرب", en: "Dark technical material texture" },
        tag: { ar: "تقرير مكتوب لكل سيارة", en: "Written report per car" },
      },
      {
        title: { ar: "دعم بعد التسليم", en: "After-sales care" },
        body: { ar: "صيانة وضمان ومتابعة دورية، لأن علاقتنا بيك مبتخلصش لحظة التسليم.", en: "Maintenance, warranty and regular follow-ups — our relationship doesn't end at handover." },
        image: "/media/images/lab-tech.jpg",
        alt: { ar: "معدات فحص وصيانة على طاولة العمل", en: "Inspection gear on a workshop bench" },
        tag: { ar: "ضمان حتى ٣ سنوات", en: "Up to 3-year warranty" },
      },
    ],
  },

  showcase: {
    eyebrow: { ar: "الأكثر طلبًا", en: "Featured models" },
    title: { ar: "موديلات بنفتخر بيها.", en: "MODELS WE'RE PROUD OF." },
    body: {
      ar: "اختيارات من مجموعتنا — اضغط على أي موديل وشوف مواصفاته.",
      en: "A selection from our collection — tap any model to see its specifications.",
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


  footer: {
    tagline: { ar: "شريكك في اختيار السيارة — خبرة وشفافية واهتمام بالتفاصيل.", en: "Your partner in choosing a car — expertise, transparency and care for the details." },
    columns: [
      { title: { ar: "موديلاتنا", en: "Models" }, links: [
        { label: { ar: "استعرض الكل", en: "Explore all" }, href: "/explore" },
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
    about: {
      eyebrow: { ar: "عن أوريليس", en: "About Aurelis" },
      title: { ar: "شغفنا بالسيارات بيبان في كل تفصيلة.", en: "OUR PASSION FOR CARS SHOWS IN EVERY DETAIL." },
      body: {
        ar: "منذ ٢٠١٢ بنساعد عملاءنا يختاروا سيارة تناسبهم فعلاً — بخبرة فريق متخصص، وشفافية في كل خطوة، ومتابعة بعد التسليم.",
        en: "Since 2012 we have helped clients choose a car that truly fits them — with a specialist team, transparency at every step and care after handover.",
      },
      points: [
        { title: { ar: "الخبرة أولاً", en: "Expertise first" }, body: { ar: "فريق متخصص بيفحص وبيقارن وبينصحك بصراحة، حتى لو النصيحة إنك تستنى.", en: "A specialist team that inspects, compares and advises honestly — even when the advice is to wait." } },
        { title: { ar: "شفافية في كل خطوة", en: "Transparent at every step" }, body: { ar: "أسعار معلنة وتقارير مكتوبة وبدون مفاجآت في الآخر.", en: "Upfront pricing, written reports and no surprises at the end." } },
        { title: { ar: "علاقة طويلة المدى", en: "A long-term relationship" }, body: { ar: "الصيانة والضمان والمتابعة جزء أساسي من الخدمة، مش إضافة.", en: "Maintenance, warranty and follow-up are part of the service, not an add-on." } },
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
