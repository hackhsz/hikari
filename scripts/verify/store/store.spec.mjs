// Step 4: the theme on the real store. Needs HIKARI_STORE; see ../README.md.
//
// These tests only lean on our own markup (#bag, .bag-line, .house-h …) and Shopify's public
// storefront endpoints (/cart.js, /products/<handle>.js). Shopify's own checkout is only
// reached, screenshotted and read for a tax line; it is never paid.
import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const STORE = process.env.HIKARI_STORE;
const THEME = process.env.HIKARI_THEME_ID;
const PASSWORD = process.env.HIKARI_STOREFRONT_PASSWORD;
const HOUSE = process.env.HIKARI_HOUSE_HANDLE || 'vintage-christian-dior-jewellery';
const FREE_OVER = Number(process.env.HIKARI_FREE_OVER || 100);
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../out');

test.skip(!STORE, 'HIKARI_STORE is not set. See scripts/verify/README.md.');

test.beforeEach(async ({ page, context }) => {
  // Shopify's preview bar sits over the bottom of the page, which is where the bag's
  // Checkout button lives on a phone. Hide it; it is Shopify's, not ours.
  await context.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      const s = document.createElement('style');
      s.textContent = 'iframe[id*="preview" i],[id^="PBar"]{display:none!important}';
      document.head.appendChild(s);
    });
  });
  // A development store is password-protected. Posting the password sets the cookie.
  if (PASSWORD) {
    await page.request.post('/password', {
      form: { form_type: 'storefront_password', utf8: '✓', password: PASSWORD }, maxRedirects: 0,
    });
  }
  // Opening any page with preview_theme_id makes the rest of the visit use that theme.
  const res = await page.goto(THEME ? `/?preview_theme_id=${THEME}` : '/');
  expect(page.url(), 'Still on the password page: check HIKARI_STOREFRONT_PASSWORD').not.toMatch(/\/password/);
  expect(res && res.status(), 'The home page did not load').toBeLessThan(400);
});

function watchErrors(page) {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  return errors;
}
const shot = (page, name) => page.screenshot({ path: path.join(OUT, `store-${name}-${test.info().project.name}.png`), fullPage: true });

async function firstPieceInStock(page) {
  const list = await (await page.request.get('/products.json?limit=250')).json();
  for (const p of list.products || []) {
    const full = await (await page.request.get(`/products/${p.handle}.js`)).json();
    if (full.available) return full;
  }
  return null;
}

test('the home page serves the theme under test', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/');
  if (THEME) {
    const id = await page.evaluate(() => window.Shopify && window.Shopify.theme && window.Shopify.theme.id);
    expect(String(id), 'Shopify served a different theme from HIKARI_THEME_ID').toBe(String(THEME));
  }
  await expect(page.locator('.mast')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), 'The page scrolls sideways').toBe(false);
  await shot(page, 'home');
  expect(errors, 'Script errors').toEqual([]);
});

test('a house page', async ({ page }) => {
  const errors = watchErrors(page);
  const res = await page.goto(`/collections/${HOUSE}`);
  test.skip(res.status() === 404, `No collection at /collections/${HOUSE} yet. theme/README.md, "House pages".`);
  await expect(page.locator('.house-h')).toBeVisible();
  await expect(page.locator('.house-legal')).not.toBeEmpty();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), 'The page scrolls sideways').toBe(false);
  await shot(page, 'house');
  expect(errors, 'Script errors').toEqual([]);
});

test('add to bag, gift note, and on to checkout', async ({ page }) => {
  const errors = watchErrors(page);
  await page.request.post('/cart/clear.js');
  const piece = await firstPieceInStock(page);
  test.skip(!piece, 'Nothing in stock to add. Import scripts/test-products.csv.');

  await page.goto(`/products/${piece.handle}`);
  await page.locator('form[action$="/cart/add"] [type="submit"]').first().click();
  const bag = page.locator('#bag');
  await expect(bag).toHaveClass(/is-open/);
  await expect(bag.locator('.bag-line')).toHaveCount(1);
  await expect(bag.locator('.bag-sum')).toContainText(String(Math.floor(piece.price / 100)));
  if (piece.price >= FREE_OVER * 100) await expect(bag.locator('.bag-row')).toContainText('Free');

  // The gift note reaches the cart, and so the order, as attributes.
  const toggle = bag.locator('[data-gift-toggle]');
  if (await toggle.count()) {
    await toggle.check();
    await bag.locator('[data-gift-note]').fill('Verification note');
    await bag.locator('[data-gift-note]').blur();
    await expect.poll(async () => (await (await page.request.get('/cart.js')).json()).attributes, { message: 'Gift attributes on the cart' })
      .toMatchObject({ Gift: 'Yes', 'Gift note': 'Verification note' });
    await toggle.uncheck();
    await expect.poll(async () => (await (await page.request.get('/cart.js')).json()).attributes.Gift || '', { message: 'Gift cleared' }).toBe('');
  }
  await shot(page, 'bag');
  expect(errors, 'Script errors').toEqual([]);

  // Hand-off to Shopify's checkout. Not paid.
  await bag.locator('[name="checkout"]').click();
  await page.waitForURL(/\/(checkouts?|checkpoint)\//, { timeout: 30_000 });
  test.skip(/checkpoint/.test(page.url()), 'Shopify asked for a bot check at checkout. Check this step by hand.');
  await page.waitForLoadState('networkidle');
  await shot(page, 'checkout');
  // D12 and #55: no tax line while we are not VAT registered.
  await expect.soft(page.getByText(/\bVAT\b|estimated tax|in taxes/i), 'A tax line at checkout: Settings → Taxes and duties').toHaveCount(0);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('the bag page still adds, shows and removes', async ({ page }) => {
    await page.request.post('/cart/clear.js');
    const piece = await firstPieceInStock(page);
    test.skip(!piece, 'Nothing in stock to add. Import scripts/test-products.csv.');
    await page.goto(`/products/${piece.handle}`);
    await page.locator('form[action$="/cart/add"] [type="submit"]').first().click();
    await page.waitForURL(/\/cart/);
    await expect(page.locator('.bag-page .bag-line')).toHaveCount(1);
    await page.locator('.bag-page .bag-remove').first().click();
    await expect(page.locator('.bag-page .bag-empty')).toBeVisible();
  });
});

test('a piece that sells while it is in the bag', async () => {
  // Needs Admin access to set a piece's stock to 0 and back again, which the storefront
  // cannot do: the Shopify connector, or HIKARI_ADMIN_TOKEN. Covered locally until then
  // (local/liquid.mjs and local/browser.mjs).
  test.fixme(true, 'Needs Admin API access. Not built yet.');
});
