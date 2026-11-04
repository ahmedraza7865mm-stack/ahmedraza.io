/* Percentage loader: counts 0 to 100, then slides away */
(function(){
  var L=document.getElementById('loader');if(!L)return;
  document.body&&document.body.classList.add('lock');
  var n=document.getElementById('ldn'),b=document.getElementById('ldb'),s=document.getElementById('lds');
  var v=0,loaded=document.readyState==='complete',t0=Date.now(),words=['Loading','Designing','Optimising','Almost there'];
  window.addEventListener('load',function(){loaded=true;});
  function end(){L.classList.add('done');document.body.classList.remove('lock');setTimeout(function(){L.remove();document.documentElement.classList.add('ready');},1100);}
  (function step(){
    var target=loaded?100:Math.min(88,(Date.now()-t0)/30);
    v+=Math.max(.6,(target-v)*.08);if(v>target)v=target;
    var p=Math.round(v);n.textContent=p;b.style.width=p+'%';s.textContent=words[Math.min(3,Math.floor(p/26))];
    if(v>=99.5&&loaded){n.textContent=100;b.style.width='100%';setTimeout(end,250);return;}
    if(Date.now()-t0>6000){loaded=true;}
    requestAnimationFrame(step);
  })();
})();
