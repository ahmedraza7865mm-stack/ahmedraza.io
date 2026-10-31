(function(){
  var L=document.getElementById('loader'),f=document.getElementById('ldfill'),p=document.getElementById('ldpct'),t=document.getElementById('ldsub');
  if(!L)return;document.documentElement.classList.add('ld-on');
  var start=Date.now(),MIN=2300,loaded=document.readyState==='complete',v=0,closed=false;
  window.addEventListener('load',function(){loaded=true;});
  function close(){if(closed)return;closed=true;t.textContent='READY';L.classList.add('done');document.documentElement.classList.remove('ld-on');setTimeout(function(){if(L.parentNode)L.parentNode.removeChild(L);},800);}
  var iv=setInterval(function(){
    var el=Date.now()-start,target=Math.min(100,el/MIN*100);
    if(!loaded)target=Math.min(target,92);
    v+=(target-v)*0.25+0.4;if(v>target)v=target;
    var n=Math.round(v);f.style.width=n+'%';p.textContent=n+'%';
    if(n>=100){clearInterval(iv);setTimeout(close,350);}
  },40);
  setTimeout(close,6000);
})();
