import { confirmed, todo, type Image, type Localized, type Price, type Product, type ProductVariant } from "./types";

/*
 * PRICES: the brand is moving to CZK / EUR, and no CZK/EUR prices exist yet.
 * The numbers below are DEMO values for the preview build only (status
 * "todo"), so the cart and checkout can be tested. They never reach a
 * production build or Offer markup until the client confirms them.
 */
const DEMO_PRICE = "Демо-цена для preview. Нужны реальные цены в CZK и EUR.";
const price = (czk: number, eur: number): Price => ({ CZK: czk * 100, EUR: Math.round(eur * 100) });

const src = {
  card: (sku: string) => `Tilda product card SKU ${sku} (audit 2026-10-03)`,
  buy: "izumitea.com/ua/buy (audit 2026-10-03)",
  faq: "izumitea.com/en + /ru home FAQ (audit 2026-10-03)",
};

/* ---------------- Images (the brand's own packshots, Tilda CDN) ---------------- */
/* Temporary: replace with a proper shoot; next/image fetches and optimises them. */

const CDN = "https://static.tildacdn.one";
const img = (path: string, w: number, h: number, alt: Localized): Image => ({ src: `${CDN}/${path}`, width: w, height: h, alt });

export const images = {
  doyFront: img("tild3537-3861-4332-b737-363862653636/_05.png", 960, 1200, {
    ua: "Doy pack IZUMI Classic, вигляд спереду",
    cs: "Doy pack IZUMI Classic, pohled zepředu",
    ru: "Doy pack IZUMI Classic, вид спереди",
    en: "IZUMI Classic doy pack, front",
  }),
  doyBack: img("tild6232-6538-4162-b831-383232343630/_02.png", 960, 1200, {
    ua: "Doy pack IZUMI Classic, зворотний бік зі складом",
    cs: "Doy pack IZUMI Classic, zadní strana se složením",
    ru: "Doy pack IZUMI Classic, обратная сторона с составом",
    en: "IZUMI Classic doy pack, back with ingredients",
  }),
  classicBox: img("tild3264-6330-4332-a262-303438336266/_07.png", 960, 1200, {
    ua: "Коробка stick pack IZUMI Classic зі стіком",
    cs: "Krabička stick pack IZUMI Classic se sáčkem",
    ru: "Коробка stick pack IZUMI Classic со стиком",
    en: "IZUMI Classic stick pack box with a stick",
  }),
  classicSticks: img("tild6438-6531-4335-a431-616461336461/_06.png", 960, 1200, {
    ua: "Стіки IZUMI Classic",
    cs: "Sáčky IZUMI Classic",
    ru: "Стики IZUMI Classic",
    en: "IZUMI Classic sticks",
  }),
  granules: img("tild3939-3530-4764-a165-356237383337/0005-min.png", 960, 1200, {
    ua: "Гранули гречаного чаю IZUMI",
    cs: "Granule pohankového čaje IZUMI",
    ru: "Гранулы гречишного чая IZUMI",
    en: "IZUMI buckwheat tea granules",
  }),
  gingerBox: img("tild6435-6264-4337-b461-303239646161/0003-min.png", 960, 1200, {
    ua: "Коробка stick pack IZUMI з імбиром зі стіком",
    cs: "Krabička stick pack IZUMI se zázvorem",
    ru: "Коробка stick pack IZUMI с имбирём со стиком",
    en: "IZUMI with Ginger stick pack box with a stick",
  }),
  gingerSticks: img("tild3933-6639-4461-a262-343065333935/0001-min.png", 960, 1200, {
    ua: "Стіки IZUMI з імбиром",
    cs: "Sáčky IZUMI se zázvorem",
    ru: "Стики IZUMI с имбирём",
    en: "IZUMI with Ginger sticks",
  }),
  bothBoxes: img("tild3336-6165-4863-a131-343733383536/0004-min.png", 960, 1200, {
    ua: "Коробки IZUMI Classic і IZUMI з імбиром",
    cs: "Krabičky IZUMI Classic a IZUMI se zázvorem",
    ru: "Коробки IZUMI Classic и IZUMI с имбирём",
    en: "IZUMI Classic and IZUMI with Ginger boxes",
  }),
  doyX3: img("stor3835-3838-4432-b538-363332353336/44278073.jpg", 499, 603, {
    ua: "Три doy pack IZUMI Classic",
    cs: "Tři doy packy IZUMI Classic",
    ru: "Три doy pack IZUMI Classic",
    en: "Three IZUMI Classic doy packs",
  }),
  gingerX3: img("stor3835-6364-4038-b465-363035353931/92125369.jpg", 499, 603, {
    ua: "Три коробки IZUMI з імбиром",
    cs: "Tři krabičky IZUMI se zázvorem",
    ru: "Три коробки IZUMI с имбирём",
    en: "Three IZUMI with Ginger boxes",
  }),
  mix: img("stor3936-3336-4430-a537-636235306462/52204317.jpg", 499, 603, {
    ua: "Набір Mix Pack: doy pack і дві коробки стіків",
    cs: "Sada Mix Pack: doy pack a dvě krabičky sáčků",
    ru: "Набор Mix Pack: doy pack и две коробки стиков",
    en: "Mix Pack set: a doy pack and two stick boxes",
  }),
  cupTop: img("tild3431-6330-4634-b064-663032616431/_03.png", 1231, 1154, {
    ua: "Чашка гречаного чаю зверху, гранули на дні",
    cs: "Šálek pohankového čaje shora, granule na dně",
    ru: "Чашка гречишного чая сверху, гранулы на дне",
    en: "A cup of buckwheat tea from above, granules resting at the bottom",
  }),
  spoon: img("tild3766-6333-4838-b036-393666663038/_2.png", 776, 397, {
    ua: "Дерев'яна ложка з гранулами чаю",
    cs: "Dřevěná lžíce s granulemi čaje",
    ru: "Деревянная ложка с гранулами чая",
    en: "A wooden spoon of tea granules",
  }),
  lifestyle: img("tild3837-3137-4239-a163-616533353264/-_03.jpg", 1680, 432, {
    ua: "Doy pack IZUMI на полиці",
    cs: "Doy pack IZUMI na poličce",
    ru: "Doy pack IZUMI на полке",
    en: "IZUMI doy pack on a shelf",
  }),
} satisfies Record<string, Image>;

const T = "/ua/buy/tproduct/642253683-";
const E = "/en/buy/tproduct/402966845-";
const R = "/ru/buy/tproduct/401068833-";

const pack = {
  doy100: { ua: "Doy pack 100 г", cs: "Doy pack 100 g", ru: "Doy pack 100 г", en: "Doy pack 100 g" },
  stick125: { ua: "Stick pack 125 г", cs: "Stick pack 125 g", ru: "Stick pack 125 г", en: "Stick pack 125 g" },
  doyX3: { ua: "3 × doy pack", cs: "3 × doy pack", ru: "3 × doy pack", en: "3 × doy pack" },
  stickX3: { ua: "3 × stick pack", cs: "3 × stick pack", ru: "3 × stick pack", en: "3 × stick pack" },
} satisfies Record<string, Localized>;

/* ---------------- Variants ---------------- */

const classicVariants: ProductVariant[] = [
  {
    id: "doy-100",
    sku: "2000000000001",
    name: pack.doy100,
    packType: "doy",
    weightGrams: confirmed(100, src.card("2000000000001")),
    price: todo(DEMO_PRICE, price(189, 7.9)),
    image: images.doyFront,
    legacyPaths: [
      { path: `${T}112926866521-chai-izumi-100g`, locale: "ua" },
      { path: "/tproduct/1-239744912820-chai-izumi-100g", locale: "root" },
      { path: "/tproduct/1-927910678521-chai-izumi-100g", locale: "root" },
      { path: `${E}783205931751-tea-izumi-100g`, locale: "en" },
      { path: `${R}473598070681-chai-izumi-100g`, locale: "ru" },
    ],
  },
  {
    id: "stick-125",
    sku: "2000000000002",
    name: pack.stick125,
    packType: "stick",
    weightGrams: confirmed(125, src.card("2000000000002")),
    price: todo(DEMO_PRICE, price(229, 9.5)),
    image: images.classicBox,
    legacyPaths: [
      { path: `${T}820012393231-chai-izumi-125g`, locale: "ua" },
      { path: "/tproduct/1-107339796091-chai-izumi-125g", locale: "root" },
      { path: "/tproduct/1-305638055281-chai-izumi-125g", locale: "root" },
      { path: `${E}850284449991-tea-izumi-125g`, locale: "en" },
      { path: `${R}885692869481-chai-izumi-125g`, locale: "ru" },
    ],
  },
  {
    id: "doy-x3",
    sku: "2000000000004",
    name: pack.doyX3,
    packType: "doy",
    weightGrams: todo("Карточка: 125×3 г, страница /ua/buy: 300 г", 300),
    price: todo(DEMO_PRICE, price(499, 20.9)),
    image: images.doyX3,
    legacyPaths: [
      { path: `${T}720348328341-chai-izumi-doy-pack-x3-125x3g`, locale: "ua" },
      { path: `${E}330523062351-tea-izumi-doy-pack-x3-125x3g`, locale: "en" },
      { path: `${R}795768404091-chai-izumi-doy-pack-x3-125x3g`, locale: "ru" },
    ],
  },
  {
    id: "stick-x3",
    sku: "2000000000005",
    name: pack.stickX3,
    packType: "stick",
    weightGrams: confirmed(375, src.buy),
    price: todo(DEMO_PRICE, price(589, 24.5)),
    image: images.classicSticks,
    legacyPaths: [
      { path: `${T}154542689051-chai-izumi-stick-pack-x3-125x3g`, locale: "ua" },
      { path: `${E}413244245891-tea-izumi-stick-pack-x3-125x3g`, locale: "en" },
      { path: `${R}202195031331-chai-izumi-stick-pack-x3-125x3g`, locale: "ru" },
    ],
  },
];

const gingerVariants: ProductVariant[] = [
  {
    id: "stick-125",
    sku: "2000000000003",
    name: pack.stick125,
    packType: "stick",
    weightGrams: confirmed(125, src.card("2000000000003")),
    price: todo(DEMO_PRICE, price(239, 9.9)),
    image: images.gingerBox,
    legacyPaths: [
      { path: `${T}993732903821-chai-izumi-z-mbirom-125g`, locale: "ua" },
      { path: "/tproduct/1-421692571921-chai-izumi-s-imbiryom-125g", locale: "root" },
      { path: "/tproduct/1-892992452911-chai-izumi-s-imbiryom-125g", locale: "root" },
      { path: `${E}536036132231-tea-izumi-with-ginger-125g`, locale: "en" },
      { path: `${R}198423432661-chai-izumi-s-imbiryom-125g`, locale: "ru" },
    ],
  },
  {
    id: "stick-x3",
    sku: "2000000000006",
    name: pack.stickX3,
    packType: "stick",
    weightGrams: confirmed(375, src.buy),
    price: todo(DEMO_PRICE, price(619, 25.9)),
    image: images.gingerX3,
    legacyPaths: [
      { path: `${T}994477245731-chai-izumi-stick-pack-z-mbirem-x3-125x3g`, locale: "ua" },
      { path: `${E}761331761981-tea-izumi-stick-pack-z-mbirem-x3-125x3g`, locale: "en" },
      { path: `${R}292507441321-chai-izumi-stick-pack-z-mbirem-x3-125x3g`, locale: "ru" },
    ],
  },
];

const mixVariants: ProductVariant[] = [
  {
    id: "mix",
    sku: "2000000000007",
    name: {
      ua: "Doy pack + 2 stick pack",
      cs: "Doy pack + 2 stick packy",
      ru: "Doy pack + 2 stick pack",
      en: "Doy pack + 2 stick packs",
    },
    packType: "bundle",
    weightGrams: todo("Карточка: 300 г, страница /ua/buy: 350 г (100+125+125)", 350),
    price: todo(DEMO_PRICE, price(649, 26.9)),
    image: images.mix,
    legacyPaths: [
      { path: `${T}688511326371-chai-izumi-mix-pack-300g`, locale: "ua" },
      { path: `${E}582335446871-tea-izumi-mix-pack-300g`, locale: "en" },
      { path: `${R}142071613291-chai-izumi-mix-pack-300g`, locale: "ru" },
    ],
  },
];

/* ---------------- Products ---------------- */

const granulesText: Localized = {
  ua: "Насіння татарської гречки, вирощеної в горах вище 1500 метрів, пресують у гранули. Їх засипають просто в чашку: пакетики й фільтр не потрібні, гранули спокійно лежать на дні.",
  cs: "Semena pohanky tatarské, pěstované v horách nad 1500 metry, se lisují do granulí. Sypou se rovnou do šálku: nepotřebujete sáčky ani sítko, granule klidně leží na dně.",
  ru: "Семена татарской гречихи, выращенной в горах выше 1500 метров, прессуют в гранулы. Их засыпают прямо в чашку: пакетики и фильтр не нужны, гранулы спокойно лежат на дне.",
  en: "Seeds of Tartary buckwheat, grown in the mountains above 1,500 metres, are pressed into granules. They go straight into the cup: no bags or strainer needed, the granules rest at the bottom.",
};

export const products: Product[] = [
  {
    slug: "izumi-classic",
    kind: "tea",
    tone: "blush",
    name: { ua: "IZUMI Classic", cs: "IZUMI Classic", ru: "IZUMI Classic", en: "IZUMI Classic" },
    shortDescription: {
      ua: "Гречаний чай з ароматом вівсяного печива.",
      cs: "Pohankový čaj s vůní ovesných sušenek.",
      ru: "Гречишный чай с ароматом овсяного печенья.",
      en: "Buckwheat tea with an oatmeal-cookie aroma.",
    },
    description: granulesText,
    ingredients: confirmed(
      { ua: "Насіння татарської гречки", cs: "Semena pohanky tatarské", ru: "Семена татарской гречихи", en: "Tartary buckwheat seeds" },
      src.buy,
    ),
    taste: confirmed(
      {
        ua: "Ніжний, з легкою солодкістю, бурштиновий колір",
        cs: "Jemná, lehce nasládlá chuť, jantarová barva",
        ru: "Нежный, с лёгкой сладостью, янтарный цвет",
        en: "Gentle, lightly sweet, amber in colour",
      },
      src.faq,
    ),
    aroma: confirmed(
      { ua: "Вівсяне печиво", cs: "Ovesné sušenky", ru: "Овсяное печенье", en: "Oatmeal cookies" },
      src.faq,
    ),
    story: {
      ua: "Найпростіша форма IZUMI: лише гречка, гаряча вода і три хвилини. Одну порцію можна заварити до трьох разів, тож однієї ложки вистачає на неспішний ранок.",
      cs: "Nejjednodušší podoba IZUMI: jen pohanka, horká voda a tři minuty. Jednu porci můžete zalít až třikrát, takže jedna lžička vydrží na celé pomalé ráno.",
      ru: "Самая простая форма IZUMI: только гречиха, горячая вода и три минуты. Одну порцию можно заварить до трёх раз, так что одной ложки хватает на неспешное утро.",
      en: "IZUMI at its simplest: buckwheat, hot water and three minutes. One portion can be brewed up to three times, so a single spoonful lasts a slow morning.",
    },
    gallery: [images.doyFront, images.classicBox, images.doyBack, images.classicSticks, images.granules],
    variants: classicVariants,
    defaultVariantId: "doy-100",
    related: ["izumi-ginger", "mix-pack"],
    seo: {
      title: {
        ua: "IZUMI Classic — гречаний чай",
        cs: "IZUMI Classic — pohankový čaj",
        ru: "IZUMI Classic — гречишный чай",
        en: "IZUMI Classic — buckwheat tea",
      },
      description: granulesText,
      indexability: "index",
    },
  },
  {
    slug: "izumi-ginger",
    kind: "tea",
    tone: "teal",
    name: { ua: "IZUMI з імбиром", cs: "IZUMI se zázvorem", ru: "IZUMI с имбирём", en: "IZUMI with Ginger" },
    shortDescription: {
      ua: "Гречаний чай з імбиром у стіках, які зручно взяти з собою.",
      cs: "Pohankový čaj se zázvorem v sáčcích, které snadno vezmete s sebou.",
      ru: "Гречишный чай с имбирём в стиках, которые удобно взять с собой.",
      en: "Buckwheat tea with ginger, in sticks that travel easily.",
    },
    description: {
      ua: "Ті самі гранули татарської гречки з гір, доповнені імбиром. Упаковано в стіки: один відкриваєте, висипаєте в чашку й заливаєте гарячою водою.",
      cs: "Tytéž granule pohanky tatarské z hor, doplněné zázvorem. Balené v sáčcích: jeden otevřete, nasypete do šálku a zalijete horkou vodou.",
      ru: "Те же гранулы татарской гречихи с гор, дополненные имбирём. Упакованы в стики: один открываете, высыпаете в чашку и заливаете горячей водой.",
      en: "The same mountain-grown Tartary buckwheat granules, with ginger. Packed in sticks: open one, pour it into a cup and add hot water.",
    },
    ingredients: todo("Состав и пропорция имбиря не указаны на текущем сайте"),
    taste: todo("Описание вкуса варианта с имбирём отсутствует"),
    aroma: todo("Описание аромата варианта с имбирём отсутствует"),
    story: {
      ua: "Варіант для дороги, роботи й походів: стік поміщається в кишеню, а чашку можна заварити будь-де, де є гаряча вода.",
      cs: "Varianta na cesty, do práce i na túry: sáček se vejde do kapsy a šálek si připravíte všude, kde je horká voda.",
      ru: "Вариант для дороги, работы и походов: стик помещается в карман, а чашку можно заварить везде, где есть горячая вода.",
      en: "Made for commutes, desks and hikes: a stick fits in a pocket, and you can brew a cup anywhere there is hot water.",
    },
    gallery: [images.gingerBox, images.gingerSticks, images.bothBoxes],
    variants: gingerVariants,
    defaultVariantId: "stick-125",
    related: ["izumi-classic", "mix-pack"],
    seo: {
      title: {
        ua: "IZUMI з імбиром — гречаний чай",
        cs: "IZUMI se zázvorem — pohankový čaj",
        ru: "IZUMI с имбирём — гречишный чай",
        en: "IZUMI with Ginger — buckwheat tea",
      },
      description: {
        ua: "Гречаний чай IZUMI з імбиром у стіках.",
        cs: "Pohankový čaj IZUMI se zázvorem v sáčcích.",
        ru: "Гречишный чай IZUMI с имбирём в стиках.",
        en: "IZUMI buckwheat tea with ginger, in sticks.",
      },
      indexability: "index",
    },
  },
  {
    slug: "mix-pack",
    kind: "bundle",
    tone: "sand",
    name: { ua: "IZUMI Mix Pack", cs: "IZUMI Mix Pack", ru: "IZUMI Mix Pack", en: "IZUMI Mix Pack" },
    shortDescription: {
      ua: "Doy pack, стіки Classic і стіки з імбиром в одному наборі.",
      cs: "Doy pack, sáčky Classic a sáčky se zázvorem v jedné sadě.",
      ru: "Doy pack, стики Classic и стики с имбирём в одном наборе.",
      en: "A doy pack, Classic sticks and Ginger sticks in one set.",
    },
    description: {
      ua: "Три формати IZUMI разом: doy pack для дому, стіки Classic і стіки з імбиром для дороги. Найпростіший спосіб спробувати обидва смаки.",
      cs: "Tři podoby IZUMI dohromady: doy pack domů, sáčky Classic a sáčky se zázvorem na cesty. Nejjednodušší způsob, jak ochutnat obě chuti.",
      ru: "Три формата IZUMI вместе: doy pack для дома, стики Classic и стики с имбирём в дорогу. Самый простой способ попробовать оба вкуса.",
      en: "Three IZUMI formats together: a doy pack for home, plus Classic and Ginger sticks for the road. The easiest way to try both flavours.",
    },
    ingredients: todo("Собрать из состава Classic и Ginger после подтверждения"),
    taste: todo("Для набора не требуется — подтвердить"),
    aroma: todo("Для набора не требуется — подтвердить"),
    story: {
      ua: "Набір для тих, хто ще обирає свій IZUMI, і для подарунка.",
      cs: "Sada pro ty, kdo si své IZUMI teprve vybírají, a jako dárek.",
      ru: "Набор для тех, кто ещё выбирает свой IZUMI, и для подарка.",
      en: "For anyone still choosing their IZUMI, and for gifting.",
    },
    gallery: [images.mix, images.bothBoxes, images.doyFront],
    variants: mixVariants,
    defaultVariantId: "mix",
    related: ["izumi-classic", "izumi-ginger"],
    seo: {
      title: {
        ua: "IZUMI Mix Pack — набір гречаного чаю",
        cs: "IZUMI Mix Pack — sada pohankového čaje",
        ru: "IZUMI Mix Pack — набор гречишного чая",
        en: "IZUMI Mix Pack — buckwheat tea set",
      },
      description: {
        ua: "Набір гречаного чаю IZUMI у трьох форматах.",
        cs: "Sada pohankového čaje IZUMI ve třech podobách.",
        ru: "Набор гречишного чая IZUMI в трёх форматах.",
        en: "IZUMI buckwheat tea set in three formats.",
      },
      indexability: "index",
    },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getVariant = (product: Product, id: string | undefined) =>
  product.variants.find((v) => v.id === id) ?? product.variants.find((v) => v.id === product.defaultVariantId)!;
