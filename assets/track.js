/* What visitors do, as analytics events (2026-11-04).

   Every event goes two ways:
   - to Google Analytics through gtag (layout/theme.liquid), in GA4's own shopping events where one
     fits (view_item_list, select_item, view_item, add_to_cart, view_cart, search), so its
     shopping reports fill in. gtag only queues them: Google's script loads, and anything goes out,
     only once the visitor has allowed analytics in Shopify's cookie banner.
   - to Shopify's customer events as "hikari_<name>", for any pixel set up under Settings →
     Customer events. Shopify applies the same consent to those.

   A piece is described by data-track-item (snippets/track-item). Nothing anyone types into a
   form is ever sent: a sign-up or enquiry is counted, its fields are not.

   Checkout and purchase happen on Shopify's checkout, where this script doesn't run; the custom
   pixel under Settings → Customer events sends those. */
(function(){
  "use strict";
  var currency=(window.Shopify&&Shopify.currency&&Shopify.currency.active)||"GBP";
  var lang=document.documentElement.lang||"en";

  function send(name,params){
    params=params||{};
    params.language=lang;
    try{ if(typeof window.gtag==="function") window.gtag("event",name,params); }catch(e){}
    try{ if(window.Shopify&&Shopify.analytics&&typeof Shopify.analytics.publish==="function") Shopify.analytics.publish("hikari_"+name,params); }catch(e){}
  }
  function item(el,index){
    var host=el&&el.closest?el.closest("[data-track-item]"):null; if(!host) return null;
    try{
      var j=JSON.parse(host.getAttribute("data-track-item")), it={item_id:j.item_id,item_name:j.item_name,item_brand:j.item_brand,price:j.price};
      if(j.item_category) it.item_category=j.item_category;
      if(j.status) it.item_variant=j.status;   /* reserved, soon, sold, presale (in transit)…, so they can be told apart */
      if(index!==undefined) it.index=index;
      return it;
    }catch(e){ return null; }
  }
  function value(items){ return items.reduce(function(s,i){ return s+(Number(i.price)||0); },0); }
  /* the part of the page a list is in: its Shopify section ("new_in", "main"…) and, on a collection, its handle */
  function listName(el){
    var sec=el.closest&&el.closest("[id^='shopify-section-']");
    var name=sec?sec.id.replace(/^shopify-section-(?:[^_]*__)?/,""):"page";
    var m=location.pathname.match(/\/collections\/([^/?#]+)/);
    return m&&name==="main"?"collection:"+m[1]:name;
  }

  /* On arrival: a piece's own page, or the lists of pieces on this page. */
  function arrive(){
    var page=document.querySelector("[data-track-page]");
    if(page){ var it=item(page); if(it) send("view_item",{currency:currency,value:it.price,items:[it]}); }
    var lists={};
    [].forEach.call(document.querySelectorAll(".card[data-track-item]"),function(c){
      var n=listName(c); (lists[n]=lists[n]||[]).push(c); });
    Object.keys(lists).forEach(function(n){
      var items=lists[n].slice(0,24).map(function(c,i){ return item(c,i); }).filter(Boolean);
      if(items.length) send("view_item_list",{item_list_id:n,item_list_name:n,items:items});
    });
    var q=location.pathname.indexOf("/search")>-1&&new URLSearchParams(location.search).get("q");
    if(q) send("view_search_results",{search_term:q.slice(0,100)});
  }

  /* Clicks: a piece opened from a list, a quick view, contact, sharing. */
  document.addEventListener("click",function(e){
    var t=e.target; if(!t||!t.closest) return;
    var card=t.closest(".card[data-track-item]");
    if(card&&t.closest("a")){
      var it=item(card,[].indexOf.call(document.querySelectorAll(".card[data-track-item]"),card)), n=listName(card);
      if(it) send("select_item",{item_list_id:n,item_list_name:n,items:[it]});
      return;
    }
    var qv=t.closest("[data-quick-view]");
    if(qv){ var q=item(qv); send("quick_view",{items:q?[q]:[]}); return; }
    var a=t.closest("a[href]");
    if(a){
      var h=a.getAttribute("href")||"", method=/wa\.me|whatsapp/i.test(h)?"whatsapp":/^mailto:/i.test(h)?"email":/^tel:/i.test(h)?"phone":
        /instagram\.com/i.test(h)?"instagram":/xiaohongshu|xhslink/i.test(h)?"xiaohongshu":/pinterest\./i.test(h)?"pinterest":/weixin|wechat/i.test(h)?"wechat":"";
      if(method){ var pi=item(a); send("contact",{method:method,link_text:(a.textContent||"").trim().slice(0,60),items:pi?[pi]:[]}); return; }
    }
    var sh=t.closest("[data-share],[data-copy-link]");
    if(sh){ var si=item(sh)||item(document.querySelector("[data-track-page]")); send("share",{method:sh.hasAttribute("data-share")?"share":"copy_link",content_type:"product",item_id:si?si.item_id:"",items:si?[si]:[]}); }
  },true);

  /* Into the bag (assets/hikari.js says when), and the bag opened. */
  document.addEventListener("hikari:added",function(e){
    var f=e.detail&&e.detail.form, it=item(f)||item(document.querySelector("[data-track-page]"));
    if(it) send("add_to_cart",{currency:currency,value:it.price,items:[it]});
  });
  /* A viewing requested through the Cal.com calendar (sections/main-viewing). */
  document.addEventListener("hikari:viewing",function(e){
    if(e.detail&&e.detail.step==="requested") send("generate_lead",{lead_source:"private_viewing",form_id:"cal"});
  });
  document.addEventListener("hikari:sheet",function(e){
    if(!e.detail||e.detail.id!=="bag") return;
    var items=[].map.call(document.querySelectorAll("#bag .bag-line[data-track-item]"),function(l,i){ return item(l,i); }).filter(Boolean);
    send("view_cart",{currency:currency,value:value(items),items:items});
  });

  /* Forms: a search, a sign-up, an enquiry. The fields stay on the page. */
  document.addEventListener("submit",function(e){
    var f=e.target; if(!f||!f.matches) return;
    if(f.matches(".srch-form")||f.action&&/\/search(\?|$)/.test(f.action)){
      var q=f.querySelector('[name="q"]'); send("search",{search_term:q?String(q.value).slice(0,100):""}); return; }
    var kind=f.matches(".notify")?"notify_me":f.id==="viewing-form"?"private_viewing":f.id==="edition-form"||f.id==="popup-form"?"newsletter":
      f.id==="creator-form"||f.id==="share-form"?"creators":/contact/.test(f.className+" "+f.id)?"contact":"";
    if(kind){ var it=item(f)||item(document.querySelector("[data-track-page]")); send("generate_lead",{lead_source:kind,form_id:f.id||"",items:it&&kind==="notify_me"?[it]:[]}); }
  },true);

  /* Filters, sorting and the language menu. */
  document.addEventListener("change",function(e){
    var t=e.target; if(!t||!t.closest) return;
    if(t.matches("[data-lang-select]")){ send("language_change",{to:t.value}); return; }
    if(t.closest("[data-cat-filters],[data-cat-hide],[data-cat-sort]")){
      send("filter",{filter_name:t.getAttribute("name")||t.getAttribute("data-cat-sort")!==null&&"sort"||t.hasAttribute("data-cat-hide")&&"hide_sold"||"filter",
        filter_value:t.type==="checkbox"?(t.checked?t.value||"on":"off"):String(t.value).slice(0,60),list:listName(t)});
    }
  },true);

  /* How far down people read: once at a quarter, half, three quarters and the end. */
  var marks=[25,50,75,100], seen={};
  function scrolled(){
    var d=document.documentElement, max=d.scrollHeight-innerHeight; if(max<=0) return;
    var pc=Math.round(scrollY/max*100);
    marks.forEach(function(m){ if(pc>=m&&!seen[m]){ seen[m]=1; send("scroll_depth",{percent:m}); } });
  }
  var tick=0; window.addEventListener("scroll",function(){ if(!tick){ tick=1; requestAnimationFrame(function(){ tick=0; scrolled(); }); } },{passive:true});

  if(document.readyState!=="loading") arrive(); else document.addEventListener("DOMContentLoaded",arrive);
})();
