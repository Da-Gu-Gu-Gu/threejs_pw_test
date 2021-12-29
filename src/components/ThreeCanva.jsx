import React from 'react'
import { Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'


const ThreeCanva = () => {
    const gltf = useLoader(GLTFLoader, '../models/l.glb')
    return (
    
            <Canvas>
                <mesh position={[0,0,0]} rotation={[Math.PI*0.5,0,0]}>
                    <planeBufferGeometry args={[100,100]}  />
                    <meshStandardMaterial color="hotpink"/>
                </mesh>
            </Canvas>
    )
}

export default ThreeCanva
