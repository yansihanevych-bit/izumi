import type { City } from "./types";

/**
 * All 34 city slugs from /ua/shops/[city], kept verbatim (including legacy
 * spellings like "dnieper", "symi", "luck") so every 301 is one hop.
 * A city gets its own page only when it has a verified store (publish-state).
 */
const rows: [slug: string, ua: string, cs: string, ru: string, en: string][] = [
  ["kyiv", "Київ", "Kyjev", "Киев", "Kyiv"],
  ["kharkiv", "Харків", "Charkov", "Харьков", "Kharkiv"],
  ["dnieper", "Дніпро", "Dnipro", "Днепр", "Dnipro"],
  ["lviv", "Львів", "Lvov", "Львов", "Lviv"],
  ["odesa", "Одеса", "Oděsa", "Одесса", "Odesa"],
  ["kherson", "Херсон", "Cherson", "Херсон", "Kherson"],
  ["chernihiv", "Чернігів", "Černihiv", "Чернигов", "Chernihiv"],
  ["cherkasy", "Черкаси", "Čerkasy", "Черкассы", "Cherkasy"],
  ["chernivtsi", "Чернівці", "Černivci", "Черновцы", "Chernivtsi"],
  ["zaporizhzhia", "Запоріжжя", "Záporoží", "Запорожье", "Zaporizhzhia"],
  ["zhytomyr", "Житомир", "Žytomyr", "Житомир", "Zhytomyr"],
  ["irpin", "Ірпінь", "Irpiň", "Ирпень", "Irpin"],
  // Renamed to Samar in 2024; display name to confirm with the client.
  ["novomoskovsk", "Самар", "Samar", "Самар", "Samar"],
  ["poltava", "Полтава", "Poltava", "Полтава", "Poltava"],
  ["krivoy-rog", "Кривий Ріг", "Kryvyj Rih", "Кривой Рог", "Kryvyi Rih"],
  ["nikolaev", "Миколаїв", "Mykolajiv", "Николаев", "Mykolaiv"],
  ["uzhgorod", "Ужгород", "Užhorod", "Ужгород", "Uzhhorod"],
  ["vinnytsia", "Вінниця", "Vinnycja", "Винница", "Vinnytsia"],
  ["ternopil", "Тернопіль", "Ternopil", "Тернополь", "Ternopil"],
  ["ivano-frankivsk", "Івано-Франківськ", "Ivano-Frankivsk", "Ивано-Франковск", "Ivano-Frankivsk"],
  ["alexandria", "Олександрія", "Oleksandrija", "Александрия", "Oleksandriia"],
  ["boryspil", "Бориспіль", "Boryspil", "Борисполь", "Boryspil"],
  ["brovari", "Бровари", "Brovary", "Бровары", "Brovary"],
  ["symi", "Суми", "Sumy", "Сумы", "Sumy"],
  ["rivne", "Рівне", "Rivne", "Ровно", "Rivne"],
  ["bila-tserkva", "Біла Церква", "Bila Cerkva", "Белая Церковь", "Bila Tserkva"],
  ["kremenchug", "Кременчук", "Kremenčuk", "Кременчуг", "Kremenchuk"],
  ["slavyansk", "Слов'янськ", "Slovjansk", "Славянск", "Sloviansk"],
  ["severodonetsk", "Сєвєродонецьк", "Sjevjerodoněck", "Северодонецк", "Sievierodonetsk"],
  ["mariupol", "Маріуполь", "Mariupol", "Мариуполь", "Mariupol"],
  ["kropivnicky", "Кропивницький", "Kropyvnyckyj", "Кропивницкий", "Kropyvnytskyi"],
  ["kosov", "Косів", "Kosiv", "Косов", "Kosiv"],
  ["kovel", "Ковель", "Kovel", "Ковель", "Kovel"],
  ["luck", "Луцьк", "Luck", "Луцк", "Lutsk"],
];

export const cities: City[] = rows.map(([slug, ua, cs, ru, en]) => ({ slug, name: { ua, cs, ru, en } }));
export const citySlugs = cities.map((c) => c.slug);
