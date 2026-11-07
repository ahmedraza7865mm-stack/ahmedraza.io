(function(){
  var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var top=$('#top'),prog=$('#prog');
  /* scroll: progress bar + nav background */
  function onScroll(){
    var h=document.documentElement,max=h.scrollHeight-h.clientHeight;
    prog.style.transform='scaleX('+(max>0?h.scrollTop/max:0)+')';
    top.classList.toggle('s',h.scrollTop>20);
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  var upb=$('#up');if(upb){upb.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});window.addEventListener('scroll',function(){upb.classList.toggle('show',window.scrollY>900);},{passive:true});}
  /* mobile menu */
  var mb=$('#menu'),mn=$('#mnav');
  function menu(o){mn.hidden=!o;mb.setAttribute('aria-expanded',o);document.body.classList.toggle('lock',o);}
  mb.addEventListener('click',function(){menu(mn.hidden);});
  $$('a',mn).forEach(function(a){a.addEventListener('click',function(){menu(false);});});
  window.addEventListener('keydown',function(e){if(e.key==='Escape')menu(false);});
  /* nav spy */
  var links=$$('.links a'),secs=links.map(function(a){return $(a.getAttribute('href'))});
  if('IntersectionObserver' in window){
    var spy=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id);});}});},{rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(s){s&&spy.observe(s);});
    /* reveal */
    var rv=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target);}});},{threshold:.12});
    $$('.sec-label,.h2,.big,.card,.tl,.wi,.whylist li,.facts,.details,form,.reel,.bigstat,.sticky .btn,.hero-copy>*').forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(el.classList.contains('card')?(i%4)*60:0)+'ms';rv.observe(el);});
    /* counters */
    var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var el=e.target,to=+el.dataset.count,suf=el.dataset.suffix||'',t0=performance.now();
      (function f(t){var k=Math.min(1,(t-t0)/1400),v=Math.round(to*(1-Math.pow(1-k,3)));el.textContent=v+suf;if(k<1)requestAnimationFrame(f);})(t0);});},{threshold:.6});
    $$('[data-count]').forEach(function(el){co.observe(el);});
    /* reel autoplay */
    var vid=$('#reel');
    if(vid){new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var p=vid.play();p&&p.catch&&p.catch(function(){});}else vid.pause();});},{threshold:.35}).observe(vid);}
  }
  var snd=$('#reelsnd'),v2=$('#reel');
  if(snd&&v2)snd.addEventListener('click',function(){v2.muted=!v2.muted;snd.textContent=v2.muted?'Sound on':'Sound off';snd.setAttribute('aria-label',v2.muted?'Turn sound on':'Turn sound off');if(!v2.muted&&v2.paused){var p=v2.play();p&&p.catch&&p.catch(function(){});}});
  /* vertical reel */
  var r2=$('#reel2'),rp=$('#reelplay'),rs=$('#reelsnd2');
  if(r2&&rp){
    function play(){var p=r2.play();p&&p.catch&&p.catch(function(){});}
    rp.addEventListener('click',function(){if(r2.paused){play();rp.classList.add('playing');}else{r2.pause();rp.classList.remove('playing');}});
    rs.addEventListener('click',function(){r2.muted=!r2.muted;rs.textContent=r2.muted?'Sound on':'Sound off';if(!r2.muted&&r2.paused){play();rp.classList.add('playing');}});
    if('IntersectionObserver' in window)new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){play();rp.classList.add('playing');}else{r2.pause();rp.classList.remove('playing');}});},{threshold:.5}).observe(r2);
  }
  /* hero word cycle */
  var ws=$$('.seq span'),wi=0;setInterval(function(){ws[wi].classList.remove('on');wi=(wi+1)%ws.length;ws[wi].classList.add('on');},1300);
  /* expertise toggle */
  $$('.toggle button').forEach(function(b){b.addEventListener('click',function(){
    $$('.toggle button').forEach(function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-selected',on);});
    $('#t-svc').hidden=b.dataset.t!=='svc';$('#t-skl').hidden=b.dataset.t!=='skl';
    $$('.card',b.dataset.t==='svc'?$('#t-svc'):$('#t-skl')).forEach(function(c){c.classList.add('in');});
  });});
  /* spotlight */
  $$('.spot').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');});});
  /* work selector */
  var wis=$$('.wi'),wps=$$('.wp');
  wis.forEach(function(b,i){b.addEventListener('click',function(){
    wis.forEach(function(x,j){x.classList.toggle('on',i===j);x.setAttribute('aria-pressed',i===j);});
    wps.forEach(function(x,j){x.classList.toggle('on',i===j);x.setAttribute('aria-hidden',i!==j);});
    if(window.innerWidth<=1020){var d=$('.wdetail');var y=d.getBoundingClientRect().top+window.scrollY-84;window.scrollTo({top:y,behavior:'smooth'});}
  });});
  /* contact */
  var chips=$$('.chip'),nm=$('#f-name'),em=$('#f-email'),ms=$('#f-msg'),pv=$('#pv'),wa=$('#send-wa'),ml=$('#send-mail');
  chips.forEach(function(c){c.addEventListener('click',function(){c.setAttribute('aria-pressed',c.getAttribute('aria-pressed')!=='true');upd();});});
  function compose(){
    var sel=chips.filter(function(c){return c.getAttribute('aria-pressed')==='true'}).map(function(c){return c.textContent});
    var l=['Hi Ahmed,',''];
    l.push('I saw your portfolio and I would like to talk about'+(sel.length?' '+sel.join(', ').toLowerCase():' a project')+'.');
    if(ms.value.trim())l.push('',ms.value.trim());
    l.push('','Thanks'+(nm.value.trim()?',\n'+nm.value.trim():''));
    if(em.value.trim())l.push('Contact: '+em.value.trim());
    return l.join('\n');
  }
  function upd(){var t=compose();pv.textContent=t;wa.href='https://wa.me/923164062177?text='+encodeURIComponent(t);ml.href='mailto:wqahmedraza@gmail.com?subject='+encodeURIComponent('Project enquiry from '+(nm.value.trim()||'your portfolio'))+'&body='+encodeURIComponent(t);}
  [nm,em,ms].forEach(function(i){i.addEventListener('input',upd);});upd();
  $('#form').addEventListener('submit',function(e){e.preventDefault();});
  /* hours (Pakistan time) */
  try{var h=+new Intl.DateTimeFormat('en-GB',{hour:'numeric',hour12:false,timeZone:'Asia/Karachi'}).format(new Date())%24,o=h>=9&&h<21,box=$('#hrs');
    box.classList.toggle('open',o);$('#hrs-text').textContent=o?'Online now · replies within the hour':'Offline now · I reply from 9:00 AM Pakistan time';}catch(e){}
})();
/* Scroll-driven motion (transforms only, so it stays smooth on phones) */
(function(){
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var q=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
  var person=document.querySelector('.hero-person'),giant=document.querySelector('.giant'),orbs=q('.orb'),fips=q('.fip'),mq=document.querySelector('.mq'),wm=document.querySelector('.wm'),
      shots=q('.wshot img'),stats=document.querySelector('.hero-foot'),glow=document.querySelector('.art-glow');
  var last=window.scrollY,vel=0,ticking=false,small=window.innerWidth<700;
  function frame(){
    ticking=false;
    var y=window.scrollY,vh=window.innerHeight;
    vel+=((y-last)-vel)*.2;last=y;
    if(y<vh*1.3){
      if(person)person.style.transform='translate3d(0,'+(y*.1).toFixed(1)+'px,0) scale('+(1+y/vh*.04).toFixed(3)+')';
      if(giant)giant.style.transform='translate3d('+(-y*.25).toFixed(1)+'px,0,0)';
      orbs.forEach(function(o,i){o.style.translate='0 '+(y*(i?-.12:.18)).toFixed(1)+'px';});
      if(glow)glow.style.opacity=Math.max(0,1-y/vh*.9);
      fips.forEach(function(f,i){f.style.setProperty('--ty',(-y*(.06+i*.035)).toFixed(1)+'px');f.style.setProperty('--tx',(y*(i%2?.03:-.03)).toFixed(1)+'px');});
    }
    if(mq)mq.style.transform='translateX('+(-((y*.12)%1)*0).toFixed(1)+'px) skewX('+Math.max(-8,Math.min(8,-vel*.3)).toFixed(2)+'deg)';
    shots.forEach(function(im){var r=im.parentNode.getBoundingClientRect();if(r.bottom>0&&r.top<vh){var p=(r.top+r.height/2-vh/2)/vh;im.style.transform='translate3d(0,'+(p*-18).toFixed(1)+'px,0) scale(1.06)';}});
    if(wm){var r=wm.getBoundingClientRect();if(r.top<vh){var p=Math.max(0,Math.min(1,1-r.top/vh));wm.style.transform='translate3d('+((.5-p)*(small?40:140)).toFixed(1)+'px,0,0)';}}
    if(Math.abs(vel)>.05)request();else if(mq)mq.style.transform='skewX(0deg)';
  }
  function request(){if(!ticking){ticking=true;requestAnimationFrame(frame);}}
  window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request);request();
  /* section headings: words rise in one by one */
  q('.h2').forEach(function(h){
    if(h.dataset.split)return;h.dataset.split=1;
    var out=[];(function walk(n,em){n.childNodes.forEach(function(c){
      if(c.nodeType===3){c.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;out.push(/^\s+$/.test(w)?w:'<span class="w'+(em?' e':'')+'"><span>'+w+'</span></span>');});}
      else if(c.nodeName==='EM'){walk(c,true);}else out.push(c.outerHTML||'');});})(h,false);
    h.innerHTML=out.join('');
    h.querySelectorAll('.w>span').forEach(function(s,i){s.style.transitionDelay=(i*70)+'ms';});
  });
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('words');io.unobserve(e.target);}});},{threshold:.3});
    q('.h2').forEach(function(h){io.observe(h);});
  }
})();
