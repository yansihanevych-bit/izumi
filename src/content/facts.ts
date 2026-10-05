import { confirmed, type BrewingParameters, type Claim } from "./types";

/**
 * Claims registry. Everything from the current /ua/tea and home pages is
 * listed so the decision is visible and nobody silently re-adds a removed
 * claim. Only `approved` claims may appear in copy.
 */
export const claims: Claim[] = [
  {
    id: "caffeine-free",
    text: { ua: "Без кофеїну", cs: "Bez kofeinu", ru: "Без кофеина", en: "Caffeine-free" },
    risk: "low",
    status: "approved",
    evidence: {
      document: "Состав: только семена татарской гречихи (и имбирь в Ginger); ни одно из сырьёв не содержит кофеин",
      checkedBy: "audit 2026-10-03 — подтвердить декларацией производителя",
      checkedAt: "2026-10-03",
    },
  },
  {
    id: "gluten-free",
    text: { ua: "Без глютену", ru: "Без глютена", en: "Gluten-free" },
    risk: "medium",
    status: "pending-evidence",
  },
  {
    id: "contains-rutin",
    text: { ua: "Містить рутин і флавоноїди", ru: "Содержит рутин и флавоноиды" },
    risk: "medium",
    status: "pending-evidence",
  },
  {
    id: "vitamins",
    text: { ru: "Содержит практически все известные витамины", en: "Contains nearly every vitamin" },
    risk: "high",
    status: "pending-evidence",
  },
  {
    id: "vessels-antiaging-antioxidant",
    text: { ua: "Зміцнює судини, запобігає старінню, антиоксидант" },
    risk: "high",
    status: "pending-evidence",
  },
  {
    id: "calms-tones",
    text: { ru: "Успокаивает нервную систему, тонизирует, улучшает настроение" },
    risk: "high",
    status: "pending-evidence",
  },
  {
    id: "weight-loss",
    text: { ua: "Сприяє зниженню ваги", ru: "Способствует похудению", en: "Stimulates weight loss" },
    risk: "high",
    status: "removed",
    removedReason: "Обещание медицинского эффекта без доказательной базы",
  },
  {
    id: "detox",
    text: { ua: "Detox: очищує від шлаків, токсинів, радіонуклідів", ru: "Выводит токсины, эффект детокс" },
    risk: "high",
    status: "removed",
    removedReason: "Обещание медицинского эффекта без доказательной базы",
  },
  {
    id: "cancer-prevention",
    text: { ua: "Профілактика раку" },
    risk: "critical",
    status: "removed",
    removedReason: "Недопустимое медицинское утверждение",
  },
  {
    id: "immunity-skin-gi-brain",
    text: { ua: "Імунітет, шкіра, нігті, ШКТ, мозкова активність" },
    risk: "high",
    status: "removed",
    removedReason: "Обещание медицинского эффекта без доказательной базы",
  },
  {
    id: "no-contraindications",
    text: { ua: "Не має протипоказань, безпечний вагітним і дітям, необмежено" },
    risk: "critical",
    status: "removed",
    removedReason: "Заменено на «перед регулярним вживанням проконсультуйтеся з лікарем»",
  },
];

/** Confirmed by the current home page (RU/EN): 3–5 g, 200 ml, 90–95 °C, 3 min, up to 3 brews. */
const HOME = "izumitea.com/ru + /en home, brewing block (audit 2026-10-03)";

export const brewing: BrewingParameters = {
  doseGrams: confirmed({ min: 3, max: 5 }, HOME),
  waterMl: confirmed(200, HOME),
  temperatureC: confirmed({ min: 90, max: 95 }, HOME),
  steepMinutes: confirmed(3, HOME),
  maxInfusions: confirmed(3, HOME),
};

/** 100 g at 3 g per cup = 33 cups; three brews each = 99 (current FAQ). */
export const cupsPer100g = confirmed({ cups: 33, withRebrews: 99 }, "izumitea.com/en FAQ");
