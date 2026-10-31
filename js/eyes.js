/* Watching eyes: pupils follow the cursor or finger, blink now and then, widen on click */
(function(){
  var box=document.getElementById('eyes');
  if(!box)return;
  var eyes=Array.prototype.slice.call(box.querySelectorAll('.eye'));
  var mx=window.innerWidth/2,my=window.innerHeight/2,idle=true,idleT=0;
  function look(x,y){
    eyes.forEach(function(e){
      var r=e.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
      var dx=x-cx,dy=y-cy,d=Math.sqrt(dx*dx+dy*dy)||1;
      var max=r.width*0.24,k=Math.min(max,d/6);
      e.firstElementChild.style.transform='translate('+(dx/d*k).toFixed(1)+'px,'+(dy/d*k).toFixed(1)+'px)';
    });
  }
  function move(x,y){mx=x;my=y;idle=false;clearTimeout(idleT);idleT=setTimeout(function(){idle=true;},4000);look(mx,my);}
  window.addEventListener('mousemove',function(e){move(e.clientX,e.clientY);},{passive:true});
  window.addEventListener('touchstart',function(e){var t=e.touches[0];if(t)move(t.clientX,t.clientY);},{passive:true});
  window.addEventListener('touchmove',function(e){var t=e.touches[0];if(t)move(t.clientX,t.clientY);},{passive:true});
  window.addEventListener('scroll',function(){look(mx,my);},{passive:true});
  window.addEventListener('mousedown',function(){box.classList.add('wow');},{passive:true});
  window.addEventListener('mouseup',function(){box.classList.remove('wow');},{passive:true});
  /* When nobody is moving, the eyes wander around the screen by themselves */
  var a=0;
  setInterval(function(){
    if(!idle)return;
    a+=1.7;look(window.innerWidth*(.5+.45*Math.cos(a)),window.innerHeight*(.5+.4*Math.sin(a*1.3)));
  },1400);
  function blink(){
    box.classList.add('blink');
    setTimeout(function(){box.classList.remove('blink');},140);
    setTimeout(blink,2200+Math.random()*3000);
  }
  setTimeout(blink,3500);
  look(mx,my);
})();
