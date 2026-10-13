// Step 2a: render our Liquid against sample data and check what it decides.
// No store, no browser. Run: node local/liquid.mjs
import { render, tidy, settings, routes, shop, piece, line, house, collectionsOf } from './shopify-liquid.mjs';

let failed = 0, passed = 0;
async function check(label, file, scope, cases) {
  const s = { settings, routes, shop, ...scope, settings: { ...settings, ...(scope.settings || {}) } };
  let out;
  try { out = tidy(await render(file, s)); }
  catch (e) { failed++; console.log(`FAIL ${label}: ${e.message}`); return; }
  const bad = cases.filter(([, fn]) => !fn(out)).map(([d]) => d);
  if (bad.length) { failed++; console.log(`FAIL ${label}\n     ${bad.join('\n     ')}`); }
  else { passed++; console.log(`PASS ${label}`); }
}
const count = (o, re) => (o.match(re) || []).length;

// ── the bag (D23) ───────────────────────────────────────────
const FOOT = 'snippets/bag-foot.liquid';
const express = { additional_checkout_buttons: true, content_for_additional_checkout_buttons: 'EXPRESS' };
await check('bag: one piece, over the threshold', FOOT, { cart: { items: [line(1, true)], attributes: {} }, ctx: 'drawer', ...express }, [
  ['total is £185.00', o => o.includes('£185.00')],
  ['delivery says Free', o => /UK delivery<\/span>\s*<span>Free/.test(o)],
  ['labelled Total', o => o.includes('>Total<')],
  ['checkout enabled', o => !/name="checkout" class="btn" disabled/.test(o)],
  ['express buttons shown', o => o.includes('EXPRESS')],
  ['gift unticked, note hidden and disabled', o => !/data-gift-toggle[^>]*checked/.test(o) && /id="gift-drawer" hidden/.test(o) && /data-gift-note disabled/.test(o)],
  ['gift fields belong to the checkout form', o => o.includes('id="bag-checkout-drawer"') && count(o, /form="bag-checkout-drawer"/g) === 3],
  ['no sold warning', o => !o.includes('bag-warn')],
]);
await check('bag: a sold piece and a live one', FOOT, { cart: { items: [line(1, false), line(2, true, 24000)], attributes: {} }, ctx: 'page', ...express }, [
  ['total counts the live piece only', o => o.includes('£240.00') && !o.includes('£425.00')],
  ['warns, singular', o => o.includes('A piece in your bag sold while it was there. Remove it to check out.')],
  ['checkout disabled', o => /name="checkout" class="btn" disabled/.test(o)],
  ['express buttons hidden', o => !o.includes('EXPRESS')],
  ['page ids, not drawer ids', o => o.includes('id="bag-checkout-page"') && !o.includes('bag-checkout-drawer')],
]);
await check('bag: everything sold', FOOT, { cart: { items: [line(1, false)], attributes: {} }, ctx: 'drawer', ...express }, [
  ['says so', o => o.includes('This piece sold while it was in your bag. Sold pieces stay on the Record.')],
  ['no checkout, delivery, total, gift or express', o => !o.includes('bag-checkout') && !o.includes('UK delivery') && !o.includes('bag-sum') && !o.includes('data-bag-gift') && !o.includes('EXPRESS')],
  ['points back to the shop', o => o.includes('See every piece')],
]);
await check('bag: two sold, nothing live', FOOT, { cart: { items: [line(1, false), line(2, false)], attributes: {} }, ctx: 'drawer' }, [
  ['plural', o => o.includes('These pieces sold while they were in your bag.')],
]);
await check('bag: under the threshold', FOOT, { cart: { items: [line(1, true, 9500)], attributes: {} }, ctx: 'drawer' }, [
  ['delivery added at checkout', o => o.includes('Added at checkout')],
  ['labelled Subtotal', o => o.includes('>Subtotal<')],
]);
await check('bag: threshold 0 means always free', FOOT, { cart: { items: [line(1, true, 500)], attributes: {} }, ctx: 'drawer', settings: { delivery_free_over: 0 } }, [
  ['Free', o => /UK delivery<\/span>\s*<span>Free/.test(o)],
]);
await check('bag: gift saved, cut-off notice set', FOOT, { cart: { items: [line(1, true)], attributes: { Gift: 'Yes', 'Gift note': 'Happy birthday <3' } }, ctx: 'drawer', settings: { bag_notice: 'Order by 18 December' } }, [
  ['ticked, note shown and enabled', o => /data-gift-toggle[^>]*checked/.test(o) && !/id="gift-drawer" hidden/.test(o) && !/data-gift-note disabled/.test(o)],
  ['note kept', o => o.includes('Happy birthday')],
  ['notice shown', o => o.includes('Order by 18 December')],
]);
await check('bag: gift note turned off', FOOT, { cart: { items: [line(1, true)], attributes: {} }, ctx: 'drawer', settings: { gift_enabled: false } }, [
  ['no gift block', o => !o.includes('data-bag-gift')],
]);
await check('bag line: sold', 'snippets/bag-line.liquid', { item: line(3, false) }, [
  ['marked sold', o => o.includes('bag-line is-sold') && o.includes('Sold since you added it') && /bag-price">Sold</.test(o)],
]);
await check('bag line: live', 'snippets/bag-line.liquid', { item: line(3, true) }, [
  ['one of one, priced', o => !o.includes('is-sold') && o.includes('One of one') && o.includes('£185.00')],
]);

// ── house pages (D22) ───────────────────────────────────────
const DIOR = 'vintage-christian-dior-jewellery';
const prods = [piece(1, 'Christian Dior', true), piece(2, 'Christian Dior', false), piece(3, 'Christian Dior', true)];
const dior = house(1, 'Christian Dior', prods, {
  description: '<p>Editorial.</p>',
  metafields: { hikari: { lede: { value: 'The lede.' }, marks: { value: '1950s–60s | Chr. Dior © and the year | Made under licence\n\n1970s–80s | Chr. Dior © Germany\r\n<script> | x' } } },
});
const giv = house(2, 'Givenchy', [piece(9, 'Givenchy', true)]);
const newIn = { ...house(3, 'New In'), title: 'New In', url: '/collections/new-in', template_suffix: '' };
const all = collectionsOf([dior, newIn, giv]);

await check('house-url: page exists', 'snippets/house-url.liquid', { name: 'Christian Dior', collections: all }, [
  ['links to the house page', o => o === `/collections/${DIOR}`],
]);
await check('house-url: no page yet', 'snippets/house-url.liquid', { name: 'Yves Saint Laurent', collections: all }, [
  ['falls back to the vendor listing', o => o === '/collections/vendors?q=Yves%20Saint%20Laurent'],
]);
await check('house page: full', 'sections/main-house.liquid', { collection: dior, collections: all }, [
  ['house set large', o => /class="house-h">Christian Dior <span/.test(o)],
  ['counts pieces in the shop', o => o.includes('2 pieces in the shop')],
  ['sold piece not in the shop grid', o => !o.includes('/products/p2')],
  ['lede and editorial', o => o.includes('The lede.') && o.includes('Editorial.')],
  ['three mark rows, blank lines skipped', o => count(o, /<th scope="row">/g) === 3],
  ['note shown only where given', o => o.includes('marks-note">Made under licence') && /Germany\s*<\/td>/.test(o)],
  ['marks escaped', o => o.includes('&lt;script&gt;') && !o.includes('<script>')],
  ['disclaimer once, with the brand name', o => count(o, /house-legal/g) === 1 && o.includes('Hikari Vintage is an independent')],
]);
await check('house page: nothing in stock, no words yet', 'sections/main-house.liquid', { collection: house(1, 'Christian Dior', [piece(2, 'Christian Dior', false)]), collections: all }, [
  ['says so', o => o.includes('Nothing from Christian Dior in the shop this week.')],
  ['points at the Edition and the list', o => o.includes('Edition: Thursday 19:00') && o.includes('href="#list"')],
  ['no notes section', o => !o.includes('house-notes')],
  ['disclaimer still there', o => o.includes('house-legal')],
]);
await check('house page: empty collection', 'sections/main-house.liquid', { collection: house(1, 'Christian Dior'), collections: all }, [
  ['name falls back to the title', o => o.includes('class="house-h">Vintage Christian Dior jewellery')],
]);
await check('house page: name set on the collection', 'sections/main-house.liquid', { collection: { ...dior, metafields: { hikari: { house: { value: 'Dior' } } } }, collections: all }, [
  ['uses hikari.house', o => /class="house-h">Dior <span/.test(o)],
]);

// ── the Record ──────────────────────────────────────────────
const rec = heading => ({ settings: { heading: heading || 'The Record', collection: '' } });
await check('record: house page, nothing sold', 'sections/record.liquid', { section: rec(), template: { name: 'collection' }, collection: { products: [piece(1, 'Christian Dior', true)] }, collections: { all: { products: [] } } }, [
  ['renders nothing', o => o === ''],
]);
await check('record: house page, one sold', 'sections/record.liquid', { section: rec(), template: { name: 'collection' }, collection: { products: prods }, collections: { all: { products: [] } } }, [
  ['only the sold piece, no placeholders', o => count(o, /class="rec" href/g) === 1 && o.includes('/products/p2') && !o.includes('<b>—</b>')],
]);
await check('record: home page, nothing sold', 'sections/record.liquid', { section: rec(), template: { name: 'index' }, collections: { all: { products: [piece(1, 'X', true)] } } }, [
  ['six placeholders, as before', o => count(o, /<b>—<\/b>/g) === 6],
]);
await check('record: home page, sold anywhere', 'sections/record.liquid', { section: rec(), template: { name: 'index' }, collections: { all: { products: [piece(1, 'X', true), piece(5, 'Givenchy', false)] } } }, [
  ['one record', o => count(o, /class="rec" href/g) === 1],
]);

// ── house links ─────────────────────────────────────────────
await check('houses band: no blocks, on a house page', 'sections/houses.liquid', { section: { settings: { heading: 'Other houses' }, blocks: [] }, collections: all, collection: dior }, [
  ['lists the two houses, not New In', o => count(o, /<a href=/g) === 2 && !o.includes('New In')],
  ['marks the current house', o => new RegExp(`${DIOR}" aria-current="page">Christian Dior`).test(o)],
]);
await check('houses band: blocks with empty links', 'sections/houses.liquid', { section: { settings: { heading: 'Shop by house' }, blocks: [
  { settings: { name: 'Christian Dior', url: '' }, shopify_attributes: '' },
  { settings: { name: 'Grosse', url: '' }, shopify_attributes: '' },
  { settings: { name: 'Chanel', url: '/x' }, shopify_attributes: '' }] }, collections: all }, [
  ['house page, vendor listing, explicit link', o => o.includes(`href="/collections/${DIOR}"`) && o.includes('href="/collections/vendors?q=Grosse"') && o.includes('href="/x"')],
]);
await check('/collections: houses only', 'templates/list-collections.liquid', { collections: all }, [
  ['two houses', o => count(o, /<a href=/g) === 2 && !o.includes('New In')],
]);
await check('/collections: before any house page', 'templates/list-collections.liquid', { collections: [newIn] }, [
  ['every collection', o => o.includes('New In')],
]);
const diorMany = house(1, 'Christian Dior', [1, 2, 3, 4, 5, 6].map(i => piece(i, 'Christian Dior', i !== 2)));
await check('more from this house', 'sections/more-from-house.liquid', { product: piece(1, 'Christian Dior', true), collections: collectionsOf([diorMany]) }, [
  ['four others, not itself, nothing sold', o => count(o, /class="card"/g) === 4 && !o.includes('href="/products/p1"') && !o.includes('href="/products/p2"')],
  ['links to the house', o => o.includes(`href="/collections/${DIOR}"`)],
]);
await check('more from this house: no house page yet', 'sections/more-from-house.liquid', { product: piece(1, 'Grosse', true), collections: [] }, [
  ['link only, to the vendor listing', o => !o.includes('grid4') && o.includes('/collections/vendors?q=Grosse')],
]);
await check('more from this house: no vendor', 'sections/more-from-house.liquid', { product: piece(1, '', true), collections: [] }, [
  ['renders nothing', o => o === ''],
]);

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
