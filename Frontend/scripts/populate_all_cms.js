const { createClient } = require('@elmapicms/js-sdk');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const client = createClient({
  baseUrl: 'https://elmapicms.local/api',
  projectId: 'df1aacd0-af59-4089-a00e-072d1236e662',
  apiKey: 'IxUc0I4JY4SeCLtz4M1nDimPJNI49eqIEy5FPFJQe4d46129',
});

// Zones data by slug key
const zoneContent = {
  karmana: {
    uz: {
      desc: "Karmana tumani kichik sanoat zonasi viloyatning markaziy transport tugunida joylashgan bo'lib, xalqaro avtomobil va temir yo'l magistrallari bilan bevosita bog'langan. Hududda qurilish materiallari, to'qimachilik, metallni qayta ishlash hamda oziq-ovqat mahsulotlari ishlab chiqarishga ixtisoslashgan quvvatlar muvaffaqiyatli faoliyat yuritmoqda. Sanoat zonasi to'liq muhandislik-kommunikatsiya tarmoqlari bilan ta'minlangan.",
      lotDesc: "1-lot: Karmana tumanidagi kichik sanoat zonasida 1.2 gektar yer maydoni. Ishlab chiqarish binosi va korxona tashkil etish uchun mo'ljallangan. Barcha muhandislik tarmoqlari (gaz, suv, elektr, yo'l) ulanish nuqtalariga ega.\n\n2-lot: Karmana tumanidagi kichik sanoat zonasida 0.8 gektar bo'sh yer maydoni. Omborxona, logistika markazi yoki yordamchi ishlab chiqarish korxonasi qurish uchun qulay infratuzilmaga ega.",
      infra: ["Tabiiy gaz", "Ichimlik suvi", "Elektr energiyasi", "Asfalt qoplamali yo‘l"],
      lots: ["https://e-auksion.uz/lot/784101", "https://e-auksion.uz/lot/784102"],
    },
    ru: {
      desc: "Малая промышленная зона Карманинского района расположена в центральном транспортном узле Навоийской области с прямым доступом к международным автомобильным и железнодорожным магистралям. На территории успешно развиваются производство строительных материалов, текстильная промышленность и переработка металлов. Зона полностью оснащена необходимой инженерной инфраструктурой.",
      lotDesc: "1-й лот: Земельный участок площадью 1,2 га в малой промышленной зоне Карманинского района. Предназначен для строительства производственного комплекса. Имеются все точки подключения к инженерным коммуникациям (газ, вода, электричество, дорога).\n\n2-й лот: Свободный земельный участок площадью 0,8 га в малой промышленной зоне Карманинского района. Имеет удобную инфраструктуру для строительства склада, логистического комплекса или вспомогательного производства.",
      infra: ["Природный газ", "Питьевая вода", "Электроэнергия", "Асфальтированная дорога"],
      lots: ["https://e-auksion.uz/lot/784101", "https://e-auksion.uz/lot/784102"],
    },
    en: {
      desc: "Karmana District Small Industrial Zone is strategically located at the central logistics hub of Navoiy Region, with direct connections to international highways and railways. The zone hosts successful manufacturing enterprises specializing in building materials, textiles, and food processing, supported by modern utilities.",
      lotDesc: "Lot #1: Land plot of 1.2 hectares in the Karmana district small industrial zone. Designated for constructing a manufacturing facility. Equipped with full utility connections (natural gas, water supply, electricity, paved road).\n\nLot #2: Vacant land plot of 0.8 hectares in the Karmana district small industrial zone. Features prime infrastructure for warehouses, logistics hub, or auxiliary industrial production.",
      infra: ["Natural Gas", "Drinking Water", "Electricity", "Paved Road"],
      lots: ["https://e-auksion.uz/lot/784101", "https://e-auksion.uz/lot/784102"],
    },
  },
  navoiy: {
    uz: {
      desc: "Navoiy shahri yoshlar sanoat va tadbirkorlik zonasi yosh tadbirkorlar va innovatsion startap loyihalarni har tomonlama qo'llab-quvvatlash uchun maxsus barpo etilgan. Bu yerda elektrotexnika, IT va zamonaviy xizmat ko'rsatish, farmatsevtika va yengil sanoat tarmoqlari jadal rivojlanmoqda.",
      lotDesc: "Navoiy shahridagi yoshlar sanoat zonasida kichik va o'rta biznes loyihalarini joylashtirish uchun qulay yer maydonlari «E-Auksion» orqali ochiq savdolarga chiqarilgan.",
      infra: ["Tabiiy gaz", "Ichimlik suvi", "Elektr energiyasi", "Asfalt qoplamali yo‘l"],
      lots: ["https://e-auksion.uz/lot/784103"],
    },
    ru: {
      desc: "Молодёжная промышленно-предпринимательская зона города Навои создана для всесторонней поддержки молодых предпринимателей и инновационных проектов. Здесь развиваются электротехника, лёгкая промышленность, фармацевтика и современные сервисные технологии.",
      lotDesc: "В молодёжной промышленной зоне города Навои земельные участки для малого и среднего бизнеса выставляются на открытые торги через платформу «E-Auksion».",
      infra: ["Природный газ", "Питьевая вода", "Электроэнергия", "Асфальтированная дорога"],
      lots: ["https://e-auksion.uz/lot/784103"],
    },
    en: {
      desc: "Navoiy City Youth Industrial and Entrepreneurship Zone is specifically established to foster youth entrepreneurship and innovative manufacturing projects in electronics, pharmaceuticals, and light industry with full utility support.",
      lotDesc: "Industrial land plots for youth-led manufacturing and innovative ventures are auctioned transparently through the official 'E-Auksion' portal.",
      infra: ["Natural Gas", "Drinking Water", "Electricity", "Paved Road"],
      lots: ["https://e-auksion.uz/lot/784103"],
    },
  },
  zarafshon: {
    uz: {
      desc: "Zarafshon shahri sanoat zonasi tog'-kon va og'ir sanoat korxonalariga xizmat ko'rsatuvchi butlovchi qismlar, rezina-texnika mahsulotlari hamda metall konstruksiyalar ishlab chiqarishga yo'naltirilgan. Hudud barqaror elektr va suv ta'minotiga ega.",
      lotDesc: "Zarafshon sanoat zonasida sanoat va ishlab chiqarish quvvatlarini tashkil qilish uchun yer maydonlari «E-Auksion» platformasida auksion savdolariga chiqarilgan.",
      infra: ["Tabiiy gaz", "Ichimlik suvi", "Elektr energiyasi", "Asfalt qoplamali yo‘l"],
      lots: ["https://e-auksion.uz/lot/784104"],
    },
    ru: {
      desc: "Промышленная зона города Зарафшан ориентирована на выпуск комплектующих изделий для горнодобывающей промышленности, резинотехнических изделий и металлоконструкций, обеспечивая стабильное развитие региона.",
      lotDesc: "Земельные участки для организации производственных мощностей в промзоне г. Зарафшан доступны через электронные торги «E-Auksion».",
      infra: ["Природный газ", "Питьевая вода", "Электроэнергия", "Асфальтированная дорога"],
      lots: ["https://e-auksion.uz/lot/784104"],
    },
    en: {
      desc: "Zarafshon City Industrial Zone is dedicated to manufacturing equipment, rubber products, and metal structures catering to the mining and processing industries of the region.",
      lotDesc: "Land parcels designated for heavy and light manufacturing in Zarafshon City are open for bidding on the official 'E-Auksion' platform.",
      infra: ["Natural Gas", "Drinking Water", "Electricity", "Paved Road"],
      lots: ["https://e-auksion.uz/lot/784104"],
    },
  },
  qiziltepa: {
    uz: {
      desc: "Qiziltepa tumani kichik sanoat zonasi agrosanoat, meva-sabzavotni chuqur qayta ishlash, qadoqlash hamda to'qimachilik klasterlarini rivojlantirish uchun qulay sharoitlarga ega. Logistika va transport yo'llari mavjud.",
      lotDesc: "1-lot: Qiziltepa kichik sanoat zonasida 1.4 gektar yer maydoni. To'qimachilik, qishloq xo'jaligi mahsulotlarini qayta ishlash korxonalari qurish uchun mo'ljallangan. Barcha kommunikatsiyalar mavjud.\n\n2-lot: Qiziltepa kichik sanoat zonasida 1.1 gektar yer maydoni. Qurilish materiallari ishlab chiqarish va logistika omborlari uchun ajratilgan.",
      infra: ["Tabiiy gaz", "Ichimlik suvi", "Elektr energiyasi", "Asfalt qoplamali yo‘l"],
      lots: ["https://e-auksion.uz/lot/784105", "https://e-auksion.uz/lot/784106"],
    },
    ru: {
      desc: "Малая промышленная зона Кызылтепинского района ориентирована на агропереработку, производство продуктов питания, текстиль и современную упаковку с высоким экспортным потенциалом.",
      lotDesc: "1-й лот: Земельный участок площадью 1,4 га в малой промзоне Кызылтепинского района. Предназначен для предприятий текстильной и агроперерабатывающей промышленности со всеми сетями.\n\n2-й лот: Земельный участок площадью 1,1 га в малой промзоне Кызылтепинского района. Выделен под производство строительных материалов и логистические склады.",
      infra: ["Природный газ", "Питьевая вода", "Электроэнергия", "Асфальтированная дорога"],
      lots: ["https://e-auksion.uz/lot/784105", "https://e-auksion.uz/lot/784106"],
    },
    en: {
      desc: "Qiziltepa District Small Industrial Zone focuses on agro-processing, cold storage, food packaging, and textile clusters with complete modern infrastructure.",
      lotDesc: "Lot #1: Land plot of 1.4 hectares in Qiziltepa Small Industrial Zone. Tailored for textile manufacturing and agro-processing facilities with complete utility hookups.\n\nLot #2: Land plot of 1.1 hectares in Qiziltepa Small Industrial Zone. Designated for construction materials production and logistics warehousing.",
      infra: ["Natural Gas", "Drinking Water", "Electricity", "Paved Road"],
      lots: ["https://e-auksion.uz/lot/784105", "https://e-auksion.uz/lot/784106"],
    },
  },
  gozgon: {
    uz: {
      desc: "G'ozg'on shahri toshni qayta ishlash maxsus sanoat zonasi dunyoga mashhur G'ozg'on marmari va graniti konlari negizida barpo etilgan bo'lib, tabiiy toshni qazib olishdan tortib to yuqori qo'shilgan qiymatli bezak materiallari ishlab chiqarishgacha bo'lgan to'liq zanjirni qamrab oladi.",
      lotDesc: "1-lot: G'ozg'on shahrida marmar va granit toshlarini chuqur qayta ishlash majmuasi uchun 2.5 gektar yer maydoni. Yuqori bosimli suv va sanoat elektr tarmog'i bilan ta'minlangan.\n\n2-lot: Tosh mahsulotlarini saralash, qadoqlash va eksport logistika bazasi qurish uchun 1.8 gektar yer maydoni.",
      infra: ["Tabiiy gaz", "Ichimlik suvi", "Elektr energiyasi", "Asfalt qoplamali yo‘l"],
      lots: ["https://e-auksion.uz/lot/784160", "https://e-auksion.uz/lot/784161"],
    },
    ru: {
      desc: "Специализированная каменная промышленная зона города Газган создана на базе всемирно известного месторождения газганского мрамора и гранита, охватывая полный цикл добычи и глубокой переработки камня в отделочные материалы премиум-класса.",
      lotDesc: "1-й лот: Земельный участок площадью 2,5 га в городе Газган под комплекс глубокой переработки мрамора и гранита. Обеспечен промышленным водоснабжением и электросетями.\n\n2-й лот: Земельный участок площадью 1,8 га под строительство базы сортировки, упаковки и экспортной логистики изделий из натурального камня.",
      infra: ["Природный газ", "Питьевая вода", "Электроэнергия", "Асфальтированная дорога"],
      lots: ["https://e-auksion.uz/lot/784160", "https://e-auksion.uz/lot/784161"],
    },
    en: {
      desc: "Gozgon City Stone Processing Special Industrial Zone is built upon world-renowned marble and granite deposits, facilitating end-to-end extraction and advanced processing of architectural stone and premium cladding slabs.",
      lotDesc: "Lot #1: A 2.5-hectare land plot in Gozgon City for a modern marble and granite deep-processing plant. Supplied with high-capacity water and industrial electrical infrastructure.\n\nLot #2: A 1.8-hectare land plot for stone sorting, precision packaging, and export logistics infrastructure.",
      infra: ["Natural Gas", "Drinking Water", "Electricity", "Paved Road"],
      lots: ["https://e-auksion.uz/lot/784160", "https://e-auksion.uz/lot/784161"],
    },
  },
  navbahor: {
    uz: {
      desc: "Navbahor tumani yoshlar sanoat zonasi yengil sanoat, to'qimachilik, tikuvchilik va maishiy xizmat ko'rsatish sohalaridagi yoshlar tashabbuslarini qo'llab-quvvatlash uchun ajratilgan zamonaviy hududdir.",
      lotDesc: "Navbahor yoshlar sanoat zonasidagi yer maydonlari yosh tadbirkorlar uchun imtiyozli shartlarda «E-Auksion» orqali ochiq ijaraga berilmoqda.",
      infra: ["Tabiiy gaz", "Ichimlik suvi", "Elektr energiyasi", "Asfalt qoplamali yo‘l"],
      lots: ["https://e-auksion.uz/lot/784140"],
    },
    ru: {
      desc: "Молодёжная промышленная зона Навбахорского района предназначена для развития лёгкой промышленности, трикотажного и швейного производства при активном участии молодых специалистов.",
      lotDesc: "Земельные участки в молодёжной промышленной зоне Навбахора выставлены на электронные торги через платформу «E-Auksion».",
      infra: ["Природный газ", "Питьевая вода", "Электроэнергия", "Асфальтированная дорога"],
      lots: ["https://e-auksion.uz/lot/784140"],
    },
    en: {
      desc: "Navbahor District Youth Industrial Zone is designated for the acceleration of light industry, apparel, and knitting manufacturing initiatives led by young entrepreneurs.",
      lotDesc: "Plots in Navbahor Youth Industrial Zone are available for preferential long-term industrial lease via 'E-Auksion'.",
      infra: ["Natural Gas", "Drinking Water", "Electricity", "Paved Road"],
      lots: ["https://e-auksion.uz/lot/784140"],
    },
  },
  uchquduq: {
    uz: {
      desc: "Uchquduq tumani sanoat zonasi shimoliy hududdagi tog'-kon sanoati ehtiyojlariga moslashtirilgan bo'lib, qurilish materiallari, metall buyumlar va maxsus kiyimlar ishlab chiqarish korxonalarini o'zida jamlagan.",
      lotDesc: "Uchquduq sanoat zonasidagi sanoat yer maydonlari bo'yicha tender va auksion ma'lumotlari «E-Auksion» tizimida doimiy e'lon qilib boriladi.",
      infra: ["Tabiiy gaz", "Ichimlik suvi", "Elektr energiyasi", "Asfalt qoplamali yo‘l"],
      lots: ["https://e-auksion.uz/lot/784170"],
    },
    ru: {
      desc: "Промышленная зона Учкудукского района ориентирована на обслуживание горнодобывающей отрасли северного региона, выпуск стройматериалов и спецодежды.",
      lotDesc: "Земельные участки в промзоне Учкудука предлагаются инвесторам через прозрачную систему торгов «E-Auksion».",
      infra: ["Природный газ", "Питьевая вода", "Электроэнергия", "Асфальтированная дорога"],
      lots: ["https://e-auksion.uz/lot/784170"],
    },
    en: {
      desc: "Uchquduq District Industrial Zone is established to support northern mining infrastructure, producing high-grade building products and specialized technical equipment.",
      lotDesc: "Industrial lots in Uchquduq District are auctioned publicly via the official 'E-Auksion' platform.",
      infra: ["Natural Gas", "Drinking Water", "Electricity", "Paved Road"],
      lots: ["https://e-auksion.uz/lot/784170"],
    },
  },
};

// Projects detailed data
const projectDetails = {
  polymer: {
    uz: {
      desc: "Loyiha doirasida suv ta'minoti, kanalizatsiya va gaz uzatish tarmoqlari uchun diametri 20 mm dan 630 mm gacha bo'lgan yuqori bosimli polietilen quvurlari hamda fitinglar ishlab chiqarish yo'lga qo'yilgan. Korxonada Germaniya va Turkiyaning ilg'or ekstruziya liniyalari o'rnatilgan.",
      lotDesc: "1-lot: Karmana tumanidagi sanoat zonasida 1.2 gektar yer maydoni. Polietilen quvurlar ekstruziya liniyasini o'rnatish va sifat sinov laboratoriyasi uchun ajratilgan.\n\n2-lot: Karmana sanoat zonasida 0.8 gektar yer maydoni. Tayyor mahsulotlar ombori, ma'muriy bino va avtoturargoh hududini tashkil etish uchun ajratilgan.",
      inProgress: "- 2-bosqich: Katta diametrli (800-1200 mm) gofrirlangan quvurlar ishlab chiqarish liniyasi montaj qilinmoqda.\n- Laboratoriya va sifat nazorati markazi kengaytirilmoqda.",
      completed: "- 1-bosqich: Yillik 12 000 tonna quvur ishlab chiqarish quvvati to'liq ishga tushirilgan.\n- 75 ta yangi doimiy ish o'rni yaratildi.\n- Mahsulotlar respublika ichki bozoriga va qo'shni davlatlarga eksport qilinmoqda.",
      lots: ["https://e-auksion.uz/lot/784101", "https://e-auksion.uz/lot/784102"],
    },
    ru: {
      desc: "В рамках проекта налажено производство напорных полиэтиленовых труб и фитингов диаметром от 20 до 630 мм для систем водоснабжения, канализации и газораспределения на базе современного оборудования.",
      lotDesc: "1-й лот: Земельный участок площадью 1,2 га в промзоне Карманинского района. Выделен под монтаж экструзионных линий полиэтиленовых труб и испытательной лаборатории.\n\n2-й лот: Земельный участок площадью 0,8 га в промзоне Карманинского района. Оформлен через «E-Auksion» для склада готовой продукции, административного здания и парковки.",
      inProgress: "- Этап 2: Монтаж линии по выпуску гофрированных труб большого диаметра (800–1200 мм).\n- Расширение аттестованной лаборатории качества.",
      completed: "- Этап 1: Введена в строй мощность 12 000 тонн полимерной продукции в год.\n- Создано 75 постоянных рабочих мест.\n- Продукция поставляется на внутренний рынок и экспортируется в страны СНГ.",
      lots: ["https://e-auksion.uz/lot/784101", "https://e-auksion.uz/lot/784102"],
    },
    en: {
      desc: "The enterprise manufactures high-density polyethylene pressure pipes and electrofusion fittings (diameters 20mm to 630mm) for potable water, gas distribution, and industrial drainage systems.",
      lotDesc: "Lot #1: Land plot of 1.2 hectares in Karmana industrial zone. Allocated for installing polyethylene pipe extrusion lines and a quality testing laboratory.\n\nLot #2: Land plot of 0.8 hectares in Karmana industrial zone. Acquired via «E-Auksion» for a finished goods warehouse, administration unit, and logistics parking.",
      inProgress: "- Phase 2: Installation of large-diameter (800-1200mm) corrugated pipe extrusion lines.\n- Expansion of international testing laboratory.",
      completed: "- Phase 1: Annual capacity of 12,000 tons commissioned and operating at full rate.\n- 75 permanent technical jobs created.\n- Supplying domestic infrastructure projects and exporting across Central Asia.",
      lots: ["https://e-auksion.uz/lot/784101", "https://e-auksion.uz/lot/784102"],
    },
  },
  metal: {
    uz: {
      desc: "Zarafshon shahrida sanoat va fuqaro binolari uchun payvandlangan metall konstruksiyalar, karkaslar hamda bazalt va penopolistirol asosidagi tom va devor sendvich panellari ishlab chiqarilmoqda.",
      lotDesc: "Zarafshon shahri sanoat zonasidan «E-Auksion» savdolari orqali 3.0 gektar maydon ajratilib, 45 mlrd so'mlik investitsiya o'zlashtirildi.",
      inProgress: "- Avtomatlashtirilgan kukunli bo'yash sexi qurilmoqda.\n- Kran uskunalari parki modernizatsiya qilinmoqda.",
      completed: "- Yillik 5 000 tonna metall konstruksiya va 200 000 kv.m sendvich panel ishlab chiqarish yo'lga qo'yildi.\n- 90 nafar mutaxassis ish bilan ta'minlandi.",
      lots: ["https://e-auksion.uz/lot/784130"],
    },
    ru: {
      desc: "Предприятие специализируется на выпуске сварных металлических конструкций любой сложности и стеновых/кровельных сэндвич-панелей с наполнителями из минеральной ваты и пенополистирола.",
      lotDesc: "Земельный участок площадью 3.0 га в промышленной зоне г. Зарафшан был выделен через аукционные торги «E-Auksion».",
      inProgress: "- Строительство автоматизированного цеха порошковой покраски.\n- Модернизация парка подъемно-кранового оборудования.",
      completed: "- Освоено производство 5 000 тонн металлоконструкций и 200 000 кв.м панелей в год.\n- Трудоустроено 90 квалифицированных специалистов.",
      lots: ["https://e-auksion.uz/lot/784130"],
    },
    en: {
      desc: "Specialized in structural steel fabrication, pre-engineered building frames, and polyurethane/mineral wool insulated wall and roofing sandwich panels.",
      lotDesc: "Allocated through 'E-Auksion' bidding over a 3.0-hectare industrial parcel in Zarafshon City Industrial Zone.",
      inProgress: "- Construction of automated continuous powder coating line.\n- Overhead gantry crane systems enhancement.",
      completed: "- Annual output of 5,000 tons of structural steel and 200,000 sqm of panels established.\n- 90 skilled industrial jobs generated.",
      lots: ["https://e-auksion.uz/lot/784130"],
    },
  },
  textile: {
    uz: {
      desc: "Navbahor tumanida zamonaviy to'qimachilik fabrikasi bo'lib, paxta tolasidan yuqori sifatli trikotaj mato to'qish, bo'yash hamda tayyor kiyim-kechak tikish bilan shug'ullanadi.",
      lotDesc: "Navbahor yoshlar sanoat zonasida 1.8 gektar yer uchastkasi «E-Auksion» savdolari orqali ijaraga olingan.",
      inProgress: "- Tikuv sexi quvvatini yana 500 000 donaga oshirish loyihasi davom etmoqda.",
      completed: "- Yillik 1.2 mln dona tayyor tikuv mahsulotlari ishlab chiqarish o'zlashtirildi.\n- 120 ta ish o'rni, asosan xotin-qizlar va yoshlar uchun yaratildi.",
      lots: ["https://e-auksion.uz/lot/784140"],
    },
    ru: {
      desc: "Современная текстильная фабрика в Навбахорском районе, осуществляющая кругловязальное производство трикотажного полотна, окраску и пошив готовой швейной продукции.",
      lotDesc: "Земельный участок 1.8 га в молодёжной промзоне Навбахора был предоставлен по результатам электронного аукциона «E-Auksion».",
      inProgress: "- Расширение швейного цеха с увеличением выпуска на 500 000 изделий в год.",
      completed: "- Выпуск 1.2 млн готовых изделий в год, экспортируемых на внешние рынки.\n- Создано 120 рабочих мест для молодёжи и женщин региона.",
      lots: ["https://e-auksion.uz/lot/784140"],
    },
    en: {
      desc: "Integrated textile manufacturing plant producing knitted cotton fabrics, eco-friendly dyeing, and finished apparel products for export.",
      lotDesc: "The 1.8-hectare production site in Navbahor Youth SIZ was secured through 'E-Auksion' competitive transparent bidding.",
      inProgress: "- Installation of high-speed sewing lines to expand capacity by 500,000 garments annually.",
      completed: "- Operational capacity of 1.2 million garments per year achieved.\n- 120 permanent jobs created, empowering youth and women.",
      lots: ["https://e-auksion.uz/lot/784140"],
    },
  },
  agro: {
    uz: {
      desc: "Qiziltepa tumanida meva-sabzavotlarni saralash, yuvish, kalibrlash, shock-muzlatish (IQF texnologiyasi) va 3000 tonnalik zamonaviy muzlatkichli omborxonalarda saqlash majmuasi.",
      lotDesc: "Qiziltepa sanoat zonasida 4.2 gektar yer maydoni «E-Auksion» platformasi orqali ajratilgan.",
      inProgress: "- Quritilgan mevalarni qadoqlash avtomatlashtirilgan liniyasi montaji.",
      completed: "- Yiliga 8 000 tonna meva-sabzavot qayta ishlash quvvati yaratildi.\n- 85 nafar qishloq yoshlari doimiy ish bilan ta'minlandi.",
      lots: ["https://e-auksion.uz/lot/784150"],
    },
    ru: {
      desc: "Агропромышленный комплекс в Кызылтепинском районе с технологией шоковой заморозки (IQF), калибровки, сублимации и холодильного хранения на 3000 тонн плодоовощной продукции.",
      lotDesc: "Земельный участок площадью 4.2 га в МПЗ Кызылтепинского района был выделен через торговую систему «E-Auksion».",
      inProgress: "- Монтаж автоматической линии фасовки сушёных фруктов и овощей.",
      completed: "- Мощность переработки 8 000 тонн свежей продукции в год введена в строй.\n- Создано 85 постоянных рабочих мест.",
      lots: ["https://e-auksion.uz/lot/784150"],
    },
    en: {
      desc: "Modern agro-processing and IQF shock-freezing facility with 3,000-ton climate-controlled storage for fruits and vegetables meeting international food safety standards.",
      lotDesc: "Situated on a 4.2-hectare plot in Qiziltepa SIZ acquired through transparent 'E-Auksion' procedures.",
      inProgress: "- Installation of automated fruit drying and vacuum packaging line.",
      completed: "- 8,000 tons annual fresh produce processing capacity fully operational.\n- 85 permanent rural employment opportunities created.",
      lots: ["https://e-auksion.uz/lot/784150"],
    },
  },
  marble: {
    uz: {
      desc: "G'ozg'on shahrida tabiiy marmar va granit bloklarini arralash, silliqlash, jilolash va tayyor arxitektura plitalari, qoplamalar hamda buyurtma asosidagi bezak detallari ishlab chiqarish korxonasi.",
      lotDesc: "G'ozg'on toshni qayta ishlash sanoat zonasida 5.0 gektar maydonda «E-Auksion» savdolari orqali yer maydoni ajratilib, Italiya dastgohlari keltirilgan.",
      inProgress: "- Badiiy tosh o'ymakorligi va mozaika sexining 2-navbati qurilmoqda.",
      completed: "- Yillik 150 000 kv.m marmar va granit plitalari ishlab chiqarish quvvati ishga tushirildi.\n- 110 nafar usta va tosh yo'nuvchilar ish bilan ta'minlandi.",
      lots: ["https://e-auksion.uz/lot/784160"],
    },
    ru: {
      desc: "Предприятие в г. Газган по распиловке, шлифовке, полировке блоков натурального мрамора и гранита с получением высококачественных фасадных и интерьерных плит на оборудовании из Италии.",
      lotDesc: "Участок 5.0 га в специализированной каменной промзоне Газгана предоставлен через открытый аукцион «E-Auksion».",
      inProgress: "- Строительство 2-й очереди цеха художественной резки и мозаики.",
      completed: "- Выпуск 150 000 кв.м плит из мрамора и гранита в год запущен в эксплуатацию.\n- Трудоустроено 110 специалистов камнеобработки.",
      lots: ["https://e-auksion.uz/lot/784160"],
    },
    en: {
      desc: "High-precision processing plant for natural Gozgon marble and granite blocks into polished slabs, wall cladding tiles, and custom architectural masonry elements using Italian machinery.",
      lotDesc: "Established on a 5.0-hectare parcel in Gozgon Stone Processing Zone leased via the 'E-Auksion' platform.",
      inProgress: "- Phase 2 development of artistic CNC waterjet cutting and mosaic workshop.",
      completed: "- 150,000 sqm annual finished stone slab output capacity achieved.\n- 110 specialized stonecraft jobs generated.",
      lots: ["https://e-auksion.uz/lot/784160"],
    },
  },
  glass: {
    uz: {
      desc: "Uchquduq tumanida mahalliy boy kvars qumi konlari xomashyosidan farmatsevtika, oziq-ovqat va ichimliklar sanoati uchun shisha idishlar va qadoqlar ishlab chiqarish majmuasi.",
      lotDesc: "Uchquduq sanoat zonasidagi 3.5 gektar yer maydoni «E-Auksion» savdolari orqali xarid qilingan.",
      inProgress: "- Energiya tejamkor shisha eritish pechining ikkinchi tarmog'i montaj qilinmoqda.",
      completed: "- Yiliga 35 mln dona shisha idish tayyorlash quvvati barpo etildi.\n- 95 ta yangi ish o'rni yaratildi.",
      lots: ["https://e-auksion.uz/lot/784170"],
    },
    ru: {
      desc: "Комплекс по производству стеклянной тары и флаконов для фармацевтической и пищевой промышленности на базе месторождений кварцевого песка в Учкудукском районе.",
      lotDesc: "Земельный участок площадью 3.5 га в промзоне Учкудука предоставлен через систему «E-Auksion».",
      inProgress: "- Монтаж второй очереди энергоэффективной стекловаренной печи.",
      completed: "- Освоен выпуск 35 млн единиц стеклянных изделий в год.\n- Создано 95 рабочих мест.",
      lots: ["https://e-auksion.uz/lot/784170"],
    },
    en: {
      desc: "Glass container manufacturing plant producing food and pharmaceutical grade glass bottles and jars utilizing locally mined high-purity quartz sand reserves in Uchquduq.",
      lotDesc: "Secured over 3.5 hectares of industrial land in Uchquduq SIZ via the official 'E-Auksion' portal.",
      inProgress: "- Installation of the second energy-efficient electric-boost glass melting furnace.",
      completed: "- Annual capacity of 35 million glass containers successfully commissioned.\n- 95 permanent industrial jobs provided.",
      lots: ["https://e-auksion.uz/lot/784170"],
    },
  },
  wool: {
    uz: {
      desc: "Tomdi tumanida mayin jun va qo'y terisini chuqur qayta ishlash, yuvish, ip yigirish hamda issiq kiyimlar, adyollar va termo-izolyatsiya materiallari ishlab chiqarish korxonasi.",
      lotDesc: "Tomdi tumanidagi hududdan «E-Auksion» orqali 2.8 gektar yer maydoni ajratilib, 25 mlrd so'm investitsiya kiritildi.",
      inProgress: "- Jun chiqindilaridan ekologik qurilish izolyatsiyasi ishlab chiqarish liniyasi qurilmoqda.",
      completed: "- Yiliga 1 500 tonna junni yuvish va 400 tonna ip ishlab chiqarish yo'lga qo'yildi.\n- 80 nafar mahalliy aholi doimiy daromad manbaiga ega bo'ldi.",
      lots: ["https://e-auksion.uz/lot/784180"],
    },
    ru: {
      desc: "Предприятие в Тамдынском районе по глубокой первичной и вторичной переработке овечьей шерсти и кож: мойка, прядение пряжи, выпуск тёплых одеял и термоизоляционных эко-материалов.",
      lotDesc: "Участок 2.8 га в Тамдынском районе предоставлен через аукцион «E-Auksion».",
      inProgress: "- Строительство линии экологичных строительных утеплителей из шерстяного сырья.",
      completed: "- Запущена мойка 1 500 тонн шерсти и выпуск 400 тонн пряжи в год.\n- 80 местных жителей обеспечены постоянной работой.",
      lots: ["https://e-auksion.uz/lot/784180"],
    },
    en: {
      desc: "Deep processing facility for fine fleece wool and sheepskins, featuring scouring, carding, yarn spinning, and manufacturing of natural thermal blankets and eco-insulation.",
      lotDesc: "Allocated over 2.8 hectares in Tomdi District via competitive 'E-Auksion' lease.",
      inProgress: "- Setup of an acoustic and thermal bio-insulation batt production line from recycled wool fibers.",
      completed: "- Scouring capacity of 1,500 tons and yarn spinning of 400 tons per year operational.\n- 80 stable employment positions created in pastoral communities.",
      lots: ["https://e-auksion.uz/lot/784180"],
    },
  },
};

function matchZoneKey(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('karman') || n.includes('карман')) return 'karmana';
  if (n.includes('navoiy') || n.includes('навои')) return 'navoiy';
  if (n.includes('zarafsh') || n.includes('зарафш')) return 'zarafshon';
  if (n.includes('qiziltep') || n.includes('кызылтеп')) return 'qiziltepa';
  if (n.includes('gozgon') || n.includes("g'ozg'on") || n.includes('газган')) return 'gozgon';
  if (n.includes('navbahor') || n.includes('навбахор')) return 'navbahor';
  if (n.includes('uchquduq') || n.includes('учкудук')) return 'uchquduq';
  return 'karmana';
}

function matchProjectKey(title) {
  const t = (title || '').toLowerCase();
  if (t.includes('polietilen') || t.includes('полиэтилен') || t.includes('polymer') || t.includes('pipe')) return 'polymer';
  if (t.includes('metall') || t.includes('металл') || t.includes('steel') || t.includes('sendvich')) return 'metal';
  if (t.includes('trikotaj') || t.includes('трикотаж') || t.includes('tekstil') || t.includes('garment') || t.includes('knitted')) return 'textile';
  if (t.includes('meva') || t.includes('плодоовощ') || t.includes('agro') || t.includes('fruit')) return 'agro';
  if (t.includes('marmar') || t.includes('мрамор') || t.includes('granit') || t.includes('marble')) return 'marble';
  if (t.includes('shisha') || t.includes('стекл') || t.includes('glass') || t.includes('kvars')) return 'glass';
  if (t.includes('jun') || t.includes('шерст') || t.includes('wool') || t.includes('teri')) return 'wool';
  return 'polymer';
}

async function run() {
  console.log('=== STARTING SEEDING FOR SANOAT ZONALARI ===');
  const zones = await client.content.list('sanoat-zonalari', { limit: 100 });
  console.log(`Found ${zones.length} zone entries`);

  for (const z of zones) {
    const key = matchZoneKey(z.fields.name);
    const loc = z.locale || 'uz';
    const cData = (zoneContent[key] && zoneContent[key][loc]) || zoneContent[key]['uz'];

    const patchData = {
      description: cData.desc,
      'lot-description': cData.lotDesc,
      'lot-urls': cData.lots.map((u) => ({ value: u })),
      infrastructure: cData.infra,
    };

    console.log(`Patching zone: ${z.fields.name} [${loc}] (key: ${key})`);
    try {
      await client.content.patch('sanoat-zonalari', z.uuid, {
        locale: loc,
        data: patchData,
      });
      await client.content.publish('sanoat-zonalari', z.uuid);
      console.log(`  -> Successfully patched & published ${z.uuid}`);
    } catch (err) {
      console.error(`  -> Failed ${z.uuid}:`, err.message);
    }
  }

  console.log('\n=== STARTING SEEDING FOR LOYIHALAR ===');
  const projects = await client.content.list('loyihalar', { limit: 100 });
  console.log(`Found ${projects.length} project entries`);

  for (const p of projects) {
    const key = matchProjectKey(p.fields.title);
    const loc = p.locale || 'uz';
    const pData = (projectDetails[key] && projectDetails[key][loc]) || projectDetails[key]['uz'];

    const patchData = {
      description: pData.desc,
      'lot-description': pData.lotDesc,
      'in-progress-project': pData.inProgress,
      'completed-project': pData.completed,
      lots: pData.lots.map((u) => ({ value: u })),
      'lot-urls': pData.lots.map((u) => ({ value: u })),
    };

    console.log(`Patching project: ${p.fields.title} [${loc}] (key: ${key})`);
    try {
      await client.content.patch('loyihalar', p.uuid, {
        locale: loc,
        data: patchData,
      });
      await client.content.publish('loyihalar', p.uuid);
      console.log(`  -> Successfully patched & published ${p.uuid}`);
    } catch (err) {
      console.error(`  -> Failed ${p.uuid}:`, err.message);
    }
  }

  console.log('\n=== ALL CMS DATA POPULATED SUCCESSFULLY! ===');
}

run().catch(console.error);
