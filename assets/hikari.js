/* Hikari — grain, scroll-driven colour, and canvas plate fallback.
   The plate fallback draws a daylight study wherever a product has no image yet,
   so the store is presentable before photography exists. See docs/13-photography-pipeline.md */
(function(){
  "use strict";
  var root=document.documentElement;

  /* ── plates: only where no real image ───────────────── */
  var TONES={
    light:{a:"#F6F5F1",b:"#DAD8D0",sh:"rgba(28,30,28,.34)",g1:"#E8CE92",g2:"#B48F42",g3:"#7E6026",gr:16},
    grey:{a:"#E6E7E2",b:"#C3C6C0",sh:"rgba(24,28,26,.34)",g1:"#E4C88A",g2:"#AD8A40",g3:"#755A24",gr:17},
    indigo:{a:"#3A5B80",b:"#1C3049",sh:"rgba(6,12,20,.44)",g1:"#EAD29A",g2:"#BD9850",g3:"#7A5E29",gr:18},
    dark:{a:"#242A2F",b:"#0E1214",sh:"rgba(0,0,0,.5)",g1:"#C9AC6D",g2:"#8E7238",g3:"#57441E",gr:19}};
  var COMPS={single:[[.50,.52,.19]],pair:[[.40,.50,.145],[.62,.56,.155]],
             stack:[[.36,.44,.115],[.55,.55,.135],[.70,.43,.10]]};
  function rng(s){s=s>>>0||1;return function(){s^=s<<13;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296};}

  function draw(cv){
    var tone=TONES[cv.dataset.tone]||TONES.light, comp=COMPS[cv.dataset.comp]||COMPS.pair;
    var ratio=parseFloat(cv.dataset.ratio)||0.8, rand=rng((parseInt(cv.dataset.seed,10)||1)*7919);
    var cssW=cv.clientWidth||(cv.parentNode&&cv.parentNode.clientWidth)||600; if(cssW<40) return false;
    var cssH=Math.round(cssW*ratio), dpr=Math.min(window.devicePixelRatio||1,cssW<320?1.5:2);
    var W=Math.max(2,Math.round(cssW*dpr)), H=Math.max(2,Math.round(cssH*dpr));
    if(cv.width===W&&cv.height===H&&cv.dataset.done==="1") return true;
    cv.width=W;cv.height=H;cv.style.height=cssH+"px";
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

  function applyColour(){
    tick=false;
    if(!stops.length) return;
    var probe=window.scrollY+window.innerHeight*0.5, i=0;
    for(var k=0;k<stops.length;k++){ if(topOf(stops[k].el)<=probe) i=k; }
    var cur=stops[i], nxt=stops[Math.min(i+1,stops.length-1)], t=0;
    if(nxt!==cur){
      var a=topOf(cur.el), b=topOf(nxt.el);
      if(b>a) t=Math.max(0,Math.min(1,(probe-a)/(b-a)));
    }
    root.style.setProperty("--bg",r2h(lerp(cur.bg,nxt.bg,t)));
    root.style.setProperty("--fg",r2h(lerp(cur.fg,nxt.fg,t)));
  }

  function initScroll(){
    if(root.dataset.scrollColour!=="true"){ root.classList.remove("scroll-colour"); return; }
    var secs=[].slice.call(document.querySelectorAll("[data-bg]"));
    if(!secs.length){ root.classList.remove("scroll-colour"); return; }
    stops=secs.map(function(s){return{el:s,bg:h2r(s.dataset.bg),fg:h2r(s.dataset.fg||"#14171A")};});
    root.classList.add("scroll-colour");
    if(!bound){
      bound=true;
      window.addEventListener("scroll",function(){if(!tick){tick=true;requestAnimationFrame(applyColour);}},{passive:true});
      window.addEventListener("resize",applyColour);
    }
    applyColour();
  }

  function boot(){ initPlates(); initScroll(); }
  if(document.readyState!=="loading") boot(); else document.addEventListener("DOMContentLoaded",boot);
  document.addEventListener("shopify:section:load",boot);
})();
