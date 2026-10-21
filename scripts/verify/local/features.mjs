// Step 2c: the 21 Oct features in a real browser: quick view, full-screen photographs, the
// 360° viewer, the countdown, the list pop-up and the WeChat dialog. Pages are our own
// templates rendered with sample pieces and served from a made-up origin, so storage behaves
// as it would on the store. Shopify's cart and section endpoints are mocked.
// Screenshots of the home page, a product page, quick view and the pop-up land in out/.
// No store needed. Run: node local/features.mjs
import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { render, read, OUT, settings as base, routes, shop, piece, pic, spinFrames } from './shopify-liquid.mjs';

const exe = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const css = read('assets/hikari.css'), js = read('assets/hikari.js');
const ORIGIN = 'http://hikari.test';

let failed = 0, passed = 0;
const check = (name, ok) => { ok ? passed++ : failed++; console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); };

// ── sample shop ─────────────────────────────────────────────
const NOW = Math.floor(Date.now() / 1000);
const iso = s => new Date(s * 1000).toISOString();
const settings = { ...base, scroll_colour: true, grain_opacity: 30, announcement: 'The price you see is the price you pay · Free UK delivery over £100',
  social_instagram: 'https://www.instagram.com/', social_xiaohongshu: 'https://www.xiaohongshu.com/', social_pinterest: 'https://www.pinterest.com/',
  wechat_id: 'hikari-vintage', edition_no: '04' };
const P = (id, vendor, name, price, ok, extra = {}) => piece(id, vendor, ok, {
  title: name, price: price * 100, featured_image: pic(name.split(',')[0], 30 + id * 23), ...extra,
  metafields: { hikari: { piece: name, grade: 'II', size: '42 × 31 mm', era: '1980s', ...(extra.hikari || {}) } },
});
const four = ['Composed · daylight', "Maker's mark", 'On the body', 'Condition'].map((l, i) => pic(l, 30 + i * 12));
const pieces = [
  P(1, 'Christian Dior', 'Crystal-set clip earrings, c.1987', 185, true, { images: four, hikari: { spin: { value: spinFrames(24) }, mark: 'Chr. Dior ©, reverse', provenance: 'Found in Tokyo, October 2026' } }),
  P(2, 'Givenchy', 'Gilt knot brooch, 1970s', 165, true, { published_at: iso(NOW - 2 * 86400) }),
  P(3, 'Yves Saint Laurent', 'Resin heart pendant, c.1985', 210, false),
  P(4, 'Nina Ricci', 'Pearl and gilt collar, c.1982', 240, true),
  P(5, 'Christian Dior', 'Poured glass drop earrings, c.1990', 285, false, { tags: ['coming-soon'], hikari: { release: { value: iso(NOW + 2 * 86400 + 4 * 3600) } } }),
  P(6, 'Grosse', 'Enamelled bangle, 1972', 225, false, { tags: ['coming-soon'], hikari: { release: { value: iso(NOW + 2 * 86400 + 4 * 3600) } } }),
];
const byPath = Object.fromEntries(pieces.map(p => [p.url, p]));
const collections = { all: { products: pieces } };
const linklists = { 'main-menu': { links: [{ url: '/collections/all', title: 'Shop' }, { url: '/collections', title: 'Houses' }, { url: '/#record', title: 'The Record' }] } };
const scope = { settings, routes, shop, collections, linklists, pages: { creators: { id: 1, url: '/pages/creators' } }, form: {} };
let cart = { item_count: 0, items: [], attributes: {} };

const popupSection = { settings: { enabled: true, trigger: 'pages', pages: 2, delay: 20, rest_days: 14, eyebrow: 'The list', heading: 'See each Edition first',
  body: 'Every piece is one of one, and the best go first. The list sees each Edition before it goes on the site.', button: 'Join the list',
  fine: 'One email a week, the Edition, and the odd note when a piece you asked about arrives. Unsubscribe any time.', ok_heading: 'Thank you.', ok_body: 'x', code: '', offer: '' } };
const chrome = async () => ({
  header: await render('sections/header.liquid', { ...scope, cart }),
  footer: await render('sections/footer.liquid', { ...scope, section: { blocks: [] } }),
  bag: await render('sections/bag-drawer.liquid', { ...scope, cart }),
  popup: await render('sections/signup-popup.liquid', { ...scope, section: popupSection }),
  dialogs: await render('snippets/dialogs.liquid', scope),
});
const page = async (template, main) => {
  const c = await chrome();
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<script>document.documentElement.classList.add("js")</script><style>${css}</style></head>
<body class="template-${template}"><div id="grain" aria-hidden="true"></div>${c.header}<main id="main">${main}</main>${c.footer}${c.bag}${c.popup}${c.dialogs}
<script>window.HikariRoutes={cart_url:"/cart",cart_add_url:"/cart/add",cart_change_url:"/cart/change",cart_update_url:"/cart/update"};</script>
<script>${js}</script></body></html>`;
};
const home = async () => page('index', [
  await render('sections/next-edition.liquid', { ...scope, section: { settings: { eyebrow: 'Coming soon', heading: 'In the next Edition', cta: 'The list sees them first', collection: '' } } }),
  await render('sections/main-collection.liquid', { ...scope, collection: { products_count: 4, title: 'This Edition', description: '', products: pieces.slice(0, 4) } }),
  await render('sections/signup.liquid', { ...scope, section: { settings: { heading: 'The Edition goes out Thursday, an hour before anyone else sees it.', body: 'One of one means the best piece is gone first. The list gets it first.' } } }),
].join(''));
const pdp = async p => page('product', await render('sections/main-product.liquid', { ...scope, product: p }));

async function serve(ctx) {
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await ctx.route(`${ORIGIN}/**`, async route => {
    const u = new URL(route.request().url());
    const json = b => route.fulfill({ contentType: 'application/json', body: JSON.stringify(b) });
    if (u.pathname === '/cart/add.js') {
      const id = JSON.parse(route.request().postData()).items[0].id, p = pieces.find(x => 1000 + x.id === id);
      cart = { item_count: 1, attributes: {}, items: [{ variant_id: id, variant: { available: true }, final_line_price: p.price, key: `k${id}`, url: p.url,
        url_to_remove: '/cart/change', vendor: p.vendor, product_id: p.id, image: p.featured_image, product: p }] };
      return json({ sections: { 'bag-drawer': (await chrome()).bag } });
    }
    if (u.searchParams.get('sections') === 'bag-drawer') return json({ 'bag-drawer': (await chrome()).bag });
    if (u.searchParams.get('section_id') === 'quick-view') {
      const html = await render('sections/quick-view.liquid', { ...scope, product: byPath[u.pathname] });
      return route.fulfill({ contentType: 'text/html', body: `<div id="shopify-section-quick-view" class="shopify-section">${html}</div>` });
    }
    if (byPath[u.pathname]) return route.fulfill({ contentType: 'text/html', body: await pdp(byPath[u.pathname]) });
    return route.fulfill({ contentType: 'text/html', body: await home() });
  });
}
const noSideways = p => p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
const isOpen = (p, id) => p.evaluate(i => document.getElementById(i)?.classList.contains('is-open'), id);

// ── product page: full screen, 360°, share ─────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await serve(ctx);
  const p = await ctx.newPage();
  const errors = []; p.on('pageerror', e => errors.push(e.message));
  await p.goto(`${ORIGIN}/products/p1`);
  await p.waitForTimeout(500);
  check('product, desktop: no sideways scroll', await noSideways(p));

  await p.locator('a.frame').nth(1).click();
  await p.waitForTimeout(320);
  check('frame 2 opens full screen', await isOpen(p, 'zoom'));
  check('full screen keeps the Unretouched label', (await p.locator('[data-zoom-count]').textContent()).replace(/\s+/g, ' ').trim() === '2 / 4 Unretouched');
  await p.keyboard.press('ArrowRight');
  check('arrow key moves to frame 3, no label', (await p.locator('[data-zoom-count]').textContent()).trim() === '3 / 4');
  await p.locator('[data-zoom-stage]').click({ position: { x: 640, y: 450 } });
  check('click looks closer', await p.locator('[data-zoom-stage].is-zoomed').count() === 1);
  await p.screenshot({ path: path.join(OUT, 'feature-zoom.png') });
  await p.locator('[data-zoom-stage]').click({ position: { x: 640, y: 450 } });
  check('click again steps back', await p.locator('[data-zoom-stage].is-zoomed').count() === 0);
  await p.keyboard.press('Escape');
  await p.waitForTimeout(320);
  check('Escape closes, focus back on the frame', !(await isOpen(p, 'zoom')) && await p.evaluate(() => document.activeElement?.classList.contains('frame')));

  const spin = p.locator('[data-spin]');
  await spin.scrollIntoViewIfNeeded();
  await spin.focus();
  await p.keyboard.press('ArrowRight');
  check('360: arrow key turns one frame', await spin.getAttribute('data-frame') === '1');
  const box = await spin.boundingBox();
  await p.mouse.move(box.x + box.width * 0.3, box.y + box.height / 2);
  await p.mouse.down();
  await p.mouse.move(box.x + box.width * 0.7, box.y + box.height / 2, { steps: 8 });
  await p.mouse.up();
  const f = Number(await spin.getAttribute('data-frame'));
  check('360: dragging 40% of the width turns about 40% of the way', f >= 9 && f <= 12);
  check('360: the hint goes once touched', await spin.evaluate(el => el.classList.contains('is-touched')));
  await p.waitForTimeout(300);

  await p.evaluate(() => window.scrollTo(0, 0));
  await p.screenshot({ path: path.join(OUT, 'feature-product-desktop.png'), fullPage: true });
  check('product: no script errors', errors.length === 0);
  if (errors.length) console.log('     ' + errors.join('\n     '));
  await ctx.close();
}

// ── home: badges, countdown, quick view to bag, pop-up, WeChat ──
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await serve(ctx);
  const p = await ctx.newPage();
  const errors = []; p.on('pageerror', e => errors.push(e.message));
  await p.goto(`${ORIGIN}/`);
  await p.waitForTimeout(600);
  check('home, desktop: no sideways scroll', await noSideways(p));
  check('badges: two Coming soon, one New, one Sold', await p.locator('.badge--soon').count() === 2 && await p.locator('.badge--new').count() === 1 && await p.locator('.badge--sold').count() === 1);
  check('countdown to the real release', /^in 2 days, (3|4) hours$/.test((await p.locator('[data-countdown]').textContent()).trim()));
  await p.screenshot({ path: path.join(OUT, 'feature-home-desktop.png'), fullPage: true });

  await p.waitForTimeout(1500);
  check('pop-up: not on the first page view', !(await isOpen(p, 'popup')));

  const card = p.locator('#main .grid4 .card').nth(1);
  await card.hover();
  await card.locator('.qv-btn').click();
  await p.waitForSelector('#qv [data-qv]');
  check('quick view opens with the piece', await isOpen(p, 'qv') && (await p.locator('#qv .qv-house').textContent()).trim() === 'Givenchy');
  await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(OUT, 'feature-quick-view.png') });
  await p.locator('#qv button[type="submit"]').click();
  await p.waitForTimeout(400);
  check('add to bag from quick view opens the bag', await isOpen(p, 'bag') && !(await isOpen(p, 'qv')) && await p.locator('#bag .bag-line').count() === 1);
  await p.keyboard.press('Escape');
  await p.waitForTimeout(320);
  check('closing the bag returns focus to the card', await p.evaluate(() => document.activeElement?.classList.contains('qv-btn')));

  await p.locator('footer a[data-sheet-open="wechat"]').click();
  await p.waitForTimeout(320);
  check('WeChat opens with the ID', await isOpen(p, 'wechat') && (await p.locator('#wechat .wechat-id span').textContent()) === 'hikari-vintage');
  await p.keyboard.press('Escape');

  await p.goto(`${ORIGIN}/collections/all`);
  await p.waitForTimeout(1800);
  check('pop-up: opens on the second page view', await isOpen(p, 'popup'));
  await p.screenshot({ path: path.join(OUT, 'feature-popup.png') });
  await p.locator('#popup .popup-x').click();
  await p.waitForTimeout(320);
  check('closing it rests it', await p.evaluate(() => !!localStorage.getItem('hk-popup-shut')));
  await p.goto(`${ORIGIN}/`);
  await p.waitForTimeout(1800);
  check('pop-up: stays shut after closing', !(await isOpen(p, 'popup')));
  check('home: no script errors', errors.length === 0);
  if (errors.length) console.log('     ' + errors.join('\n     '));
  await ctx.close();
}

// ── phone ───────────────────────────────────────────────────
for (const [url, name] of [['/', 'home'], ['/products/p1', 'product']]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await serve(ctx);
  const p = await ctx.newPage();
  const errors = []; p.on('pageerror', e => errors.push(e.message));
  await p.goto(ORIGIN + url);
  await p.waitForTimeout(700);
  check(`${name}, phone: no sideways scroll`, await noSideways(p));
  check(`${name}, phone: no script errors`, errors.length === 0);
  if (name === 'home') check('phone: no Quick view button on touch', await p.locator('.qv-btn').first().isHidden());
  await p.screenshot({ path: path.join(OUT, `feature-${name}-phone.png`), fullPage: true });
  await ctx.close();
}

await browser.close();
console.log(`\n${passed} passed, ${failed} failed · screenshots in scripts/verify/out/`);
process.exit(failed ? 1 : 0);
