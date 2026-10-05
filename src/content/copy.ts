/**
 * Interface strings and page copy, in all four languages.
 * Facts used here come from the audit; anything unconfirmed lives in
 * ClientValue fields of the content files instead.
 */
import type { Localized, PageKey, Seo } from "./types";

const L = (ua: string, cs: string, ru: string, en: string): Localized => ({ ua, cs, ru, en });

export const copy = {
  cursor: {
    view: L("Дивитися", "Zobrazit", "Смотреть", "View"),
    explore: L("Детальніше", "Prozkoumat", "Подробнее", "Explore"),
    play: L("Грати", "Přehrát", "Играть", "Play"),
  },

  /** Home scenes added for the motion pass. All facts come from the audit. */
  scenes: {
    kinetic: {
      tea: L("гречаний чай", "pohankový čaj", "гречишный чай", "buckwheat tea"),
      minutes: L("3 хвилини", "3 minuty", "3 минуты", "3 minutes"),
      brews: L("3 заварювання", "3 nálevy", "3 заваривания", "3 brews"),
    },
    scrollHint: L("Гортайте", "Posouvejte", "Листайте", "Scroll"),
    teaStory: {
      title: L("Шлях до чашки", "Cesta do šálku", "Путь к чашке", "From grain to cup"),
      steps: [
        {
          title: L("Одне зерно", "Jedno zrno", "Одно зерно", "A single grain"),
          body: L("Насіння татарської гречки, зібране вручну.", "Semeno pohanky tatarské, sesbírané ručně.", "Семя татарской гречихи, собранное вручную.", "A Tartary buckwheat seed, picked by hand."),
        },
        {
          title: L("Вище 1500 метрів", "Nad 1500 metry", "Выше 1500 метров", "Above 1,500 metres"),
          body: L("Ця гречка росте в горах.", "Tato pohanka roste v horách.", "Эта гречиха растёт в горах.", "This buckwheat grows in the mountains."),
        },
        {
          title: L("Спресоване в гранули", "Lisované do granulí", "Спрессовано в гранулы", "Pressed into granules"),
          body: L("Щоб зберегти властивості зерна й заварювати просто в чашці.", "Aby si zrno zachovalo vlastnosti a dalo se připravit přímo v šálku.", "Чтобы сохранить свойства зерна и заваривать прямо в чашке.", "To keep the grain intact and brew it right in the cup."),
        },
        {
          title: L("Гаряча вода, 90–95 °C", "Horká voda, 90–95 °C", "Горячая вода, 90–95 °C", "Hot water, 90–95 °C"),
          body: L("Гранули опускаються на дно й не спливають.", "Granule klesnou na dno a nevyplavou.", "Гранулы опускаются на дно и не всплывают.", "The granules sink and stay at the bottom."),
        },
        {
          title: L("Бурштиновий настій", "Jantarový nálev", "Янтарный настой", "An amber infusion"),
          body: L("Ніжний, з легкою солодкістю й ароматом вівсяного печива.", "Jemný, lehce nasládlý, s vůní ovesných sušenek.", "Нежный, с лёгкой сладостью и ароматом овсяного печенья.", "Gentle, lightly sweet, with an oatmeal-cookie aroma."),
        },
      ],
    },
    brew: {
      title: L("Заварювання", "Příprava", "Заваривание", "The brew"),
      timer: L("хв", "min", "мин", "min"),
      rounds: [
        L("Перше заварювання: насичений бурштин", "První nálev: sytý jantar", "Первое заваривание: насыщенный янтарь", "First brew: deep amber"),
        L("Друге: той самий смак", "Druhý: stejná chuť", "Второе: тот же вкус", "Second: the same taste"),
        L("Третє: на тих самих гранулах", "Třetí: na stejných granulích", "Третье: на тех же гранулах", "Third: on the same granules"),
      ],
    },
    whyHint: L("Чотири причини", "Čtyři důvody", "Четыре причины", "Four reasons"),
    whyBig: [
      L("1500 м", "1500 m", "1500 м", "1,500 m"),
      L("0 кофеїну", "0 kofeinu", "0 кофеина", "0 caffeine"),
      L("0 пакетиків", "0 sáčků", "0 пакетиков", "0 tea bags"),
      L("×3", "×3", "×3", "×3"),
    ],
  },
  skip: L("Перейти до вмісту", "Přejít k obsahu", "Перейти к содержимому", "Skip to content"),
  preview: L(
    "Попередній перегляд нового сайту. Ціни та частина даних демонстраційні, оплата не підключена.",
    "Náhled nového webu. Ceny a část údajů jsou ukázkové, platba není zapojena.",
    "Предварительный просмотр нового сайта. Цены и часть данных демонстрационные, оплата не подключена.",
    "Preview of the new site. Prices and some details are placeholders; payment is not connected.",
  ),

  nav: {
    shop: L("Магазин", "Obchod", "Магазин", "Shop"),
    tea: L("Чай", "Čaj", "Чай", "Tea"),
    story: L("Історія", "Příběh", "История", "Story"),
    brewing: L("Заварювання", "Příprava", "Заваривание", "Brewing"),
    whereToBuy: L("Де купити", "Kde koupit", "Где купить", "Where to buy"),
    reviews: L("Відгуки", "Recenze", "Отзывы", "Reviews"),
    faq: L("Питання", "Otázky", "Вопросы", "FAQ"),
    contacts: L("Контакти", "Kontakty", "Контакты", "Contact"),
    delivery: L("Доставка й оплата", "Doprava a platba", "Доставка и оплата", "Delivery and payment"),
    allProducts: L("Усі товари", "Všechny produkty", "Все товары", "All products"),
    whatIs: L("Що таке гречаний чай", "Co je pohankový čaj", "Что такое гречишный чай", "What is buckwheat tea"),
    taste: L("Смак і аромат", "Chuť a vůně", "Вкус и аромат", "Taste and aroma"),
    menu: L("Меню", "Menu", "Меню", "Menu"),
    close: L("Закрити", "Zavřít", "Закрыть", "Close"),
    home: L("Головна", "Úvod", "Главная", "Home"),
    language: L("Мова", "Jazyk", "Язык", "Language"),
    currency: L("Валюта", "Měna", "Валюта", "Currency"),
    sets: L("Набори", "Sady", "Наборы", "Sets"),
  },

  cart: {
    open: L("Кошик", "Košík", "Корзина", "Cart"),
    title: L("Кошик", "Košík", "Корзина", "Your cart"),
    empty: L(
      "Кошик порожній. Почніть з IZUMI Classic — це найпростіший спосіб познайомитися з чаєм.",
      "Košík je prázdný. Začněte s IZUMI Classic, je to nejjednodušší způsob, jak čaj poznat.",
      "Корзина пуста. Начните с IZUMI Classic — это самый простой способ познакомиться с чаем.",
      "Your cart is empty. Start with IZUMI Classic, the simplest way to get to know the tea.",
    ),
    toShop: L("Перейти в магазин", "Přejít do obchodu", "Перейти в магазин", "Go to the shop"),
    subtotal: L("Разом", "Mezisoučet", "Итого", "Subtotal"),
    shippingNote: L(
      "Доставка розраховується під час оформлення.",
      "Doprava se spočítá v pokladně.",
      "Доставка рассчитывается при оформлении.",
      "Delivery is calculated at checkout.",
    ),
    checkout: L("Оформити замовлення", "Pokračovat k pokladně", "Оформить заказ", "Go to checkout"),
    remove: L("Видалити", "Odebrat", "Удалить", "Remove"),
    added: L("Додано в кошик", "Přidáno do košíku", "Добавлено в корзину", "Added to cart"),
    decrease: L("Менше", "Méně", "Меньше", "Decrease"),
    increase: L("Більше", "Více", "Больше", "Increase"),
    quantity: L("Кількість", "Množství", "Количество", "Quantity"),
  },

  product: {
    addToCart: L("Додати в кошик", "Přidat do košíku", "Добавить в корзину", "Add to cart"),
    unavailable: L("Ціна уточнюється", "Cena se upřesňuje", "Цена уточняется", "Price coming soon"),
    choosePack: L("Упаковка", "Balení", "Упаковка", "Pack"),
    details: L("Про продукт", "O produktu", "О продукте", "About this tea"),
    ingredients: L("Склад", "Složení", "Состав", "Ingredients"),
    taste: L("Смак", "Chuť", "Вкус", "Taste"),
    aroma: L("Аромат", "Vůně", "Аромат", "Aroma"),
    brewing: L("Заварювання", "Příprava", "Заваривание", "Brewing"),
    weight: L("Вага", "Hmotnost", "Вес", "Weight"),
    why: L("Навіщо цей чай", "Proč tento čaj", "Зачем этот чай", "Why this tea"),
    related: L("Також спробуйте", "Ochutnejte také", "Также попробуйте", "You may also like"),
    from: L("від", "od", "от", "from"),
    view: L("Детальніше", "Detail", "Подробнее", "View"),
    gallery: L("Фото продукту", "Fotografie produktu", "Фото продукта", "Product photos"),
    showImage: L("Показати фото", "Zobrazit fotku", "Показать фото", "Show photo"),
    grams: L("г", "g", "г", "g"),
  },

  home: {
    heroLead: L(
      "Гречаний чай з гранул татарської гречки, вирощеної в горах вище 1500 метрів. Ложка в чашку, гаряча вода, три хвилини.",
      "Pohankový čaj z granulí pohanky tatarské, pěstované v horách nad 1500 metry. Lžička do šálku, horká voda, tři minuty.",
      "Гречишный чай из гранул татарской гречихи, выращенной в горах выше 1500 метров. Ложка в чашку, горячая вода, три минуты.",
      "Buckwheat tea made from granules of Tartary buckwheat grown above 1,500 metres. A spoonful in a cup, hot water, three minutes.",
    ),
    heroTitle: L("Гречаний чай з гір", "Pohankový čaj z hor", "Гречишный чай с гор", "Buckwheat tea from the mountains"),
    shop: L("Купити чай", "Koupit čaj", "Купить чай", "Shop tea"),
    discover: L("Що таке IZUMI", "Co je IZUMI", "Что такое IZUMI", "Discover IZUMI"),
    introTitle: L("Не листя, а зерно", "Ne lístky, ale zrno", "Не лист, а зерно", "Not leaves, but grain"),
    introBody: L(
      "IZUMI роблять з насіння гречки, яке збирають вручну й пресують у гранули. У чашці вони дають ніжний бурштиновий настій з ароматом вівсяного печива, без кофеїну.",
      "IZUMI se vyrábí ze semen pohanky, která se sbírají ručně a lisují do granulí. V šálku vytvoří jemný jantarový nálev s vůní ovesných sušenek, bez kofeinu.",
      "IZUMI делают из семян гречихи, которые собирают вручную и прессуют в гранулы. В чашке они дают нежный янтарный настой с ароматом овсяного печенья, без кофеина.",
      "IZUMI is made from buckwheat seeds, harvested by hand and pressed into granules. In the cup they give a gentle amber infusion with an oatmeal-cookie aroma, and no caffeine.",
    ),
    introCta: L("Більше про чай", "Více o čaji", "Больше о чае", "More about the tea"),
    ritualTitle: L("Три хвилини на чашку", "Tři minuty na šálek", "Три минуты на чашку", "Three minutes to a cup"),
    ritualSteps: [
      L("Ложка гранул, 3–5 г", "Lžička granulí, 3–5 g", "Ложка гранул, 3–5 г", "A spoonful of granules, 3–5 g"),
      L("200 мл води, 90–95 °C", "200 ml vody, 90–95 °C", "200 мл воды, 90–95 °C", "200 ml of water at 90–95 °C"),
      L("Три хвилини", "Tři minuty", "Три минуты", "Three minutes"),
      L("І ще двічі на тих самих гранулах", "A ještě dvakrát na stejných granulích", "И ещё дважды на тех же гранулах", "Then twice more on the same granules"),
    ],
    ritualCta: L("Як заварювати", "Jak připravit", "Как заваривать", "How to brew"),
    whyTitle: L("Чим IZUMI відрізняється", "Čím je IZUMI jiné", "Чем IZUMI отличается", "What makes IZUMI different"),
    why: [
      {
        title: L("Гречка з гір", "Pohanka z hor", "Гречиха с гор", "Mountain buckwheat"),
        body: L("Татарська гречка росте вище 1500 метрів і збирається вручну.", "Pohanka tatarská roste nad 1500 metry a sbírá se ručně.", "Татарская гречиха растёт выше 1500 метров и собирается вручную.", "Tartary buckwheat grown above 1,500 metres and harvested by hand."),
      },
      {
        title: L("Без кофеїну", "Bez kofeinu", "Без кофеина", "Caffeine-free"),
        body: L("Можна пити зранку, вдень і ввечері.", "Můžete ho pít ráno, přes den i večer.", "Можно пить утром, днём и вечером.", "Morning, afternoon or evening."),
      },
      {
        title: L("Без пакетиків", "Bez sáčků", "Без пакетиков", "No bags"),
        body: L("Гранули засипають просто в чашку, вони лежать на дні.", "Granule se sypou rovnou do šálku a zůstanou na dně.", "Гранулы засыпают прямо в чашку, они лежат на дне.", "Granules go straight in the cup and stay at the bottom."),
      },
      {
        title: L("До трьох заварювань", "Až tři nálevy", "До трёх завариваний", "Up to three brews"),
        body: L("Одна порція — до трьох чашок.", "Jedna porce, až tři šálky.", "Одна порция — до трёх чашек.", "One portion, up to three cups."),
      },
    ],
    productsTitle: L("Обрати свій IZUMI", "Vyberte si své IZUMI", "Выбрать свой IZUMI", "Choose your IZUMI"),
    storyTitle: L("Чай за справедливою ціною", "Čaj za férovou cenu", "Чай по справедливой цене", "Tea at a fair price"),
    storyBody: L(
      "IZUMI сам виробляє й продає свій чай. Мета проста: щоб кожен міг пити натуральний, якісний і смачний чай за справедливою ціною.",
      "IZUMI svůj čaj samo vyrábí i prodává. Cíl je prostý: aby každý mohl pít přírodní, kvalitní a chutný čaj za férovou cenu.",
      "IZUMI сам производит и продаёт свой чай. Цель простая: чтобы каждый мог пить натуральный, качественный и вкусный чай по справедливой цене.",
      "IZUMI makes and sells its own tea. The aim is simple: natural, good, tasty tea that anyone can drink at a fair price.",
    ),
    storyCta: L("Наша історія", "Náš příběh", "Наша история", "Our story"),
    proofTitle: L("32 людини розповіли про IZUMI на відео", "32 lidí mluví o IZUMI na videu", "32 человека рассказали об IZUMI на видео", "32 people talk about IZUMI on video"),
    proofBody: L(
      "Олімпійські призери, музиканти, ведучі й альпіністка, яка підкорила Еверест.",
      "Olympijští medailisté, hudebníci, moderátoři i horolezkyně, která zdolala Everest.",
      "Олимпийские призёры, музыканты, ведущие и альпинистка, покорившая Эверест.",
      "Olympic medallists, musicians, hosts, and a mountaineer who climbed Everest.",
    ),
    proofCta: L("Усі відгуки", "Všechny recenze", "Все отзывы", "See all reviews"),
    buyTitle: L("Де купити", "Kde koupit", "Где купить", "Where to buy"),
    buyOnline: L("Онлайн", "Online", "Онлайн", "Online"),
    buyOnlineBody: L("У цьому магазині, з доставкою.", "V tomto obchodě, s doručením.", "В этом магазине, с доставкой.", "Right here, delivered."),
    buyOffline: L("У кав'ярнях і магазинах", "V kavárnách a obchodech", "В кофейнях и магазинах", "In cafés and shops"),
    buyOfflineBody: L(
      "Список точок оновлюється.",
      "Seznam míst aktualizujeme.",
      "Список точек обновляется.",
      "We're updating the list of locations.",
    ),
  },

  shop: {
    title: L("Магазин", "Obchod", "Магазин", "Shop"),
    lead: L(
      "Два смаки й набір. Doy pack — для дому, стіки — щоб узяти з собою.",
      "Dvě chuti a sada. Doy pack domů, sáčky s sebou.",
      "Два вкуса и набор. Doy pack — для дома, стики — чтобы взять с собой.",
      "Two flavours and a set. Doy packs for home, sticks to take with you.",
    ),
    sort: L("Сортувати", "Řadit", "Сортировать", "Sort"),
    sortDefault: L("Рекомендовані", "Doporučené", "Рекомендуемые", "Recommended"),
    sortPriceAsc: L("Спершу дешевші", "Od nejlevnějšího", "Сначала дешевле", "Price, low to high"),
    sortPriceDesc: L("Спершу дорожчі", "Od nejdražšího", "Сначала дороже", "Price, high to low"),
    filterAll: L("Усе", "Vše", "Всё", "All"),
    filterTea: L("Чай", "Čaj", "Чай", "Tea"),
    filterSets: L("Набори", "Sady", "Наборы", "Sets"),
    packs: L("упаковки", "balení", "упаковки", "packs"),
  },

  tea: {
    title: L("Що таке гречаний чай", "Co je pohankový čaj", "Что такое гречишный чай", "What is buckwheat tea"),
    lead: L(
      "Напій із насіння гречки, а не з чайного листя. Ось з чого роблять IZUMI і чого чекати від чашки.",
      "Nápoj ze semen pohanky, ne z čajových lístků. Z čeho se IZUMI vyrábí a co čekat od šálku.",
      "Напиток из семян гречихи, а не из чайного листа. Вот из чего делают IZUMI и чего ждать от чашки.",
      "A drink made from buckwheat seeds, not tea leaves. Here's what IZUMI is made of and what to expect in the cup.",
    ),
    sections: [
      {
        title: L("З чого", "Z čeho", "Из чего", "Made from"),
        body: L(
          "З насіння татарської гречки. Вона росте в горах на висоті понад 1500 метрів, і її збирають вручну.",
          "Ze semen pohanky tatarské. Roste v horách ve výšce přes 1500 metrů a sbírá se ručně.",
          "Из семян татарской гречихи. Она растёт в горах на высоте более 1500 метров, и её собирают вручную.",
          "Tartary buckwheat seeds. It grows in the mountains above 1,500 metres and is harvested by hand.",
        ),
      },
      {
        title: L("Як обробляють", "Jak se zpracovává", "Как обрабатывают", "How it's made"),
        body: L(
          "Насіння пресують у дрібні гранули. Так вони зберігають свої властивості й легко заварюються просто в чашці.",
          "Semena se lisují do drobných granulí. Tak si zachovají své vlastnosti a snadno se připraví přímo v šálku.",
          "Семена прессуют в мелкие гранулы. Так они сохраняют свои свойства и легко завариваются прямо в чашке.",
          "The seeds are pressed into small granules. That keeps them intact and lets them brew right in the cup.",
        ),
      },
      {
        title: L("Який на смак", "Jak chutná", "Какой на вкус", "Taste"),
        body: L(
          "Ніжний, з легкою солодкістю. Аромат нагадує вівсяне печиво.",
          "Jemný, lehce nasládlý. Vůně připomíná ovesné sušenky.",
          "Нежный, с лёгкой сладостью. Аромат напоминает овсяное печенье.",
          "Gentle and lightly sweet, with an aroma that recalls oatmeal cookies.",
        ),
      },
      {
        title: L("Як виглядає", "Jak vypadá", "Как выглядит", "Look"),
        body: L(
          "Настій бурштинового кольору. Гранули не розчиняються й не спливають, а спокійно лежать на дні чашки.",
          "Nálev má jantarovou barvu. Granule se nerozpouštějí ani neplavou, klidně leží na dně šálku.",
          "Настой янтарного цвета. Гранулы не растворяются и не всплывают, а спокойно лежат на дне чашки.",
          "An amber infusion. The granules neither dissolve nor float; they rest at the bottom of the cup.",
        ),
      },
      {
        title: L("Без кофеїну", "Bez kofeinu", "Без кофеина", "No caffeine"),
        body: L(
          "У гречці немає кофеїну, тому чашку IZUMI можна випити в будь-який час дня.",
          "Pohanka neobsahuje kofein, takže si šálek IZUMI můžete dát kdykoli během dne.",
          "В гречихе нет кофеина, поэтому чашку IZUMI можно выпить в любое время дня.",
          "Buckwheat has no caffeine, so a cup of IZUMI works at any time of day.",
        ),
      },
    ],
    whyTitle: L("Чому IZUMI", "Proč IZUMI", "Почему IZUMI", "Why IZUMI"),
    whyBody: L(
      "Ми самі виробляємо й продаємо свій чай, і це лише гречаний чай. Одна порція заварюється до трьох разів, а 100 г вистачає приблизно на 33 чашки.",
      "Svůj čaj sami vyrábíme i prodáváme, a je to jen pohankový čaj. Jedna porce vydrží až na tři nálevy a 100 g vystačí zhruba na 33 šálků.",
      "Мы сами производим и продаём свой чай, и это только гречишный чай. Одна порция заваривается до трёх раз, а 100 г хватает примерно на 33 чашки.",
      "We make and sell our own tea, and it's only buckwheat tea. One portion brews up to three times, and 100 g makes about 33 cups.",
    ),
  },

  brewing: {
    title: L("Як заварювати IZUMI", "Jak připravit IZUMI", "Как заваривать IZUMI", "How to brew IZUMI"),
    lead: L(
      "Чайник не потрібен: гранули заварюються просто в чашці.",
      "Konvička není potřeba, granule se připraví přímo v šálku.",
      "Чайник не нужен: гранулы завариваются прямо в чашке.",
      "No teapot needed: the granules brew right in the cup.",
    ),
    steps: [
      {
        title: L("Насипте чай", "Nasypte čaj", "Насыпьте чай", "Add the tea"),
        body: L("3–5 г гранул, це приблизно чайна ложка. Або один стік.", "3–5 g granulí, zhruba lžička. Nebo jeden sáček.", "3–5 г гранул, это примерно чайная ложка. Или один стик.", "3–5 g of granules, about a teaspoon. Or one stick."),
      },
      {
        title: L("Залийте воду", "Zalijte vodou", "Залейте воду", "Add water"),
        body: L("200 мл води температурою 90–95 °C. Не окропом: дайте чайнику постояти хвилину після закипання.", "200 ml vody o teplotě 90–95 °C. Ne vroucí: nechte konvici po uvaření minutu odstát.", "200 мл воды температурой 90–95 °C. Не кипятком: дайте чайнику постоять минуту после закипания.", "200 ml of water at 90–95 °C. Not boiling: let the kettle rest for a minute after it boils."),
      },
      {
        title: L("Зачекайте", "Počkejte", "Подождите", "Wait"),
        body: L("Три хвилини. Гранули опустяться на дно, настій стане бурштиновим.", "Tři minuty. Granule klesnou na dno a nálev získá jantarovou barvu.", "Три минуты. Гранулы опустятся на дно, настой станет янтарным.", "Three minutes. The granules settle and the infusion turns amber."),
      },
      {
        title: L("Пийте", "Pijte", "Пейте", "Enjoy"),
        body: L("Просто з чашки, гранули залишаться на дні.", "Rovnou ze šálku, granule zůstanou na dně.", "Прямо из чашки, гранулы останутся на дне.", "Straight from the cup; the granules stay at the bottom."),
      },
      {
        title: L("Заваріть ще раз", "Zalijte znovu", "Заварите ещё раз", "Brew again"),
        body: L("Долийте гарячої води на ті самі гранули. Так можна ще двічі.", "Dolijte horkou vodu na stejné granule. Takhle ještě dvakrát.", "Долейте горячей воды на те же гранулы. Так можно ещё дважды.", "Top up the same granules with hot water. You can do this twice more."),
      },
    ],
    paramsTitle: L("Коротко", "Ve zkratce", "Коротко", "At a glance"),
    params: {
      dose: L("чаю", "čaje", "чая", "of tea"),
      water: L("води", "vody", "воды", "of water"),
      temp: L("температура", "teplota", "температура", "temperature"),
      time: L("настоювання", "louhování", "настаивание", "steeping"),
      brews: L("заварювання", "nálevy", "заваривания", "brews"),
      min: L("хв", "min", "мин", "min"),
      ml: L("мл", "ml", "мл", "ml"),
      upTo: L("до", "až", "до", "up to"),
    },
  },

  about: {
    title: L("Історія IZUMI", "Příběh IZUMI", "История IZUMI", "The IZUMI story"),
    lead: L(
      "IZUMI — виробник і продавець натурального гречаного чаю. Ми робимо одне й намагаємося робити це добре.",
      "IZUMI vyrábí a prodává přírodní pohankový čaj. Děláme jednu věc a snažíme se ji dělat dobře.",
      "IZUMI — производитель и продавец натурального гречишного чая. Мы делаем одно и стараемся делать это хорошо.",
      "IZUMI makes and sells natural buckwheat tea. We do one thing and try to do it well.",
    ),
    sections: {
      origin: {
        title: L("Звідки", "Odkud", "Откуда", "Origin"),
        body: L(
          "Татарська гречка для IZUMI росте в горах на висоті понад 1500 метрів. Насіння збирають вручну.",
          "Pohanka tatarská pro IZUMI roste v horách ve výšce přes 1500 metrů. Semena se sbírají ručně.",
          "Татарская гречиха для IZUMI растёт в горах на высоте более 1500 метров. Семена собирают вручную.",
          "The Tartary buckwheat for IZUMI grows in the mountains above 1,500 metres. The seeds are picked by hand.",
        ),
      },
      product: {
        title: L("Продукт", "Produkt", "Продукт", "The product"),
        body: L(
          "Ми не змішуємо гречку з чайним листям і не додаємо ароматизатори в Classic. Лише насіння, спресоване в гранули.",
          "Pohanku nemícháme s čajovými lístky a do Classic nepřidáváme aromata. Jen semena lisovaná do granulí.",
          "Мы не смешиваем гречиху с чайным листом и не добавляем ароматизаторы в Classic. Только семена, спрессованные в гранулы.",
          "No tea leaves and no flavourings in Classic. Just seeds, pressed into granules.",
        ),
      },
      process: {
        title: L("Процес", "Postup", "Процесс", "Process"),
        body: L(
          "Зібране насіння пресують у гранули, щоб зберегти його властивості, і фасують у doy pack та стіки.",
          "Sesbíraná semena se lisují do granulí, aby si zachovala své vlastnosti, a balí se do doy packů a sáčků.",
          "Собранные семена прессуют в гранулы, чтобы сохранить их свойства, и фасуют в doy pack и стики.",
          "The harvested seeds are pressed into granules to keep them intact, then packed into doy packs and sticks.",
        ),
      },
      philosophy: {
        title: L("Принцип", "Zásada", "Принцип", "Philosophy"),
        body: L(
          "Наша мета — щоб кожен міг пити натуральний, якісний, смачний чай за справедливою ціною.",
          "Chceme, aby každý mohl pít přírodní, kvalitní a chutný čaj za férovou cenu.",
          "Наша цель — чтобы каждый мог пить натуральный, качественный, вкусный чай по справедливой цене.",
          "Our aim: natural, good, tasty tea that anyone can drink at a fair price.",
        ),
      },
      today: {
        title: L("IZUMI сьогодні", "IZUMI dnes", "IZUMI сегодня", "IZUMI today"),
        body: L(
          "Чай IZUMI обирають тисячі покупців, десятки торговельних мереж і закладів у різних містах. Про нього на відео розповіли 32 відомі людини.",
          "Čaj IZUMI si vybírají tisíce zákazníků, desítky obchodních řetězců a podniků v různých městech. Na videu o něm mluví 32 známých osobností.",
          "Чай IZUMI выбирают тысячи покупателей, десятки торговых сетей и заведений в разных городах. О нём на видео рассказали 32 известных человека.",
          "Thousands of customers and dozens of retail chains and cafés in many cities choose IZUMI. 32 well-known people have talked about it on video.",
        ),
      },
    },
    foundingTodo: L(
      "Тут буде історія заснування: хто, коли і чому створив IZUMI.",
      "Zde bude příběh založení: kdo, kdy a proč IZUMI vytvořil.",
      "Здесь будет история основания: кто, когда и почему создал IZUMI.",
      "The founding story goes here: who started IZUMI, when and why.",
    ),
  },

  reviews: {
    title: L("Про IZUMI розповідають", "O IZUMI mluví", "Об IZUMI рассказывают", "People on IZUMI"),
    lead: L(
      "32 відомі людини записали відео про IZUMI. Натисніть на фото, щоб відкрити відео.",
      "32 známých osobností natočilo video o IZUMI. Klepnutím na fotku video spustíte.",
      "32 известных человека записали видео об IZUMI. Нажмите на фото, чтобы открыть видео.",
      "32 well-known people recorded a video about IZUMI. Tap a photo to play it.",
    ),
    play: L("Дивитися відео", "Přehrát video", "Смотреть видео", "Play video"),
  },

  whereToBuy: {
    title: L("Де купити IZUMI", "Kde koupit IZUMI", "Где купить IZUMI", "Where to buy IZUMI"),
    onlineTitle: L("Онлайн", "Online", "Онлайн", "Online"),
    onlineBody: L(
      "Замовляйте в нашому магазині: усі смаки й набори з доставкою.",
      "Objednejte v našem obchodě: všechny chuti a sady s doručením.",
      "Заказывайте в нашем магазине: все вкусы и наборы с доставкой.",
      "Order from our shop: every flavour and set, delivered.",
    ),
    offlineTitle: L("У кав'ярнях і магазинах", "V kavárnách a obchodech", "В кофейнях и магазинах", "In cafés and shops"),
    offlineBody: L(
      "Ми перевіряємо список точок продажу, щоб показувати лише ті, де IZUMI справді є. Бачили IZUMI в кав'ярні чи магазині? Напишіть нам.",
      "Ověřujeme seznam prodejních míst, abychom ukazovali jen ta, kde IZUMI opravdu mají. Viděli jste IZUMI v kavárně nebo obchodě? Napište nám.",
      "Мы проверяем список точек продаж, чтобы показывать только те, где IZUMI действительно есть. Видели IZUMI в кофейне или магазине? Напишите нам.",
      "We're verifying our list of stockists so we only show places that really have IZUMI. Seen IZUMI in a café or shop? Let us know.",
    ),
    cityFilter: L("Місто", "Město", "Город", "City"),
    cityEmpty: L(
      "У цьому місті ще немає перевірених точок. Замовте онлайн.",
      "V tomto městě zatím nemáme ověřená místa. Objednejte online.",
      "В этом городе пока нет проверенных точек. Закажите онлайн.",
      "No verified stockists in this city yet. Order online instead.",
    ),
    writeUs: L("Написати нам", "Napsat nám", "Написать нам", "Email us"),
    previewCities: L(
      "Міста зі старого сайту (дані не перевірені, показано лише в попередньому перегляді):",
      "Města ze starého webu (neověřené údaje, jen v náhledu):",
      "Города со старого сайта (данные не проверены, показано только в предпросмотре):",
      "Cities from the old site (unverified, shown in preview only):",
    ),
  },

  faq: {
    title: L("Питання та відповіді", "Otázky a odpovědi", "Вопросы и ответы", "Questions and answers"),
    more: L("Не знайшли відповідь?", "Nenašli jste odpověď?", "Не нашли ответ?", "Didn't find your answer?"),
  },

  delivery: {
    title: L("Доставка й оплата", "Doprava a platba", "Доставка и оплата", "Delivery and payment"),
    body: L(
      "Ми готуємо умови доставки по Чехії та ЄС і способи оплати в кронах і євро. Щойно все буде готово, тут з'являться терміни, вартість і правила повернення.",
      "Připravujeme podmínky doručení po Česku a EU a platby v korunách a eurech. Jakmile bude vše hotové, najdete zde lhůty, ceny a pravidla vrácení.",
      "Мы готовим условия доставки по Чехии и ЕС и способы оплаты в кронах и евро. Как только всё будет готово, здесь появятся сроки, стоимость и правила возврата.",
      "We're setting up delivery across Czechia and the EU, with payment in CZK and EUR. Delivery times, costs and returns will appear here once ready.",
    ),
    questions: L("Питання щодо замовлення:", "Dotazy k objednávce:", "Вопросы по заказу:", "Questions about an order:"),
  },

  contacts: {
    title: L("Контакти", "Kontakty", "Контакты", "Contact"),
    lead: L(
      "Пишіть або телефонуйте: відповімо щодо замовлень, оптових закупівель і співпраці.",
      "Napište nebo zavolejte: odpovíme na dotazy k objednávkám, velkoobchodu i spolupráci.",
      "Пишите или звоните: ответим по заказам, оптовым закупкам и сотрудничеству.",
      "Write or call about orders, wholesale or partnerships.",
    ),
    phone: L("Телефон", "Telefon", "Телефон", "Phone"),
    email: L("Пошта", "E-mail", "Почта", "Email"),
    hours: L("Години роботи", "Otevírací doba", "Часы работы", "Hours"),
    social: L("Instagram", "Instagram", "Instagram", "Instagram"),
    legal: L("Реквізити", "Fakturační údaje", "Реквизиты", "Company details"),
  },

  legal: {
    privacy: L("Політика конфіденційності", "Zásady ochrany osobních údajů", "Политика конфиденциальности", "Privacy policy"),
    offer: L("Публічна оферта", "Obchodní podmínky", "Публичная оферта", "Terms of sale"),
    returns: L("Повернення та обмін", "Vrácení a výměna", "Возврат и обмен", "Returns and exchanges"),
    pending: L(
      "Документ готується для продажів у Чехії та ЄС і з'явиться тут до запуску магазину.",
      "Dokument připravujeme pro prodej v Česku a EU a objeví se zde před spuštěním obchodu.",
      "Документ готовится для продаж в Чехии и ЕС и появится здесь до запуска магазина.",
      "This document is being prepared for sales in Czechia and the EU and will be published before the shop opens.",
    ),
  },

  checkout: {
    title: L("Оформлення замовлення", "Pokladna", "Оформление заказа", "Checkout"),
    contact: L("Контакти", "Kontakt", "Контакты", "Contact"),
    name: L("Ім'я та прізвище", "Jméno a příjmení", "Имя и фамилия", "Full name"),
    email: L("Пошта", "E-mail", "Почта", "Email"),
    phone: L("Телефон", "Telefon", "Телефон", "Phone"),
    address: L("Адреса доставки", "Doručovací adresa", "Адрес доставки", "Delivery address"),
    country: L("Країна", "Země", "Страна", "Country"),
    city: L("Місто", "Město", "Город", "City"),
    street: L("Вулиця, будинок, квартира", "Ulice a číslo", "Улица, дом, квартира", "Street and number"),
    zip: L("Індекс", "PSČ", "Индекс", "Postcode"),
    summary: L("Ваше замовлення", "Vaše objednávka", "Ваш заказ", "Your order"),
    pay: L("Оплатити", "Zaplatit", "Оплатить", "Pay"),
    notConnected: L(
      "Оплата ще не підключена, тому замовлення не буде надіслано. Це попередній перегляд.",
      "Platba zatím není zapojena, objednávka se proto neodešle. Jde o náhled.",
      "Оплата ещё не подключена, поэтому заказ не будет отправлен. Это предварительный просмотр.",
      "Payment isn't connected yet, so no order will be placed. This is a preview.",
    ),
    empty: L("Кошик порожній.", "Košík je prázdný.", "Корзина пуста.", "Your cart is empty."),
    successTitle: L("Дякуємо за замовлення", "Děkujeme za objednávku", "Спасибо за заказ", "Thank you for your order"),
    successBody: L("Ми надіслали підтвердження на вашу пошту.", "Potvrzení jsme poslali na váš e-mail.", "Мы отправили подтверждение на вашу почту.", "We've emailed you a confirmation."),
    failedTitle: L("Оплата не пройшла", "Platba neproběhla", "Оплата не прошла", "Payment didn't go through"),
    failedBody: L("Гроші не списано. Спробуйте ще раз або оберіть інший спосіб оплати.", "Peníze nebyly strženy. Zkuste to znovu nebo zvolte jiný způsob platby.", "Деньги не списаны. Попробуйте ещё раз или выберите другой способ оплаты.", "You haven't been charged. Try again or choose another payment method."),
    backToCart: L("Повернутися до кошика", "Zpět do košíku", "Вернуться в корзину", "Back to cart"),
  },

  notFound: {
    title: L("Такої сторінки немає", "Tato stránka neexistuje", "Такой страницы нет", "This page doesn't exist"),
    body: L(
      "Можливо, вона переїхала під час оновлення сайту. Почніть з магазину або з головної.",
      "Možná se při aktualizaci webu přesunula. Začněte v obchodě nebo na úvodní stránce.",
      "Возможно, она переехала при обновлении сайта. Начните с магазина или с главной.",
      "It may have moved when the site was updated. Try the shop or the home page.",
    ),
  },

  footer: {
    tagline: L(
      "Гречаний чай з гір. Без кофеїну, без пакетиків.",
      "Pohankový čaj z hor. Bez kofeinu, bez sáčků.",
      "Гречишный чай с гор. Без кофеина, без пакетиков.",
      "Buckwheat tea from the mountains. No caffeine, no bags.",
    ),
    shop: L("Магазин", "Obchod", "Магазин", "Shop"),
    learn: L("Про чай", "O čaji", "О чае", "The tea"),
    help: L("Допомога", "Pomoc", "Помощь", "Help"),
    rights: L("Усі права захищені.", "Všechna práva vyhrazena.", "Все права защищены.", "All rights reserved."),
  },
};

/** Per-page SEO. Unique titles and descriptions (the old site reused one everywhere). */
export const pageSeo: Record<PageKey, Seo> = {
  home: {
    title: L("IZUMI — гречаний чай з гір", "IZUMI — pohankový čaj z hor", "IZUMI — гречишный чай с гор", "IZUMI — buckwheat tea from the mountains"),
    description: copy.home.heroLead,
    indexability: "index",
  },
  shop: {
    title: L("Купити гречаний чай", "Koupit pohankový čaj", "Купить гречишный чай", "Shop buckwheat tea"),
    description: copy.shop.lead,
    indexability: "index",
  },
  tea: { title: copy.tea.title, description: copy.tea.lead, indexability: "index" },
  brewing: { title: copy.brewing.title, description: copy.brewing.lead, indexability: "index" },
  benefits: {
    title: L("Властивості", "Vlastnosti", "Свойства", "Benefits"),
    description: L("", "", "", ""),
    indexability: "unpublished",
  },
  about: { title: copy.about.title, description: copy.about.lead, indexability: "index" },
  reviews: { title: copy.reviews.title, description: copy.reviews.lead, indexability: "index" },
  whereToBuy: { title: copy.whereToBuy.title, description: copy.whereToBuy.onlineBody, indexability: "index" },
  faq: { title: copy.faq.title, description: copy.home.heroLead, indexability: "index" },
  delivery: { title: copy.delivery.title, description: copy.delivery.body, indexability: "noindex" },
  contacts: { title: copy.contacts.title, description: copy.contacts.lead, indexability: "index" },
  privacy: { title: copy.legal.privacy, description: copy.legal.pending, indexability: "noindex" },
  offer: { title: copy.legal.offer, description: copy.legal.pending, indexability: "noindex" },
  returns: { title: copy.legal.returns, description: copy.legal.pending, indexability: "noindex" },
  cart: { title: copy.cart.title, description: copy.cart.shippingNote, indexability: "noindex" },
  checkout: { title: copy.checkout.title, description: copy.checkout.notConnected, indexability: "noindex" },
};
