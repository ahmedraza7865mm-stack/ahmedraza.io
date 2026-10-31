/* A small 3D-style dino that spins slowly in the corner (drawn on a canvas, no library needed) */
(function(){
  var cv=document.getElementById('dino');
  if(!cv||!cv.getContext)return;
  var ctx=cv.getContext('2d'),size=0,dpr=1;
  function fit(){
    var r=cv.getBoundingClientRect();size=Math.max(60,Math.round(r.width));dpr=Math.min(2.5,window.devicePixelRatio||1);
    cv.width=Math.round(size*dpr);cv.height=Math.round(size*dpr);
  }
  fit();window.addEventListener('resize',fit);
  var C={body:['#c8f0d0','#8fcf9f','#4f9a6a'],belly:['#ffffff','#f1f4e6','#c9cfb8'],spike:['#fff1c4','#f2c66d','#c28f2e'],cheek:['#ffd0d4','#f29aa0','#c9626c'],dark:['#2b3328','#10150f','#10150f'],white:['#ffffff','#ffffff','#d8e0d8']};
  var radii=[.62,.5,.4,.3,.2,.12];
  var spin=0,burst=0,jump=0,t0=null,reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function build(t){
    var P=[],S=[];
    var bob=Math.sin(t*2.2)*.07+Math.max(0,jump)*1.1;
    function ball(x,y,z,r,sx,sy,sz,c){P.push({x:x,y:y+bob,z:z,r:r,sx:sx,sy:sy,sz:sz,c:C[c]});}
    ball(0,0,0,1,1.15,1,.95,'body');
    ball(.3,-.18,.05,.8,.9,.95,.9,'belly');
    var hx=.85,hy=.8+Math.sin(t*1.6)*.03;
    ball(hx+.3,hy+.25,0,.78,1,1,1,'body');
    ball(hx+1.02,hy+.05,0,.5,1.35,.8,.95,'body');
    var bl=(Math.sin(t*1.3)>.985||Math.sin(t*0.7+1)>.995)?.12:1;
    [-1,1].forEach(function(s){
      var ex=hx+.66,ey=hy+.58,ez=s*.46;
      P.push({x:ex,y:ey+bob,z:ez,r:.23,sx:1,sy:bl,sz:1,c:C.white});
      P.push({x:ex+.1,y:ey+bob,z:ez+s*.08,r:.11,sx:1,sy:bl,sz:1,c:C.dark});
      P.push({x:ex+.16,y:ey+.05+bob,z:ez+s*.1,r:.04,sx:1,sy:1,sz:1,c:C.white,flat:1});
      ball(hx+.62,hy-.12,s*.56,.16,1,.7,.5,'cheek');
      ball(hx+1.62,hy+.3,s*.18,.05,1,1,1,'dark');
    });
    var gx=-.95,gy=.05,gz=0,ang=0,tails=[];
    for(var i=0;i<radii.length;i++){
      if(i>0)gx+=-radii[i-1]*.95*Math.cos(ang);
      if(i>0)gz+=-radii[i-1]*.95*Math.sin(ang);
      ang+=Math.sin(t*2.4-i*.55)*.16;
      ball(gx-radii[i]*.4*Math.cos(ang),gy,gz-radii[i]*.4*Math.sin(ang),radii[i],1,1,1,'body');
      tails.push([gx,gy,gz,i]);
    }
    [-1,1].forEach(function(s,idx){
      var lift=Math.max(0,Math.sin(t*3+idx*Math.PI))*.12;
      var lx=.1,ly=-.78+lift,lz=s*.48;
      ball(lx,ly-.1,lz,.26,1,1,1,'body');ball(lx,ly-.32,lz,.26,1,1,1,'body');ball(lx,ly-.52,lz,.27,1,1,1,'body');
      ball(lx+.14,ly-.68,lz,.32,1.45,.55,1,'body');
      var ax=.8,ay=-.15+Math.sin(t*3+idx)*.03,az=s*.78;
      ball(ax+.12,ay-.1,az,.1,1,1,1,'body');ball(ax+.26,ay-.2,az,.11,1,1,1,'body');ball(ax+.42,ay-.3,az,.13,1,1,1,'body');
    });
    for(var k=0;k<6;k++){
      var sx=.62-.34*k,sy=Math.sqrt(Math.max(0,1-Math.pow(sx/1.15,2)))*.98;
      S.push({x:sx,y:sy+.08+bob,z:0,h:.44-.02*k,r:.2-.012*k,phi:.25+(.62-sx)*.18});
    }
    [0,2,4].forEach(function(ti){var g=tails[ti];S.push({x:g[0]-radii[ti]*.5,y:g[1]+radii[ti]*.85+bob,z:g[2],h:.3,r:.13,phi:.45});});
    return {P:P,S:S,bob:bob};
  }
  function shade(p,x,y,ex,ey,c){
    var g=ctx.createRadialGradient(x-ex*.35,y-ey*.4,Math.min(ex,ey)*.08,x,y,Math.max(ex,ey)*1.05);
    g.addColorStop(0,c[0]);g.addColorStop(.38,c[1]);g.addColorStop(.78,c[1]);g.addColorStop(1,c[2]);
    ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x,y,Math.max(.5,ex),Math.max(.5,ey),0,0,6.2832);ctx.fill();
  }
  function frame(ts){
    if(t0===null)t0=ts;var t=(ts-t0)/1000;
    if(!reduce){spin+=0.0105+burst;burst*=.94;jump=jump>0?jump-.045:0;}
    else spin=.5;
    var W=cv.width,H=cv.height,u=W/7.1;
    ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,W,H);
    var m=build(t),cs=Math.cos(spin),sn=Math.sin(spin),pitch=.16,cp=Math.cos(pitch),sp=Math.sin(pitch);
    var cx=W*.5,cy=H*.46;
    function proj(x,y,z){
      var X=x*cs+z*sn,Z=-x*sn+z*cs;
      var Y=y*cp-Z*sp,Z2=y*sp+Z*cp;
      return {x:cx+(X+.2*cs)*u,y:cy-(Y-.15)*u,z:Z2};
    }
    /* floor shadow */
    var sh=1-Math.min(.4,Math.max(0,jump)*.3);
    ctx.fillStyle='rgba(0,0,0,.28)';ctx.beginPath();ctx.ellipse(cx,cy+1.75*u,1.7*u*sh,.3*u*sh,0,0,6.2832);ctx.fill();
    var items=[];
    m.P.forEach(function(p){var q=proj(p.x,p.y,p.z);items.push({z:q.z,d:function(){
      var ex=p.r*Math.sqrt(Math.pow(p.sx*cs,2)+Math.pow(p.sz*sn,2))*u,ey=p.r*p.sy*u;
      if(p.flat){ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(q.x,q.y,ex,ey,0,0,6.2832);ctx.fill();}else shade(p,q.x,q.y,ex,ey,p.c);
    }});});
    m.S.forEach(function(s){
      var tipx=s.x-Math.sin(s.phi)*s.h*.6,tipy=s.y+Math.cos(s.phi)*s.h*.6;
      var bx=s.x+Math.sin(s.phi)*s.h*.4,by=s.y-Math.cos(s.phi)*s.h*.4;
      var a=proj(tipx,tipy,s.z),b=proj(bx,by,s.z),w=s.r*u*(.55+.45*Math.abs(sn));
      var dx=a.x-b.x,dy=a.y-b.y,L=Math.sqrt(dx*dx+dy*dy)||1,nx=-dy/L*w,ny=dx/L*w;
      items.push({z:b.z+.01,d:function(){
        var g=ctx.createLinearGradient(b.x,b.y,a.x,a.y);g.addColorStop(0,C.spike[2]);g.addColorStop(.5,C.spike[1]);g.addColorStop(1,C.spike[0]);
        ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x+nx,b.y+ny);ctx.lineTo(b.x-nx,b.y-ny);ctx.closePath();ctx.fill();
      }});
    });
    items.sort(function(a,b){return a.z-b.z;});
    items.forEach(function(i){i.d();});
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  cv.addEventListener('click',function(){burst=.16;jump=1;});
})();
