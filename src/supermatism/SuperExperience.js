import { OrbitControls , shaderMaterial, Center, Text, Float, Html} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'


export default function Experience(){
  const picture = useLoader(TextureLoader,  `super.jpg`)

    const PlaneMaterial = shaderMaterial(

        {
            uTime: 0,
            pic: picture,
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
        
        <Html
  as='div'
 position={[-6, -2, 0]}
>
  <a className='colab' href='https://twitter.com/voxeljunk'> {' Made with VOXELJUNK '}</a>
 
</Html>
        </Float>


<Float>
         <Text
        
        font="Basement.otf"
        scale={ 7 }
       maxWidth={2}
        position={ [ .0, -2.85, 0 ] }
        
        
        >
          {'Supermatism'.toUpperCase()}
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
     onClick={()=>window.location = '#/tesselation' }
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
       onClick={()=>window.location ='#/music' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="orange" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>


<mesh
     
      ref={ref}
      scale={clicked ? 1. : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <planeGeometry args={[4, 4]} />
      <planeMaterial ref={planeMaterial} side={THREE.DoubleSide} pic={picture}/>
      
    </mesh>
      </>
    )
}