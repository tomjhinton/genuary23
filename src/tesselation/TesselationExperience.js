import {useVideoTexture, OrbitControls , shaderMaterial, Center, Text, Float, QuadraticBezierLine, Html} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'




export default function Experience(){
  
  
  
 
   

const ref = useRef()
const title = useRef()
// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)
const planeMaterial = useRef()




    return(

<>
<OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>

<Float>

<Float>
        
        <Html
  as='div'
 position={[-6, -2, 0]}
>
  <a className='colab' href='https://twitter.com/OrrKislev'> {' Made with Orr Kislev '}</a>
 
</Html>
        </Float>

         <Text
        ref={title}
        font="../Basement.otf"
        scale={ 7 }
       
        position={ [ .0, -2.65, 0 ] }
        
        
        >
          {'Tesselation'.toUpperCase()}
          <meshBasicMaterial color="#f3172d" toneMapped={false}
          side={THREE.DoubleSide}
          />
        </Text>
        </Float>



        <Float>
         <Text
        
        font="../Basement.otf"
        scale={ 20 }
       
        position={ [ 4, 0, -0 ] }
        
        onPointerOver={ ()=>  document.body.style.cursor = 'pointer'
    }
     onPointerOut={()=>  document.body.style.cursor = 'auto'}
     onClick={()=>window.location = '#' }
        >
          {'>'.toUpperCase()}
          <meshBasicMaterial color="orange" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>


        <Float>
         <Text
        
        font="../Basement.otf"
        scale={ 20 }
       
        position={ [ -4, 0, -0 ] }
        onPointerOver={ ()=>  document.body.style.cursor = 'pointer'
      }
       onPointerOut={()=>  document.body.style.cursor = 'auto'}
       onClick={()=>window.location ='#/super' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="orange" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>

       

<Float>

<Html
  transform
  wrapperClass='htmlScreen'
  distanceFactor={6.57}
               
>
<iframe src="https://csb-o0z69j.netlify.app/"
     
     title="tesselation"
     
   ></iframe>

</Html>

    </Float>

    
      </>
    )
}