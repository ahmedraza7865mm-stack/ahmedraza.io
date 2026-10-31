/* Hero background follows the mouse a little; a circle trails the cursor */
(function(){
  var fine=window.matchMedia&&window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var hb=document.querySelector('.hero-bg');
  var ring=document.getElementById('cring'),dot=document.getElementById('cdot');
  var x=-100,y=-100,rx=-100,ry=-100,run=false,px=0,py=0;
  function tick(){
    rx+=(x-rx)*0.16;ry+=(y-ry)*0.16;
    if(ring)ring.style.transform='translate3d('+rx.toFixed(1)+'px,'+ry.toFixed(1)+'px,0)';
    if(dot)dot.style.transform='translate3d('+x+'px,'+y+'px,0)';
    if(Math.abs(x-rx)>0.1||Math.abs(y-ry)>0.1){requestAnimationFrame(tick);}else{run=false;}
  }
  window.addEventListener('mousemove',function(e){
    x=e.clientX;y=e.clientY;
    if(fine&&ring&&dot){ring.classList.add('on');dot.classList.add('on');if(!run){run=true;requestAnimationFrame(tick);}}
    if(hb){
      var w=window.innerWidth,h=window.innerHeight;
      px=((e.clientX/w)-.5)*-28;py=((e.clientY/h)-.5)*-20;
      hb.style.setProperty('--px',px.toFixed(1)+'px');hb.style.setProperty('--py',py.toFixed(1)+'px');
    }
  },{passive:true});
  document.addEventListener('mouseleave',function(){if(ring){ring.classList.remove('on');dot.classList.remove('on');}});
  document.addEventListener('mouseover',function(e){
    if(!ring)return;var t=e.target;
    if(t.closest&&t.closest('a,button,input,textarea,.svc,.why,.skillgroup,.fact,.tool,.stat,.proj,.pill,video'))ring.classList.add('hot');else ring.classList.remove('hot');
  });
  window.addEventListener('mousedown',function(){if(ring)ring.classList.add('down');});
  window.addEventListener('mouseup',function(){if(ring)ring.classList.remove('down');});
})();
