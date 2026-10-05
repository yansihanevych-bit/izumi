import { confirmed, todo, type ClientValue, type Localized } from "./types";

export const organization = {
  brand: "IZUMI",
  phones: [
    { display: "+380 96 942 57 34", tel: "+380969425734", messengers: ["Viber", "Telegram", "WhatsApp"] },
    { display: "+380 97 57 99 333", tel: "+380975799333", messengers: [] as string[] },
  ],
  email: "info@izumitea.com",
  instagram: "https://www.instagram.com/izumitea_ua",
  hours: confirmed<Localized>(
    { ua: "Щодня з 9:00 до 20:00", cs: "Denně 9:00–20:00", ru: "Ежедневно с 9:00 до 20:00", en: "Daily, 9:00–20:00" },
    "izumitea.com/ru header (audit 2026-10-03)",
  ),
  /**
   * The current legal entity is a Ukrainian sole proprietor. Selling in CZK/EUR
   * likely needs a different seller entity — confirm before launch.
   */
  legal: todo<{ name: string; registry: string; address: Localized }>(
    "Подтвердить юрлицо продавца для продаж в CZK/EUR",
    {
      name: "ФОП Клочко Назар Юрійович",
      registry: "ЄДРПОУ 3408200857",
      address: { ua: "вул. Переможна, 58, Харків, Україна", cs: "Peremožna 58, Charkov, Ukrajina", ru: "ул. Победная, 58, Харьков, Украина", en: "58 Peremozhna St, Kharkiv, Ukraine" },
    },
  ) as ClientValue<{ name: string; registry: string; address: Localized }>,
};
