import * as THREE from './assets/vendor/three.module.min.js';

const root=document.querySelector('#motion-demo');
const stage=root.querySelector('.demo-stage');
const canvas=root.querySelector('canvas');
const fallback=root.querySelector('.demo-fallback');
let renderer;
try {renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});}
catch {fallback.hidden=false;canvas.hidden=true;root.querySelector('.demo-controls').hidden=true;root.querySelector('.demo-story').hidden=true;}
if(renderer) init();
function init(){
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0xffffff,0);
  const scene=new THREE.Scene();
  const camera=new THREE.OrthographicCamera(-3,3,2,-2,.1,40);
  const target=new THREE.Vector3(-.05,.70,0);
  let azimuth=.78,elevation=.52,zoom=1;
  function view(){const r=8;camera.position.set(target.x+r*Math.sin(azimuth)*Math.cos(elevation),target.y+r*Math.sin(elevation),target.z+r*Math.cos(azimuth)*Math.cos(elevation));camera.lookAt(target);camera.zoom=zoom;camera.updateProjectionMatrix();}
  const hemi=new THREE.HemisphereLight(0xffffff,0xc0cad9,2.5);scene.add(hemi);
  const sun=new THREE.DirectionalLight(0xffffff,3.3);sun.position.set(-2,6,3);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-4;sun.shadow.camera.right=4;sun.shadow.camera.top=4;sun.shadow.camera.bottom=-4;sun.shadow.normalBias=.025;sun.shadow.bias=-.0001;sun.shadow.radius=4;scene.add(sun);
  const fill=new THREE.DirectionalLight(0xd7e6ff,1.2);fill.position.set(3,3,-4);scene.add(fill);
  const material=(color,metalness=0,roughness=.55)=>new THREE.MeshStandardMaterial({color,metalness,roughness});
  const white=material(0xf4f6f9,.2,.38),metal=material(0xc8d0da,.65,.35),dark=material(0x243244,.5,.32),blue=material(0x3769dc,.3,.35),ceramic=material(0xdcecf4,.12,.2);
  function mesh(geometry,mat,parent=scene){const m=new THREE.Mesh(geometry,mat);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
  function box(x,y,z,mat,parent=scene){return mesh(new THREE.BoxGeometry(x,y,z),mat,parent);}
  function cylinder(r1,r2,h,mat,parent=scene){return mesh(new THREE.CylinderGeometry(r1,r2,h,48),mat,parent);}
  const board=box(4.1,.12,2.65,white.clone());board.position.y=-.075;
  const rim=box(4.13,.035,2.68,metal);rim.position.y=-.14;
  const grid=new THREE.GridHelper(4,32,0xdde3ed,0xe9edf3);grid.scale.z=.65;grid.position.y=-.012;scene.add(grid);
  const ground=mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.09}));ground.rotation.x=-Math.PI/2;ground.position.y=-.18;ground.castShadow=false;
  for(const x of [-1.9,1.9]) for(const z of [-1.16,1.16]){const screw=cylinder(.022,.022,.008,dark);screw.position.set(x,-.006,z);}
  const origin=new THREE.Vector3(-1.05,0,-.55);
  const base=new THREE.Group();base.position.copy(origin);scene.add(base);
  for(const [r,h,y,m] of [[.31,.06,.03,dark],[.29,.12,.12,white],[.285,.013,.19,blue],[.24,.17,.275,white]]){const b=cylinder(r,r,h,m,base);b.position.y=y;}
  const shoulder=origin.clone().add(new THREE.Vector3(0,.44,0));
  function joint(radius){const g=new THREE.Group();mesh(new THREE.SphereGeometry(radius,32,20),white,g);const cap=cylinder(radius*.72,radius*.72,radius*1.8,dark,g);cap.rotation.x=Math.PI/2;const ring=mesh(new THREE.TorusGeometry(radius*.74,.009,10,40),blue,g);ring.position.z=radius*.91;scene.add(g);return g;}
  const j0=joint(.155),j1=joint(.14),j2=joint(.115);j0.position.copy(shoulder);
  function link(){const g=new THREE.Group();const b=cylinder(.092,.106,1,white,g);const stripe=box(.085,.78,.015,metal,g);stripe.position.z=.092;for(const x of [-.078,.078]){const rib=cylinder(.022,.022,.78,dark,g);rib.position.set(x,0,-.036);}scene.add(g);return g;}
  const upper=link(),fore=link();
  function connect(g,a,b){g.position.copy(a).add(b).multiplyScalar(.5);const d=b.clone().sub(a);g.scale.set(1,d.length(),1);g.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());}
  const hand=new THREE.Group();scene.add(hand);const palm=box(.38,.08,.15,dark,hand);palm.position.y=-.025;const wrist=cylinder(.09,.09,.10,metal,hand);wrist.position.y=.06;
  const fingers=[-1,1].map(sign=>{const g=new THREE.Group();hand.add(g);const body=box(.043,.26,.12,metal,g);body.position.y=-.18;const pad=box(.017,.13,.105,dark,g);pad.position.set(-sign*.021,-.225,0);return g;});
  const start=new THREE.Vector3(-.35,0,.65),end=new THREE.Vector3(1.02,0,.22);
  let curve=new THREE.CatmullRomCurve3([start,start.clone().add(new THREE.Vector3(0,.5,0)),new THREE.Vector3(.35,.57,.52),end.clone().add(new THREE.Vector3(0,.48,0)),end]);
  function cup(mat){const g=new THREE.Group();const profile=[[0,0],[.10,0],[.119,.025],[.133,.29],[.128,.305],[.108,.305],[.105,.28],[.09,.035],[0,.035]].map(([x,y])=>new THREE.Vector2(x,y));mesh(new THREE.LatheGeometry(profile,48),mat,g);const handle=mesh(new THREE.TorusGeometry(.082,.018,12,36,Math.PI*1.75),mat,g);handle.position.set(.137,.16,0);handle.rotation.z=-Math.PI*.875;return g;}
  function shape(kind,mat){
    if(kind==='cup')return cup(mat);
    const g=new THREE.Group();
    if(kind==='sponge'){const b=box(.28,.065,.20,mat,g);b.position.y=.034;const pad=box(.28,.015,.20,material(0x4b9481),g);pad.position.y=.009;}
    else{const profile=[[0,0],[.085,0],[.10,.025],[.10,.29],[.065,.34],[.038,.36],[.038,.44],[0,.44]].map(([x,y])=>new THREE.Vector2(x,y));mesh(new THREE.LatheGeometry(profile,40),mat,g);const cap=cylinder(.043,.043,.035,dark,g);cap.position.y=.445;}
    return g;
  }
  const object=new THREE.Group(),ghost=new THREE.Group();scene.add(object,ghost);
  const objectShapes=['cup','sponge','bottle'].map((k,i)=>{const g=shape(k,[ceramic,material(0xefb955),material(0x75b4aa,.2,.22)][i]);object.add(g);return g;});
  const ghostShapes=['cup','sponge','bottle'].map(k=>{const g=shape(k,new THREE.MeshBasicMaterial({color:0x78a2ea,transparent:true,opacity:.12,wireframe:true}));ghost.add(g);return g;});

  function ring(position,r,color){const m=mesh(new THREE.TorusGeometry(r,.008,8,80),new THREE.MeshBasicMaterial({color}));m.rotation.x=-Math.PI/2;m.position.copy(position).add(new THREE.Vector3(0,.01,0));m.castShadow=false;return m;}
  const sourceRing=ring(start,.20,0xc5cfdf);const goalRing=ring(end,.23,0x4378e2);const outerRing=ring(end,.27,0xd9e5fc);
  const goalDisc=mesh(new THREE.CircleGeometry(.20,64),new THREE.MeshBasicMaterial({color:0xe9f0ff,transparent:true,opacity:.6}));goalDisc.rotation.x=-Math.PI/2;goalDisc.position.copy(end).y=.003;goalDisc.castShadow=false;
  // Eight persistent identities move with the cup; paths are explanatory geometry.
  const colors=[0xf3c54c,0xf0a94a,0xef8258,0xe65f89,0xc565c4,0x9674db,0x6085e2,0x40b9c8];
  const offsets=colors.map((_,i)=>new THREE.Vector3(.126*Math.cos(i*Math.PI/2),i<4?.08:.24,.126*Math.sin(i*Math.PI/2)));
  const dots=offsets.map((o,i)=>{const d=mesh(new THREE.SphereGeometry(.023,16,12),new THREE.MeshBasicMaterial({color:colors[i]}),object);d.position.copy(o);d.renderOrder=2;return d;});
  const tracks=offsets.map((offset,i)=>{const path=new THREE.CatmullRomCurve3(curve.points.map(p=>p.clone().add(offset)));const geometry=new THREE.TubeGeometry(path,120,.006,6,false);const line=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:colors[i],transparent:true,opacity:.9}));line.frustumCulled=false;scene.add(line);return line;});
  const destinationDots=offsets.map((o,i)=>{const d=mesh(new THREE.SphereGeometry(.018,12,8),new THREE.MeshBasicMaterial({color:colors[i],transparent:true,opacity:.55}));d.position.copy(end).add(o);return d;});
  const scan=mesh(new THREE.RingGeometry(.24,.25,64),new THREE.MeshBasicMaterial({color:0x4c83ef,side:THREE.DoubleSide,transparent:true,opacity:.4}));scan.rotation.x=-Math.PI/2;scan.castShadow=false;
  // Embodiments use separate kinematic constructions, not just different colors.
  const home=new THREE.Vector3(-.45,1.18,-.16);
  const robotShells=[];
  [base,j0,j1,j2,upper,fore].forEach(g=>g.traverse(m=>{if(m.isMesh&&m.material===white){m.material=white.clone();robotShells.push(m);}}));
  const scara=new THREE.Group();scene.add(scara);const orange=material(0xe3a35a,.2,.4);
  const foot=cylinder(.28,.32,.13,dark,scara);foot.position.copy(origin).y=.065;
  const post=cylinder(.10,.15,1.10,metal,scara);post.position.copy(origin).y=.60;
  const cover=box(.25,.42,.25,orange,scara);cover.position.copy(origin).y=.46;
  function scaraLink(){const g=new THREE.Group();const b=box(.17,1,.13,orange,g);const stripe=box(.18,.72,.035,white,g);stripe.position.z=.075;scara.add(g);return g;}
  const su=scaraLink(),sf=scaraLink();const motors=[0,1,2].map(()=>cylinder(.12,.12,.13,dark,scara));const quill=cylinder(.035,.035,1,metal,scara);
  const scenes=[new THREE.Group(),new THREE.Group(),new THREE.Group()];scenes.forEach(g=>scene.add(g));
  // Workbench fixtures, a kitchen backsplash, and a laboratory tray distinguish scenes.
  const tray=box(.46,.025,.42,material(0xe9eef8),scenes[0]);tray.position.set(1.02,0,.22);
  const tile=box(3.25,.50,.05,material(0xe2e9df),scenes[1]);tile.position.set(.28,.20,-1.22);
  for(let i=0;i<9;i++){const seam=box(.008,.49,.008,material(0xc6d1c6),scenes[1]);seam.position.set(-1.25+i*.38,.20,-1.188);}
  const counter=box(.4,.015,1.35,material(0xd9c9ae),scenes[1]);counter.position.set(1.65,-.003,0);
  const bowlProfile=[[0,0],[.13,0],[.22,.12],[.22,.15],[.195,.15],[.17,.04],[0,.035]].map(([x,y])=>new THREE.Vector2(x,y));
  const bowl=mesh(new THREE.LatheGeometry(bowlProfile,48),white,scenes[2]);bowl.position.set(1.14,.005,.22);
  const rack=box(.85,.055,.30,material(0xe3eaf4),scenes[2]);rack.position.set(.55,.025,-1.0);
  for(let i=0;i<5;i++){const tube=cylinder(.033,.033,.30,material(i%2?0xaacddf:0xb9dbcf,.1,.25),scenes[2]);tube.position.set(.22+i*.16,.18,-1);}
  const liquid=mesh(new THREE.CylinderGeometry(.009,.009,1,10),new THREE.MeshBasicMaterial({color:0x72bfdf,transparent:true,opacity:.65}),scenes[2]);
  const configs=[
    {id:'cup',task:'Place the cup on the target.',scene:'Workbench',body:'Articulated arm',name:'Pick & place',grip:.48,gap:.151,finger:1,l1:1.15,l2:1.20,color:0xf4f6f9,board:0xf4f6f9,end:[1.02,0,.22],points:[[-.35,0,.65],[-.35,.5,.65],[.35,.57,.52],[1.02,.48,.22],[1.02,0,.22]]},
    {id:'sponge',task:'Wipe the surface with the sponge.',scene:'Kitchen counter',body:'SCARA arm',name:'Wipe',grip:.18,gap:.165,finger:.45,l1:1.15,l2:1.20,color:0xe3a35a,board:0xe4d6c0,end:[.85,0,.30],points:[[-.35,0,.65],[.8,0,.65],[-.15,0,.30],[.85,0,.30]]},
    {id:'bottle',task:'Tilt the bottle over the bowl.',scene:'Laboratory',body:'Collaborative-style arm',name:'Pour',grip:.48,gap:.118,finger:1,l1:1.28,l2:1.12,color:0x567786,board:0xe3ecf5,end:[.73,.28,.22],points:[[-.35,0,.65],[-.35,.45,.65],[.2,.58,.42],[.73,.28,.22]]}
  ];
  let caseIndex=0,cfg=configs[0];
  const caseButtons=[...root.querySelectorAll('.demo-case')];
  const smooth=x=>{x=THREE.MathUtils.clamp(x,0,1);return x*x*(3-2*x);};
  function pose(u){return {position:curve.getPoint(u),angle:cfg.id==='bottle'?-1.08*smooth((u-.55)/.45):0};}
  function offsetPoint(u,offset){const p=pose(u);return offset.clone().applyAxisAngle(new THREE.Vector3(0,0,1),p.angle).add(p.position);}
  function applyCase(index){
    caseIndex=index;cfg=configs[index];start.set(-.35,0,.65);end.set(...cfg.end);curve=new THREE.CatmullRomCurve3(cfg.points.map(p=>new THREE.Vector3(...p)));
    objectShapes.forEach((g,i)=>g.visible=i===index);ghostShapes.forEach((g,i)=>g.visible=i===index);scenes.forEach((g,i)=>g.visible=i===index);
    scara.visible=index===1;[base,j0,j1,j2,upper,fore].forEach(g=>g.visible=index!==1);robotShells.forEach(m=>m.material.color.setHex(cfg.color));board.material.color.setHex(cfg.board);grid.visible=index!==1;
    offsets.forEach((o,i)=>{if(index===1)o.set(i%4<2?-.14:.14,i<4?.025:.065,i%2?-.10:.10);else o.set((index===2?.102:.126)*Math.cos(i*Math.PI/2),i<4?.08:index===2?.27:.24,(index===2?.102:.126)*Math.sin(i*Math.PI/2));dots[i].position.copy(o);destinationDots[i].position.copy(offsetPoint(1,o));const path=new THREE.CatmullRomCurve3(Array.from({length:61},(_,n)=>offsetPoint(n/60,o)));tracks[i].geometry.dispose();tracks[i].geometry=new THREE.TubeGeometry(path,120,.006,6,false);});
    const final=pose(1);ghost.position.copy(final.position);ghost.rotation.z=final.angle;
    [goalRing,outerRing,goalDisc].forEach(m=>{m.position.copy(end);m.position.y=.01;});sourceRing.position.copy(start).y=.01;
    fingers.forEach(g=>g.scale.y=cfg.finger);
    root.querySelector('.demo-instruction').textContent='“'+cfg.task+'”';root.querySelector('.demo-case-scene').textContent=cfg.scene;root.querySelector('.demo-case-body').textContent=cfg.body;root.querySelector('.demo-case-task').textContent=cfg.name;
    caseButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));root.dataset.scenario=cfg.id;canvas.setAttribute('aria-label',`3D illustration: ${cfg.task} ${cfg.body} in a ${cfg.scene.toLowerCase()}. Drag or use arrow keys to rotate.`);
  }
  function robot(wrist,gap,angle){
    if(cfg.id==='sponge'){
      const a=origin.clone().setY(1.13),b=wrist.clone().setY(1.13),d=b.clone().sub(a),dist=Math.min(d.length(),2.34),dir=d.normalize(),side=new THREE.Vector3(-dir.z,0,dir.x);
      const cosine=(cfg.l1**2+dist**2-cfg.l2**2)/(2*cfg.l1*dist);const elbow=a.clone().addScaledVector(dir,cfg.l1*cosine).addScaledVector(side,cfg.l1*Math.sqrt(Math.max(0,1-cosine*cosine)));
      connect(su,a,elbow);connect(sf,elbow,b);[a,elbow,b].forEach((v,i)=>motors[i].position.copy(v));connect(quill,b,wrist);
    }else{
      const delta=wrist.clone().sub(shoulder),dist=Math.min(delta.length(),cfg.l1+cfg.l2-.01),direction=delta.clone().normalize(),up=new THREE.Vector3(0,1,0).addScaledVector(direction,-direction.y).normalize();
      const cosine=(cfg.l1**2+dist**2-cfg.l2**2)/(2*cfg.l1*dist),elbow=shoulder.clone().addScaledVector(direction,cfg.l1*Math.max(-1,Math.min(1,cosine))).addScaledVector(up,cfg.l1*Math.sqrt(Math.max(0,1-cosine*cosine)));
      j1.position.copy(elbow);j2.position.copy(wrist);connect(upper,shoulder,elbow);connect(fore,elbow,wrist);
    }
    hand.position.copy(wrist);hand.rotation.z=angle;fingers[0].position.x=-gap;fingers[1].position.x=gap;
  }
  const steps=[...root.querySelectorAll('.demo-step')],phaseTitle=root.querySelector('.demo-phase-title'),explanation=root.querySelector('.demo-explanation'),badge=root.querySelector('.demo-badge'),phaseNumber=root.querySelector('.demo-phase-number'),timeline=root.querySelector('.demo-scrub'),pause=root.querySelector('.demo-pause'),status=root.querySelector('.demo-playback-status');
  const phases=[['Observe the object','A short RGB history, a language instruction, and current query XYZ define the prediction input. The colored points retain their identities.','RGB history + language + query XYZ'],['Forecast metric point motion','Observed-frame features are cached. The trajectory expert predicts future XYZ for the query points, with target XYZ supplied in this example.','Cached features → 3D point trajectories'],['Turn trajectories into actions','Predicted trajectories, the object point cloud, and robot state condition the action expert. A shared point-trajectory interface connects the object motion to the selected robot embodiment.','3D trajectories → action chunks']];
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');let playing=!reduce.matches,time=0,previous=performance.now(),active=-1,visible=true,disposed=false;
  const duration=18;const ease=x=>{x=THREE.MathUtils.clamp(x,0,1);return x*x*(3-2*x);};const lerp=(a,b,t)=>a.clone().lerp(b,ease(t));
  function playback(){pause.textContent=playing?'Pause':'Play';pause.setAttribute('aria-label',playing?'Pause demo':'Play demo');pause.setAttribute('aria-pressed',String(!playing));status.textContent=playing?'Playing':'Paused';}
  function update(){
    const phase=time<3.2?0:time<7.2?1:2;
    if(phase!==active){active=phase;steps.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===phase));b.classList.toggle('active',i===phase);});phaseTitle.textContent=phases[phase][0];explanation.textContent=phases[phase][1];badge.textContent=phases[phase][2];phaseNumber.textContent=`0${phase+1} / 03`;}
    const forecasting=THREE.MathUtils.clamp((time-3.2)/3.2,0,1);tracks.forEach(l=>{l.visible=phase>0;l.geometry.setDrawRange(0,Math.floor(120*forecasting)*36);l.material.opacity=phase===2?.65:1;});ghost.visible=phase>0;destinationDots.forEach(d=>d.visible=phase>0);
    object.position.copy(start);object.rotation.z=0;let wrist=home.clone(),gap=.22,angle=0;liquid.visible=false;
    if(phase===2){const t=THREE.MathUtils.clamp((time-7.2)/8.8,0,1);const grasp=start.clone().add(new THREE.Vector3(0,cfg.grip,0));
      if(t<.19)wrist=lerp(home,grasp,t/.19);
      else if(t<.27){wrist=grasp;gap=THREE.MathUtils.lerp(.22,cfg.gap,ease((t-.19)/.08));}
      else if(t<.77){const u=ease((t-.27)/.50),p=pose(u);object.position.copy(p.position);object.rotation.z=angle=p.angle;wrist=offsetPoint(u,new THREE.Vector3(0,cfg.grip,0));gap=cfg.gap;}
      else {const p=pose(1);object.position.copy(p.position);object.rotation.z=angle=p.angle;const finish=offsetPoint(1,new THREE.Vector3(0,cfg.grip,0));
        if(cfg.id==='bottle'){wrist=finish;gap=cfg.gap;liquid.visible=true;const mouth=offsetPoint(1,new THREE.Vector3(0,.44,0)),bottom=mouth.clone().setY(.15);connect(liquid,mouth,bottom);}
        else if(t<.85){wrist=finish;gap=THREE.MathUtils.lerp(cfg.gap,.22,ease((t-.77)/.08));}
        else wrist=lerp(finish,end.clone().add(new THREE.Vector3(-.14,1.1,-.12)),(t-.85)/.15);
      }
    }
    robot(wrist,gap,angle);scan.visible=phase===0;scan.position.copy(start).y=.03+.35*((time%1.6)/1.6);scan.material.opacity=.4*(1-(time%1.6)/1.6);dots.forEach(d=>d.scale.setScalar(phase===0?1+.18*Math.sin(time*4):1));goalRing.material.color.setHex(phase===2&&time>14.7?0x36a78c:0x4378e2);
    canvas.style.opacity=String(playing?Math.min(1,time/.35,(duration-time)/.35):1);
    timeline.value=String(time/duration*1000);timeline.setAttribute('aria-valuetext',`${phases[phase][0]}, ${Math.round(time/duration*100)} percent`);root.dataset.phase=['observe','predict','act'][phase];root.dataset.demoTime=time.toFixed(2);
  }
  function resize(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);const aspect=w/h,half=Math.max(1.90,2.65/aspect);camera.left=-half*aspect;camera.right=half*aspect;camera.top=half;camera.bottom=-half;view();}
  new ResizeObserver(resize).observe(stage);resize();
  pause.addEventListener('click',()=>{playing=!playing;playback();});
  root.querySelector('.demo-replay').addEventListener('click',()=>{time=0;playing=true;playback();update();});
  root.querySelector('.demo-reset').addEventListener('click',()=>{azimuth=.78;elevation=.52;zoom=1;view();});
  steps.forEach((b,i)=>b.addEventListener('click',()=>{time=[.8,6.7,12.2][i];playing=false;playback();update();}));
  timeline.addEventListener('input',()=>{time=Number(timeline.value)/1000*duration;playing=false;playback();update();});
  caseButtons.forEach((b,i)=>b.addEventListener('click',()=>{applyCase(i);time=0;active=-1;playing=!reduce.matches;playback();update();}));
  let pointer=null;
  canvas.addEventListener('pointerdown',e=>{pointer={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);canvas.classList.add('dragging');});
  canvas.addEventListener('pointermove',e=>{if(!pointer)return;azimuth-=(e.clientX-pointer.x)*.007;elevation=THREE.MathUtils.clamp(elevation+(e.clientY-pointer.y)*.005,.16,1.2);pointer.x=e.clientX;pointer.y=e.clientY;view();});
  const release=()=>{pointer=null;canvas.classList.remove('dragging');};canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);
  canvas.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();if(e.key==='ArrowLeft')azimuth-=.13;if(e.key==='ArrowRight')azimuth+=.13;if(e.key==='ArrowUp')elevation=Math.min(1.2,elevation+.09);if(e.key==='ArrowDown')elevation=Math.max(.16,elevation-.09);view();}else if(e.code==='Space'){e.preventDefault();playing=!playing;playback();}});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{threshold:.03}).observe(root);
  function animate(now){if(disposed)return;const dt=Math.min((now-previous)/1000,.06);previous=now;if(visible&&!document.hidden){if(playing){time+=dt;if(time>=duration){time%=duration;applyCase((caseIndex+1)%configs.length);active=-1;}}update();renderer.render(scene,camera);}requestAnimationFrame(animate);}
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();disposed=true;fallback.hidden=false;fallback.textContent='The 3D view was interrupted. Reload the page to replay, or explore the recorded rollouts below.';});
  applyCase(0);root.querySelector('.demo-loading').hidden=true;root.querySelectorAll('button,input').forEach(e=>e.disabled=false);root.setAttribute('aria-busy','false');playback();update();requestAnimationFrame(animate);
}
