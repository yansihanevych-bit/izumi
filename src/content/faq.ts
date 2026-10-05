import type { FaqCategory, FaqItem, Localized } from "./types";

export const faqCategories: { id: FaqCategory; label: Localized }[] = [
  { id: "product", label: { ua: "Про чай", cs: "O čaji", ru: "О чае", en: "The tea" } },
  { id: "brewing", label: { ua: "Заварювання", cs: "Příprava", ru: "Заваривание", en: "Brewing" } },
  { id: "ingredients", label: { ua: "Склад", cs: "Složení", ru: "Состав", en: "Ingredients" } },
  { id: "storage", label: { ua: "Зберігання", cs: "Skladování", ru: "Хранение", en: "Storage" } },
  { id: "purchasing", label: { ua: "Покупка", cs: "Nákup", ru: "Покупка", en: "Buying" } },
  { id: "other", label: { ua: "Інше", cs: "Ostatní", ru: "Другое", en: "Other" } },
];

/**
 * Rewritten from the current site's FAQ. Removed: the "detox" answer and the
 * "no contraindications / unlimited" wording (see claims registry).
 */
export const faq: FaqItem[] = [
  {
    id: "what-is",
    category: "product",
    status: "confirmed",
    question: {
      ua: "Що таке гречаний чай IZUMI?",
      cs: "Co je pohankový čaj IZUMI?",
      ru: "Что такое гречишный чай IZUMI?",
      en: "What is IZUMI buckwheat tea?",
    },
    answer: {
      ua: "Це не чайне листя, а насіння татарської гречки, спресоване в гранули. Гранули заварюють гарячою водою, і виходить бурштиновий настій з ароматом вівсяного печива.",
      cs: "Nejde o čajové lístky, ale o semena pohanky tatarské lisovaná do granulí. Zalijí se horkou vodou a vznikne jantarový nálev s vůní ovesných sušenek.",
      ru: "Это не чайный лист, а семена татарской гречихи, спрессованные в гранулы. Гранулы заваривают горячей водой, и получается янтарный настой с ароматом овсяного печенья.",
      en: "It isn't tea leaves: it's Tartary buckwheat seeds pressed into granules. Steeped in hot water, they make an amber infusion that smells of oatmeal cookies.",
    },
  },
  {
    id: "taste",
    category: "product",
    status: "confirmed",
    question: {
      ua: "Який він на смак?",
      cs: "Jak chutná?",
      ru: "Какой он на вкус?",
      en: "What does it taste like?",
    },
    answer: {
      ua: "Ніжний, з легкою солодкістю, з ароматом вівсяного печива. Колір настою бурштиновий.",
      cs: "Jemně, lehce nasládle, s vůní ovesných sušenek. Nálev má jantarovou barvu.",
      ru: "Нежный, с лёгкой сладостью и ароматом овсяного печенья. Цвет настоя янтарный.",
      en: "Gentle and lightly sweet, with an oatmeal-cookie aroma and an amber colour.",
    },
  },
  {
    id: "ingredients",
    category: "ingredients",
    status: "confirmed",
    question: {
      ua: "Який склад?",
      cs: "Jaké je složení?",
      ru: "Какой состав?",
      en: "What is it made of?",
    },
    answer: {
      ua: "IZUMI Classic — це насіння татарської гречки, яку вирощують у горах вище 1500 метрів і збирають вручну. Насіння пресують у гранули, щоб зберегти його властивості.",
      cs: "IZUMI Classic tvoří semena pohanky tatarské, která roste v horách nad 1500 metry a sbírá se ručně. Semena se lisují do granulí, aby si zachovala své vlastnosti.",
      ru: "IZUMI Classic — это семена татарской гречихи, которую выращивают в горах выше 1500 метров и собирают вручную. Семена прессуют в гранулы, чтобы сохранить их свойства.",
      en: "IZUMI Classic is Tartary buckwheat seeds, grown in the mountains above 1,500 metres and harvested by hand. The seeds are pressed into granules to preserve them.",
    },
  },
  {
    id: "caffeine",
    category: "ingredients",
    status: "confirmed",
    question: {
      ua: "У ньому є кофеїн?",
      cs: "Obsahuje kofein?",
      ru: "В нём есть кофеин?",
      en: "Does it contain caffeine?",
    },
    answer: {
      ua: "Ні. У гречці немає кофеїну, тому IZUMI можна пити й увечері.",
      cs: "Ne. Pohanka kofein neobsahuje, takže IZUMI můžete pít i večer.",
      ru: "Нет. В гречихе нет кофеина, поэтому IZUMI можно пить и вечером.",
      en: "No. Buckwheat contains no caffeine, so you can drink IZUMI in the evening too.",
    },
  },
  {
    id: "how-to-brew",
    category: "brewing",
    status: "confirmed",
    question: {
      ua: "Як заварювати?",
      cs: "Jak ho připravit?",
      ru: "Как заваривать?",
      en: "How do I brew it?",
    },
    answer: {
      ua: "Насипте 3–5 г гранул (приблизно чайну ложку) у чашку, залийте 200 мл води температурою 90–95 °C і зачекайте 3 хвилини. Окропом краще не заливати. Пакетики й фільтр не потрібні.",
      cs: "Nasypte do šálku 3–5 g granulí (zhruba lžičku), zalijte 200 ml vody o teplotě 90–95 °C a počkejte 3 minuty. Vroucí vodou raději nezalévejte. Sáčky ani sítko nepotřebujete.",
      ru: "Насыпьте 3–5 г гранул (примерно чайную ложку) в чашку, залейте 200 мл воды температурой 90–95 °C и подождите 3 минуты. Кипятком лучше не заливать. Пакетики и фильтр не нужны.",
      en: "Put 3–5 g of granules (about a teaspoon) in a cup, pour 200 ml of water at 90–95 °C and wait 3 minutes. Avoid boiling water. No bags or strainer needed.",
    },
  },
  {
    id: "rebrew",
    category: "brewing",
    status: "confirmed",
    question: {
      ua: "Чи можна заварювати повторно?",
      cs: "Dá se zalít znovu?",
      ru: "Можно ли заваривать повторно?",
      en: "Can I brew it again?",
    },
    answer: {
      ua: "Так, одну порцію можна заварити до трьох разів. Просто долийте гарячої води на ті самі гранули.",
      cs: "Ano, jednu porci můžete zalít až třikrát. Stačí dolít horkou vodu na tytéž granule.",
      ru: "Да, одну порцию можно заварить до трёх раз. Просто долейте горячей воды на те же гранулы.",
      en: "Yes, one portion can be brewed up to three times. Just add hot water to the same granules.",
    },
  },
  {
    id: "how-long",
    category: "purchasing",
    status: "confirmed",
    question: {
      ua: "На скільки вистачає упаковки?",
      cs: "Na jak dlouho vydrží balení?",
      ru: "На сколько хватает упаковки?",
      en: "How long does a pack last?",
    },
    answer: {
      ua: "100 г — це близько 33 чашок по 3 г. Якщо заварювати кожну порцію тричі, виходить до 99 чашок.",
      cs: "100 g vystačí zhruba na 33 šálků po 3 g. Když každou porci zalijete třikrát, je to až 99 šálků.",
      ru: "100 г — это около 33 чашек по 3 г. Если заваривать каждую порцию трижды, получается до 99 чашек.",
      en: "100 g makes about 33 cups at 3 g each. Brew each portion three times and that's up to 99 cups.",
    },
  },
  {
    id: "pregnancy-children",
    category: "other",
    status: "confirmed",
    question: {
      ua: "Чи можна дітям, вагітним і жінкам, що годують?",
      cs: "Mohou ho pít děti, těhotné a kojící ženy?",
      ru: "Можно ли детям, беременным и кормящим?",
      en: "Is it suitable for children, or during pregnancy and breastfeeding?",
    },
    answer: {
      ua: "IZUMI не містить кофеїну. Але перед регулярним вживанням під час вагітності, годування груддю або для маленьких дітей порадьтеся з лікарем, як і з будь-яким новим напоєм.",
      cs: "IZUMI neobsahuje kofein. Před pravidelným pitím v těhotenství, při kojení nebo u malých dětí se ale poraďte s lékařem, stejně jako u každého nového nápoje.",
      ru: "IZUMI не содержит кофеина. Но перед регулярным употреблением во время беременности, кормления грудью или для маленьких детей посоветуйтесь с врачом, как и с любым новым напитком.",
      en: "IZUMI is caffeine-free. Still, check with a doctor before drinking it regularly during pregnancy or breastfeeding, or giving it to young children, as with any new drink.",
    },
  },
  {
    id: "storage",
    category: "storage",
    status: "todo",
    question: {
      ua: "Як зберігати чай?",
      cs: "Jak čaj skladovat?",
      ru: "Как хранить чай?",
      en: "How should I store it?",
    },
    answer: {
      ua: "У щільно закритій упаковці, в сухому прохолодному місці.",
      cs: "V dobře uzavřeném balení na suchém a chladném místě.",
      ru: "В плотно закрытой упаковке, в сухом прохладном месте.",
      en: "In a tightly closed pack, somewhere cool and dry.",
    },
  },
  {
    id: "delivery",
    category: "purchasing",
    status: "todo",
    question: {
      ua: "Куди ви доставляєте?",
      cs: "Kam doručujete?",
      ru: "Куда вы доставляете?",
      en: "Where do you deliver?",
    },
    answer: {
      ua: "Умови доставки по Чехії та ЄС уточнюються.",
      cs: "Podmínky doručení po Česku a EU upřesňujeme.",
      ru: "Условия доставки по Чехии и ЕС уточняются.",
      en: "Delivery terms for Czechia and the EU are being finalised.",
    },
  },
];
