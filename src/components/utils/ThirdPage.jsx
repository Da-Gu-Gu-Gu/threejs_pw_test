import * as THREE from 'three'

const Plate=new THREE.PlaneBufferGeometry(5,8)
const PlateMate=new THREE.MeshStandardMaterial({
    color:0xff69b4,
})

export const VPlate=new THREE.Mesh(Plate,PlateMate)
// VPlate.rotation.x=Math.PI