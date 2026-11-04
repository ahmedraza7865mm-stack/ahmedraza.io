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
