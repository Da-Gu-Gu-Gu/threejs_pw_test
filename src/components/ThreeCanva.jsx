import React,{useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ScrollTrigger,gsap } from 'gsap/all'
import locomotiveScroll from 'locomotive-scroll'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
// import {GUI} from 'dat.gui' 









gsap.registerPlugin(ScrollTrigger)

const ThreeCanva = () => {

  const montRef=useRef(null)

  useEffect(()=>{
  const scene=new THREE.Scene()

  // const gui=new GUI()
 
  scene.background = new THREE.Color(0x121212)
 


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
  camera.position.set(0,10,7)
  // camera.lookAt(-5,5,0)
  scene.add(camera)

 
//lights
const ambientLight=new THREE.AmbientLight(0xffbb73,0.5)
scene.add(ambientLight)

// const spotLight =new THREE.SpotLight({
//   color:0xffbb73,
//   intensity:1,
//   angle:0.6,
//   distance:5,
//   penumbra:0.1,
//   decay:2,
//   focus:1
// })

// spotLight.position.set(0,10,-1.5)
// scene.add(spotLight)

// const spotLightHelper = new THREE.SpotLightHelper( spotLight );
// scene.add( spotLightHelper );

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
    // camera.lookAt(gltfObject.scene.position)
  })

  const mirror = new Reflector(
    new THREE.PlaneBufferGeometry(30, 30),
    {
        clipBias: 0.003,
        color: 0x889999,
        recursion: 0.5,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio
    }
)

mirror.position.y = -1
mirror.position.z = 1
mirror.rotation.x = -Math.PI * 0.5
scene.add(mirror)


 

//helper
  const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)



const locoScroll=new locomotiveScroll({
  el:document.querySelector('.scrollWrap'),
  smooth:true
})

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on(".scrollWrap", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".scrollWrap", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".scrollWrap").style.transform ? "transform" : "fixed"
});

//Gsap


  const tl=gsap.timeline({
    scrollTrigger:{
      trigger:'.section2',
      start:'top 50%',
      markers:true,
      scroller: ".scrollWrap",
     toggleActions:'play none none reverse'
    }
  })

  tl.to(camera.position,{y:0.6,delay:1})
  tl.to(camera.position,{z:5.3})


  const tl2=gsap.timeline({
    scrollTrigger:{
      trigger:'.section3',
      start:'top 50%',
      markers:true,
      scroller: ".scrollWrap",
     toggleActions:'play none none reverse'
    }
  })

  tl2.to(camera.position,{y:0.6,delay:1})
  tl2.to(camera.position,{z:5.3})

 




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

// debugg
// gui.add(camera.position,'x',-10,20,0.1)
// gui.add(camera.position,'y',-10,10,0.1)
// gui.add(camera.position,'z',-10,10,0.1)

// gui.add(camera.lookAt,'x',-10,10,0.1)
// gui.add(camera.lookAt,'y',-10,10,0.1)
// gui.add(camera.lookAt,'z',-10,10,0.1)

// gui.add(pointLight.position,'x',-10,20,0.1)
// gui.add(pointLight.position,'y',-10,20,0.1)
// gui.add(pointLight.position,'z',-10,20,0.1)



// console.log(scene)
  //animation
  const clock = new THREE.Clock()
  function animate() {
    const elapsedTime = clock.getElapsedTime()

    // material.uniforms.uTime.value = elapsedTime
    // Plane2Material.uniforms.uTime.value=elapsedTime
    // Box.rotation.z+=0.01

    if(gltfObject){
      gltfObject.scene.rotation.y=Math.sin(elapsedTime*0.5)*0.5
      }
    // controls.update()
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
