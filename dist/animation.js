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
  const board=box(4.1,.12,2.65,white);board.position.y=-.075;
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
  const curve=new THREE.CatmullRomCurve3([start,start.clone().add(new THREE.Vector3(0,.5,0)),new THREE.Vector3(.35,.57,.52),end.clone().add(new THREE.Vector3(0,.48,0)),end]);
  function cup(mat){const g=new THREE.Group();const profile=[[0,0],[.10,0],[.119,.025],[.133,.29],[.128,.305],[.108,.305],[.105,.28],[.09,.035],[0,.035]].map(([x,y])=>new THREE.Vector2(x,y));mesh(new THREE.LatheGeometry(profile,48),mat,g);const handle=mesh(new THREE.TorusGeometry(.082,.018,12,36,Math.PI*1.75),mat,g);handle.position.set(.137,.16,0);handle.rotation.z=-Math.PI*.875;return g;}
  const object=cup(ceramic);object.position.copy(start);scene.add(object);
  const ghost=cup(new THREE.MeshBasicMaterial({color:0x78a2ea,transparent:true,opacity:.15,wireframe:true}));ghost.position.copy(end);scene.add(ghost);
  function ring(position,r,color){const m=mesh(new THREE.TorusGeometry(r,.008,8,80),new THREE.MeshBasicMaterial({color}));m.rotation.x=-Math.PI/2;m.position.copy(position).add(new THREE.Vector3(0,.01,0));m.castShadow=false;return m;}
  ring(start,.20,0xc5cfdf);const goalRing=ring(end,.23,0x4378e2);ring(end,.27,0xd9e5fc);
  const goalDisc=mesh(new THREE.CircleGeometry(.20,64),new THREE.MeshBasicMaterial({color:0xe9f0ff,transparent:true,opacity:.6}));goalDisc.rotation.x=-Math.PI/2;goalDisc.position.copy(end).y=.003;goalDisc.castShadow=false;
  // Eight persistent identities move with the cup; paths are explanatory geometry.
  const colors=[0xf3c54c,0xf0a94a,0xef8258,0xe65f89,0xc565c4,0x9674db,0x6085e2,0x40b9c8];
  const offsets=colors.map((_,i)=>new THREE.Vector3(.126*Math.cos(i*Math.PI/2),i<4?.08:.24,.126*Math.sin(i*Math.PI/2)));
  const dots=offsets.map((o,i)=>{const d=mesh(new THREE.SphereGeometry(.023,16,12),new THREE.MeshBasicMaterial({color:colors[i]}),object);d.position.copy(o);d.renderOrder=2;return d;});
  const tracks=offsets.map((offset,i)=>{const path=new THREE.CatmullRomCurve3(curve.points.map(p=>p.clone().add(offset)));const geometry=new THREE.TubeGeometry(path,120,.006,6,false);const line=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:colors[i],transparent:true,opacity:.9}));line.frustumCulled=false;scene.add(line);return line;});
  const destinationDots=offsets.map((o,i)=>{const d=mesh(new THREE.SphereGeometry(.018,12,8),new THREE.MeshBasicMaterial({color:colors[i],transparent:true,opacity:.55}));d.position.copy(end).add(o);return d;});
  const scan=mesh(new THREE.RingGeometry(.24,.25,64),new THREE.MeshBasicMaterial({color:0x4c83ef,side:THREE.DoubleSide,transparent:true,opacity:.4}));scan.rotation.x=-Math.PI/2;scan.castShadow=false;
  // A two-link IK illustration connects the arm to a downward-facing gripper.
  const home=new THREE.Vector3(-.45,1.18,-.16);
  function robot(wrist,gap){
    const delta=wrist.clone().sub(shoulder);const dist=Math.min(delta.length(),2.34);const direction=delta.clone().normalize();const up=new THREE.Vector3(0,1,0).addScaledVector(direction,-direction.y).normalize();const cos=(1.15**2+dist**2-1.20**2)/(2*1.15*dist);const elbow=shoulder.clone().addScaledVector(direction,1.15*Math.max(-1,Math.min(1,cos))).addScaledVector(up,1.15*Math.sqrt(Math.max(0,1-cos*cos)));
    j1.position.copy(elbow);j2.position.copy(wrist);connect(upper,shoulder,elbow);connect(fore,elbow,wrist);hand.position.copy(wrist);fingers[0].position.x=-gap;fingers[1].position.x=gap;
  }
  const steps=[...root.querySelectorAll('.demo-step')],phaseTitle=root.querySelector('.demo-phase-title'),explanation=root.querySelector('.demo-explanation'),badge=root.querySelector('.demo-badge'),phaseNumber=root.querySelector('.demo-phase-number'),timeline=root.querySelector('.demo-scrub'),pause=root.querySelector('.demo-pause'),status=root.querySelector('.demo-playback-status');
  const phases=[['Observe the object','A short RGB history, a language instruction, and current query XYZ define the prediction input. The colored points retain their identities.','RGB history + language + query XYZ'],['Forecast metric point motion','Observed-frame features are cached. The trajectory expert predicts future XYZ for the query points, with target XYZ supplied in this example.','Cached features → 3D point trajectories'],['Turn trajectories into actions','Predicted trajectories, the object point cloud, and robot state condition the action expert. The gripper transports and releases the cup.','3D trajectories → action chunks']];
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');let playing=!reduce.matches,time=0,previous=performance.now(),active=-1,visible=true,disposed=false;
  const duration=18;const ease=x=>{x=THREE.MathUtils.clamp(x,0,1);return x*x*(3-2*x);};const lerp=(a,b,t)=>a.clone().lerp(b,ease(t));
  function playback(){pause.textContent=playing?'Pause':'Play';pause.setAttribute('aria-label',playing?'Pause demo':'Play demo');pause.setAttribute('aria-pressed',String(!playing));status.textContent=playing?'Playing':'Paused';}
  function update(){
    const phase=time<3.2?0:time<7.2?1:2;
    if(phase!==active){active=phase;steps.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===phase));b.classList.toggle('active',i===phase);});phaseTitle.textContent=phases[phase][0];explanation.textContent=phases[phase][1];badge.textContent=phases[phase][2];phaseNumber.textContent=`0${phase+1} / 03`;}
    const forecasting=THREE.MathUtils.clamp((time-3.2)/3.2,0,1);tracks.forEach(l=>{l.visible=phase>0;l.geometry.setDrawRange(0,Math.floor(120*forecasting)*36);l.material.opacity=phase===2?.65:1;});ghost.visible=phase>0;destinationDots.forEach(d=>d.visible=phase>0);
    object.position.copy(start);let wrist=home.clone(),gap=.22;
    if(phase===2){const t=THREE.MathUtils.clamp((time-7.2)/8.8,0,1);const grasp=start.clone().add(new THREE.Vector3(0,.48,0));const finish=end.clone().add(new THREE.Vector3(0,.48,0));
      if(t<.19)wrist=lerp(home,grasp,t/.19);
      else if(t<.27){wrist=grasp;gap=THREE.MathUtils.lerp(.22,.151,ease((t-.19)/.08));}
      else if(t<.77){const u=ease((t-.27)/.50);object.position.copy(curve.getPoint(u));wrist=object.position.clone().add(new THREE.Vector3(0,.48,0));gap=.151;}
      else if(t<.85){object.position.copy(end);wrist=finish;gap=THREE.MathUtils.lerp(.151,.22,ease((t-.77)/.08));}
      else{object.position.copy(end);wrist=lerp(finish,end.clone().add(new THREE.Vector3(-.14,1.1,-.12)),(t-.85)/.15);}
    }
    robot(wrist,gap);scan.visible=phase===0;scan.position.copy(start).y=.03+.35*((time%1.6)/1.6);scan.material.opacity=.4*(1-(time%1.6)/1.6);dots.forEach(d=>d.scale.setScalar(phase===0?1+.18*Math.sin(time*4):1));goalRing.material.color.setHex(phase===2&&time>14.7?0x36a78c:0x4378e2);
    timeline.value=String(time/duration*1000);timeline.setAttribute('aria-valuetext',`${phases[phase][0]}, ${Math.round(time/duration*100)} percent`);root.dataset.phase=['observe','predict','act'][phase];root.dataset.demoTime=time.toFixed(2);
  }
  function resize(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);const aspect=w/h,half=Math.max(1.90,2.65/aspect);camera.left=-half*aspect;camera.right=half*aspect;camera.top=half;camera.bottom=-half;view();}
  new ResizeObserver(resize).observe(stage);resize();
  pause.addEventListener('click',()=>{playing=!playing;playback();});
  root.querySelector('.demo-replay').addEventListener('click',()=>{time=0;playing=true;playback();update();});
  root.querySelector('.demo-reset').addEventListener('click',()=>{azimuth=.78;elevation=.52;zoom=1;view();});
  steps.forEach((b,i)=>b.addEventListener('click',()=>{time=[.8,6.7,12.2][i];playing=false;playback();update();}));
  timeline.addEventListener('input',()=>{time=Number(timeline.value)/1000*duration;playing=false;playback();update();});
  let pointer=null;
  canvas.addEventListener('pointerdown',e=>{pointer={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);canvas.classList.add('dragging');});
  canvas.addEventListener('pointermove',e=>{if(!pointer)return;azimuth-=(e.clientX-pointer.x)*.007;elevation=THREE.MathUtils.clamp(elevation+(e.clientY-pointer.y)*.005,.16,1.2);pointer.x=e.clientX;pointer.y=e.clientY;view();});
  const release=()=>{pointer=null;canvas.classList.remove('dragging');};canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);
  canvas.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();if(e.key==='ArrowLeft')azimuth-=.13;if(e.key==='ArrowRight')azimuth+=.13;if(e.key==='ArrowUp')elevation=Math.min(1.2,elevation+.09);if(e.key==='ArrowDown')elevation=Math.max(.16,elevation-.09);view();}else if(e.code==='Space'){e.preventDefault();playing=!playing;playback();}});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{threshold:.03}).observe(root);
  function animate(now){if(disposed)return;const dt=Math.min((now-previous)/1000,.06);previous=now;if(visible&&!document.hidden){if(playing)time=(time+dt)%duration;update();renderer.render(scene,camera);}requestAnimationFrame(animate);}
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();disposed=true;fallback.hidden=false;fallback.textContent='The 3D view was interrupted. Reload the page to replay, or explore the recorded rollouts below.';});
  root.querySelector('.demo-loading').hidden=true;root.querySelectorAll('button,input').forEach(e=>e.disabled=false);root.setAttribute('aria-busy','false');playback();update();requestAnimationFrame(animate);
}
