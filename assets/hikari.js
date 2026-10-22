/* Hikari — grain, scroll-driven colour, and canvas plate fallback.
   The plate fallback draws a daylight study wherever a product has no image yet,
   so the store is presentable before photography exists. See 2-photos/13-photography-pipeline.md */
(function(){
  "use strict";
  var root=document.documentElement;

  /* ── plates: only where no real image ───────────────── */
  var TONES={
    light:{a:"#FCFBF8",b:"#E3DCCF",sh:"rgba(30,28,24,.32)",g1:"#E8CE92",g2:"#B48F42",g3:"#7E6026",gr:16},
    grey:{a:"#F2EDE4",b:"#D4CBBA",sh:"rgba(30,28,24,.34)",g1:"#E4C88A",g2:"#AD8A40",g3:"#755A24",gr:17},
    green:{a:"#3D6A53",b:"#22432F",sh:"rgba(6,16,10,.44)",g1:"#EAD29A",g2:"#BD9850",g3:"#7A5E29",gr:18},
    dark:{a:"#2A2824",b:"#121110",sh:"rgba(0,0,0,.5)",g1:"#C9AC6D",g2:"#8E7238",g3:"#57441E",gr:19}};
  /* "none" is light on the ground with no object: the brand hero's placeholder,
     so it never reads as a product. */
  var COMPS={single:[[.50,.52,.19]],pair:[[.40,.50,.145],[.62,.56,.155]],
             stack:[[.36,.44,.115],[.55,.55,.135],[.70,.43,.10]],none:[]};
  function rng(s){s=s>>>0||1;return function(){s^=s<<13;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296};}

  function draw(cv){
    var tone=TONES[cv.dataset.tone]||TONES.light, comp=COMPS[cv.dataset.comp]||COMPS.pair;
    var ratio=parseFloat(cv.dataset.ratio)||0.8, rand=rng((parseInt(cv.dataset.seed,10)||1)*7919);
    var cssW=cv.clientWidth||(cv.parentNode&&cv.parentNode.clientWidth)||600; if(cssW<40) return false;
    /* data-fill: the box (an aspect-ratio container) sets the height, the canvas follows it */
    var fill=cv.dataset.fill==="1";
    var cssH=fill?(cv.clientHeight||Math.round(cssW*ratio)):Math.round(cssW*ratio),
        dpr=Math.min(window.devicePixelRatio||1,cssW<320?1.5:2);
    var W=Math.max(2,Math.round(cssW*dpr)), H=Math.max(2,Math.round(cssH*dpr));
    if(cv.width===W&&cv.height===H&&cv.dataset.done==="1") return true;
    cv.width=W;cv.height=H;if(!fill) cv.style.height=cssH+"px";
    var c=cv.getContext("2d"); if(!c) return false;
    c.save();c.scale(dpr,dpr);var w=cssW,h=cssH,m=Math.min(w,h);
    var g=c.createLinearGradient(w*.12,0,w*.88,h);g.addColorStop(0,tone.a);g.addColorStop(1,tone.b);
    c.fillStyle=g;c.fillRect(0,0,w,h);
    var lg=c.createRadialGradient(w*.26,h*.10,0,w*.26,h*.10,Math.max(w,h)*.85);
    lg.addColorStop(0,"rgba(255,255,255,.32)");lg.addColorStop(1,"rgba(255,255,255,0)");
    c.fillStyle=lg;c.fillRect(0,0,w,h);
    c.save();c.globalAlpha=.12;c.translate(w*.64,h*.52);c.rotate(-.36);
    var bg=c.createLinearGradient(0,-h*.6,0,h*.6);
    bg.addColorStop(0,"rgba(0,0,0,0)");bg.addColorStop(.5,"rgba(0,0,0,.85)");bg.addColorStop(1,"rgba(0,0,0,0)");
    c.fillStyle=bg;c.fillRect(-w*.5,-h*.62,w*.30,h*1.24);c.restore();
    comp.forEach(function(o){
      var cx=w*o[0]+(rand()-.5)*w*.02, cy=h*o[1]+(rand()-.5)*h*.03, r=m*o[2];
      c.save();c.translate(cx+r*.30,cy+r*.46);c.scale(1,.40);
      var sg=c.createRadialGradient(0,0,0,0,0,r*1.7);sg.addColorStop(0,tone.sh);sg.addColorStop(1,"rgba(0,0,0,0)");
      c.fillStyle=sg;c.beginPath();c.arc(0,0,r*1.7,0,Math.PI*2);c.fill();c.restore();
      var mg=c.createLinearGradient(cx-r,cy-r,cx+r,cy+r);
      mg.addColorStop(0,tone.g1);mg.addColorStop(.42,tone.g2);mg.addColorStop(.72,tone.g3);mg.addColorStop(1,tone.g1);
      c.strokeStyle=mg;c.lineWidth=r*.30;c.lineCap="round";
      c.beginPath();c.arc(cx,cy,r,0,Math.PI*2);c.stroke();
      c.strokeStyle="rgba(255,255,255,.32)";c.lineWidth=r*.07;
      c.beginPath();c.arc(cx,cy,r*.90,Math.PI*1.08,Math.PI*1.66);c.stroke();
      for(var k=0;k<7;k++){
        var a=(k/7)*Math.PI*2+rand()*.35, sx=cx+Math.cos(a)*r, sy=cy+Math.sin(a)*r, sr=r*(.055+rand()*.035);
        var st=c.createRadialGradient(sx-sr*.3,sy-sr*.3,0,sx,sy,sr);
        st.addColorStop(0,"rgba(255,255,255,.95)");st.addColorStop(.55,"rgba(255,252,240,.5)");st.addColorStop(1,"rgba(255,255,255,0)");
        c.fillStyle=st;c.beginPath();c.arc(sx,sy,sr,0,Math.PI*2);c.fill();}
    });
    var vg=c.createRadialGradient(w*.5,h*.48,m*.30,w*.5,h*.5,Math.max(w,h)*.82);
    vg.addColorStop(0,"rgba(0,0,0,0)");vg.addColorStop(1,"rgba(0,0,0,.28)");
    c.fillStyle=vg;c.fillRect(0,0,w,h);c.restore();
    try{var im=c.getImageData(0,0,W,H),d=im.data,amp=tone.gr;
      for(var p=0;p<d.length;p+=4){var nz=(rand()-.5)*amp*2;d[p]+=nz;d[p+1]+=nz;d[p+2]+=nz;}
      c.putImageData(im,0,0);}catch(e){}
    cv.dataset.done="1";return true;
  }

  var io=null, ro=null;
  function initPlates(){
    var pl=[].slice.call(document.querySelectorAll("canvas[data-seed]:not([data-obs])"));
    pl.forEach(function(cv){
      cv.dataset.obs="1";
      if(cv.dataset.fill==="1") return;
      var w=cv.clientWidth||(cv.parentNode&&cv.parentNode.clientWidth)||600;
      cv.style.height=Math.round(w*(parseFloat(cv.dataset.ratio)||0.8))+"px";
    });
    if(!pl.length) return;

    /* A canvas whose width is still 0 when it first intersects would never redraw,
       because IntersectionObserver only fires on change. ResizeObserver catches it
       the moment layout gives it a width — this is what left plates blank. */
    if(!ro && "ResizeObserver" in window){
      ro=new ResizeObserver(function(es){
        es.forEach(function(e){
          var cv=e.target;
          if(cv.dataset.done!=="1" && cv.clientWidth>40) draw(cv);
        });
      });
    }
    if(!io && "IntersectionObserver" in window){
      io=new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting) draw(e.target); });
      },{rootMargin:"800px 0px"});
    }
    pl.forEach(function(cv){
      if(io) io.observe(cv); else draw(cv);
      if(ro) ro.observe(cv);
    });
  }
  var _rt;
  window.addEventListener("resize",function(){
    clearTimeout(_rt);
    _rt=setTimeout(function(){
      [].forEach.call(document.querySelectorAll("canvas[data-seed]"),function(cv){
        cv.dataset.done=""; draw(cv);});
    },240);
  });

  /* ── scroll-driven colour ───────────────────────────── */
  function h2r(h){h=h.replace("#","");return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
  function r2h(a){return "#"+a.map(function(v){return("0"+Math.round(Math.max(0,Math.min(255,v))).toString(16)).slice(-2);}).join("");}
  function lerp(a,b,t){return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];}

  var stops=[], bound=false, tick=false;
  /* offsetTop is measured against the nearest positioned ancestor, and Shopify wraps
     every section in its own div — so it returned the wrong number and the colour
     never tracked the page. getBoundingClientRect is absolute. */
  function topOf(el){ return el.getBoundingClientRect().top + window.scrollY; }

  /* Two things went wrong with a fixed probe at mid-screen and a blend across the whole
     section: a long section sat half way to the next colour (product pages read grey),
     and on a short page the dark footer was already past the probe at load (the bag and
     404 opened near black).
     Now the probe travels with the scroll, from the top of the viewport at the top of the
     page to the bottom at the end, so a page that cannot scroll keeps its first colour.
     And colours only blend in a band as the next section arrives. */
  var BAND=0.35;
  function applyColour(){
    tick=false;
    if(!stops.length) return;
    var max=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
    var f=max>0?Math.max(0,Math.min(1,window.scrollY/max)):0;
    var probe=window.scrollY+window.innerHeight*f, i=0;
    for(var k=0;k<stops.length;k++){ if(topOf(stops[k].el)<=probe) i=k; }
    var cur=stops[i], nxt=stops[Math.min(i+1,stops.length-1)], t=0;
    if(nxt!==cur){
      var d=topOf(nxt.el)-probe, band=Math.max(1,window.innerHeight*BAND);
      t=1-Math.max(0,Math.min(1,d/band));
    }
    root.style.setProperty("--bg",r2h(lerp(cur.bg,nxt.bg,t)));
    root.style.setProperty("--fg",r2h(lerp(cur.fg,nxt.fg,t)));
  }

  function initScroll(){
    if(root.dataset.scrollColour!=="true"){ root.classList.remove("scroll-colour"); return; }
    var secs=[].slice.call(document.querySelectorAll("[data-bg]"));
    if(!secs.length){ root.classList.remove("scroll-colour"); return; }
    stops=secs.map(function(s){return{el:s,bg:h2r(s.dataset.bg),fg:h2r(s.dataset.fg||"#1C1B18")};});
    root.classList.add("scroll-colour");
    if(!bound){
      bound=true;
      window.addEventListener("scroll",function(){if(!tick){tick=true;requestAnimationFrame(applyColour);}},{passive:true});
      window.addEventListener("resize",applyColour);
    }
    applyColour();
  }

  /* ── sheets: the bag drawer and the phone menu ──────────
     Opacity and an 18px slide, 260ms ease-out, per brand/08-brand.md "Motion". */
  var openSheet=null, lastTrigger=null;
  function focusables(el){
    return [].slice.call(el.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select,textarea,[tabindex]:not([tabindex="-1"])'))
      .filter(function(n){ return n.offsetWidth||n.offsetHeight||n===document.activeElement; });
  }
  function setOpen(sheet,on){
    sheet.classList.toggle("is-open",on);
    sheet.setAttribute("aria-hidden",on?"false":"true");
    sheet.inert=!on;
    root.classList.toggle("sheet-open",on);
    [].forEach.call(document.querySelectorAll('[aria-controls="'+sheet.id+'"]'),function(b){
      b.setAttribute("aria-expanded",on?"true":"false"); });
  }
  function openSheetById(id,trigger){
    var sheet=document.getElementById(id); if(!sheet) return;
    /* Moving from one sheet to another (quick view to the bag, the menu to the bag) keeps the
       first trigger: the one inside the closing sheet is about to be hidden. */
    if(!openSheet) lastTrigger=trigger||document.activeElement;
    if(openSheet&&openSheet!==sheet) setOpen(openSheet,false);
    openSheet=sheet; setOpen(sheet,true);
    /* The pop-up opens on its own, so focus goes to the dialog itself, not to a button. */
    var target=sheet.hasAttribute("data-popup")?sheet.querySelector(".sheet-panel"):(sheet.querySelector(".sheet-x")||sheet.querySelector(".sheet-panel"));
    setTimeout(function(){ if(target) target.focus({preventScroll:true}); },30);
  }
  function closeSheet(){
    if(!openSheet) return;
    if(openSheet.id==="popup"&&store("hk-list")!=="joined") store("hk-popup-shut",String(Date.now()));
    setOpen(openSheet,false); openSheet=null; note("");
    if(lastTrigger&&document.contains(lastTrigger)&&lastTrigger.focus) lastTrigger.focus({preventScroll:true});
  }

  /* ── the bag ──────────────────────────────────────────────
     The drawer is a section (sections/bag-drawer.liquid). Every change asks Shopify to
     render it again in the same request (Section Rendering API), so there is one template
     for the bag, and the express checkout buttons inside it re-render with it. Without
     JavaScript every link and form still works: the bag link goes to /cart, add to bag
     posts to /cart/add, remove follows the line's remove URL. */
  var R=window.HikariRoutes||{cart_add_url:"/cart/add",cart_change_url:"/cart/change",cart_update_url:"/cart/update",cart_url:"/cart"};
  var SECTION="bag-drawer";
  function bagIds(){
    return [].map.call(document.querySelectorAll("#bag [data-variant-id]"),function(n){
      return String(n.getAttribute("data-variant-id")); });
  }
  function note(msg){
    var n=document.querySelector("#bag [data-bag-note]");
    if(n){ n.textContent=msg||""; n.hidden=!msg; }
  }
  function swapBag(html){
    if(html){
      var doc=new DOMParser().parseFromString(html,"text/html");
      var fresh=doc.querySelector("[data-bag-body]"), cur=document.querySelector("#bag [data-bag-body]");
      /* A refresh can land while someone is writing a gift note. Keep what they are typing;
         the count still updates. */
      var a=document.activeElement, typing=cur&&a&&cur.contains(a)&&/^(TEXTAREA|INPUT)$/.test(a.tagName);
      if(fresh&&cur&&!typing) cur.replaceWith(fresh);
      else if(fresh&&cur) cur.setAttribute("data-count",fresh.getAttribute("data-count"));
    }
    var body=document.querySelector("#bag [data-bag-body]");
    var n=body?body.getAttribute("data-count"):null;
    if(n!==null) [].forEach.call(document.querySelectorAll("[data-bag-count]"),function(s){ s.textContent=n; });
    initPlates();
    syncButtons();
  }
  function post(url,body){
    return fetch(url,{method:"POST",credentials:"same-origin",
      headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(body)})
      .then(function(r){ return r.json().then(function(j){ return {ok:r.ok,status:r.status,data:j}; }); });
  }
  function refreshBag(){
    return fetch(location.pathname+"?sections="+SECTION,{credentials:"same-origin"})
      .then(function(r){ return r.json(); })
      .then(function(j){ swapBag(j&&j[SECTION]); });
  }
  function syncButtons(){
    var ids=bagIds();
    [].forEach.call(document.querySelectorAll('form[action$="/cart/add"]'),function(f){
      var i=f.querySelector('[name="id"]'), b=f.querySelector('[type="submit"]');
      if(!i||!b||b.disabled) return;
      var inBag=ids.indexOf(String(i.value))>-1;
      b.textContent=inBag?"In your bag":"Add to bag";
      b.toggleAttribute("data-in-bag",inBag);
    });
  }
  function markSold(form){
    var b=form.querySelector('[type="submit"]'), pn=form.parentNode.querySelector("[data-product-note]");
    if(b){ b.disabled=true; b.textContent="Sold"; b.removeAttribute("data-in-bag"); }
    if(pn) pn.textContent="This piece has just sold.";
  }
  function addToBag(form){
    var input=form.querySelector('[name="id"]'); if(!input) return;
    var id=String(input.value), btn=form.querySelector('[type="submit"]');
    if(bagIds().indexOf(id)>-1){ openSheetById("bag",btn); note("Already in your bag."); return; }
    if(btn) btn.setAttribute("aria-busy","true");
    post(R.cart_add_url+".js",{items:[{id:Number(id),quantity:1}],sections:SECTION,sections_url:location.pathname})
      .then(function(res){
        if(btn) btn.removeAttribute("aria-busy");
        if(res.ok){
          swapBag(res.data.sections&&res.data.sections[SECTION]);
          openSheetById("bag",btn); note("Added to your bag.");
          return;
        }
        /* 422 means Shopify would not add it: either it is already in this bag
           (added in another tab) or it is sold. One of one, so there is no third case. */
        if(res.status===422) return refreshBag().then(function(){
          if(bagIds().indexOf(id)>-1){ openSheetById("bag",btn); note("Already in your bag."); }
          else markSold(form);
        });
        form.submit();
      })
      .catch(function(){ if(btn) btn.removeAttribute("aria-busy"); form.submit(); });
  }
  function removeLine(link){
    post(R.cart_change_url+".js",{id:link.getAttribute("data-bag-remove"),quantity:0,sections:SECTION,sections_url:location.pathname})
      .then(function(res){
        if(!res.ok){ location.href=link.href; return; }
        swapBag(res.data.sections&&res.data.sections[SECTION]); note("Removed.");
        var x=document.querySelector("#bag .sheet-x"); if(x) x.focus({preventScroll:true});
      })
      .catch(function(){ location.href=link.href; });
  }

  /* Gift: saved as cart attributes as it changes, because the drawer re-renders on every
     add and remove and would otherwise lose the note. The fields also belong to the
     checkout form (form="…"), which saves them again on the way to checkout. Express
     buttons skip that form, which is why the note is saved on blur as well as after a pause. */
  var giftT=null;
  function saveGift(attrs){
    clearTimeout(giftT);
    return post(R.cart_update_url+".js",{attributes:attrs}).catch(function(){});
  }
  function toggleGift(box){
    var wrap=box.closest("[data-bag-gift]"), ta=wrap&&wrap.querySelector("[data-gift-note]");
    if(ta){ ta.disabled=!box.checked; ta.parentNode.hidden=!box.checked; }
    if(box.checked){ saveGift({"Gift":"Yes","Gift note":ta?ta.value:""}); if(ta) ta.focus({preventScroll:true}); }
    else saveGift({"Gift":"","Gift note":""});
  }

  var bound2=false;
  function bindOnce(){
    if(bound2) return; bound2=true;
    document.addEventListener("click",function(e){
      var t=e.target;
      var rm=t.closest&&t.closest("[data-bag-remove]");
      if(rm&&rm.closest("#bag")){ e.preventDefault(); removeLine(rm); return; }
      var qv=t.closest&&t.closest("[data-quick-view]");
      if(qv){ e.preventDefault(); quickView(qv); return; }
      var fr=t.closest&&t.closest("a.frame[data-zoom]");
      if(fr){ e.preventDefault(); openZoom(fr); return; }
      var zs=t.closest&&t.closest("[data-zoom-step]");
      if(zs){ e.preventDefault(); showZoom(zoomAt+Number(zs.getAttribute("data-zoom-step"))); return; }
      var cp=t.closest&&t.closest("[data-copy-text],[data-copy-link]");
      if(cp){ e.preventDefault(); copy(cp.getAttribute("data-copy-text")||cp.getAttribute("data-copy-link")||location.href,cp); return; }
      var sh=t.closest&&t.closest("[data-share]");
      if(sh&&navigator.share){ e.preventDefault(); navigator.share({title:document.title,url:location.href}).catch(function(){}); return; }
      var o=t.closest&&t.closest("[data-sheet-open]");
      if(o){
        e.preventDefault(); note("");
        var which=o.getAttribute("data-sheet-open"); openSheetById(which,o);
        /* The bag was rendered with the page. Ask again, so a piece that sold since shows as sold. */
        if(which==="bag") refreshBag().catch(function(){});
        return;
      }
      if(t.closest&&t.closest("[data-sheet-close]")){ e.preventDefault(); closeSheet(); }
    });
    document.addEventListener("keydown",function(e){
      if(!openSheet) return;
      if(e.key==="Escape"){ e.preventDefault(); closeSheet(); return; }
      if(openSheet.id==="zoom"&&(e.key==="ArrowRight"||e.key==="ArrowLeft")){
        e.preventDefault(); showZoom(zoomAt+(e.key==="ArrowRight"?1:-1)); return; }
      if(e.key!=="Tab") return;
      var f=focusables(openSheet.querySelector(".sheet-panel")); if(!f.length) return;
      var a=f[0], z=f[f.length-1];
      if(e.shiftKey&&(document.activeElement===a||!openSheet.contains(document.activeElement))){ e.preventDefault(); z.focus(); }
      else if(!e.shiftKey&&document.activeElement===z){ e.preventDefault(); a.focus(); }
    });
    document.addEventListener("submit",function(e){
      var f=e.target;
      if(!f.matches) return;
      if(f.matches(".bag-checkout")){
        var cb=f.querySelector('[name="checkout"]'); if(cb) cb.setAttribute("aria-busy","true");
        return;
      }
      if(f.id==="popup-form") sstore("hk-popup-sent","1");
      if(f.id==="popup-form"||f.id==="edition-form") keepForPrefs(f);
      if(f.matches(".prefs")){ e.preventDefault(); savePrefs(f); return; }
      if(!f.matches('form[action$="/cart/add"]')) return;
      e.preventDefault(); addToBag(f);
    });
    document.addEventListener("change",function(e){
      var t=e.target; if(!t.matches) return;
      if(t.matches("[data-gift-toggle]")) toggleGift(t);
      else if(t.matches("[data-gift-note]")) saveGift({"Gift note":t.value});
    });
    document.addEventListener("input",function(e){
      var t=e.target; if(!t.matches||!t.matches("[data-gift-note]")) return;
      clearTimeout(giftT);
      giftT=setTimeout(function(){ saveGift({"Gift note":t.value}); },600);
    });
    /* Back from checkout: the browser can restore this page from its cache, bag and all.
       Ask Shopify again, and the bag page, which has no drawer to swap, simply reloads. */
    window.addEventListener("pageshow",function(e){
      if(!e.persisted) return;
      if(document.body.classList.contains("template-cart")){ location.reload(); return; }
      [].forEach.call(document.querySelectorAll(".bag-checkout [aria-busy]"),function(b){ b.removeAttribute("aria-busy"); });
      refreshBag().catch(function(){});
    });
  }

  /* Storage can throw (private windows, blocked site data). Everything below works without it. */
  function store(k,v){ try{ if(v===undefined) return localStorage.getItem(k); localStorage.setItem(k,v); }catch(e){ return null; } }
  function sstore(k,v){ try{ if(v===undefined) return sessionStorage.getItem(k);
    if(v===null) sessionStorage.removeItem(k); else sessionStorage.setItem(k,v); }catch(e){ return null; } }

  function copy(text,btn){
    var label=btn.textContent;
    function done(){ btn.textContent="Copied"; setTimeout(function(){ btn.textContent=label; },1600); }
    function fallback(){
      var ta=document.createElement("textarea"); ta.value=text; ta.setAttribute("readonly","");
      ta.style.position="fixed"; ta.style.opacity="0"; document.body.appendChild(ta); ta.select();
      try{ document.execCommand("copy"); done(); }catch(e){} ta.remove();
    }
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done,fallback);
    else fallback();
  }

  /* ── quick view ───────────────────────────────────────────
     Shopify renders sections/quick-view in the product's own context; we take the [data-qv]
     part and put it in the dialog. Any failure falls back to the product page itself. */
  function quickView(btn){
    var url=btn.getAttribute("data-quick-view"), body=document.querySelector("#qv [data-qv-body]");
    if(!body){ location.href=url; return; }
    body.setAttribute("aria-busy","true");
    body.innerHTML='<p class="qv-loading">Opening</p>';
    openSheetById("qv",btn);
    fetch(url+(url.indexOf("?")>-1?"&":"?")+"section_id=quick-view",{credentials:"same-origin"})
      .then(function(r){ if(!r.ok) throw new Error(r.status); return r.text(); })
      .then(function(html){
        var qv=new DOMParser().parseFromString(html,"text/html").querySelector("[data-qv]");
        if(!qv) throw new Error("no quick view");
        body.innerHTML=""; body.appendChild(document.importNode(qv,true)); body.removeAttribute("aria-busy");
        initPlates(); syncButtons();
      })
      .catch(function(){ location.href=url; });
  }

  /* ── full-screen photographs ──────────────────────────────
     Every frame on the product page, in order, with its label: an evidence frame is still
     marked Unretouched at full size. Click or tap to look closer; with a mouse the picture
     then follows the pointer, on touch it scrolls. Swipe or arrow keys for the next frame. */
  var zoomList=[], zoomAt=0;
  function zoomStage(){ return document.querySelector("#zoom [data-zoom-stage]"); }
  function showZoom(i){
    var st=zoomStage(), img=st&&st.querySelector("img"); if(!img||!zoomList.length) return;
    zoomAt=(i%zoomList.length+zoomList.length)%zoomList.length;
    var a=zoomList[zoomAt], label=a.getAttribute("data-zoom-label"), thumb=a.querySelector("img");
    st.classList.remove("is-zoomed"); img.style.width="";
    img.src=a.getAttribute("href"); img.alt=thumb?thumb.alt:"";
    var c=document.querySelector("#zoom [data-zoom-count]");
    if(c) c.innerHTML=(zoomAt+1)+" / "+zoomList.length+(label?" <b>"+label+"</b>":"");
    [].forEach.call(document.querySelectorAll("#zoom [data-zoom-step]"),function(b){ b.hidden=zoomList.length<2; });
  }
  function openZoom(a){
    zoomList=[].slice.call(document.querySelectorAll("a.frame[data-zoom]"));
    showZoom(Math.max(0,zoomList.indexOf(a))); openSheetById("zoom",a);
  }
  function zoomToggle(st,x,y){
    var img=st.querySelector("img"); if(!img) return;
    if(st.classList.contains("is-zoomed")){ st.classList.remove("is-zoomed"); img.style.width=""; return; }
    var r=img.getBoundingClientRect(); if(!r.width) return;
    var fx=Math.max(0,Math.min(1,(x-r.left)/r.width)), fy=Math.max(0,Math.min(1,(y-r.top)/r.height));
    var w=Math.max(r.width*2.2,st.clientWidth*1.25), h=w*r.height/r.width;
    st.classList.add("is-zoomed"); img.style.width=Math.round(w)+"px";
    st.scrollLeft=Math.max(0,fx*w-st.clientWidth/2); st.scrollTop=Math.max(0,fy*h-st.clientHeight/2);
  }
  function initZoom(){
    var st=zoomStage(); if(!st||st.dataset.on) return; st.dataset.on="1";
    var x0=null, y0=0, swiped=false;
    st.addEventListener("pointerdown",function(e){ x0=e.clientX; y0=e.clientY; swiped=false; });
    st.addEventListener("pointerup",function(e){
      if(x0===null) return;
      var dx=e.clientX-x0, dy=e.clientY-y0; x0=null;
      if(!st.classList.contains("is-zoomed")&&Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5){ swiped=true; showZoom(zoomAt+(dx<0?1:-1)); }
    });
    st.addEventListener("click",function(e){ if(swiped){ swiped=false; return; } zoomToggle(st,e.clientX,e.clientY); });
    st.addEventListener("pointermove",function(e){
      if(e.pointerType!=="mouse"||!st.classList.contains("is-zoomed")) return;
      var r=st.getBoundingClientRect();
      st.scrollLeft=((e.clientX-r.left)/r.width)*(st.scrollWidth-st.clientWidth);
      st.scrollTop=((e.clientY-r.top)/r.height)*(st.scrollHeight-st.clientHeight);
    });
  }

  /* ── 360° (D26) ───────────────────────────────────────────
     One turntable turn of real photographs. Dragging across the full width turns it once;
     arrow keys step a frame. The frames load when the viewer comes near the screen. */
  function initSpin(){
    [].forEach.call(document.querySelectorAll("[data-spin]:not([data-spin-on])"),function(el){
      el.setAttribute("data-spin-on","1");
      var src=[], img=el.querySelector("[data-spin-img]");
      try{ src=JSON.parse(el.querySelector("[data-spin-frames]").textContent); }catch(e){}
      if(src.length<2||!img) return;
      var n=src.length, at=0, cache=[], loaded=false, down=false, x0=0, a0=0;
      function load(){ if(loaded) return; loaded=true;
        src.forEach(function(u,i){ var im=new Image(); im.decoding="async"; im.src=u; cache[i]=im; }); }
      function show(i){ at=(i%n+n)%n; img.src=src[at]; el.setAttribute("data-frame",String(at)); }
      function touched(){ load(); el.classList.add("is-touched"); }
      el.addEventListener("pointerdown",function(e){ touched(); down=true; x0=e.clientX; a0=at;
        if(el.setPointerCapture) try{ el.setPointerCapture(e.pointerId); }catch(err){} });
      el.addEventListener("pointermove",function(e){ if(!down) return;
        show(a0+Math.round((e.clientX-x0)/Math.max(4,el.clientWidth/n))); });
      function up(){ down=false; }
      el.addEventListener("pointerup",up); el.addEventListener("pointercancel",up);
      el.addEventListener("keydown",function(e){
        if(e.key!=="ArrowRight"&&e.key!=="ArrowLeft") return;
        e.preventDefault(); touched(); show(at+(e.key==="ArrowRight"?1:-1)); });
      if("IntersectionObserver" in window){
        var o=new IntersectionObserver(function(es){ if(es[0].isIntersecting){ load(); o.disconnect(); } },{rootMargin:"400px 0px"});
        o.observe(el);
      } else load();
    });
  }

  /* ── the countdown to the next Edition (sections/next-edition) ──
     Counts to a real release date and nothing else. */
  var cdT=null;
  function initCountdown(){
    var els=[].slice.call(document.querySelectorAll("[data-countdown]")); clearInterval(cdT); if(!els.length) return;
    function plural(n,w){ return n+" "+w+(n===1?"":"s"); }
    function fmt(ms){
      if(ms<=0) return "Going live now";
      var m=Math.floor(ms/60000), d=Math.floor(m/1440), h=Math.floor(m%1440/60), mm=m%60, out=[];
      if(d) out.push(plural(d,"day"));
      if(d||h) out.push(plural(h,"hour"));
      if(!d) out.push(plural(mm,"minute"));
      return "in "+out.join(", ");
    }
    function tickC(){ var now=Date.now();
      els.forEach(function(el){ el.textContent=fmt(Number(el.getAttribute("data-countdown"))*1000-now); }); }
    tickC(); cdT=setInterval(tickC,30000);
  }

  /* ── the list pop-up (sections/signup-popup, D27) ─────────── */
  var popupDone=false;
  function initPopup(){
    var el=document.getElementById("popup"); if(!el||popupDone) return; popupDone=true;
    var posted=/[?&]customer_posted=true/.test(location.search);
    if(sstore("hk-popup-sent")){
      sstore("hk-popup-sent",null);
      if(posted||el.querySelector("[data-popup-ok]")){ store("hk-list","joined"); openSheetById("popup"); return; }
    }
    if(posted) store("hk-list","joined");
    if(store("hk-list")==="joined") return;
    if(/template-(cart|customers|password)/.test(document.body.className)) return;
    var rest=Number(el.getAttribute("data-rest"))||14, shut=Number(store("hk-popup-shut"))||0;
    if(shut&&Date.now()-shut<rest*864e5) return;
    var views=(Number(sstore("hk-views"))||0)+1; sstore("hk-views",String(views));
    var trig=el.getAttribute("data-trigger"), pages=Number(el.getAttribute("data-pages"))||2,
        delay=Number(el.getAttribute("data-delay"))||20, tries=0;
    function show(){
      if(openSheet){ if(++tries<4) setTimeout(show,8000); return; }
      openSheetById("popup");
    }
    if(trig==="delay"){ setTimeout(show,delay*1000); return; }
    if(trig==="exit"&&window.matchMedia&&window.matchMedia("(hover:hover) and (pointer:fine)").matches){
      document.addEventListener("mouseout",function onOut(e){
        if(e.relatedTarget||e.clientY>0) return;
        document.removeEventListener("mouseout",onOut); show();
      });
      return;
    }
    if(views>=pages) setTimeout(show,1200);
  }

  /* ── what do you collect? (snippets/preferences, CRM) ───── */
  /* The sign-up reloads the page without the address, so it waits in session storage for the
     one step after it, then is forgotten whether or not they answer. */
  function keepForPrefs(f){
    var em=f.querySelector('[name="contact[email]"]');
    if(em&&em.value){ sstore("hk-prefs-email",em.value); sstore("hk-prefs-after",f.id); }
  }
  function initPrefs(){
    var posted=/[?&]customer_posted=true/.test(location.search),
        email=sstore("hk-prefs-email"), after=sstore("hk-prefs-after");
    /* kept through a spam check or a mistyped address; gone once the sign-up has landed */
    if(posted){ sstore("hk-prefs-email",null); sstore("hk-prefs-after",null); }
    [].forEach.call(document.querySelectorAll("[data-prefs]"),function(w){
      if(!w.hasAttribute("data-prefs-ask")){
        if(!posted||!email||w.getAttribute("data-after")!==after||store("hk-prefs")==="done") return;
        w.querySelector("[data-prefs-email]").value=email;
      }
      w.hidden=false;
      var skip=w.querySelector("[data-prefs-skip]");
      if(skip) skip.addEventListener("click",function(){ w.hidden=true; });
    });
  }
  function savePrefs(f){
    var tags=["prefs"];
    [].forEach.call(f.querySelectorAll("[data-tag]:checked"),function(i){ tags.push(i.value); });
    /* a comma would split the tag, so spaces and commas go */
    var wc=f.querySelector("[data-prefs-wechat]"), wid=wc?wc.value.replace(/[\s,]+/g,"").slice(0,40):"";
    if(wid) tags.push("wechat","wechat:"+wid);
    f.querySelector('[name="contact[tags]"]').value=tags.join(", ");
    var b=f.querySelector('[type="submit"]'); if(b) b.setAttribute("aria-busy","true");
    /* Saved in the background, so the page does not reload into every customer form saying "sent".
       Anything but Shopify's own success (a spam check, a bad address) falls back to a normal post. */
    fetch(f.action,{method:"POST",body:new FormData(f),credentials:"same-origin"}).then(function(r){
      if(!r.ok||!/[?&]customer_posted=true/.test(r.url)) throw new Error("not saved");
      store("hk-prefs","done");
      var ok=f.parentNode.querySelector("[data-prefs-ok]");
      f.hidden=true; ok.hidden=false; ok.focus();
    }).catch(function(){ f.submit(); });
  }

  function initMisc(){
    if(navigator.share) [].forEach.call(document.querySelectorAll("[data-share]"),function(b){ b.hidden=false; });
    if(/[?&]contact_posted=true/.test(location.search)) [].forEach.call(document.querySelectorAll("[data-cr-ok]"),function(p){
      p.hidden=false; p.scrollIntoView({block:"center"}); });
  }

  window.Hikari={plates:initPlates,openSheet:openSheetById,closeSheet:closeSheet,refreshBag:refreshBag,quickView:quickView,popup:initPopup};

  function boot(){
    root.classList.add("js");
    initPlates(); initScroll(); bindOnce(); syncButtons();
    initZoom(); initSpin(); initCountdown(); initPrefs(); initPopup(); initMisc();
  }
  if(document.readyState!=="loading") boot(); else document.addEventListener("DOMContentLoaded",boot);
  document.addEventListener("shopify:section:load",boot);
})();
