import type { Localized, VideoReview } from "./types";

/**
 * Video endorsements published on izumitea.com home ("Звёзды о гречишном чае
 * IZUMI"), audit 2026-10-03. Order follows the current site.
 * TODO(client): confirm the usage rights are still valid for the new site.
 */
type Row = [id: string, youtubeId: string, field: VideoReview["field"], ua: string, en: string, ru: string, role: Localized];

const r = (ua: string, cs: string, ru: string, en: string): Localized => ({ ua, cs, ru, en });

const rows: Row[] = [
  ["shnypko", "Bi7SMc3CaLY", "media", "Альона Шнипко", "Alona Shnypko", "Алёна Шныпко", r("Актриса театру і кіно", "Divadelní a filmová herečka", "Актриса театра и кино", "Stage and film actress")],
  ["gordon", "U8qWbmwYToM", "media", "Дмитро Гордон", "Dmytro Gordon", "Дмитрий Гордон", r("Журналіст, ведучий", "Novinář, moderátor", "Журналист, ведущий", "Journalist and host")],
  ["kruk", "ovUxe3VN3Qs", "wellness", "Валерія Крук", "Valeriia Kruk", "Валерия Крук", r("Нутриціологиня, телеведуча, модель", "Nutriční poradkyně, moderátorka, modelka", "Нутрициолог, телеведущая, модель", "Nutritionist, TV host and model")],
  ["oliinyk", "y2s8FbeIpZw", "music", "Вадим Олійник", "Vadym Oliinyk", "Вадим Олейник", r("Музикант, співак, актор", "Hudebník, zpěvák, herec", "Музыкант, певец, актёр", "Musician, singer and actor")],
  ["zhosan", "njWE_DX6Q-Q", "fashion", "Каріна Жосан", "Karina Zhosan", "Карина Жосан", r("Модель, «Міс Україна Всесвіт 2018»", "Modelka, Miss Ukrajina Universe 2018", "Модель, «Мисс Украина Вселенная 2018»", "Model, Miss Ukraine Universe 2018")],
  ["horuna", "5hJ-Le4lJvI", "sport", "Станіслав Горуна", "Stanislav Horuna", "Станислав Горуна", r("Бронзовий призер Олімпіади 2020, карате", "Bronzový medailista z OH 2020, karate", "Бронзовый призёр Олимпиады 2020, карате", "Olympic bronze medallist 2020, karate")],
  ["prysiazhniuk", "wXTu48I6TcM", "public", "Михайло Присяжнюк", "Mykhailo Prysiazhniuk", "Михаил Присяжнюк", r("Адвокат, телеведучий", "Advokát, televizní moderátor", "Адвокат, телеведущий", "Lawyer and TV host")],
  ["shulhina", "a3GVFwpGmAo", "wellness", "Олександра Шульгіна", "Oleksandra Shulhina", "Александра Шульгина", r("Фітнес-тренерка, дієтологиня", "Fitness trenérka, dietoložka", "Фитнес-тренер, диетолог", "Fitness coach and dietitian")],
  ["kholodenko", "GHx1vPf9AV4", "wellness", "Наталія Холоденко", "Nataliia Kholodenko", "Наталья Холоденко", r("Психологиня, телеексперт", "Psycholožka, televizní expertka", "Психолог, телеэксперт", "Psychologist and TV expert")],
  ["balashova", "LvO_q358S4Y", "music", "Тереза Балашова (SoloXa)", "Tereza Balashova (SoloXa)", "Тереза Балашова (СолоХа)", r("Співачка, актриса, ведуча", "Zpěvačka, herečka, moderátorka", "Певица, актриса, ведущая", "Singer, actress and host")],
  ["lilu", "69Niz_1a0vU", "music", "LiLu SinGer", "LiLu SinGer", "LiLu SinGer", r("Співачка, актриса, ведуча", "Zpěvačka, herečka, moderátorka", "Певица, актриса, ведущая", "Singer, actress and host")],
  ["luna", "lPRqTnJKKKI", "music", "Христина Герасимова (LUNA)", "Khrystyna Herasymova (LUNA)", "Кристина Герасимова (LUNA)", r("Співачка, авторка пісень", "Zpěvačka, autorka písní", "Певица, автор песен", "Singer-songwriter")],
  ["rizatdinova", "Y5E6A6Vhbxc", "sport", "Ганна Різатдінова", "Hanna Rizatdinova", "Анна Ризатдинова", r("Гімнастка, бронзова призерка Олімпіади 2016", "Gymnastka, bronzová medailistka z OH 2016", "Гимнастка, бронзовый призёр Олимпиады 2016", "Gymnast, Olympic bronze medallist 2016")],
  ["dobrydneva", "yCXOHs37-2U", "music", "Анна Добриднєва", "Anna Dobrydnieva", "Анна Добрыднева", r("Співачка, авторка пісень", "Zpěvačka, autorka písní", "Певица, автор песен", "Singer-songwriter")],
  ["ognevich", "HBzPpOIt7dg", "music", "Злата Огнєвіч", "Zlata Ognevich", "Злата Огневич", r("Співачка, телеведуча", "Zpěvačka, moderátorka", "Певица, телеведущая", "Singer and TV host")],
  ["mozolieva", "QLf3bB01ZLk", "fashion", "Олена Мозолєва", "Olena Mozolieva", "Елена Мозолева", r("Модель, «Міс Європа 2012»", "Modelka, Miss Evropa 2012", "Модель, «Мисс Европа 2012»", "Model, Miss Europe 2012")],
  ["yatsechko", "pE8CX8jn2oY", "media", "Анатолій Яцечко", "Anatolii Yatsechko", "Анатолий Яцечко", r("Радіоведучий, шоумен", "Rozhlasový moderátor, showman", "Радиоведущий, шоумен", "Radio host and showman")],
  ["pash", "9zVPzVqe53g", "music", "Аліна Паш", "Alina Pash", "Алина Паш", r("Співачка, авторка пісень, актриса", "Zpěvačka, autorka písní, herečka", "Певица, автор песен, актриса", "Singer-songwriter and actress")],
  ["halai", "JQb4Rf012ew", "sport", "Ірина Галай", "Iryna Halai", "Ирина Галай", r("Альпіністка, перша українка на Евересті та K2", "Horolezkyně, první Ukrajinka na Everestu a K2", "Альпинистка, первая украинка на Эвересте и K2", "Mountaineer, first Ukrainian woman on Everest and K2")],
  ["zvonov", "RWIgA823J8w", "sport", "Максим Звонов", "Maksym Zvonov", "Максим Звонов", r("Баскетболіст", "Basketbalista", "Баскетболист", "Basketball player")],
  ["zotko", "EA7i0JWKJL8", "sport", "Іван Зотько", "Ivan Zotko", "Иван Зотько", r("Футболіст", "Fotbalista", "Футболист", "Footballer")],
  ["suvorova", "VdwDdRs7l_g", "music", "Дарія Суворова", "Dariia Suvorova", "Дарья Суворова", r("Авторка й виконавиця пісень", "Autorka a interpretka písní", "Автор и исполнитель песен", "Singer-songwriter")],
  ["kryvenko", "bihYXaQRNDM", "sport", "Дмитро Кривенко", "Dmytro Kryvenko", "Дмитрий Кривенко", r("Баскетболіст, чемпіон світу зі слем-данку", "Basketbalista, mistr světa ve smečování", "Баскетболист, чемпион мира по слэм-данкам", "Basketball player, slam-dunk world champion")],
  ["karashchuk", "1qasOlq7Zik", "music", "Владислав Каращук", "Vladyslav Karashchuk", "Владислав Каращук", r("Співак, композитор", "Zpěvák, skladatel", "Певец, композитор", "Singer and composer")],
  ["polishchuk", "BxA_52_r7u0", "media", "Антон Поліщук", "Anton Polishchuk", "Антон Полищук", r("Телеведучий, шоумен", "Televizní moderátor, showman", "Телеведущий, шоумен", "TV host and showman")],
  ["andreieva", "srghku_yt0c", "media", "Яніна Андреєва", "Yanina Andreieva", "Янина Андреева", r("Актриса, теле- і радіоведуча", "Herečka, televizní a rozhlasová moderátorka", "Актриса, теле- и радиоведущая", "Actress, TV and radio host")],
  ["demin", "NgK7SqaVV60", "media", "Слава Дьомін", "Slava Demin", "Слава Демин", r("Радіоведучий", "Rozhlasový moderátor", "Радиоведущий", "Radio host")],
  ["sytnyk", "V19jBTL8L2Y", "music", "Влад Ситник", "Vlad Sytnyk", "Влад Сытник", r("Співак", "Zpěvák", "Певец", "Singer")],
  ["gasanova", "kc5hgtmBc_c", "fashion", "Ельвіра Гасанова", "Elvira Gasanova", "Эльвира Гасанова", r("Дизайнерка, засновниця бренду GASANOVA", "Návrhářka, zakladatelka značky GASANOVA", "Дизайнер, основательница бренда GASANOVA", "Designer, founder of GASANOVA")],
  ["kniaziev", "c06bVdahA1A", "media", "Ярослав Князєв", "Yaroslav Kniaziev", "Ярослав Князев", r("Актор, шоумен", "Herec, showman", "Актёр, шоумен", "Actor and showman")],
  ["kvasha", "b64ZHmyyuPA", "sport", "Ілля Кваша", "Illia Kvasha", "Илья Кваша", r("Стрибун у воду, бронзовий призер Олімпіади 2008", "Skokan do vody, bronzový medailista z OH 2008", "Прыгун в воду, бронзовый призёр Олимпиады 2008", "Diver, Olympic bronze medallist 2008")],
  ["kola", "Sun3nLxN3YE", "music", "Анастасія Прудіус (KOLA)", "Anastasiia Prudius (KOLA)", "Анастасия Прудиус (KOLA)", r("Співачка, авторка пісень", "Zpěvačka, autorka písní", "Певица, автор песен", "Singer-songwriter")],
];

export const videoReviews: VideoReview[] = rows.map(([id, youtubeId, field, ua, en, ru, role]) => ({
  id,
  youtubeId,
  field,
  name: { ua, ru, en, cs: en },
  role,
}));

export const reviewFields: { id: VideoReview["field"]; label: Localized }[] = [
  { id: "sport", label: r("Спорт", "Sport", "Спорт", "Sport") },
  { id: "music", label: r("Музика", "Hudba", "Музыка", "Music") },
  { id: "media", label: r("Телебачення, радіо, кіно", "Televize, rozhlas, film", "Телевидение, радио, кино", "TV, radio and film") },
  { id: "wellness", label: r("Харчування й психологія", "Výživa a psychologie", "Питание и психология", "Nutrition and psychology") },
  { id: "fashion", label: r("Мода", "Móda", "Мода", "Fashion") },
  { id: "public", label: r("Суспільство", "Veřejný život", "Общество", "Public life") },
];

/** Shown on the home page. */
export const featuredReviewIds = ["halai", "rizatdinova", "pash", "gordon"];
