(function(){
  var root=document.documentElement;

  /* Counters: the real number is already in the HTML. When it scrolls into view it counts up from 1 to that number. */
  var counters=Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  function runCount(el){
    var target=parseInt(el.getAttribute('data-count'),10);
    var suffix=el.getAttribute('data-suffix')||'';
    var t0=Date.now(), dur=1800;
    el.textContent='1'+suffix;
    var timer=setInterval(function(){
      var p=Math.min((Date.now()-t0)/dur,1);
      var eased=1-Math.pow(1-p,3);
      el.textContent=(1+Math.round((target-1)*eased))+suffix;
      if(p>=1){clearInterval(timer);el.textContent=target+suffix;}
    },40);
  }
  function checkCounters(){
    counters.forEach(function(el){
      if(el.getAttribute('data-started')){return;}
      var r=el.getBoundingClientRect();
      if(r.bottom>0 && r.top<(window.innerHeight||document.documentElement.clientHeight)){
        el.setAttribute('data-started','1');
        runCount(el);
      }
    });
  }
  window.addEventListener('scroll',checkCounters,{passive:true});
  window.addEventListener('load',checkCounters);
  setTimeout(checkCounters,300);
  setTimeout(checkCounters,1200);
  var themeBtn=document.getElementById('theme');
  themeBtn.addEventListener('click',function(){
    var isLight=root.getAttribute('data-theme')==='light';
    root.setAttribute('data-theme',isLight?'dark':'light');
  });

  var menu=document.getElementById('menu');
  var mnav=document.getElementById('mnav');
  function setMenu(open){
    mnav.hidden=!open;
    menu.setAttribute('aria-expanded',open?'true':'false');
  }
  menu.addEventListener('click',function(){setMenu(mnav.hidden);});
  mnav.addEventListener('click',function(e){if(e.target.tagName==='A'){setMenu(false);}});


  /* Skills entrance: runs when the Skills section scrolls into view. */
  var groups=Array.prototype.slice.call(document.querySelectorAll('.skillgroup'));
  var motionOK=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  groups.forEach(function(g,gi){
    g.style.setProperty('--g',gi);
    Array.prototype.slice.call(g.querySelectorAll('.pill')).forEach(function(pl,pi){pl.style.setProperty('--i',pi);});
  });
  function showGroups(){
    groups.forEach(function(g){
      if(g.classList.contains('in')){return;}
      var r=g.getBoundingClientRect();
      if(r.top<(window.innerHeight||document.documentElement.clientHeight)-60 && r.bottom>0){g.classList.add('in');}
    });
  }
  if(motionOK && groups.length){
    root.classList.add('js');
    window.addEventListener('scroll',showGroups,{passive:true});
    window.addEventListener('load',showGroups);
    setTimeout(showGroups,300);
    window.addEventListener('resize',showGroups);
  }

  /* Click a box to colour it, click again to undo. Keyboard: Enter or Space. */
  Array.prototype.slice.call(document.querySelectorAll('.svc,.why,.skillgroup,.fact,.tool,.stat,.proj,.pill')).forEach(function(box){
    var isPill=box.classList.contains('pill');
    if(!isPill){
      box.setAttribute('tabindex','0');
      box.setAttribute('role','button');
      box.setAttribute('aria-pressed','false');
    }
    function toggle(){
      var on=box.classList.toggle('is-on');
      if(!isPill){box.setAttribute('aria-pressed',on?'true':'false');}
    }
    box.addEventListener('click',function(e){
      if(e.target.closest('a')){return;}
      if(!isPill && e.target.closest('.pill')){return;}
      toggle();
    });
    if(!isPill){
      box.addEventListener('keydown',function(e){
        if(e.target!==box){return;}
        if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}
      });
    }
  });

  var form=document.getElementById('form');
  var status=document.getElementById('status');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var name=document.getElementById('f-name').value.trim();
    var email=document.getElementById('f-email').value.trim();
    var msg=document.getElementById('f-msg').value.trim();
    if(!name||!email||!msg){status.textContent='Please fill in your name, email and message.';return;}
    if(email.indexOf('@')<1){status.textContent='Please enter a valid email address.';return;}
    var subj=document.getElementById('f-subject').value.trim()||('Message from '+name);
    var body=msg+'\n\nName: '+name+'\nEmail: '+email;
    status.textContent='Opening your email app to send this to Ahmed...';
    window.location.href='mailto:wqahmedraza@gmail.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
  });

  /* One scrolling page: highlight the section in view, reveal blocks, autoplay the showreel. */
  var ids=['about','services','skills','experience','projects','showreel','contact'];
  var navLinks=Array.prototype.slice.call(document.querySelectorAll('.links a, .mobile-nav a'));
  function spy(){
    var y=window.scrollY+120,cur='';
    ids.forEach(function(id){var el=document.getElementById(id);if(el&&el.offsetTop<=y)cur=id;});
    if(cur==='showreel')cur='projects';
    if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)cur='contact';
    navLinks.forEach(function(a){
      if(cur&&a.getAttribute('href')==='#'+cur){a.setAttribute('aria-current','page');}else{a.removeAttribute('aria-current');}
    });
  }
  window.addEventListener('scroll',spy,{passive:true});spy();
  document.querySelectorAll('.mobile-nav a').forEach(function(a){a.addEventListener('click',function(){var m=document.getElementById('mnav');if(m)m.hidden=true;});});

  if('IntersectionObserver' in window){
    var targets=Array.prototype.slice.call(document.querySelectorAll('.section .head, .svc, .why, .fact, .proj, .tool, .skillgroup, .exp, .contact-grid > *, .reel, .reel-note, .stat'));
    targets.forEach(function(el,i){
      if(el.classList.contains('skillgroup')||el.classList.contains('stat'))return;
      el.classList.add('rv');
      var sib=Array.prototype.indexOf.call(el.parentNode.children,el);
      el.style.transitionDelay=(Math.min(sib,5)*70)+'ms';
    });
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var t=e.target;t.classList.add('in');io.unobserve(t);setTimeout(function(){t.classList.remove('rv','in');t.style.transitionDelay='';},1100);}});},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});
    var rv=document.getElementById('reel');
    if(rv){
      var vo=new IntersectionObserver(function(es){es.forEach(function(e){
        if(e.isIntersecting){var p=rv.play();if(p&&p.catch)p.catch(function(){});}else{rv.pause();}
      });},{threshold:.5});
      vo.observe(rv);
    }
  }
  setTimeout(function(){checkCounters();showGroups();},60);

  /* Working hours: 9:00 AM to 9:00 PM Pakistan time, checked against the Pakistan clock. */
  var hrs=document.getElementById('hrs');
  var hrsText=document.getElementById('hrs-text');
  function updateHours(){
    try{
      var now=new Date();
      var hm=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Karachi',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(now).split(':');
      var h=parseInt(hm[0],10);
      var clock=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Karachi',hour:'numeric',minute:'2-digit',hour12:true}).format(now);
      var open=h>=9 && h<21;
      hrs.classList.toggle('open',open);
      hrsText.textContent=(open?'Open now':'Closed now, opens at 9:00 AM')+' \u00b7 '+clock+' in Pakistan';
    }catch(err){}
  }
  if(hrs&&hrsText){updateHours();setInterval(updateHours,30000);}
})();
