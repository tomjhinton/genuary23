import {useVideoTexture, OrbitControls , shaderMaterial, Center, Text, Float, QuadraticBezierLine} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'




export default function Experience(){
  
  function Cable({ start, end, v1 = new THREE.Vector3(), v2 = new THREE.Vector3() }) {
    const ref = useRef()
    useFrame(() => ref.current.setPoints(start.current.getWorldPosition(v1), end.current.getWorldPosition(v2)), [])
    return <QuadraticBezierLine ref={ref} lineWidth={4} color="green"  depthWrite={false}/>
  }
  
 
    const PlaneMaterial = shaderMaterial(

        {
            uTime: 0,
           
        },
        vertexShader,
        fragmentShader
    )
    extend({PlaneMaterial})

const ref = useRef()
const title = useRef()
// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)
const planeMaterial = useRef()
useFrame((state, delta) => {
    planeMaterial.current.uTime += delta
})


// Subscribe this component to the render-loop, rotate the mesh every frame
useFrame((state, delta) => (
  ref.current.position.y += Math.sin(state.clock.getElapsedTime()) * .01))
  
  useFrame((state, delta) => (
    ref.current.position.x += Math.sin(state.clock.getElapsedTime()) * .02))

    useFrame((state, delta) => (
      ref.current.position.z += Math.sin(state.clock.getElapsedTime()) * .005))


    return(

<>
<OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>

<Float>
         <Text
        ref={title}
        font="Basement.otf"
        scale={ 7 }
       
        position={ [ .0, -2.65, 0 ] }
        
        
        >
          {'Plant'.toUpperCase()}
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
     onClick={()=>window.location = '#/super' }
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
       onClick={()=>window.location ='#/sdf' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="orange" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>

<Float>
<mesh
     
      ref={ref}
      scale={clicked ? 1. : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <circleGeometry args={[1, 32]} />
      <planeMaterial ref={planeMaterial} side={THREE.DoubleSide}/>
      
    </mesh>
    </Float>

    <Cable start={title} end={ref} />
      </>
    )
}