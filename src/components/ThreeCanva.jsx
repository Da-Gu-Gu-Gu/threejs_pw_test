import React,{useEffect, useRef } from 'react'
import ReactDOM from "react-dom"
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const ThreeCanva = () => {

  const montRef=useRef(null)

  useEffect(()=>{
  const scene=new THREE.Scene()
 
  scene.background = new THREE.Color(0xffffff)
  console.log(scene)


  //render
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  // renderer.setClearColor(0xdcd0ff)
  // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  montRef.current.appendChild(renderer.domElement)

  //camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0,3,3)
  scene.add(camera)


//lights
const ambientLight=new THREE.AmbientLight(0xff0000,0.3)
scene.add(ambientLight)

  const loader=new GLTFLoader()

  // load model
  loader.load('/l.glb',(gltf)=>{
    console.log(gltf.scene)
    gltf.scene.scale.set(0.3,0.3,0.3)
    scene.add(gltf.scene)
  })

  //plane
  
  const PlaneGeo=new THREE.PlaneBufferGeometry(10,10)
  const PlaneMaterial=new THREE.MeshStandardMaterial({
    color:0xff0000,
  })
  const Plane=new THREE.Mesh(PlaneGeo,PlaneMaterial)

  Plane.position.set(0,0,0)
  Plane.rotation.x=-Math.PI*0.5
  scene.add(Plane)

  

  
  var geometry = new THREE.BoxGeometry();
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );

  scene.add( cube );
  

  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  // controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.maxPolarAngle = Math.PI/3
  controls.minPolarAngle = Math.PI/2
  // controls.maxDistance = 50000

  console.log(scene)
  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }
  animate();
},[])

  return (
    <div ref={montRef}></div>
  )
}
// const rootElement = document.getElementById("root")
// ReactDOM.render( < ThreeCanva / > , rootElement);
export default ThreeCanva
