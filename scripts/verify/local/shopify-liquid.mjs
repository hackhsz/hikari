// A Liquid engine that reads theme/ the way Shopify does, closely enough to test our own
// templates: Shopify's filters and tags that our templates use are stubbed below.
// It is not Shopify. It checks what our Liquid decides (which lines are sold, what the total
// is, which links point where), not how Shopify renders. The store step does that.
import { Liquid, Tag } from 'liquidjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const THEME = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../theme');
export const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../out');
fs.mkdirSync(OUT, { recursive: true });

function blockTag(name, wrap) {
  return class extends Tag {
    constructor(token, remain, liquid) {
      super(token, remain, liquid);
      this.tpl = [];
      const s = liquid.parser.parseStream(remain);
      s.on(`tag:end${name}`, () => s.stop()).on('template', t => this.tpl.push(t))
       .on('end', () => { throw new Error(`{% ${name} %} not closed`); });
      s.start();
    }
    *render(ctx, emitter) {
      if (!wrap) return;
      emitter.write(wrap[0]);
      yield this.liquid.renderer.renderTemplates(this.tpl, ctx, emitter);
      emitter.write(wrap[1]);
    }
  };
}

export const engine = new Liquid({
  root: ['snippets', 'sections', 'templates'].map(d => path.join(THEME, d)),
  extname: '.liquid',
  strictFilters: true,
});
engine.registerTag('schema', blockTag('schema', null));
// {% form 'product' %} and friends, opened the way Shopify does: method, action and id, so the
// bag script (which looks for form[action$="/cart/add"]) and the pop-up's id behave as on the store.
const FORM_ACTION = { product: '/cart/add', customer: '/contact', contact: '/contact' };
class FormTag extends blockTag('form', null) {
  constructor(token, remain, liquid) { super(token, remain, liquid); this.args = token.args; }
  *render(ctx, emitter) {
    const type = (this.args.match(/^\s*'(\w+)'/) || [])[1];
    const at = key => { const m = this.args.match(new RegExp(`${key}:\\s*('[^']*'|[\\w.]+)`)); return m ? this.liquid.evalValueSync(m[1], ctx) : ''; };
    const id = at('id'), cls = at('class');
    emitter.write(`<form method="post" action="${FORM_ACTION[type] || ''}"${id ? ` id="${id}"` : ''}${cls ? ` class="${cls}"` : ''}>`);
    yield this.liquid.renderer.renderTemplates(this.tpl, ctx, emitter);
    emitter.write('</form>');
  }
}
engine.registerTag('form', FormTag);
engine.registerFilter('money', v => '£' + (Number(v) / 100).toFixed(2));
engine.registerFilter('handleize', v => String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
engine.registerFilter('url_for_vendor', v => '/collections/vendors?q=' + encodeURIComponent(v));
// A fixture image can carry its own src (a data: URI), so the browser tests have real pictures.
engine.registerFilter('image_url', v => (v && v.src) || 'img');
engine.registerFilter('image_tag', (src, ...args) => {
  const alt = (args.find(a => Array.isArray(a) && a[0] === 'alt') || [])[1] || '';
  return src && src !== 'img' ? `<img src="${src}" alt="${String(alt).replace(/"/g, '&quot;')}" width="800" height="1000">` : '<img alt="">';
});
engine.registerFilter('payment_type_svg_tag', () => '');
engine.registerFilter('asset_url', v => v);
engine.registerFilter('stylesheet_tag', v => v);

export const read = f => fs.readFileSync(path.join(THEME, f), 'utf8');

// Shopify's global objects are visible inside render'd snippets; in liquidjs only globals are.
const GLOBAL_KEYS = ['settings', 'routes', 'shop', 'collections'];
export async function render(file, scope) {
  const globals = Object.fromEntries(GLOBAL_KEYS.filter(k => k in scope).map(k => [k, scope[k]]));
  return engine.parseAndRender(read(file), scope, { globals });
}
export const tidy = s => s.replace(/\n\s*\n+/g, '\n').replace(/[ \t]+/g, ' ').trim();

// ── fixtures ────────────────────────────────────────────────
export const settings = {
  brand_name: 'Hikari Vintage', edition_day: 'Thursday 19:00', vat_line: 'VAT line',
  legal_disclaimer: '[brand] is an independent reseller of pre-owned items. We are not affiliated with, authorised by, endorsed by or connected to any of the brands featured. All trademarks are the property of their respective owners.',
  trust_1: 'Every piece authenticated', trust_2: 'Duty paid', trust_3: 'UK next day over £100', trust_4: '14-day returns',
  delivery_free_over: 100, bag_notice: '', gift_enabled: true, gift_label: 'This is a gift', new_days: 14, share_enabled: true,
  gift_info: 'We write your note on a card and leave the price out of the parcel.',
};
export const routes = { cart_url: '/cart', collections_url: '/collections', all_products_collection_url: '/collections/all' };
export const shop = { name: 'Shop', enabled_payment_types: [], url: 'https://hikari.test', email: 'hello@hikari.test' };

export const piece = (id, vendor, available, extra = {}) => ({
  id, vendor, available, title: `${vendor} piece ${id}`, url: `/products/p${id}`, handle: `p${id}`, price: 18500, featured_image: null,
  tags: [], published_at: '2026-01-01T09:00:00Z', images: [], selected_or_first_available_variant: { id: 1000 + id },
  metafields: { hikari: { piece: `Piece ${id}` } }, ...extra,
});
export const line = (id, available, price = 18500) => ({
  variant_id: id, variant: { available }, final_line_price: price, key: `k${id}`, url: `/products/p${id}`,
  url_to_remove: `/cart/change?line=${id}&quantity=0`, vendor: 'Christian Dior', product_id: id, image: null,
  product: { title: 'Piece', metafields: { hikari: { piece: 'Crystal-set clip earrings, c.1987' } } },
});
export const house = (id, name, products = [], extra = {}) => ({
  id, title: `Vintage ${name} jewellery`, url: `/collections/vintage-${name.toLowerCase().replace(/ /g, '-')}-jewellery`,
  template_suffix: 'house', description: '', metafields: { hikari: {} }, products, ...extra,
});
// Shopify's `collections` is both a list and a lookup by handle.
export const collectionsOf = list => Object.assign([...list], Object.fromEntries(list.map(c => [c.url.split('/').pop(), c])));

// A drawn stand-in for a photograph: an SVG data: URI with a label, at 4:5.
export const pic = (label, hue = 40) => ({
  src: 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000"><rect width="800" height="1000" fill="hsl(${hue} 30% 86%)"/><circle cx="400" cy="480" r="150" fill="none" stroke="hsl(${hue} 45% 45%)" stroke-width="34"/><text x="400" y="900" font-family="sans-serif" font-size="42" text-anchor="middle" fill="#1C1B18">${label}</text></svg>`),
  alt: label, width: 800, height: 1000,
});
// One turntable turn: n frames, the mark moving round the circle.
export const spinFrames = n => Array.from({ length: n }, (_, i) => {
  const a = (i / n) * Math.PI * 2, x = 400 + Math.cos(a) * 150, y = 480 + Math.sin(a) * 50;
  const src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800"><rect width="800" height="800" fill="#EFEAE0"/><ellipse cx="400" cy="480" rx="160" ry="56" fill="none" stroke="#B48F42" stroke-width="22"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="26" fill="#2F5B45"/><text x="400" y="740" font-family="sans-serif" font-size="34" text-anchor="middle" fill="#1C1B18">frame ${i + 1} of ${n}</text></svg>`);
  return { preview_image: { src, width: 800, height: 800 } };
});
