import React,{useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ScrollTrigger,gsap } from 'gsap/all'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import {VPlate} from './utils/ThirdPage'








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
const ambientLight=new THREE.AmbientLight(0xffbb73,0.5)
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
        recursion: 0.5,
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



const tl=gsap.timeline({
  scrollTrigger:{
    trigger:'.section2',
    start:'top bottom',
    end:'top center',
    // scrub:true,
    scroller: ".scrollWrap",
   toggleActions:'play none none reverse'
  }
})

tl.to(camera.position,{y:0.9,ease: "power1.in",duration:0.7})
tl.to(camera.position,{z:10,ease: "power1.in",duration:0.7})
tl.to(camera.position,{z:-5,duration:0.5})
tl.to(VPlate.rotation,{x:0})
tl.to('.second',{opacity:1,ease: "power1.in",duration:0.4})


const tl2=gsap.timeline({
  scrollTrigger:{
    trigger:'.section3',
    start:'top bottom',
    end:'top center',
    scrub:true,
    scroller: ".scrollWrap",
   toggleActions:'play none none reverse'
  }
})

tl2.to(camera.position,{z:-13,duration:0.5})
tl2.to('.ptext',{opacity:1,ease:'power2.in',duration:0.5,delay:0.5})
// tl2.to('.pimg',{height:'50%',ease:'power3.in',duration:0.5})


// debug

  //animation
  const clock = new THREE.Clock()
  function animate() {
    const elapsedTime = clock.getElapsedTime()

    // material.uniforms.uTime.value = elapsedTime
    // Plane2Material.uniforms.uTime.value=elapsedTime


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
