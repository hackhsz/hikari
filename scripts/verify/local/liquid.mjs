// Step 2a: render our Liquid against sample data and check what it decides.
// No store, no browser. Run: node local/liquid.mjs
import { render, tidy, settings, routes, shop, piece, line, house, collectionsOf, pic, spinFrames } from './shopify-liquid.mjs';

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

// ── 21 Oct: status badges (D25) ─────────────────────────────
const NOW = Math.floor(Date.now() / 1000);
const iso = s => new Date(s * 1000).toISOString();
const soon = (id, extra = {}) => piece(id, 'Christian Dior', false, { tags: ['coming-soon'], ...extra });
await check('status: coming soon wins over unavailable', 'snippets/status.liquid', { p: soon(1) }, [['soon', o => o === 'soon']]);
await check('status: sold', 'snippets/status.liquid', { p: piece(1, 'X', false) }, [['sold', o => o === 'sold']]);
await check('status: new within new_days', 'snippets/status.liquid', { p: piece(1, 'X', true, { published_at: iso(NOW - 3 * 86400) }) }, [['new', o => o === 'new']]);
await check('status: old stock is plain', 'snippets/status.liquid', { p: piece(1, 'X', true, { published_at: iso(NOW - 40 * 86400) }) }, [['nothing', o => o === '']]);
await check('status: new_days 0 turns New off', 'snippets/status.liquid', { p: piece(1, 'X', true, { published_at: iso(NOW - 60) }), settings: { new_days: 0 } }, [['nothing', o => o === '']]);

const CARD = 'snippets/product-card.liquid';
await check('card: coming soon', CARD, { card_product: soon(4, { metafields: { hikari: { piece: 'Clip earrings', release: { value: '2026-10-24T19:00:00+01:00' } } } }), tone: 'grey' }, [
  ['Coming soon badge', o => o.includes('badge badge--soon">Coming soon')],
  ['release time instead of a price', o => /class="when">\w{3} 2[34] Oct, \d\d:00/.test(o) && !o.includes('£185.00')],
  ['quick view for the piece', o => o.includes('data-quick-view="/products/p4"')],
]);
await check('card: coming soon without a date', CARD, { card_product: soon(4), tone: 'grey' }, [
  ['falls back to the Edition day', o => o.includes('class="when">Thursday 19:00')],
]);
await check('card: sold', CARD, { card_product: piece(5, 'Givenchy', false), tone: 'grey' }, [
  ['ink Sold badge and Sold for the price', o => o.includes('badge badge--sold">Sold') && /class="price">\s*Sold/.test(o)],
]);
await check('card: new', CARD, { card_product: piece(6, 'Givenchy', true, { published_at: iso(NOW - 86400) }), tone: 'grey' }, [
  ['New badge and the price', o => o.includes('badge badge--new">New') && o.includes('£185.00')],
]);
await check('card: in stock, not new', CARD, { card_product: piece(7, 'Givenchy', true), tone: 'grey' }, [
  ['no badge', o => !o.includes('class="badge')],
  ['one real link, the picture link hidden', o => count(o, /href="\/products\/p7"/g) === 2 && o.includes('tabindex="-1" aria-hidden="true"')],
]);
await check('record: coming soon is not sold', 'sections/record.liquid', { section: rec(), template: { name: 'index' }, collections: { all: { products: [soon(1), piece(5, 'Givenchy', false)] } } }, [
  ['only the sold piece', o => count(o, /class="rec" href/g) === 1 && o.includes('/products/p5') && !o.includes('/products/p1"')],
]);

await check('alcove: a coming-soon piece is not Sold', 'sections/alcove.liquid', { section: { settings: { product: soon(8) } } }, [
  ['says Coming soon and when', o => o.includes('badge--soon') && o.includes('Thursday 19:00') && !/al-price">\s*Sold/.test(o)],
]);

// ── 21 Oct: product page ────────────────────────────────────
const PDP = 'sections/main-product.liquid';
const four = ['Composed', "Maker's mark", 'On the body', 'Condition'].map(l => pic(l));
await check('product: in stock', PDP, { product: piece(1, 'Christian Dior', true, { images: four }) }, [
  ['Add to bag, no notify form', o => o.includes('>Add to bag<') && !o.includes('notify-')],
  ['every frame opens full screen', o => count(o, /class="frame"/g) === 4],
  ['frames 2 and 4 carry Unretouched into full screen', o => count(o, /data-zoom-label="Unretouched"/g) === 2],
  ['ask goes to the store inbox', o => o.includes('mailto:hello@hikari.test?subject=')],
  ['share links', o => o.includes('data-copy-link="https://hikari.test/products/p1"')],
  ['no 360 without frames', o => !o.includes('data-spin')],
]);
await check('product: coming soon', PDP, { product: soon(2, { images: four, metafields: { hikari: { piece: 'Clip earrings', release: { value: '2026-10-24T19:00:00+01:00' } } } }) }, [
  ['no Add to bag', o => !o.includes('>Add to bag<')],
  ['when it goes live', o => /Goes live \w{3} 2[34] Oct, \d\d:00/.test(o)],
  ['notify form tagged with the piece', o => o.includes('value="notify-release, piece-p2"')],
  ['badge on frame 1 only', o => count(o, /badge badge--soon/g) === 2],
]);
await check('product: sold', PDP, { product: piece(3, 'Christian Dior', false, { images: four }) }, [
  ['no Add to bag', o => !o.includes('>Add to bag<')],
  ['notify form tagged with the house', o => o.includes('value="notify-similar, house-christian-dior"')],
  ['says the Record keeps it', o => o.includes('Kept on the Record')],
]);
await check('product: 360', PDP, { product: piece(1, 'Christian Dior', true, { images: four, metafields: { hikari: { piece: 'x', spin: { value: spinFrames(12) } } } }) }, [
  ['viewer after frame 1', o => o.indexOf('data-spin') > o.indexOf('class="frame"') && o.indexOf('data-spin') < o.lastIndexOf('class="frame"')],
  ['all twelve frames listed', o => { const m = o.match(/data-spin-frames>(\[.*?\])<\/script>/s); return m && JSON.parse(m[1]).length === 12; }],
  ['says the frames are photographs', o => o.includes('12 photographs on a turntable, not generated')],
]);
await check('product: one spin frame is not a 360', PDP, { product: piece(1, 'X', true, { metafields: { hikari: { spin: { value: spinFrames(1) } } } }) }, [
  ['no viewer', o => !o.includes('data-spin')],
]);

// ── 21 Oct: quick view, next Edition, social, pop-up ────────
await check('quick view: in stock', 'sections/quick-view.liquid', { product: piece(1, 'Christian Dior', true) }, [
  ['the product form', o => o.includes('data-qv') && o.includes('>Add to bag<') && o.includes('value="1001"')],
]);
await check('quick view: sold', 'sections/quick-view.liquid', { product: piece(2, 'Christian Dior', false) }, [
  ['points to the page, no form', o => !o.includes('>Add to bag<') && o.includes('href="/products/p2"') && o.includes('Hear about similar pieces')],
]);
const NE = 'sections/next-edition.liquid';
const neSec = { settings: { eyebrow: 'Coming soon', heading: 'In the next Edition', cta: 'The list sees them first', collection: '' } };
await check('next Edition: nothing coming', NE, { section: neSec, collections: { all: { products: [piece(1, 'X', true)] } } }, [
  ['renders nothing', o => o === ''],
]);
const later = NOW + 3 * 86400, sooner = NOW + 2 * 86400;
await check('next Edition: two coming', NE, { section: neSec, collections: { all: { products: [
  piece(1, 'X', true), soon(2, { metafields: { hikari: { release: { value: iso(later) } } } }), soon(3, { metafields: { hikari: { release: { value: iso(sooner) } } } })] } } }, [
  ['two cards', o => count(o, /class="card"/g) === 2],
  ['counts down to the sooner one', o => o.includes(`data-countdown="${sooner}"`)],
]);
await check('next Edition: no dates', NE, { section: neSec, collections: { all: { products: [soon(2)] } } }, [
  ['names the Edition day, no clock', o => o.includes('Goes live with the Edition: Thursday 19:00') && !o.includes('data-countdown')],
]);
await check('social: nothing set', 'snippets/social.liquid', {}, [['renders nothing', o => o === '']]);
await check('social: some set', 'snippets/social.liquid', { settings: { social_instagram: 'https://instagram.com/x', wechat_id: 'hikari-v' } }, [
  ['Instagram and WeChat only', o => o.includes('https://instagram.com/x') && o.includes('data-sheet-open="wechat"') && !o.includes('TikTok')],
]);
const POP = 'sections/signup-popup.liquid';
const pop = extra => ({ settings: { enabled: true, trigger: 'pages', pages: 2, delay: 20, rest_days: 14, eyebrow: 'The list', heading: 'See each Edition first', body: 'Body', button: 'Join the list', fine: 'Small print', ok_heading: 'Thank you.', ok_body: 'Ok', code: '', offer: '£10 off your first piece over £150.', ...extra } });
await check('pop-up: off', POP, { section: pop({ enabled: false }), form: {} }, [['renders nothing', o => o === '']]);
await check('pop-up: no code by default (D27)', POP, { section: pop(), form: {} }, [
  ['tags the list', o => o.includes('value="edition, popup"')],
  ['no money off mentioned', o => !o.includes('popup-offer') && !o.includes('£10')],
]);
await check('pop-up: with a code', POP, { section: pop({ code: 'FIRST10' }), form: {} }, [
  ['says what the code gives', o => o.includes('popup-offer">£10 off your first piece over £150.')],
]);
await check('pop-up: after joining, with a code', POP, { section: pop({ code: 'FIRST10' }), form: { 'posted_successfully?': true } }, [
  ['shows the code to copy', o => o.includes('data-popup-ok') && o.includes('data-copy-text="FIRST10"')],
]);

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
