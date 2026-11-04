// Karineko: checkout and purchases to Google Analytics (G-EV92TR6CMY).
// Shopify's checkout doesn't run the theme's scripts, so this custom pixel (Settings → Customer
// events → "Karineko GA4 checkout") sends what happens there. The shop's own pages send browsing
// events themselves (assets/track.js). Customer privacy on this pixel: Analytics required, so it
// runs only for visitors who allowed analytics. The copy in the theme repo is
// tools/checkout-pixel.js: change it there and paste it into the pixel again.
const GA = "G-EV92TR6CMY";
const s = document.createElement("script");
s.async = true;
s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA;
document.head.appendChild(s);
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag("js", new Date());

// The same visitor as on the shop's pages: Google's client id, from the shop's _ga cookie.
const ready = browser.cookie.get("_ga").then((ga) => {
  const cid = String(ga || "").split(".").slice(-2).join(".");
  gtag("config", GA, Object.assign({ send_page_view: false }, /^\d+\.\d+$/.test(cid) ? { client_id: cid } : {}));
}).catch(() => gtag("config", GA, { send_page_view: false }));

const money = (m) => Number((m && m.amount) || 0);
const items = (lines) => (lines || []).map((l, i) => {
  const p = (l.variant && l.variant.product) || {};
  return {
    item_id: String(p.id || ""),
    item_name: [p.vendor, l.title].filter(Boolean).join(" "),
    item_brand: p.vendor || "",
    price: money(l.variant && l.variant.price),
    quantity: l.quantity || 1,
    index: i,
  };
});
const send = (name, e, extra) => ready.then(() => {
  const c = e.data.checkout;
  gtag("event", name, Object.assign({
    currency: c.currencyCode,
    value: money(c.subtotalPrice) || money(c.totalPrice),
    items: items(c.lineItems),
    page_location: e.context && e.context.document && e.context.document.location && e.context.document.location.href,
  }, extra || {}));
});

analytics.subscribe("checkout_started", (e) => send("begin_checkout", e));
analytics.subscribe("checkout_contact_info_submitted", (e) => send("add_contact_info", e));
analytics.subscribe("checkout_shipping_info_submitted", (e) => send("add_shipping_info", e));
analytics.subscribe("payment_info_submitted", (e) => send("add_payment_info", e));
analytics.subscribe("checkout_completed", (e) => {
  const c = e.data.checkout;
  send("purchase", e, {
    transaction_id: String((c.order && c.order.id) || c.token || ""),
    value: money(c.totalPrice),
    tax: money(c.totalTax),
    shipping: money(c.shippingLine && c.shippingLine.price),
    coupon: (c.discountApplications || []).map((d) => d.title).filter(Boolean).join(","),
  });
});
