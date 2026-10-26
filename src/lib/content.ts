export type BiStr = { ar: string; en: string };

export const C = {
  brand: { name: "EVAY", nameAr: "إيفاي" },

  nav: {
    home: { ar: "الرئيسية", en: "Home" },
    explore: { ar: "السيارات", en: "Cars" },
    about: { ar: "من نحن", en: "About" },
    contact: { ar: "اتصل بنا", en: "Contact" },
    cta: { ar: "احجز استشارة", en: "Book a consultation" },
    ctaBrowse: { ar: "تصفّح السيارات", en: "Browse cars" },
    menu: { ar: "القائمة", en: "Menu" },
    close: { ar: "إغلاق", en: "Close" },
    switchTo: { ar: "English", en: "العربية" },
    langLabel: { ar: "تغيير اللغة", en: "Change language" },
    search: { ar: "بحث", en: "Search" },
    skip: { ar: "تخطَّ إلى المحتوى", en: "Skip to content" },
  },

  hero: {
    eyebrow: { ar: "شريكك الموثوق في عالم السيارات", en: "Your trusted automotive partner" },
    title: { ar: "نختار لك السيارة التي تليق بك.", en: "THE RIGHT CAR, CHOSEN FOR YOU." },
    sub: {
      ar: "إيفاي شركة متخصصة في السيارات الفاخرة والرياضية والكهربائية، نرافقك من الاستشارة حتى التسليم بخبرة وشفافية.",
      en: "Evay specialises in luxury, performance and electric cars — guiding you from consultation to handover with expertise and transparency.",
    },
    primary: { ar: "استعرض السيارات", en: "Explore our cars" },
    secondary: { ar: "تعرّف علينا", en: "Who we are" },
    scroll: { ar: "اكتشف المزيد", en: "Scroll" },
    pause: { ar: "إيقاف الفيديو", en: "Pause video" },
    play: { ar: "تشغيل الفيديو", en: "Play video" },
  },

  intro: {
    eyebrow: { ar: "من نحن", en: "Who we are" },
    title: { ar: "خبرة تمتد لأكثر من عقد من الزمن.", en: "OVER A DECADE OF AUTOMOTIVE EXPERTISE." },
    body: {
      ar: "منذ عام ٢٠١٢ نساعد عملاءنا على امتلاك السيارة المناسبة فعلًا. ننتقي الموديلات بعناية، ونعرضها بشفافية كاملة، ونهتم بتجربتك حتى بعد التسليم.",
      en: "Since 2012 we have helped clients own the car that truly fits them. We curate with care, present with full transparency and look after you long after handover.",
    },
    cta: { ar: "اقرأ قصتنا", en: "Read our story" },
    stats: [
      { value: 12, suffix: "+", label: { ar: "عامًا من الخبرة", en: "Years of experience" } },
      { value: 850, suffix: "+", label: { ar: "عميل راضٍ", en: "Satisfied clients" } },
      { value: 15, suffix: "", label: { ar: "موديلًا مختارًا", en: "Curated models" } },
      { value: 3, suffix: "", label: { ar: "مدن نخدمها", en: "Cities served" } },
    ],
    note: { ar: "الأرقام تقريبية.", en: "Figures are approximate." },
  },

  marquee: {
    items: [
      { ar: "سيارات رياضية", en: "SPORTS CARS" },
      { ar: "سيارات كهربائية", en: "ELECTRIC" },
      { ar: "سيارات فاخرة", en: "LUXURY" },
      { ar: "دفع رباعي", en: "SUVS" },
      { ar: "سيارات هجينة", en: "HYBRIDS" },
      { ar: "أداء عالٍ", en: "PERFORMANCE" },
      { ar: "جراند توريزمو", en: "GRAN TURISMO" },
      { ar: "سيارات كلاسيكية", en: "CLASSICS" },
    ],
    note: { ar: "الفئات التي نتعامل معها", en: "The categories we work with" },
  },

  engineering: {
    eyebrow: { ar: "خدماتنا", en: "What we do" },
    title: { ar: "خدمة متكاملة من الخطوة الأولى.", en: "END-TO-END SERVICE, FROM DAY ONE." },
    body: {
      ar: "ثلاث ركائز نعمل بها مع كل عميل، لتختار وأنت مطمئن.",
      en: "Three pillars we apply with every client, so you can choose with confidence.",
    },
    tiles: [
      {
        title: { ar: "اختيار منتقى", en: "Curated sourcing" },
        body: { ar: "نفحص السوق ونرشّح لك الموديلات الأنسب لاحتياجك وميزانيتك، دون إرباك بكثرة الخيارات.", en: "We scan the market and shortlist the models that fit your needs and budget — without the noise." },
        image: "/media/images/car-huracan-side.jpg",
        alt: { ar: "سيارة رياضية برتقالية من الجانب", en: "Orange sports car in profile" },
        tag: { ar: "أكثر من ٣٠٠ نقطة فحص", en: "300+ inspection points" },
      },
      {
        title: { ar: "شفافية كاملة", en: "Full transparency" },
        body: { ar: "تقارير واضحة، وأسعار معلنة، وسجل كامل للسيارة قبل أن تتخذ أي قرار.", en: "Clear reports, upfront pricing and a complete history before you make any decision." },
        image: "/media/images/detail-texture.jpg",
        alt: { ar: "نسيج جلدي داكن عن قرب", en: "Dark leather texture up close" },
        tag: { ar: "تقرير مكتوب لكل سيارة", en: "Written report per car" },
      },
      {
        title: { ar: "دعم ما بعد التسليم", en: "After-sales care" },
        body: { ar: "صيانة وضمان ومتابعة دورية، فعلاقتنا بك لا تنتهي عند لحظة التسليم.", en: "Maintenance, warranty and regular follow-ups — our relationship doesn't end at handover." },
        image: "/media/images/lab-tech.jpg",
        alt: { ar: "أجهزة فحص وصيانة على طاولة العمل", en: "Inspection gear on a workshop bench" },
        tag: { ar: "ضمان حتى ٣ سنوات", en: "Up to 3-year warranty" },
      },
    ],
  },

  process: {
    eyebrow: { ar: "كيف نعمل", en: "How we work" },
    title: { ar: "أربع خطوات نحو سيارتك.", en: "FOUR STEPS TO YOUR CAR." },
    steps: [
      { title: { ar: "الاستشارة", en: "Consultation" }, body: { ar: "نصغي لاحتياجك وميزانيتك ونمط حياتك.", en: "We listen to your needs, budget and lifestyle." } },
      { title: { ar: "الترشيح", en: "Shortlist" }, body: { ar: "نعرض عليك أفضل الخيارات مع مقارنة صريحة.", en: "We present the best options with an honest comparison." } },
      { title: { ar: "الفحص والتجربة", en: "Inspect & drive" }, body: { ar: "فحص شامل وتجربة قيادة قبل القرار.", en: "A full inspection and test drive before you decide." } },
      { title: { ar: "التسليم والمتابعة", en: "Handover & care" }, body: { ar: "نسلّمك سيارتك ونبقى إلى جانبك.", en: "We hand over your car and stay by your side." } },
    ],
  },

  testimonials: {
    eyebrow: { ar: "آراء العملاء", en: "Client voices" },
    title: { ar: "ثقة بُنيت بالأفعال.", en: "TRUST BUILT BY ACTION." },
    items: [
      { quote: { ar: "كانوا صريحين معي في كل خطوة، ونصحوني بسيارة وفّرت عليّ الكثير.", en: "They were honest with me at every step and recommended a car that saved me a great deal." }, name: { ar: "خالد المنصور", en: "Khaled Al-Mansour" }, role: { ar: "رجل أعمال", en: "Business owner" } },
      { quote: { ar: "تجربة شراء مريحة وشفافة، والمتابعة بعد التسليم تفوق التوقعات.", en: "A smooth, transparent purchase — and the follow-up after delivery exceeded my expectations." }, name: { ar: "سارة العلي", en: "Sara Al-Ali" }, role: { ar: "مهندسة", en: "Engineer" } },
      { quote: { ar: "اخترت سيارتي الكهربائية الأولى معهم، وكان الفريق على قدر الثقة.", en: "I picked my first electric car with them, and the team lived up to the trust." }, name: { ar: "عمر حداد", en: "Omar Haddad" }, role: { ar: "مصمّم", en: "Designer" } },
    ],
    note: { ar: "آراء توضيحية.", en: "Illustrative testimonials." },
  },

  wheel: {
    eyebrow: { ar: "الحِرفية", en: "Craftsmanship" },
    title: { ar: "هندسة تُرى وتُلمس.", en: "ENGINEERING YOU CAN SEE AND FEEL." },
    hint: { ar: "مرّر لتفكيك العجلة", en: "Scroll to take it apart" },
    steps: [
      { title: { ar: "قطعة واحدة متكاملة", en: "One complete piece" }, body: { ar: "كل سيارة نقدّمها تُفحص من الإطار إلى أصغر برغي، لأن التفاصيل الصغيرة تصنع الفرق الكبير.", en: "Every car we offer is inspected from tyre to the smallest bolt — because small details make the big difference." } },
      { title: { ar: "نفكّكها لنطمئن", en: "We take it apart to be sure" }, body: { ar: "نتحقق من الفرامل والجنوط والهيكل قطعةً قطعة، ونوثّق كل ملاحظة في تقرير مكتوب.", en: "We check brakes, wheels and structure piece by piece, and record every finding in a written report." } },
      { title: { ar: "ثم نعيدها كما يجب", en: "Then put it back right" }, body: { ar: "نسلّمك سيارة جاهزة للطريق بضمان معلن وخدمة متابعة بعد التسليم.", en: "You receive a road-ready car with a clear warranty and follow-up care after handover." } },
    ],
  },

  gallery: {
    eyebrow: { ar: "معرض السيارات", en: "The gallery" },
    title: { ar: "لقطات من مجموعتنا.", en: "FRAMES FROM THE COLLECTION." },
    drag: { ar: "اسحب لاستكشاف المزيد", en: "Swipe to explore" },
    view: { ar: "عرض السيارة", en: "View car" },
  },

  faq: {
    eyebrow: { ar: "الأسئلة الشائعة", en: "FAQ" },
    title: { ar: "إجابات سريعة.", en: "QUICK ANSWERS." },
    items: [
      { q: { ar: "هل يمكنني فحص السيارة قبل الشراء؟", en: "Can I inspect a car before buying?" }, a: { ar: "بالتأكيد. نرحّب بالفحص الفني المستقل وتجربة القيادة، ونوفّر لك تقريرًا مكتوبًا لكل سيارة.", en: "Absolutely. We welcome independent inspections and test drives, and provide a written report for every car." } },
      { q: { ar: "هل تقدّمون ضمانًا؟", en: "Do you offer a warranty?" }, a: { ar: "نعم، ضمان يصل إلى ثلاث سنوات حسب الفئة، تُوضَّح شروطه كاملة قبل التعاقد.", en: "Yes — up to three years depending on the category, with terms explained in full before you sign." } },
      { q: { ar: "هل تساعدون في التمويل؟", en: "Can you help with financing?" }, a: { ar: "نتعاون مع جهات تمويل متعددة لنساعدك على الوصول إلى خطة تناسب ميزانيتك.", en: "We work with several lenders to help you find a plan that fits your budget." } },
      { q: { ar: "هل تتوفر سيارات كهربائية؟", en: "Do you have electric cars?" }, a: { ar: "نعم، لدينا مجموعة متنامية من السيارات الكهربائية والهجينة مع استشارة حول الشحن.", en: "Yes — a growing selection of electric and hybrid cars, with charging advice included." } },
      { q: { ar: "كيف أبدأ؟", en: "How do I get started?" }, a: { ar: "تواصل معنا عبر النموذج أو البريد، وسيتواصل معك أحد مستشارينا خلال يوم عمل.", en: "Reach out through the form or by email and one of our advisors will contact you within a business day." } },
    ],
  },

  contactInfo: {
    email: "hello@evay.example",
    phone: "+000 00 000 0000",
    address: { ar: "الرياض · دبي", en: "Riyadh · Dubai" },
    socials: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "X", href: "https://x.com" },
    ],
  },

  showcase: {
    eyebrow: { ar: "الأكثر طلبًا", en: "Featured cars" },
    title: { ar: "سيارات نفخر بها.", en: "CARS WE'RE PROUD OF." },
    body: {
      ar: "مختارات من مجموعتنا. اضغط على أي سيارة لتتعرف على مواصفاتها.",
      en: "A selection from our collection — tap any car to see its specifications.",
    },
    view: { ar: "تفاصيل السيارة", en: "View details" },
    imageOf: { ar: "صورة", en: "Image" },
    specsLabel: { ar: "المواصفات", en: "Specifications" },
    demo: { ar: "مختارات", en: "Selection" },
  },

  collection: {
    eyebrow: { ar: "المجموعة", en: "The collection" },
    title: { ar: "اختر سيارتك.", en: "CHOOSE YOUR CAR." },
    body: {
      ar: "سيارات مرتبة حسب الفئة. الأسعار والمواصفات إرشادية وقد تختلف عند التعاقد.",
      en: "Cars arranged by category. Prices and specifications are indicative and may vary at contract.",
    },
    filters: [
      { key: "all", ar: "الكل", en: "All cars" },
      { key: "sports", ar: "رياضية", en: "Sports" },
      { key: "luxury", ar: "فاخرة", en: "Luxury" },
      { key: "suv", ar: "دفع رباعي", en: "SUVs" },
      { key: "electric", ar: "كهربائية", en: "Electric" },
    ],
    count: { ar: "سيارة", en: "cars" },
    view: { ar: "عرض التفاصيل", en: "View details" },
    empty: { ar: "لا توجد سيارات في هذه الفئة.", en: "No cars in this category." },
    note: {
      ar: "الصور والبيانات لأغراض العرض، وقد تختلف عن السيارات المتاحة فعليًا.",
      en: "Photos and data are for presentation and may differ from the cars currently available.",
    },
    year: { ar: "الموديل", en: "Year" },
    price: { ar: "السعر", en: "Price" },
  },

  finalCta: {
    eyebrow: { ar: "الخطوة التالية", en: "The next step" },
    title: { ar: "لنجد سيارتك معًا.", en: "LET'S FIND YOUR CAR TOGETHER." },
    body: {
      ar: "تصفّح مجموعتنا، أو تواصل معنا وسيساعدك فريقنا على اختيار السيارة المناسبة.",
      en: "Browse the collection, or talk to us and our team will help you choose the right car.",
    },
    primary: { ar: "تصفّح السيارات", en: "Browse the cars" },
    secondary: { ar: "تواصل معنا", en: "Talk to us" },
  },

  footer: {
    tagline: { ar: "شريكك في اختيار السيارة: خبرة، وشفافية، واهتمام بالتفاصيل.", en: "Your partner in choosing a car: expertise, transparency and care for the details." },
    columns: [
      { title: { ar: "السيارات", en: "Cars" }, links: [
        { label: { ar: "جميع السيارات", en: "All cars" }, href: "/explore" },
      ]},
      { title: { ar: "الشركة", en: "Company" }, links: [
        { label: { ar: "الرئيسية", en: "Home" }, href: "/" },
        { label: { ar: "من نحن", en: "About" }, href: "/about" },
        { label: { ar: "اتصل بنا", en: "Contact" }, href: "/contact" },
      ]},
    ],
    rights: { ar: "© ٢٠٢٦ إيفاي. جميع الحقوق محفوظة.", en: "© 2026 Evay. All rights reserved." },
    disclaimer: {
      ar: "الصور والأسعار والمواصفات لأغراض العرض فقط، وقد تختلف عن السيارات المتاحة.",
      en: "Photos, prices and specifications are for presentation only and may differ from the cars available.",
    },
    credit: { ar: "الصور: Unsplash · الفيديو: Coverr", en: "Images: Unsplash · Footage: Coverr" },
  },

  car: {
    back: { ar: "العودة إلى السيارات", en: "Back to cars" },
    specs: { ar: "المواصفات", en: "Specifications" },
    priceLabel: { ar: "السعر التقريبي", en: "Indicative price" },
    demo: { ar: "السعر إرشادي", en: "Indicative listing" },
    inquire: { ar: "اسأل عن هذه السيارة", en: "Enquire about this car" },
    related: { ar: "سيارات مشابهة", en: "Similar cars" },
    detail: { ar: "تفاصيل السيارة", en: "Car details" },
    demoBody: {
      ar: "الأسعار والمواصفات إرشادية وقد تختلف عند التعاقد. تواصل معنا لمعرفة التوافر.",
      en: "Prices and specifications are indicative and may vary at contract. Contact us for availability.",
    },
  },

  pages: {
    explore: {
      eyebrow: { ar: "مجموعتنا", en: "Our collection" },
      title: { ar: "اكتشف سيارتك التالية.", en: "DISCOVER YOUR NEXT CAR." },
      body: { ar: "جميع الفئات في مكان واحد، مع فلاتر سريعة تساعدك على الوصول لما تبحث عنه.", en: "Every category in one place, with quick filters to help you find what you need." },
    },
    about: {
      eyebrow: { ar: "عن إيفاي", en: "About Evay" },
      title: { ar: "شغفنا بالسيارات يظهر في كل تفصيلة.", en: "OUR PASSION FOR CARS SHOWS IN EVERY DETAIL." },
      body: {
        ar: "منذ عام ٢٠١٢ نساعد عملاءنا على اختيار سيارة تناسبهم حقًا، بفريق متخصص، وشفافية في كل خطوة، ومتابعة بعد التسليم.",
        en: "Since 2012 we have helped clients choose a car that truly fits them — with a specialist team, transparency at every step and care after handover.",
      },
      points: [
        { title: { ar: "الخبرة أولًا", en: "Expertise first" }, body: { ar: "فريق متخصص يفحص ويقارن وينصح بصراحة، حتى لو كانت النصيحة أن تنتظر.", en: "A specialist team that inspects, compares and advises honestly — even when the advice is to wait." } },
        { title: { ar: "شفافية في كل خطوة", en: "Transparent at every step" }, body: { ar: "أسعار معلنة وتقارير مكتوبة، ولا مفاجآت في النهاية.", en: "Upfront pricing, written reports and no surprises at the end." } },
        { title: { ar: "علاقة طويلة الأمد", en: "A long-term relationship" }, body: { ar: "الصيانة والضمان والمتابعة جزء أصيل من خدمتنا، وليست إضافة.", en: "Maintenance, warranty and follow-up are part of the service, not an add-on." } },
      ],
      journey: { ar: "رحلتنا", en: "Our journey" },
      journeyTitle: { ar: "اثنا عشر عامًا من الثقة.", en: "TWELVE YEARS OF TRUST." },
      believe: { ar: "ما نؤمن به", en: "What we believe" },
    },
    contact: {
      eyebrow: { ar: "اتصل بنا", en: "Contact" },
      title: { ar: "يسعدنا سماعك.", en: "WE'D LOVE TO HEAR FROM YOU." },
      body: { ar: "لديك سؤال عن سيارة أو تريد حجز استشارة؟ راسلنا وسنرد عليك خلال يوم عمل.", en: "Have a question about a car or want to book a consultation? Send a note and we will reply within one business day." },
      name: { ar: "الاسم", en: "Name" },
      email: { ar: "البريد الإلكتروني", en: "Email" },
      subject: { ar: "الموضوع", en: "Subject" },
      message: { ar: "الرسالة", en: "Message" },
      submit: { ar: "إرسال الرسالة", en: "Send message" },
      sending: { ar: "جارٍ الإرسال…", en: "Sending…" },
      sent: { ar: "تم فتح تطبيق البريد لديك والرسالة جاهزة للإرسال.", en: "Your mail app opened with the message ready to send." },
      errorRequired: { ar: "يرجى تعبئة جميع الحقول المطلوبة.", en: "Please fill in all required fields." },
      errorEmail: { ar: "يرجى إدخال بريد إلكتروني صحيح.", en: "Please enter a valid email address." },
      mailTo: { ar: "راسلنا مباشرة", en: "Email us directly" },
      studio: { ar: "المقر", en: "Showroom" },
      studioValue: { ar: "الرياض · دبي · عن بُعد", en: "Riyadh · Dubai · Remote" },
      hours: { ar: "ساعات العمل", en: "Hours" },
      hoursValue: { ar: "الأحد – الخميس · ٩ ص – ٦ م", en: "Sun – Thu · 9am – 6pm" },
      demoNote: { ar: "يفتح النموذج تطبيق البريد لديك لإرسال الرسالة.", en: "The form opens your mail app to send the message." },
    },
    notFound: {
      title: { ar: "هذه السيارة غير موجودة.", en: "This car isn't here." },
      body: { ar: "ربما تغيّر الرابط. جرّب تصفّح المجموعة كاملة.", en: "The link may have moved. Try the full collection." },
      cta: { ar: "العودة إلى السيارات", en: "Back to cars" },
      eyebrow: { ar: "الصفحة غير موجودة — ٤٠٤", en: "Page not found — 404" },
      hint: {
        ar: "اضغط مطولًا على زر التشغيل حتى يعود المحرك للعمل.",
        en: "Hold the starter until the engine turns over again.",
      },
      hold: { ar: "اضغط مطولًا للتشغيل", en: "Hold to ignite" },
      cranking: { ar: "جارٍ التشغيل…", en: "Cranking…" },
      live: { ar: "المحرك يعمل — عدنا إلى الطريق", en: "Engine running — back on the road" },
    },
  },
} as const;

export type Content = typeof C;
