import { OrbitControls , shaderMaterial, Center, Text, Float} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'


export default function Experience(){
 

    const PlaneMaterial = shaderMaterial(

        {
            uTime: 0,
           
        },
        vertexShader,
        fragmentShader
    )
    extend({PlaneMaterial})

const ref = useRef()
// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)
const planeMaterial = useRef()
useFrame((state, delta) => {
    planeMaterial.current.uTime += delta
})


// Subscribe this component to the render-loop, rotate the mesh every frame
// useFrame((state, delta) => (ref.current.rotation.x += delta))
    return(

<>
<OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>

<Float>
  
         <Text
        
        font="Basement.otf"
        scale={ 4 }
       maxWidth={1.5}
        position={ [ 0, -2.75, 0 ] }
        textAlign={'center'}
       
        
        
        >
          {'In the style of Hilma Af Klint'.toUpperCase()}
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
     onClick={()=>window.location = '#/poetry' }
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
       onClick={()=>window.location ='#/kid' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="orange" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>


        <Float>
         <Text
        
        font="NotoEmoji-Bold.ttf"
        scale={ 20 }
       
        position={ [ 0, 0, 0 ] }
        
        
        >
          🎨👻 
          <planeMaterial ref={planeMaterial} side={THREE.DoubleSide}/>
        </Text>
        </Float>


      </>
    )
}