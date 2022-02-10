import React,{useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ScrollTrigger,gsap,Power2 } from 'gsap/all'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import {VPlate,PlateMate} from './utils/ThirdPage'
import {OMesh, OMaterial,Ogeometry} from './utils/Octahedron'







gsap.registerPlugin(ScrollTrigger)

const ThreeCanva = () => {

  const montRef=useRef(null)

  useEffect(()=>{
  const scene=new THREE.Scene()

 
  scene.background = new THREE.Color(0x000000)
 


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
        recursion: 1,
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



//Shader Plates
scene.add(VPlate)
VPlate.rotation.x=Math.PI
VPlate.position.set(0,1,-14)


scene.add(OMesh)

//gsap

const timeline1=gsap.timeline({
  defaults:{
    ease:Power2.easeInOut,
    stagger:0.5,
  },
  scrollTrigger:{
    trigger:'.second',
    start:'center center',
    end:'bottom center',
    // markers:true,
    preventOverlaps:true,
    fastScrollEnd:true,
   toggleActions:'play none none reverse'
  }
})

timeline1.to('.second',{opacity:1,duration:1})
timeline1.to(camera.position,{y:0.9})
timeline1.to(camera.position,{z:10})
timeline1.to(camera.position,{z:-5,duration:1})
timeline1.to('.second',{opacity:0})
timeline1.to(VPlate.rotation,{x:0})



const timeline2=gsap.timeline({
  defaults:{
    ease:Power2.easeInOut,
    stagger:0.5,
  },
  scrollTrigger:{
    trigger:'.section3',
    start:'top 20%',
    end:'top top',

    // markers:true,
    preventOverlaps:true,
    fastScrollEnd:true,
   
   toggleActions:'play none none reverse'
  }
})



timeline2.to(camera.position,{z:-13})
timeline2.to(scene,{background:new THREE.Color(0x736fbd),duration:1})
timeline2.to('.ptext',{opacity:1},'<')
timeline2.to('.pimage',{height:'300px'},'<')
timeline2.to('.pimage',{width:'300px'},'<')
timeline2.to('.cf',{rotate:360,duration:1},"<")



const timeline3=gsap.timeline({
  defaults:{
    ease:Power2.easeInOut,
    stagger:0.5,
  },
  scrollTrigger:{
    trigger:'.section4',
    start:'top 20%',
    end:'top top',
    preventOverlaps:true,
    fastScrollEnd:true,
   
   toggleActions:'play none none reverse'
  }
})
timeline3.to(PlateMate.uniforms.uColorStart,{value:0.5})
timeline3.to(PlateMate.uniforms.uColorEnd,{value:1.0},'<')
timeline3.to('.ptext2',{opacity:1},'<')
timeline3.to('.pimage2',{height:'300px'},'<')
timeline3.to('.pimage2',{width:'300px'},'<')
timeline3.to('.portal',{rotate:-360,duration:1},"<")

const timeline4=gsap.timeline({
  defaults:{
    ease:Power2.easeInOut,
    stagger:0.5,
  },
  scrollTrigger:{
    trigger:'.section5',
    start:'top 20%',
    end:'top top',
    preventOverlaps:true,
    fastScrollEnd:true,
   
   toggleActions:'play none none reverse'
  }
})

timeline4.to(PlateMate.uniforms.uColorStart,{value:1.5})
timeline4.to(PlateMate.uniforms.uColorEnd,{value:4.0},'<')
timeline4.to('.ptext3',{opacity:1},'<')
timeline4.to('.pimage3',{height:'300px'},'<')
timeline4.to('.pimage3',{width:'300px'},'<')
timeline4.to('.covid',{rotate:360,duration:1},"<")

const timeline5=gsap.timeline({
  defaults:{
    ease:Power2.easeInOut,
    stagger:0.5,
  },
  scrollTrigger:{
    trigger:'.section6',
    start:'top top',
    end:'top top',
    preventOverlaps:true,
    fastScrollEnd:true,
  //  markers:true,
   toggleActions:'play none none reverse'
  }
})

timeline5.to(VPlate.rotation,{x:-Math.PI})
timeline5.to(camera.position,{y:1})
timeline5.to(camera.position,{z:-6})
timeline5.to('.contact',{opacity:1,letterSpacing:'5px',duration:0.5},'<')
timeline5.to('ul',{opacity:1,letterSpacing:'3px',duration:0.8,delay:0.5},'<')
timeline5.to(OMaterial,{visible:true})
timeline5.to(OMesh.position,{y:1,duration:0.5})



// debug

  //animation
  const clock = new THREE.Clock()
  function animate() {
    const elapsedTime = clock.getElapsedTime()

    PlateMate.uniforms.uTime.value = elapsedTime

    // setTimeout(() => {
      // Ogeometry.parameters.detail>10?Ogeometry.parameters.detail=0:
     Ogeometry.parameters.detail+=1
    //  }, 1000)
    OMesh.rotation.y+=0.01
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
