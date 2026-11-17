/* Hikari — share cards (owner, 2026-11-17: "one-click … a beautiful label and shareable assets";
   then: one Instagram choice, a website QR code on the card, no piece code, no 小红书号 — "logo will do").

   The Share sheet on a product page (snippets/share-sheet) draws the piece as a finished picture in
   the browser, 1080×1440 (3:4: Instagram's feed takes it, and it sits well in a Story), three ways:
     ig      English: house, name, price, logo, karinekovtg.com · @handle, QR "Scan to shop"
     xhs     小红书: Chinese labels, "喜欢就私信我们", QR "扫码查看"
     wechat  微信: Chinese labels, the shop's WeChat ID, QR "微信扫码查看"
   The QR code opens the piece on the site (assets/qrcode.js, MIT, loaded when the sheet first draws).
   One tap hands the picture to the phone's share sheet (Instagram, 小红书, WeChat … are in it) and
   copies a caption written for that app; where a browser can't share files it saves the picture.
   The real photograph only, the site's own fonts (Newsreader, Instrument Sans) and colours; nothing
   AI-made. Everything comes from data-* on the sheet, so the card always matches the page. */
(function(){
  "use strict";
  var sheet = document.querySelector("[data-share-card]");
  if (!sheet) return;
  var D = sheet.dataset;
  var C = { paper:"#FAF8F3", rule:"#DDD6C8", ink:"#1C1B18", nezu:"#5F5B52", midori:"#2F5B45" };
  var SERIF = '"Newsreader", Georgia, "Times New Roman", serif';
  var SANS = '"Instrument Sans", -apple-system, "Helvetica Neue", Arial, sans-serif';
  var CJK = '"Instrument Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif';
  var W = 1080, H = 1440;
  /* the badge on the photo, in the card's language */
  var BADGE_EN = { presale:"PRE-ORDER", sold:"SOLD", reserved:"RESERVED", soon:"COMING SOON", sale:"SALE", "new":"NEW IN" };
  var BADGE_ZH = { presale:"预订", sold:"已售", reserved:"已预留", soon:"即将上架", sale:"特价", "new":"新到" };

  /* ── loading ── */
  function loadImg(src){
    return new Promise(function(ok, no){
      var i = new Image(); i.crossOrigin = "anonymous"; i.decoding = "async";
      i.onload = function(){ ok(i); }; i.onerror = no; i.src = src;
    });
  }
  var fontsReady = null;
  function fonts(){
    if (!fontsReady) fontsReady = document.fonts ? Promise.all([
      document.fonts.load("300 80px Newsreader"), document.fonts.load("italic 300 40px Newsreader"),
      document.fonts.load("500 28px \"Instrument Sans\""), document.fonts.load("600 28px \"Instrument Sans\"")
    ]).catch(function(){}) : Promise.resolve();
    return fontsReady;
  }
  var qrReady = null;
  function qrLib(){
    if (window.qrcode) return Promise.resolve(window.qrcode);
    if (!qrReady) qrReady = new Promise(function(ok, no){
      var s = document.createElement("script"); s.src = D.qrSrc; s.async = true;
      s.onload = function(){ ok(window.qrcode); }; s.onerror = no; document.head.appendChild(s);
    });
    return qrReady;
  }

  /* ── drawing helpers ── */
  function cover(ctx, img, x, y, w, h){
    var r = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    var sw = w / r, sh = h / r;
    ctx.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, x, y, w, h);
  }
  /* the logo is a mask (any colour); draw it in ink */
  function tinted(img, color, w){
    var h = Math.round(w * img.naturalHeight / img.naturalWidth);
    var c = document.createElement("canvas"); c.width = w; c.height = h;
    var x = c.getContext("2d"); x.drawImage(img, 0, 0, w, h);
    x.globalCompositeOperation = "source-in"; x.fillStyle = color; x.fillRect(0, 0, w, h);
    return c;
  }
  /* letter-spaced text, drawn a character at a time so every browser spaces it */
  function spaced(ctx, text, x, y, gap, align){
    var w = 0, i, ch = Array.from(text);
    for (i = 0; i < ch.length; i++) w += ctx.measureText(ch[i]).width + (i < ch.length - 1 ? gap : 0);
    var cx = align === "center" ? x - w / 2 : align === "right" ? x - w : x;
    var keep = ctx.textAlign; ctx.textAlign = "left";
    for (i = 0; i < ch.length; i++){ ctx.fillText(ch[i], cx, y); cx += ctx.measureText(ch[i]).width + gap; }
    ctx.textAlign = keep;
    return w;
  }
  function fit(ctx, text, max){
    if (ctx.measureText(text).width <= max) return text;
    while (text.length > 1 && ctx.measureText(text + "…").width > max) text = text.slice(0, -1);
    return text.replace(/\s+$/, "") + "…";
  }
  function badge(ctx, label, x, y, scale){
    if (!label) return;
    var s = scale || 1, sold = D.status === "sold", cjk = /[^\x00-\x7f]/.test(label);
    ctx.font = "600 " + Math.round(22 * s) + "px " + (cjk ? CJK : SANS);
    var gap = (cjk ? 4 : 4.5) * s;
    var tw = 0; Array.from(label).forEach(function(ch, i, a){ tw += ctx.measureText(ch).width + (i < a.length - 1 ? gap : 0); });
    var pw = tw + 36 * s, ph = 46 * s;
    ctx.fillStyle = sold ? C.ink : C.paper; ctx.fillRect(x, y, pw, ph);
    if (!sold){ ctx.strokeStyle = C.midori; ctx.lineWidth = 2 * s; ctx.strokeRect(x + s, y + s, pw - 2 * s, ph - 2 * s); }
    ctx.fillStyle = sold ? C.paper : C.midori; ctx.textBaseline = "middle";
    spaced(ctx, label, x + 18 * s, y + ph / 2 + s, gap, "left");
    ctx.textBaseline = "alphabetic";
  }
  function drawQR(ctx, qr, x, y, size){
    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(x - 14, y - 14, size + 28, size + 28);
    var n = qr.getModuleCount(), cell = size / n;
    ctx.fillStyle = C.ink;
    for (var r = 0; r < n; r++) for (var k = 0; k < n; k++) if (qr.isDark(r, k))
      ctx.fillRect(Math.floor(x + k * cell), Math.floor(y + r * cell), Math.ceil(cell), Math.ceil(cell));
  }

  /* ── the card: the photo as a square across the top, the label underneath, the QR on the right ── */
  function draw(fmt, photo, logo, qr){
    var c = document.createElement("canvas"); c.width = W; c.height = H;
    var ctx = c.getContext("2d");
    var zh = fmt !== "ig", top = W, L = 64;
    var qs = 232, qx = W - 64 - qs, qy = top + 46, textR = qx - 56;
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H);
    cover(ctx, photo, 0, 0, W, W);
    badge(ctx, (zh ? BADGE_ZH : BADGE_EN)[D.status], 44, 44, 1.2);

    ctx.textAlign = "left"; ctx.fillStyle = C.ink;
    ctx.font = "300 58px " + SERIF; ctx.fillText(fit(ctx, D.house, textR - L), L, top + 92);
    ctx.fillStyle = C.nezu; ctx.font = "italic 300 33px " + SERIF; ctx.fillText(fit(ctx, D.title, textR - L), L, top + 144);
    ctx.fillStyle = C.ink; ctx.font = "300 50px " + SERIF; ctx.fillText(D.price, L, top + 218);
    var lg = tinted(logo, C.ink, 210); ctx.drawImage(lg, L, top + 254);

    var line = fmt === "ig" ? "KARINEKOVTG.COM" + (D.ig ? "  ·  @" + D.ig.toUpperCase() : "")
             : fmt === "wechat" ? (D.wechat ? "微信 " + D.wechat : "") : "喜欢就私信我们";
    if (line){
      ctx.fillStyle = C.nezu;
      if (fmt === "ig"){ ctx.font = "500 21px " + SANS; spaced(ctx, line, L, top + 334, 3.5, "left"); }
      else { ctx.font = "500 25px " + CJK; ctx.fillText(line, L, top + 334); }
    }

    drawQR(ctx, qr, qx, qy, qs);
    ctx.fillStyle = C.nezu; ctx.textAlign = "center";
    if (fmt === "ig"){ ctx.font = "600 19px " + SANS; spaced(ctx, "SCAN TO SHOP", qx + qs / 2, qy + qs + 46, 4, "center"); }
    else { ctx.font = "500 23px " + CJK; ctx.fillText(fmt === "wechat" ? "微信扫码查看" : "扫码查看", qx + qs / 2, qy + qs + 48); }
    ctx.textAlign = "left";
    return c;
  }

  /* ── captions, written for each app ── */
  function caption(fmt){
    var tag = (D.house || "").toLowerCase().replace(/^christian\s+/, "").replace(/[^a-z]/g, "");
    var houseZh = /dior/i.test(D.house) ? "Dior" : /chanel/i.test(D.house) ? "香奈儿" : D.house;
    if (fmt === "xhs") return D.title + "｜" + D.house + " 中古  " + D.price + "\n伦敦中古首饰小店 Karineko Vintage，每件只有一件\n喜欢的话私信我们，或扫图上的二维码看详情" +
      "\n\n#中古首饰 #" + houseZh + "中古 #伦敦中古 #vintage #中古饰品";
    if (fmt === "wechat") return D.house + " " + D.title + "  " + D.price + "\n扫码看详情" + (D.wechat ? "，或加微信 " + D.wechat : "") + "\n" + D.url;
    return D.house + " — " + D.title + "\n" + D.price + "\n\nOne of a kind, authenticity guaranteed.\nShop it at karinekovtg.com" + (D.ig ? " · @" + D.ig : "") +
      "\n\n#vintage" + tag + " #vintagejewellery #" + tag + "vintage #londonvintage #karinekovintage";
  }

  /* ── the sheet ── */
  var made = {}, current = "ig", busy = null;
  var img = sheet.querySelector("[data-share-preview]"), wait = sheet.querySelector("[data-share-wait]");
  var go = sheet.querySelector("[data-share-go]"), save = sheet.querySelector("[data-share-save]");
  var copyBtn = sheet.querySelector("[data-share-copy]"), note = sheet.querySelector("[data-share-note]");
  var canFiles = !!(navigator.canShare && navigator.share);

  function make(fmt){
    if (made[fmt]) return made[fmt];
    made[fmt] = Promise.all([loadImg(D.photo), loadImg(D.logo), fonts(), qrLib()]).then(function(a){
      var qr = a[3](0, "M"); qr.addData(D.url); qr.make();
      var canvas = draw(fmt, a[0], a[1], qr);
      return new Promise(function(ok){ canvas.toBlob(function(b){ ok(b); }, "image/png"); });
    }).then(function(blob){
      var file = new File([blob], "karineko-" + D.code.toLowerCase() + "-" + fmt + ".png", { type: "image/png" });
      return { blob: blob, file: file, url: URL.createObjectURL(blob) };
    });
    made[fmt].catch(function(){ delete made[fmt]; });
    return made[fmt];
  }
  function show(fmt){
    current = fmt; note.textContent = "";
    go.disabled = save.disabled = true; wait.hidden = false; img.hidden = true;
    var mine = busy = make(fmt);
    mine.then(function(r){
      if (busy !== mine) return;
      img.src = r.url; img.hidden = false; wait.hidden = true;
      img.width = W; img.height = H;
      go.disabled = save.disabled = false;
      go.hidden = !(canFiles && navigator.canShare({ files: [r.file] }));
    }).catch(function(){ if (busy === mine){ wait.hidden = false; wait.textContent = D.failed; } });
  }
  function track(what){ document.dispatchEvent(new CustomEvent("hikari:share", { detail: { format: current, action: what, code: D.code } })); }
  function copyCaption(){
    var t = caption(current);
    return navigator.clipboard ? navigator.clipboard.writeText(t).then(function(){ note.textContent = D.copied; }, function(){}) : Promise.resolve();
  }
  /* Share: the picture is ready before the tap, so the share sheet opens inside the tap (Safari
     refuses one that comes later); the caption is copied at the same moment, not awaited. */
  go.addEventListener("click", function(){
    made[current].then(function(r){
      copyCaption();
      navigator.share({ files: [r.file] }).then(function(){ track("shared"); }, function(){});
    });
    track("share-tap");
  });
  save.addEventListener("click", function(){
    made[current].then(function(r){
      var a = document.createElement("a"); a.href = r.url; a.download = r.file.name;
      document.body.appendChild(a); a.click(); a.remove();
      copyCaption(); track("saved");
    });
  });
  copyBtn.addEventListener("click", function(){ copyCaption(); track("caption"); });
  [].forEach.call(sheet.querySelectorAll("input[name=share-fmt]"), function(r){
    r.addEventListener("change", function(){ if (r.checked) show(r.value); });
  });
  /* draw the first card when the sheet opens, not before: nothing is fetched for visitors who never share */
  document.addEventListener("hikari:sheet", function(e){
    if (e.detail && e.detail.id === sheet.id){ var r = sheet.querySelector("input[name=share-fmt]:checked"); show(r ? r.value : "ig"); }
  });
})();
