import React,{useEffect, useRef } from 'react'
import ReactDOM from "react-dom"
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const ThreeCanva = () => {

  const montRef=useRef(null)

  useEffect(()=>{
  const scene=new THREE.Scene()
  // scene.fog = new THREE.Fog(0x0000ff, 1, 25)
 
  scene.background = new THREE.Color(0xffffff)
  console.log(scene)


  //render
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // renderer.setClearColor(0x0000ff)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputEncoding = THREE.sRGBEncoding
  montRef.current.appendChild(renderer.domElement)

  //camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0,5,3)
  scene.add(camera)


//lights
const ambientLight=new THREE.AmbientLight(0xffffff,0.7)
scene.add(ambientLight)

const pointLight = new THREE.PointLight( 0xffffff, 1, 1000 );
pointLight.position.set( 0, 10, 0 );
pointLight.castShadow = true;
scene.add( pointLight );

// load model
  const loader=new GLTFLoader()

  loader.load('/l.glb',(gltf)=>{
 
    gltf.scene.position.set(0,-1,1.5)
    gltf.scene.scale.set(0.25,0.25,0.25)
    gltf.scene.castShadow = true; 
    console.log(gltf.scene)
    scene.add(gltf.scene)
  })

  //plane
  
  // const PlaneGeo=new THREE.PlaneGeometry(20000,20000)
  const PlaneGeo= new THREE.CircleGeometry( 3, 64 );
  const PlaneMaterial=new THREE.MeshStandardMaterial({
    color:0xffffff,
    metalness:0.4,
    roughness:0.2,

  })
  const Plane=new THREE.Mesh(PlaneGeo,PlaneMaterial)

  Plane.position.set(0,-1,0)
  Plane.rotation.x=-Math.PI*0.5
  Plane.castShadow = false
  Plane.receiveShadow = true 
  scene.add(Plane)

  


  
  // var geometry = new THREE.BoxGeometry();
  // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  // var cube = new THREE.Mesh( geometry, material );

  // scene.add( cube );
  
//helper
  // const axesHelper = new THREE.AxesHelper(5)
  // scene.add(axesHelper)
  const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );  

  // controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.maxPolarAngle = Math.PI/3
  controls.minPolarAngle = Math.PI/2
  controls.minDistance = 1
  controls.maxDistance = 50000
  controls.autoRotate=true
  controls.enableZoom=false
  controls.autoRotateSpeed=5


  const clock = new THREE.Clock()
  function animate() {
    const elapsedTime = clock.getElapsedTime()

    // camera.rotation.x+=elapsedTime
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
    <div ref={montRef}></div>
  )
}

export default ThreeCanva
