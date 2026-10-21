// Step 2b: drive assets/hikari.js in a real browser against our own rendered markup, with
// Shopify's cart API mocked. Also renders a house page and screenshots it at desktop and
// phone widths into out/. No store needed. Run: node local/browser.mjs
import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { render, read, OUT, settings, routes, shop, piece, line, house, collectionsOf } from './shopify-liquid.mjs';

// The cloud sessions ship a Chromium at /opt/pw-browsers; elsewhere, `npx playwright install chromium`.
const exe = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const css = read('assets/hikari.css'), js = read('assets/hikari.js');

let failed = 0, passed = 0;
const check = (name, ok) => { ok ? passed++ : failed++; console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`); };

// ── the bag drawer ──────────────────────────────────────────
const drawer = items => render('sections/bag-drawer.liquid', {
  settings, shop, routes: { ...routes, cart_url: '/cart' },
  cart: { item_count: items.length, items, attributes: {} },
});
const atLoad = await drawer([line(1, true)]);
// What Shopify sends back when the bag is refreshed: piece 1 has since sold, piece 2 is new.
const later = await drawer([line(1, false), line(2, true)]);

const bagPage = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body class="template-product">
<a class="bag-btn" href="/cart" data-sheet-open="bag" aria-controls="bag">Bag (<span data-bag-count>1</span>)</a>
${atLoad}
<script>
  window.HikariRoutes = { cart_url: "/cart", cart_add_url: "/cart/add", cart_change_url: "/cart/change", cart_update_url: "/cart/update" };
  window.__posts = []; window.__gets = 0; window.__later = ${JSON.stringify(later)};
  window.fetch = function (url, opts) {
    if (opts && opts.method === "POST") { window.__posts.push({ url: url, body: JSON.parse(opts.body) }); return Promise.resolve(new Response("{}")); }
    window.__gets++; return Promise.resolve(new Response(JSON.stringify({ "bag-drawer": window.__later })));
  };
</script><script>${js}</script></body></html>`;

{
  const page = await browser.newPage({ viewport: { width: 390, height: 760 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.setContent(bagPage);
  const posts = () => page.evaluate(() => window.__posts);
  const lastAttrs = async () => { const p = await posts(); return p.length ? p[p.length - 1].body.attributes : {}; };

  await page.evaluate(() => window.Hikari.openSheet('bag'));
  await page.waitForTimeout(350);
  check('gift note hidden until ticked', await page.locator('#gift-drawer').isHidden());

  await page.locator('[data-gift-toggle]').check();
  check('ticking shows the note and enables it', await page.locator('#gift-drawer').isVisible() && await page.locator('[data-gift-note]').isEnabled());
  const first = (await posts())[0];
  check('ticking saves Gift: Yes to /cart/update.js', first && first.url === '/cart/update.js' && first.body.attributes.Gift === 'Yes');

  await page.locator('[data-gift-note]').fill('For Mum');
  await page.waitForTimeout(800);
  check('typing saves the note after a pause', (await posts()).some(p => p.body.attributes['Gift note'] === 'For Mum'));

  await page.locator('[data-gift-note]').focus();
  await page.evaluate(() => window.Hikari.refreshBag());
  await page.waitForTimeout(150);
  check('a refresh while typing keeps the note', await page.locator('[data-gift-note]').inputValue() === 'For Mum'
    && await page.locator('#bag .bag-line.is-sold').count() === 0);

  await page.locator('[data-gift-toggle]').uncheck();
  const a = await lastAttrs();
  check('unticking clears both attributes and disables the note', a.Gift === '' && a['Gift note'] === '' && await page.locator('[data-gift-note]').isDisabled());

  await page.evaluate(() => { window.Hikari.closeSheet(); document.activeElement.blur(); });
  await page.waitForTimeout(350);
  const gets = await page.evaluate(() => window.__gets);
  await page.locator('.bag-btn').click();
  await page.waitForTimeout(300);
  check('opening the bag asks Shopify again', await page.evaluate(() => window.__gets) === gets + 1);
  check('the piece that sold since shows as sold', await page.locator('#bag .bag-line.is-sold').count() === 1);
  check('the header count follows', await page.locator('[data-bag-count]').textContent() === '2');
  check('checkout waits, with the warning', await page.locator('#bag-checkout-drawer [name="checkout"]').isDisabled() && await page.locator('#bag .bag-warn').isVisible());
  check('focus lands on Close', await page.evaluate(() => document.activeElement && document.activeElement.classList.contains('sheet-x')));
  await page.screenshot({ path: path.join(OUT, 'local-bag-sold.png') });
  check('no script errors', errors.length === 0);
  if (errors.length) console.log('     ' + errors.join('\n     '));
  await page.close();
}

// ── a house page, screenshotted ─────────────────────────────
{
  const P = (id, name, price, ok, grade, size) => piece(id, 'Christian Dior', ok, { title: name, price: price * 100, metafields: { hikari: { piece: name, grade, size } } });
  const dior = house(1, 'Christian Dior', [
    P(1, 'Crystal-set clip earrings, c.1987', 185, true, 'II', '42 × 31 mm'), P(2, 'Gold-tone knot brooch, c.1979', 240, true, 'I', '55 × 40 mm'),
    P(3, 'Poured glass drop earrings, c.1990', 285, true, 'II', '60 × 22 mm'), P(4, 'Pearl collar, c.1984', 320, false), P(5, 'Enamelled bangle, c.1972', 210, false),
  ], {
    description: '<p>[Editorial from Thread 3: the house’s costume jewellery, its marks by period, what to look for in condition.]</p>',
    metafields: { hikari: { lede: { value: '[Lede from Thread 3.]' }, marks: { value: '[Period] | [Mark as it reads] | [Note]\n[Period] | [Mark as it reads]' } } },
  });
  const all = collectionsOf([dior, ...['Givenchy', 'Yves Saint Laurent', 'Nina Ricci', 'Grosse'].map((n, i) => house(i + 2, n))]);
  const scope = { settings, routes, shop, collections: all, collection: dior, template: { name: 'collection' }, form: {} };
  const parts = [
    await render('sections/main-house.liquid', scope),
    await render('sections/record.liquid', { ...scope, section: { settings: { heading: 'On the Record — pieces from this house that have passed through', collection: '' } } }),
    await render('sections/houses.liquid', { ...scope, section: { settings: { heading: 'Other houses' }, blocks: [] } }),
    await render('sections/signup.liquid', { ...scope, section: { settings: { heading: 'The Edition goes out Thursday.', body: 'The list gets it first.' } } }),
  ];
  const file = path.join(OUT, 'local-house.html');
  fs.writeFileSync(file, `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;1,6..72,300&family=Instrument+Sans:wght@400;500;600&display=swap"><style>${css}</style></head><body><main>${parts.join('')}</main><script>${js}</script></body></html>`);
  for (const [w, h, name] of [[1280, 900, 'desktop'], [390, 844, 'phone']]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('file://' + file);
    await page.waitForTimeout(1000);
    check(`house page, ${name}: no sideways scroll`, !(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)));
    check(`house page, ${name}: no script errors`, errors.length === 0);
    await page.screenshot({ path: path.join(OUT, `local-house-${name}.png`), fullPage: true });
    await page.close();
  }
}

await browser.close();
console.log(`\n${passed} passed, ${failed} failed · screenshots in scripts/verify/out/`);
process.exit(failed ? 1 : 0);
