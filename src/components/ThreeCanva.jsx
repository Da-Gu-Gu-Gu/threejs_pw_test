import React,{useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader'
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { ScrollTrigger,gsap } from 'gsap/all'



gsap.registerPlugin(ScrollTrigger)

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

    
  //text
  // const textLoader = new FontLoader();
  // const fontFamily=require('three/examples/fonts/helvetiker_regular.typeface.json')
  // const FONT=new Font(fontFamily)
  // // textLoader.load('three/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
  
  //   const textGeo = new TextGeometry( 'Hello three.js!', {
  //     font: FONT,
  //     size: 2,
  //     height: 1,
  //     curveSegments: 1,
  //     // bevelEnabled: true,
  //     // bevelThickness: 1,
  //     // bevelSize:1,
  //     // bevelOffset: 0,
  //     // bevelSegments: 1
  //   } )

  //   const textMaterial = new THREE.MeshPhongMaterial({
  //     color: 0xff0000,
  //     specular: 0x009900,
  //     shininess: 30,
  //     flatShading:true
  // });
  // const Text = new THREE.Mesh(textGeo, textMaterial);
  // Text.castShadow = true
  // Text.position.set(0,0,-3)
  // Text.rotation.y=Math.PI
  // scene.add(Text)
  // // } )



  
  var geometry = new THREE.PlaneGeometry(14,6);
  var material = new THREE.MeshStandardMaterial( { 
    color: 0x000000,
  } );

  var plane = new THREE.Mesh( geometry, material );

  plane.castShadow=true 
  plane.rotation.x=Math.PI*0.5
  plane.position.set(0,0,-8)
  scene.add( plane )
  
//helper
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  // const cameraHelper=new THREE.CameraHelper(5)
  // scene.add(cameraHelper)

//   function lerp(x, y, a) {
//     return (1 - a) * x + a * y
// }

//Gsap
  const secondId=document.getElementById('second')
  console.log(secondId.innerText)
  secondId.style.display="none"
  console.log(secondId)
  const tl=gsap.timeline({
    scrollTrigger:{
      trigger:'.section2',
      start:'top bottom',
      end:'bottom bottom',
      markers:true,
      scrub:true,
      onEnter:(()=>console.log('enter')),
      onLeave:(()=>console.log('leave'))
    }
  })
 

 
  tl.to(camera.position,{z:-12,ease:'power4.easeIn'})
  tl.to(plane.rotation,{x:-Math.PI*1})
  tl.to(secondId.style,{display:'block',ease:'power4.easeIn'})
  tl.to(camera.lookAt,{x:0,y:-1,z:-8,ease:'power4.easeIn'})
 

console.log(secondId)

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

    // if(gltfObject){
    //   gltfObject.scene.rotation.y=Math.sin(elapsedTime*0.5)*0.5
    //   }
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
