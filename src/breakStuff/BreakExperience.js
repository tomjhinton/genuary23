import { OrbitControls , shaderMaterial, Center, Text, Float, Point, Points} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'

import vertexShaderP from './shaders/vertexP.js'
import fragmentShaderP from './shaders/fragmentP.js'


import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}

let sphere = new THREE.SphereGeometry( 1, 20, 20 );

let plane = new THREE.PlaneGeometry( 3, 3, 20, 20 );




let sphereArr = Array.from(sliceIntoChunks(sphere.attributes.position.array, 3))
let planeArr = Array.from(sliceIntoChunks(plane.attributes.position.array, 3))

export default function Experience(){
 

    const PointMaterial = shaderMaterial(

        {
            uTime: 0,
            uResolution: {x: screen.width, y: screen.height}
            
           
        },
        vertexShader,
        fragmentShader,
    
        
    )
    extend({PointMaterial})


    const PlaneMaterial = shaderMaterial(

      {
          uTime: 0,
         
      },
      vertexShaderP,
      fragmentShaderP
  )
  extend({PlaneMaterial})
   

const ref = useRef()
const planeRef = useRef()
// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)




const pointMaterial = useRef()
const planeMaterial = useRef()
useFrame((state, delta) => {
   pointMaterial.current.uTime += delta
   planeMaterial.current.uTime += delta

    if (
     pointMaterial.current.uResolution.x === 0 &&
     pointMaterial.current.uResolution.y === 0
    ) {
     pointMaterial.current.uResolution.x = screen.width;
     pointMaterial.current.uResolution.y = screen.height;
     
    }
})


// Subscribe this component to the render-loop, rotate the mesh every frame
// useFrame((state, delta) => (ref.current.rotation.z += (delta *.2)))
    return(

<>
<OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>

<Float>
         <Text
        
        font="Basement.otf"
        scale={2. }
        maxWidth={1.5}
        position={ [ .0, -2.8, 0 ] }
        
        
        >
          {'Deliberately break one of your previous images, take one of your previous works and ruin it.'.toUpperCase()}
          <meshBasicMaterial color="#f3172d" toneMapped={false}
          side={THREE.DoubleSide}
          />
        </Text>
        </Float>



        <Float>
         <Text
        
        font="Basement.otf"
        scale={ 20 }
       
        position={ [ 4, 0, -0 ] }
        
        onPointerOver={ ()=>  document.body.style.cursor = 'pointer'
    }
     onPointerOut={()=>  document.body.style.cursor = 'auto'}
     onClick={()=>window.location = '#/loop' }
        >
          {'>'.toUpperCase()}
          <meshBasicMaterial color="orange" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>


        <Float>
         <Text
        
        font="Basement.otf"
        scale={ 20 }
       
        position={ [ -4, 0, -0 ] }
        onPointerOver={ ()=>  document.body.style.cursor = 'pointer'
      }
       onPointerOut={()=>  document.body.style.cursor = 'auto'}
       onClick={()=>window.location ='#/minimalism' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="orange" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>


    <Points
  limit={1000} 
  range={1000} 
  ref={ref}
    >
      
      {planeArr.map( (x, i) => {
        
        return(
          <>
        <Point position={[x[0], x[1], x[2]]}  key={i}   
        />
         <pointMaterial ref={pointMaterial} depthWrite={false} transparent />
        </>
      )} )}

    </Points>


    <mesh
     
      ref={planeRef}
      scale={clicked ? 1. : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <planeGeometry args={[4, 4]} />
      <planeMaterial ref={planeMaterial} side={THREE.DoubleSide}/>
      
    </mesh>
      </>
    )
}