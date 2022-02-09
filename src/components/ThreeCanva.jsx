import React,{useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ScrollTrigger,gsap } from 'gsap/all'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import {VPlate,PlateMate} from './utils/ThirdPage'
import locomotiveScroll from 'locomotive-scroll'







gsap.registerPlugin(ScrollTrigger)

const ThreeCanva = () => {

  const montRef=useRef(null)

  useEffect(()=>{
  const scene=new THREE.Scene()

 
  scene.background = new THREE.Color(0xffffff)
 


  //render
  const renderer = new THREE.WebGLRenderer({alpha:true})
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputEncoding = THREE.sRGBEncoding
  montRef.current.appendChild(renderer.domElement)

  //camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0,3,7)
  scene.add(camera)

 
//lights
const ambientLight=new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambientLight)

//pointLight
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

  let gltfObject =null
  loader.load('/l.glb',(gltf)=>{
    gltfObject=gltf
    gltfObject.scene.position.set(0,-1,1.5)
    gltfObject.scene.scale.set(0.25,0.25,0.25)
    gltfObject.scene.traverse( function( node ) {
      
      if ( node.isMesh ) { node.castShadow = true; }

  } );
 
    scene.add(gltfObject.scene)
   
  })

  const mirror = new Reflector(
    new THREE.PlaneBufferGeometry(30, 30),
    {
        clipBias: 0.003,
        color: 0x889999,
        recursion: 0.2,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio
    }
)

mirror.position.y = -0.9
mirror.position.z = 1
mirror.rotation.x = -Math.PI * 0.5
scene.add(mirror)






//helper
  const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)


scene.add(VPlate)
VPlate.rotation.x=Math.PI
VPlate.position.set(0,1,-14)


//gsap
// const locoScroll=new locomotiveScroll({
//   el:document.querySelector('.scrollWrap'),
//   smooth:true,
//   smartphone: {
//     smooth: true
//   },
//   tablet: {
//     smooth: true
//   }
// })

// // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
// locoScroll.on(".scrollWrap", ScrollTrigger.update);

// // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
// ScrollTrigger.scrollerProxy(".scrollWrap", {
//   scrollTop(value) {
//     return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
//   }, // we don't have to define a scrollLeft because we're only scrolling vertically.
//   getBoundingClientRect() {
//     return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
//   },
//   // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
//   pinType: document.querySelector(".scrollWrap").style.transform ? "transform" : "fixed"
// });

// // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
// ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
// ScrollTrigger.refresh();


//gsap

const timeline1=gsap.timeline({
  scrollTrigger:{
    trigger:'.section2',
    start:'top 20%',
    end:'top top',
    // markers:true,
    preventOverlaps:true,
    fastScrollEnd:true,
    // scroller: ".scrollWrap",
   toggleActions:'play none none reverse'
  }
})
timeline1.to('.second',{opacity:1,duration:1})
timeline1.to(camera.position,{y:0.9})
timeline1.to(camera.position,{z:10,duration:0.3})
timeline1.to(camera.position,{z:-5,duration:0.7})
timeline1.to(VPlate.rotation,{x:0})
timeline1.to(PlateMate.uniforms.uColorStart,{value:0.2,ease:'power2.in',duration:0.5},'<')
timeline1.to(PlateMate.uniforms.uColorEnd,{value:0.2,ease:'power2.in',duration:0.5},'<')


const timeline2=gsap.timeline({
  scrollTrigger:{
    trigger:'.section3',
    start:'top 20%',
    end:'top top',
    scrub:true,
    // markers:true,
    preventOverlaps:true,
    fastScrollEnd:true,
    // scroller: ".scrollWrap",
   toggleActions:'play none none reverse'
  }
})



timeline2.to(camera.position,{z:-13,duration:1})
timeline2.to('.ptext',{opacity:1,ease:'power2.in',duration:0.5},'<')
timeline2.to('.pimage',{height:'300px',ease:'power3.in',duration:0.6},'<')
timeline2.to('.pimage',{width:'300px',ease:'power3.in',duration:0.7},'<')
timeline2.to(PlateMate.uniforms.uColorStart,{value:0.2,ease:'power2.in',duration:0.5},'<')
timeline2.to(PlateMate.uniforms.uColorEnd,{value:0.2,ease:'power2.in',duration:0.5},'<')


const timeline3=gsap.timeline({
  scrollTrigger:{
    trigger:'.section4',
    start:'top 20%',
    end:'top top',
    scrub:true,
    // markers:true,
    preventOverlaps:true,
    fastScrollEnd:true,
    // scroller: ".scrollWrap",
   toggleActions:'play none none reverse'
  }
})

timeline3.to(PlateMate.uniforms.uColorStart,{value:0.5,ease:'power2.in',duration:0.5})
timeline3.to(PlateMate.uniforms.uColorEnd,{value:1.0,ease:'power2.in',duration:0.5},'<')
timeline3.to('.ptext2',{opacity:1,ease:'power2.in',duration:0.5},'<')
timeline3.to('.pimage2',{height:'300px',ease:'power3.in',duration:0.5},'<')
timeline3.to('.pimage2',{width:'300px',ease:'power3.in',duration:0.5},'<')


const timeline4=gsap.timeline({
  scrollTrigger:{
    trigger:'.section5',
    start:'top 20%',
    end:'top top',
    scrub:true,
    // markers:true,
    preventOverlaps:true,
    fastScrollEnd:true,
    // scroller: ".scrollWrap",
   toggleActions:'play none none reverse'
  }
})

timeline4.to(PlateMate.uniforms.uColorStart,{value:1.0,ease:'power2.in',duration:0.5})
timeline4.to(PlateMate.uniforms.uColorEnd,{value:1.0,ease:'power2.in',duration:0.5},'<')
timeline4.to('.ptext3',{opacity:1,ease:'power2.in',duration:0.5},'<')
timeline4.to('.pimage3',{height:'300px',ease:'power3.in',duration:0.5},'<')
timeline4.to('.pimage3',{width:'300px',ease:'power3.in',duration:0.5},'<')


// debug

  //animation
  const clock = new THREE.Clock()
  function animate() {
    const elapsedTime = clock.getElapsedTime()

    PlateMate.uniforms.uTime.value = elapsedTime


    if(gltfObject){
      gltfObject.scene.rotation.y=Math.sin(elapsedTime*0.5)*0.5
      }
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
    <div className='canvas' ref={montRef} ></div>
  )
}

export default ThreeCanva
