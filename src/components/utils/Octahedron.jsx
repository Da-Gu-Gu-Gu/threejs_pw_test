import * as THREE from 'three'
import { DoubleSide } from 'three';




export const Ogeometry = new THREE.OctahedronBufferGeometry(10,0);
export const OMaterial = new THREE.MeshStandardMaterial({
color: 0x00ff00,
visible:false,
// roughness:0,
// metalness:1,
 } );
export const OMesh = new THREE.Mesh( Ogeometry, OMaterial ) ;
OMesh.scale.set(0.1,0.1,0.1)
OMesh.position.y=-3
OMesh.position.z=-15
// OMesh.rotation.z=Math.PI
