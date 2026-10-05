import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildLegacyMap, resolveRedirect } from "./redirects";
import { products } from "@/content/products";
import { citySlugs } from "@/content/cities";

const state = { benefitsPublished: false, publishedCities: new Set(["kharkiv"]) };
const map = buildLegacyMap(state);
const go = (path: string) => resolveRedirect(new URL(path, "https://izumitea.com"), map);

describe("legacy redirects", () => {
  it("root goes to /ua/", () => {
    assert.deepEqual(go("/"), { status: 301, location: "/ua/" });
  });

  it("buy → shop in one hop, with or without trailing slash", () => {
    assert.deepEqual(go("/ua/buy"), { status: 301, location: "/ua/shop/" });
    assert.deepEqual(go("/ua/buy/"), { status: 301, location: "/ua/shop/" });
  });

  it("keeps UTM / click ids through the redirect", () => {
    const r = go("/ua/buy?utm_source=ig&utm_campaign=autumn&fbclid=abc");
    assert.deepEqual(r, {
      status: 301,
      location: "/ua/shop/?utm_source=ig&utm_campaign=autumn&fbclid=abc",
    });
  });

  it("Tilda product → product page with variant as UI state", () => {
    assert.deepEqual(
      go("/ua/buy/tproduct/642253683-112926866521-chai-izumi-100g?utm_source=g"),
      { status: 301, location: "/ua/shop/izumi-classic/?utm_source=g&pack=doy-100" },
    );
    assert.deepEqual(go("/tproduct/1-421692571921-chai-izumi-s-imbiryom-125g"), {
      status: 301,
      location: "/ua/shop/izumi-ginger/?pack=stick-125",
    });
    assert.deepEqual(go("/en/buy/tproduct/402966845-582335446871-tea-izumi-mix-pack-300g"), {
      status: 301,
      location: "/en/shop/mix-pack/?pack=mix",
    });
  });

  it("every legacy product URL is mapped, RU stays in RU", () => {
    for (const p of products)
      for (const v of p.variants)
        for (const l of v.legacyPaths) assert.equal(go(l.path)?.status, 301, l.path);
    assert.deepEqual(go("/ru/buy/tproduct/401068833-142071613291-chai-izumi-mix-pack-300g"), {
      status: 301,
      location: "/ru/shop/mix-pack/?pack=mix",
    });
  });

  it("all 34 cities are mapped; only verified ones get a city page", () => {
    assert.equal(citySlugs.length, 34);
    assert.deepEqual(go("/ua/shops/kharkiv"), {
      status: 301,
      location: "/ua/where-to-buy/kharkiv/",
    });
    assert.deepEqual(go("/ua/shops/mariupol"), {
      status: 301,
      location: "/ua/where-to-buy/?city=mariupol",
    });
    for (const s of citySlugs) assert.equal(go(`/ua/shops/${s}`)?.status, 301, s);
  });

  it("try → where-to-buy filtered to HoReCa", () => {
    assert.deepEqual(go("/ua/try"), {
      status: 301,
      location: "/ua/where-to-buy/?type=horeca",
    });
  });

  it("benefits slug falls back to tea while benefits is unpublished", () => {
    assert.deepEqual(go("/ua_korusnivlastuvosti"), { status: 301, location: "/ua/tea/" });
  });

  it("test pages are gone", () => {
    assert.deepEqual(go("/testhomepage_izumi_v1"), { status: 410 });
    assert.deepEqual(go("/page25206568.html"), { status: 410 });
  });

  it("unchanged pages only get slash-normalised; files and new URLs untouched", () => {
    assert.deepEqual(go("/ua/tea"), { status: 301, location: "/ua/tea/" });
    assert.equal(go("/ua/tea/"), null);
    assert.equal(go("/robots.txt"), null);
    assert.equal(go("/ua/shop/izumi-classic/"), null);
  });

  it("RU pages keep their language", () => {
    assert.deepEqual(go("/ru/buy"), { status: 301, location: "/ru/shop/" });
    assert.deepEqual(go("/ru/shops/odesa"), { status: 301, location: "/ru/where-to-buy/?city=odesa" });
    assert.equal(go("/ru/about/"), null);
  });

  it("new CS pages are untouched", () => {
    assert.equal(go("/cs/shop/izumi-ginger/"), null);
  });
});
