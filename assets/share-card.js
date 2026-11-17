/* Hikari — share cards (owner, 2026-11-17: "one-click … a beautiful label and shareable assets",
   and sharing into 小红书 / WeChat, where links are not welcome).

   The Share sheet on a product page (snippets/share-sheet) draws the piece as a finished picture in
   the browser, in four shapes:
     story   1080×1920  Instagram Story (people add their own link sticker)
     post    1080×1350  Instagram feed, 4:5
     xhs     1080×1440  小红书 3:4: no address and no QR code (the app limits posts with either), so it
                        carries the piece code KV-12345 and "私信报编号"; the search page opens a code
     wechat  1080×1440  WeChat: a QR code to the piece (assets/qrcode.js, MIT, loaded only here)
   One tap hands the picture to the phone's share sheet (Instagram, 小红书, WeChat … are in it) and
   copies a caption written for that app; where a browser can't share files it saves the picture.
   The real photograph only, the site's own fonts (Newsreader, Instrument Sans) and colours; nothing
   AI-made. Everything comes from data-* on the sheet, so the card always matches the page. */
(function(){
  "use strict";
  var sheet = document.querySelector("[data-share-card]");
  if (!sheet) return;
  var D = sheet.dataset;
  var C = { paper:"#FAF8F3", mid:"#F4F0E8", rule:"#DDD6C8", ink:"#1C1B18", nezu:"#5F5B52", midori:"#2F5B45" };
  var SERIF = '"Newsreader", Georgia, "Times New Roman", serif';
  var SANS = '"Instrument Sans", -apple-system, "Helvetica Neue", Arial, sans-serif';
  var CJK = '"Instrument Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif';
  var SIZE = { story:[1080,1920], post:[1080,1350], xhs:[1080,1440], wechat:[1080,1440] };
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
  function lines(ctx, text, max, most){
    var words = String(text).split(/\s+/), out = [], cur = "";
    words.forEach(function(w){
      var t = cur ? cur + " " + w : w;
      if (ctx.measureText(t).width > max && cur){ out.push(cur); cur = w; } else cur = t;
    });
    if (cur) out.push(cur);
    if (out.length > most){ out = out.slice(0, most); out[most - 1] = out[most - 1].replace(/\s*\S*$/, "") + "…"; }
    return out;
  }
  function fit(ctx, text, max){
    if (ctx.measureText(text).width <= max) return text;
    while (text.length > 1 && ctx.measureText(text + "…").width > max) text = text.slice(0, -1);
    return text.replace(/\s+$/, "") + "…";
  }
  function badge(ctx, label, x, y, scale){
    if (!label) return;
    var s = scale || 1, sold = D.status === "sold";
    ctx.font = "600 " + Math.round(22 * s) + "px " + (/[^\x00-\x7f]/.test(label) ? CJK : SANS);
    var gap = /[^\x00-\x7f]/.test(label) ? 4 * s : 4.5 * s;
    var tw = 0; Array.from(label).forEach(function(ch, i, a){ tw += ctx.measureText(ch).width + (i < a.length - 1 ? gap : 0); });
    var pw = tw + 36 * s, ph = 46 * s;
    ctx.fillStyle = sold ? C.ink : C.paper; ctx.fillRect(x, y, pw, ph);
    if (!sold){ ctx.strokeStyle = C.midori; ctx.lineWidth = 2 * s; ctx.strokeRect(x + s, y + s, pw - 2 * s, ph - 2 * s); }
    ctx.fillStyle = sold ? C.paper : C.midori; ctx.textBaseline = "middle";
    spaced(ctx, label, x + 18 * s, y + ph / 2 + s, gap, "left");
    ctx.textBaseline = "alphabetic";
  }

  /* ── the four cards ── */
  function draw(fmt, photo, logo, qr){
    var wh = SIZE[fmt], W = wh[0], H = wh[1];
    var c = document.createElement("canvas"); c.width = W; c.height = H;
    var ctx = c.getContext("2d");
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H);
    var house = D.house, title = D.title, price = D.price;

    if (fmt === "story"){
      var lg = tinted(logo, C.ink, 400); ctx.drawImage(lg, (W - lg.width) / 2, 120);
      cover(ctx, photo, 90, 300, 900, 900);
      badge(ctx, BADGE_EN[D.status], 122, 332, 1.15);
      ctx.fillStyle = C.ink; ctx.textAlign = "center";
      ctx.font = "300 78px " + SERIF; ctx.fillText(house, W / 2, 1320);
      ctx.fillStyle = C.nezu; ctx.font = "italic 300 42px " + SERIF;
      lines(ctx, title, 860, 2).forEach(function(l, i){ ctx.fillText(l, W / 2, 1392 + i * 54); });
      ctx.fillStyle = C.ink; ctx.font = "300 62px " + SERIF; ctx.fillText(price, W / 2, 1560);
      ctx.fillStyle = C.rule; ctx.fillRect(W / 2 - 60, 1620, 120, 2);
      ctx.fillStyle = C.ink; ctx.font = "600 26px " + SANS; spaced(ctx, "KARINEKOVTG.COM", W / 2, 1700, 7, "center");
      ctx.fillStyle = C.nezu; ctx.font = "500 24px " + SANS; spaced(ctx, D.ig ? "@" + D.ig.toUpperCase() + "  ·  LONDON" : "LONDON", W / 2, 1750, 5, "center");
      return c;
    }

    /* post, xhs, wechat: the photo as a square across the top, a label underneath */
    cover(ctx, photo, 0, 0, W, W);
    var zh = fmt !== "post";
    badge(ctx, (zh ? BADGE_ZH : BADGE_EN)[D.status], 44, 44, 1.2);
    var L = 64, R = W - 64, top = W;
    ctx.fillStyle = C.paper; ctx.fillRect(0, top, W, H - top);

    if (fmt === "post"){
      ctx.fillStyle = C.ink; ctx.textAlign = "left"; ctx.font = "300 54px " + SERIF; ctx.fillText(house, L, top + 82);
      ctx.textAlign = "right"; ctx.fillText(price, R, top + 82);
      ctx.textAlign = "left"; ctx.fillStyle = C.nezu; ctx.font = "italic 300 32px " + SERIF; ctx.fillText(fit(ctx, title, R - L), L, top + 134);
      ctx.fillStyle = C.rule; ctx.fillRect(L, top + 172, R - L, 2);
      var lgp = tinted(logo, C.ink, 190); ctx.drawImage(lgp, L, top + 200);
      ctx.fillStyle = C.nezu; ctx.font = "500 22px " + SANS; spaced(ctx, "KARINEKOVTG.COM" + (D.ig ? "  ·  @" + D.ig.toUpperCase() : ""), R, top + 234, 4, "right");
      return c;
    }

    /* 小红书 and WeChat: Chinese labels around the English name */
    var textR = fmt === "wechat" ? W - 64 - 260 - 40 : R;
    ctx.fillStyle = C.ink; ctx.textAlign = "left"; ctx.font = "300 56px " + SERIF; ctx.fillText(fit(ctx, house, textR - L - 260), L, top + 88);
    ctx.textAlign = fmt === "wechat" ? "left" : "right";
    if (fmt === "wechat"){ ctx.font = "300 46px " + SERIF; ctx.fillText(price, L, top + 206); }
    else ctx.fillText(price, R, top + 88);
    ctx.textAlign = "left"; ctx.fillStyle = C.nezu; ctx.font = "italic 300 32px " + SERIF; ctx.fillText(fit(ctx, title, textR - L), L, top + 140);
    ctx.fillStyle = C.ink; ctx.font = "600 30px " + CJK;
    var codeY = fmt === "wechat" ? top + 282 : top + 250;
    spaced(ctx, "编号 " + D.code, L, codeY, 2, "left");
    ctx.fillStyle = C.nezu; ctx.font = "500 26px " + CJK;
    if (fmt === "xhs"){
      ctx.fillStyle = C.rule; ctx.fillRect(L, top + 184, R - L, 2);
      ctx.fillStyle = C.nezu; ctx.textAlign = "right"; ctx.fillText("喜欢就私信我们，报编号", R, top + 250);
      ctx.textAlign = "left"; ctx.font = "500 24px " + CJK;
      ctx.fillText((D.xhsName ? "小红书号 " + D.xhsName + "  ·  " : "") + "KARINEKO VINTAGE  ·  伦敦中古首饰", L, top + 318);
    } else {
      ctx.fillText(D.wechat ? "微信 " + D.wechat : "KARINEKO VINTAGE", L, top + 330);
      var qs = 260, qx = W - 64 - qs, qy = top + 34;
      ctx.fillStyle = "#FFFFFF"; ctx.fillRect(qx - 12, qy - 12, qs + 24, qs + 24);
      var n = qr.getModuleCount(), cell = qs / n;
      ctx.fillStyle = C.ink;
      for (var r = 0; r < n; r++) for (var k = 0; k < n; k++) if (qr.isDark(r, k))
        ctx.fillRect(Math.floor(qx + k * cell), Math.floor(qy + r * cell), Math.ceil(cell), Math.ceil(cell));
      ctx.fillStyle = C.nezu; ctx.font = "500 22px " + CJK; ctx.textAlign = "center"; ctx.fillText("微信扫码查看", qx + qs / 2, qy + qs + 46);
      ctx.textAlign = "left";
    }
    return c;
  }

  /* ── captions, written for each app ── */
  function caption(fmt){
    var tag = (D.house || "").toLowerCase().replace(/^christian\s+/, "").replace(/[^a-z]/g, "");
    var houseZh = /dior/i.test(D.house) ? "Dior" : /chanel/i.test(D.house) ? "香奈儿" : D.house;
    var page = D.url;
    if (fmt === "xhs") return D.title + "｜" + D.house + " 中古  " + D.price + "\n伦敦中古首饰小店 Karineko Vintage" + (D.xhsName ? "（小红书号 " + D.xhsName + "）" : "") + "，每件只有一件\n喜欢的话私信我们，报编号 " + D.code +
      "\n\n#中古首饰 #" + houseZh + "中古 #伦敦中古 #vintage #中古饰品";
    if (fmt === "wechat") return D.house + " " + D.title + "  " + D.price + "\n扫码看详情" + (D.wechat ? "，或加微信 " + D.wechat : "") + "，报编号 " + D.code + "\n" + page;
    return D.house + " — " + D.title + "\n" + D.price + "\n\nOne of a kind, authenticity guaranteed.\nShop it at karinekovtg.com" + (D.ig ? " · @" + D.ig : "") +
      "\n\n#vintage" + tag + " #vintagejewellery #" + tag + "vintage #londonvintage #karinekovintage";
  }

  /* ── the sheet ── */
  var made = {}, current = "story", busy = null;
  var img = sheet.querySelector("[data-share-preview]"), wait = sheet.querySelector("[data-share-wait]");
  var go = sheet.querySelector("[data-share-go]"), save = sheet.querySelector("[data-share-save]");
  var copyBtn = sheet.querySelector("[data-share-copy]"), note = sheet.querySelector("[data-share-note]");
  var canFiles = !!(navigator.canShare && navigator.share);

  function make(fmt){
    if (made[fmt]) return made[fmt];
    made[fmt] = Promise.all([loadImg(D.photo), loadImg(D.logo), fonts(), fmt === "wechat" ? qrLib() : null]).then(function(a){
      var qr = null;
      if (fmt === "wechat"){ qr = a[3](0, "M"); qr.addData(D.url); qr.make(); }
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
      img.width = SIZE[fmt][0]; img.height = SIZE[fmt][1];
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
    if (e.detail && e.detail.id === sheet.id){ var r = sheet.querySelector("input[name=share-fmt]:checked"); show(r ? r.value : "story"); }
  });
})();
