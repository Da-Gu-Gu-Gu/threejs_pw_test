import React,{useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ScrollTrigger,gsap } from 'gsap/all'
import SplitText from 'gsap/all'



const vertex=`
varying vec2 vUv;

void main(){
    vec4 modalPosition=modelMatrix*vec4(position,1.0);
    vec4 viewPosition=viewMatrix*modalPosition;
    vec4 projectionPosition=projectionMatrix*viewPosition;

    gl_Position=projectionPosition;


    vUv=uv;


}
`

const fragment=`
uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;

// //    Classic Perlin 3D Noise 
// //    by Stefan Gustavson
// //
vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec3 P)
{
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 

    return 2.2 * n_xyz;
}

void main(){

    vec2 displaceUv=vUv+cnoise(vec3(vUv*5.0,uTime*0.1));

    float strength=cnoise(vec3(displaceUv*5.0,uTime*0.2));
    gl_FragColor=vec4(0.5,strength,1.0,1.0);

   
}
`

console.log(vertex)

gsap.registerPlugin(ScrollTrigger,SplitText)

const ThreeCanva = () => {

  const montRef=useRef(null)

  useEffect(()=>{
  const scene=new THREE.Scene()
  // scene.fog = new THREE.Fog(0x0000ff, 1, 25)
 
  scene.background = new THREE.Color(0xffffff)
 


  //render
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  renderer.setClearColor(0xffffff)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputEncoding = THREE.sRGBEncoding
  montRef.current.appendChild(renderer.domElement)

  //camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0,5,3)
  scene.add(camera)

 
//lights
const ambientLight=new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight( 0xffffff, 1, 1000 );
pointLight.position.set( -10, 30, 20 );
pointLight.castShadow = true;
pointLight.shadow.bias = -0.0001;
pointLight.shadow.mapSize.width = 1024*4;
pointLight.shadow.mapSize.height = 1024*4;
scene.add( pointLight );

//loadingManager
const manager = new THREE.LoadingManager();


// load model
  const loader=new GLTFLoader(manager)

  var gltfObject
  loader.load('/l.glb',(gltf)=>{
    gltfObject=gltf
    gltfObject.scene.position.set(0,-1,1.5)
    gltfObject.scene.scale.set(0.25,0.25,0.25)
    gltfObject.scene.traverse( function( node ) {
      
      if ( node.isMesh ) { node.castShadow = true; }

  } );
    scene.add(gltfObject.scene)
  })

  //Circle
  const CircleGeo= new THREE.CircleGeometry( 2.8, 64 );
  const CircleMaterial=new THREE.MeshStandardMaterial({
    color:0xffffff,
    roughness:0.0,

  })
  const Circle=new THREE.Mesh(CircleGeo,CircleMaterial)

  Circle.position.set(0,-1,0)
  Circle.rotation.x=-Math.PI*0.5
  Circle.castShadow = false
  Circle.receiveShadow = true 
  scene.add(Circle)



  
  const geometry = new THREE.PlaneGeometry(14,8);
  const material = new THREE.ShaderMaterial( { 
    vertexShader:vertex,
    fragmentShader:fragment,
    uniforms: {
      uTime: { value: 0.0 },
      uColorStart: { value: new THREE.Color('skyblue') },
      uColorEnd: { value: new THREE.Color('#B01EBD') },
  },
  } );

  const plane = new THREE.Mesh( geometry, material );

  plane.castShadow=true 
  plane.rotation.x=-Math.PI*0.5
  plane.position.set(0,0,8)
  scene.add( plane )

  // const Box=new THREE.Mesh(new THREE.BoxBufferGeometry(1,1),new THREE.MeshStandardMaterial())
  // Box.position.set(0,0,20)
  // scene.add(Box)

//helper
  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)

  // const cameraHelper=new THREE.CameraHelper(5)
  // scene.add(cameraHelper)

//   function lerp(x, y, a) {
//     return (1 - a) * x + a * y
// }

//Gsap
  const text1=document.getElementById('text1')
  const text2=document.getElementById('text2')
  text1.style.display="none"
  text2.style.display="none"

  const tl=gsap.timeline({
    scrollTrigger:{
      trigger:'.section2',
      start:'top 100%',
      end:'bottom center',
      // markers:true,
      scrub:true,
      onEnter:(()=>console.log('enter')),
      onLeave:(()=>console.log('leave'))
    }
  })
 
  // const gsapSplitText = new SplitText("#center", {type: "words"})

//  const chars = gsapSplitText.chars

  // tl.to(chars, 2, {opacity:0, y:50, ease:'bounce.easeOut'}, 0.09)
  tl.to(camera.position,{z:14,ease:'power4.easeIn'})
  tl.to(plane.rotation,{x:0},2)
  tl.to(text1.style,{display:'block',ease:'power4.easeIn'})
  tl.to(text2.style,{display:'block',ease:'power4.easeIn'})
  // tl.to(Box.position,{z:9,ease:'power4.easeIn'})
  tl.to(camera.lookAt,{x:0,y:0,z:8,ease:'power4.easeIn'})
  tl.to(text1.style,{display:'none'})
  tl.to(text2.style,{display:'none'})
  tl.to(camera.position,{z:20,ease:'power4.easeIn'})
  console.log(window.innerWidth/window.innerHeight)

  const tl2=gsap.timeline({
    scrollTrigger:{
      trigger:'.section3',
      start:'center bottom',
      end:'bottom center',
      // markers:true,
      scrub:true,
      onEnter:(()=>console.log('enter')),
      onLeave:(()=>console.log('leave'))
    }
  })


  tl2.to(camera.position,{x:-15,z:0,ease:'power4.easeIn'})
  tl2.to(camera.lookAt,{x:0,y:0,z:0,ease:'power3.easeOut'})


  // controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enabled=false
  controls.enableDamping = true
  controls.maxPolarAngle = Math.PI/3
  controls.minPolarAngle = Math.PI/2
  controls.minDistance = 1
  controls.maxDistance = 50000
  // controls.autoRotate=true
  controls.enableZoom=false
  controls.autoRotateSpeed=6

// renderer.render(scene,camera)

// console.log(scene)
  //animation
  const clock = new THREE.Clock()
  function animate() {
    const elapsedTime = clock.getElapsedTime()

    material.uniforms.uTime.value = elapsedTime

    // Box.rotation.z+=0.01

    if(gltfObject){
      gltfObject.scene.rotation.y=Math.sin(elapsedTime*0.5)*0.5
      }
    controls.update()
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }
  animate();


  //resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
},[])

  return (
    <div ref={montRef} ></div>
  )
}

export default ThreeCanva
