# IZUMI Tea — Phase 3 Technical Blueprint

Основа: `01-audit-and-ia.md` (с правками от 03.10.2026). Документ фиксирует архитектуру до начала вёрстки. Части, помеченные ✅, уже написаны кодом в репозитории и проходят `tsc` и тесты.

---

## 0. Приоритет №0 — проверить главную до миграции

Из облачной среды izumitea.com недоступен (исходящие соединения на домен закрыты), поэтому проверка ручная:

```bash
for u in / /ua/ /ua /ru/ /en/; do
  curl -sI -A "Mozilla/5.0" "https://izumitea.com$u" | head -1
done
```

И в Google Search Console → Проверка URL для `/`, `/ua/`, `/ru/`, `/en/`: код ответа, canonical, `noindex`, статус в индексе. Если главная отдаёт 404 — это чинится на Tilda сейчас, независимо от редизайна.

---

## 1. Зафиксированные решения

| Тема | Решение |
|---|---|
| Стек | Next.js 15 · App Router · TypeScript (strict) · Tailwind · GSAP (точечно) · next/image · Vercel |
| Языки | `/ua` и `/en`. `/ru` физически не удаляем и не редиректим до решения клиента (`RU_STRATEGY = "pending"`) |
| Content-first | Продукты, варианты, FAQ, точки, claims, навигация — в типизированном `src/content/`. В компонентах нет текста, цен и фактов |
| Неподтверждённое | `ClientValue<T>` со статусом `todo` — видно в preview, отфильтровано из production |
| Claims | Неподтверждённые health-обещания не попадают в production даже временно. Реестр хранит и удалённые claims |
| SEO | Все city URL сохраняются через 301. Отдельный redirect map для Tilda/tproduct/test URL. Один hop, UTM сохраняются |
| Commerce | Product → variant → cart → checkout. Цены `todo` блокируют продажу и `Offer`-разметку |
| Analytics | GTM `GTM-KB2GCNL` (Meta Pixel `1085364578468801` настраивается внутри GTM). GA4 ecommerce: `view_item_list`, `select_item`, `view_item`, `add_to_cart`, `remove_from_cart`, `view_cart`, `begin_checkout`, `purchase` |
| A11y | `prefers-reduced-motion`, клавиатура, focus management для mega menu, mobile menu, cart drawer |
| Animation | GSAP только в Home Hero, Signature, Product, Tea, Brewing, Story. Shop / Checkout / FAQ / Where to Buy — без scroll-анимаций |
| Structured data | Organization + WebSite (site), Product + Offer (product, только подтверждённые цены), BreadcrumbList (где есть видимые крошки), FAQPage (по актуальным требованиям), LocalBusiness — только проверенные видимые точки |

---

## 2. Структура проекта

```
izumi-tea/
├─ docs/
│  ├─ 01-audit-and-ia.md
│  └─ 02-phase3-blueprint.md
├─ next.config.ts                     ✅ trailingSlash + skipTrailingSlashRedirect, AVIF/WebP
├─ tsconfig.json                      ✅ strict, noUncheckedIndexedAccess, @/* alias
├─ package.json                       ✅
└─ src/
   ├─ middleware.ts                   ✅ legacy 301/410 + slash policy, один hop
   ├─ app/
   │  ├─ layout.tsx                   root: шрифты, GTM, <html lang> из locale
   │  ├─ not-found.tsx                404 → Shop / Home
   │  ├─ robots.ts                    генерируется
   │  ├─ sitemap.ts                   генерируется из content + publish state
   │  └─ [locale]/
   │     ├─ layout.tsx                Header, Footer, CartProvider, CartDrawer, AttributionCapture
   │     ├─ page.tsx                  Home
   │     ├─ shop/page.tsx
   │     ├─ shop/[product]/page.tsx
   │     ├─ tea/page.tsx
   │     ├─ brewing/page.tsx
   │     ├─ benefits/page.tsx         notFound() пока benefitsPublished = false
   │     ├─ about/page.tsx
   │     ├─ reviews/page.tsx          noindex пока нет реального контента
   │     ├─ where-to-buy/page.tsx
   │     ├─ where-to-buy/[city]/page.tsx  только publishedCities
   │     ├─ faq/page.tsx
   │     ├─ delivery/ contacts/ privacy/ offer/ returns/
   │     ├─ cart/page.tsx             noindex, fallback к drawer
   │     └─ checkout/{page,success,failed}
   ├─ content/
   │  ├─ types.ts                     ✅ вся модель контента
   │  ├─ products.ts                  ✅ 3 продукта, 7 вариантов, SKU, legacy URL
   │  ├─ cities.ts                    ✅ 34 slug как на текущем сайте
   │  ├─ facts.ts                     ✅ реестр claims + параметры заваривания
   │  ├─ stores.ts                    Phase 10: импорт /ua/try + /ua/shops/* как unverified
   │  ├─ faq.ts  pages.ts  navigation.ts  organization.ts  story.ts  reviews.ts
   │  └─ en/ …                        переводы (тот же тип, Localized<T>)
   ├─ lib/
   │  ├─ i18n.ts                      ✅ ua/en, hreflang uk-UA
   │  ├─ routes.ts                    ✅ единственный источник URL
   │  ├─ redirects.ts                 ✅ legacy map + resolver + launch guard
   │  ├─ redirects.test.ts            ✅ 11 тестов
   │  ├─ publish-state.ts             ✅ что live — выводится из контента
   │  ├─ analytics.ts                 ✅ dataLayer + first/last-touch attribution
   │  ├─ seo.ts                       buildMetadata(), canonical, hreflang, JSON-LD
   │  ├─ content-guards.ts            production-фильтры ClientValue / Claim / Store
   │  ├─ cart/                        store, line model, totals
   │  ├─ checkout/                    CheckoutProvider interface + adapters
   │  └─ motion/                      GSAP registry, useReducedMotion, presets
   └─ components/
      ├─ layout/   Header MegaMenu MobileMenu Footer SkipLink LocaleSwitch
      ├─ commerce/ ProductCard VariantPicker QuantityStepper AddToCart CartDrawer CartLine Price
      ├─ content/  Accordion BrewingParams StepGuide Timeline StoreCard CityFilter StoreMap
      ├─ media/    ResponsiveImage Gallery
      └─ motion/   Reveal TextReveal Parallax (no-op при reduced motion)
```

---

## 3. Routing и локали

- Все страницы под `app/[locale]/`, `generateStaticParams` отдаёт `ua` и `en`. Неизвестная локаль → `notFound()`.
- Сегмент URL — `ua` (как на текущем сайте и в индексе), а `<html lang="uk">` и `hreflang="uk-UA"`: `ua` — код страны, не языка.
- `x-default` указывает на `/ua/`.
- `/` → 301 `/ua/` (в redirect map, без определения языка браузера: предсказуемо для поисковиков).
- Страницы со статусом `unpublished` (Benefits до документов) не генерируются вовсе; `noindex` (Reviews, Cart, Checkout) генерируются с `robots: { index: false }` и не попадают в sitemap.
- URL строит только `lib/routes.ts`. Внутренние ссылки всегда со слэшем на конце.

---

## 4. Content layer

### 4.1 Правило `ClientValue<T>`

Каждое значение, которое клиент ещё не подтвердил, хранится как `todo(note, provisionalValue)`. Что с ним происходит:

| Среда | Поведение |
|---|---|
| `next dev` / Vercel Preview | показывается provisional-значение с маркером `TODO(client)` и подсказкой из `note` |
| Production | `content-guards.ts` отбрасывает значение: поле скрывается, а для цены вариант становится «Немає в продажу». `Offer` не размечается |
| Build | `npm run content:report` (добавляется на шаге 3) печатает все `todo` — это чек-лист для клиента |

Сейчас `todo`: все 7 цен, наличие, вес Doy pack ×3 и Mix Pack, температура заваривания, состав/вкус/аромат Ginger и Mix. Подтверждены: SKU, вес базовых упаковок, сырьё, аромат, 3–5 г / 200 мл / 3 мин / до 3 заварок.

### 4.2 Claims

`content/facts.ts` содержит все утверждения с текущего `/ua/tea` со статусом `approved`, `pending-evidence` или `removed` (+ причина). В production выводятся только `approved` с `evidence`. Даже «без кофеина» сейчас `pending-evidence`: формулировка безопасная, но подтверждение нужно для единообразия правила.

### 4.3 Stores

Импорт из `/ua/try` (HoReCa) и `/ua/shops/*` (розница) — скриптом в `content/stores.ts`, все со статусом `unverified`. Точка видна, считается для публикации города и получает `LocalBusiness` только после `verified` с датой проверки.

### 4.4 Publish state

`lib/publish-state.ts` вычисляет из контента: опубликован ли Benefits и какие города имеют подтверждённые точки. От него зависят роутинг, sitemap, навигация и redirect map — публикация становится изменением контента, а не кода.

---

## 5. SEO

`lib/seo.ts → buildMetadata(page, locale)` возвращает для Next Metadata API:

- `title` (шаблон `%s — IZUMI`), `description` — из `Seo` в контенте, уникальные на каждую страницу (сейчас на сайте почти везде один description);
- `alternates.canonical` — чистый URL без query (включая `?pack=`), `alternates.languages` — `uk-UA`, `en`, `x-default`;
- `openGraph` с `locale` из `localeMeta`, OG-изображение на страницу;
- `robots` из `indexability`.

JSON-LD — серверные компоненты `<JsonLd>` рядом с видимым контентом, который они описывают. Правила из таблицы раздела 1.

`app/sitemap.ts` собирает только `index`-страницы, продукты и опубликованные города. Google site verification `LTCzYOyo8FGmfhvlHhQ9QN7Mrz_5LG-tzqSV4HPIaNs` переносится в `metadata.verification`.

---

## 6. Redirect map ✅

Реализован в `lib/redirects.ts`, исполняется в `middleware.ts`, покрыт тестами.

| Источник | Цель | Код |
|---|---|---|
| `/` | `/ua/` | 301 |
| `/{ua,en}/buy`, `buy_old` | `/{l}/shop/` | 301 |
| `/{ua,en}/shops`, `shops_old` | `/{l}/where-to-buy/` | 301 |
| `/{ua,en}/try` | `/{l}/where-to-buy/?type=horeca` | 301 |
| `/{ua,en}/shops/{city}` ×34 | `/{l}/where-to-buy/{city}/` если город опубликован, иначе `/{l}/where-to-buy/?city={city}` | 301 |
| 20 Tilda product URL (ua, root, en) | `/{l}/shop/{product}/?pack={variant}` | 301 |
| `/ua_izumi`, `/ua_procompani`, `/ua_kontaktu`, `/ua_oplata_ta_dostavka`, `/ua_kartka_tovaru` | Home, About, Contacts, Delivery, Shop | 301 |
| `/ua_korusnivlastuvosti` | Benefits, пока не опубликован → Tea | 301 |
| `/privacypolicy` | `/ua/privacy/` | 301 |
| `/payment`, `/order/payed`, `/declinepay` | Checkout, success, failed | 301 |
| 4 тестовые/служебные Tilda-страницы | — | 410 |
| `/ru/*` (7 product URL, страницы, города) | готово, включается `RU_STRATEGY = "redirect-to-ua"` | — |
| Любой URL без слэша | тот же со слэшем | 301 |

Свойства, которые проверяют тесты:

- ровно один hop, в том числе для `/ua/buy` без слэша (Next-овский 308 отключён через `skipTrailingSlashRedirect`);
- `utm_*`, `gclid`, `fbclid` переживают редирект; параметры цели (`pack`, `type`, `city`) имеют приоритет;
- все 20 не-RU product URL и все 34 города покрыты;
- `/ru/*` не трогается, пока стратегия `pending`.

`assertLaunchReady()` вызывается в pipeline перед переключением домена и падает, пока `RU_STRATEGY = "pending"`: иначе `/ru/*` отдаст 404 на production.

Перед launch: выгрузить из Search Console топ-URL по показам за 16 месяцев и прогнать их через resolver — каждый должен давать 200, 301 или осознанный 410.

---

## 7. Commerce

### 7.1 Корзина

- Состояние: клиентский store (React context + `useSyncExternalStore`), сохраняется в `localStorage` с try/catch.
- Линия корзины хранит только `{ productSlug, variantId, quantity }`. Цена, название и наличие **всегда пересчитываются из контента**, а не берутся из storage: устаревшая цена из браузера не может попасть в заказ.
- Количество 1–20 на линию, одинаковый вариант суммируется.
- Drawer: справа на desktop, снизу на mobile; открывается после Add to Cart, с focus trap, `Esc`, возвратом фокуса на кнопку-инициатор и `inert` на остальной странице.

### 7.2 Checkout abstraction

```ts
interface CheckoutProvider {
  createPayment(order: DraftOrder): Promise<{ redirectUrl: string; orderId: string }>;
  verifyCallback(req: Request): Promise<{ orderId: string; status: "paid" | "failed" }>;
}
```

Адаптер выбирается переменной окружения после ответа клиента (LiqPay / WayForPay / Monobank Acquiring / другой). Заказ создаётся в Route Handler на сервере: цены пересчитываются там же, клиент передаёт только SKU и количество.

Доставка: Нова Пошта (отделение, почтомат, адрес) и Укрпошта, как сейчас. Справочник отделений НП — через официальный API, ключ в env. Оплата доставки клиентом при получении — текст из контента.

`purchase` отправляется **с сервера после подтверждённого callback** (через GTM Server-side или Measurement API), а на `/checkout/success` — только дублирующий клиентский event с тем же `transaction_id` для дедупликации.

---

## 8. Analytics ✅ (основа)

`lib/analytics.ts`: GTM как единственная точка входа, типизированные GA4 ecommerce events, `item_id` = Tilda SKU (непрерывность исторических данных).

| Event | Где |
|---|---|
| `view_item_list` | Shop, блок Products на Home, Related |
| `select_item` | клик по карточке товара |
| `view_item` | открытие product page и смена варианта |
| `add_to_cart` / `remove_from_cart` | AddToCart, CartLine |
| `view_cart` | открытие drawer или `/cart/` |
| `begin_checkout` | переход в checkout |
| `purchase` | сервер после callback + клиент на success (дедупликация) |

Attribution: `utm_source/medium/campaign/content/term`, `gclid`, `fbclid` пишутся в first-touch (не перезаписывается) и last-touch cookie на 90 дней, прикладываются к каждому event и к заказу. Consent-режим — уточнить у клиента (для Украины не обязателен, для EN-трафика из ЕС желателен).

---

## 9. Архитектура компонентов

- **Server by default.** Страницы и контентные блоки — серверные компоненты. Клиентские только: Header (состояние меню), MobileMenu, CartProvider/Drawer, VariantPicker, QuantityStepper, Accordion, CityFilter/Map, motion-обёртки.
- **Motion.** `lib/motion` регистрирует GSAP и ScrollTrigger лениво через `dynamic import` только на страницах из списка анимаций. `Reveal`, `TextReveal`, `Parallax` при `prefers-reduced-motion` рендерят статичный контент. Ни одна анимация не скрывает контент, нужный для покупки, и не задерживает Add to Cart.
- **Изображения.** `ResponsiveImage` над `next/image`: AVIF/WebP, `sizes` обязателен, `priority` только у hero. Карта точек и видео грузятся по `IntersectionObserver`.
- **Mega menu.** Disclosure-паттерн (кнопка с `aria-expanded`, не `role="menu"`), открывается по клику и по hover с задержкой, закрывается по `Esc` и уходу фокуса.
- **Mobile menu.** Fullscreen, focus trap, блок скролла, `inert` на фоне.
- **Skip link** «Перейти до вмісту» первым элементом.

---

## 10. Дизайн-токены (черновик для Phase 3, шаг 2)

Цвета из ТЗ: warm ivory, cream, dark brown, charcoal, natural buckwheat, muted sage — как CSS custom properties в `@theme` Tailwind, контраст текста не ниже WCAG AA.

Шрифты: обязательна полная кириллица с `ї є ґ і`. Кандидаты для пары Editorial Serif + Modern Sans подбираются на шаге Design system и проверяются на украинском тексте, через `next/font` с `display: swap` и subset `cyrillic`.

---

## 11. Порядок Phase 3

| # | Шаг | Статус |
|---|---|---|
| 1 | Routing + locales | ◐ `i18n.ts`, `routes.ts` готовы; страницы-заглушки |
| 2 | Global layout | ○ |
| 3 | Content types + content registry | ◐ типы, продукты, города, claims, brewing готовы; FAQ, навигация, pages, organization |
| 4 | Header / mega menu / mobile menu | ○ |
| 5 | Footer | ○ |
| 6 | SEO metadata + canonical + hreflang | ○ |
| 7 | Redirect map | ● готово, 11 тестов |
| 8 | Product / commerce data model | ◐ модель готова; content guards |
| 9 | Cart drawer | ○ |
| 10 | Checkout abstraction | ○ интерфейс описан; адаптер — после выбора провайдера |
| 11 | Analytics / dataLayer | ◐ события и attribution готовы; GTM-скрипт в layout |
| 12 | Accessibility + reduced motion | ○ |
| 13 | Sitemap / robots / structured data | ○ |
| 14 | 404 | ○ |

---

## 12. Блокеры launch (не блокируют разработку)

1. Статус главной `/`, `/ua/` (раздел 0).
2. Подтверждённые цены и веса всех 7 вариантов.
3. Платёжный провайдер и ключ API Новой Почты.
4. `RU_STRATEGY`.
5. Проверенный список точек продаж.
6. Документы под claims (иначе Benefits не публикуется).
7. Реальные отзывы и пресса (иначе Reviews остаётся `noindex` и вне навигации).
8. Фотографии продукта: без них Home и Product page не выходят из preview.
