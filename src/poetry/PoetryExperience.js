import { OrbitControls , shaderMaterial, Center, Text, Float, Point, Points} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'


let invisible = new THREE.MeshPhongMaterial({opacity:0})
let fonts = ['FerriteCoreDX-Regular.otf', 'Basement.otf', 'Passio-Graphis.otf']


let words = "The sky above the port was the color of television, tuned to a dead channel. It's not like I'm using,' Case heard someone say, as he shouldered his way through the crowd around the door of the Chat. `It's like my body's developed this massive drug deficiency.' It was a Sprawl voice and a Sprawl joke. The Chatsubo was a bar for professional expatriates; you could drink there for a week and never hear two words in Japanese."
let wordsArray = words.split(' ')
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

   

const ref = useRef()
// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)


function makeInvisible(e){
  e.stopPropagation()
  e.object.material = invisible
}

const pointMaterial = useRef()
useFrame((state, delta) => {
   pointMaterial.current.uTime += delta

   

    if (
     pointMaterial.current.uResolution.x === 0 &&
     pointMaterial.current.uResolution.y === 0
    ) {
     pointMaterial.current.uResolution.x = screen.width;
     pointMaterial.current.uResolution.y = screen.height;
     
    }
})


// Subscribe this component to the render-loop, rotate the mesh every frame
// useFrame((state, delta) => (ref.current.rotation.x += delta))
    return(

<>
<OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>

<Float>
         <Text
        
        font="Basement.otf"
        scale={4. }
        maxWidth={1}
        position={ [ .0, -2.65, 0 ] }
        
        
        >
          {'Generative poetry'.toUpperCase()}
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
     onClick={()=>window.location = '#/' }
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
       onClick={()=>window.location ='#/klint' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="orange" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>


        <pointMaterial ref={pointMaterial} depthWrite={true} transparent />
      
      {wordsArray.map( (x, i) => {
        
        return(
          <>
        <Text position={[(Math.random() * 5.)-2,( Math.random() *4.)-2, Math.random()]}  key={i} 
        scale={ 2 }
        material={pointMaterial.current}
        onPointerEnter={(e)=>e.object.material = pointMaterial.current}
        onPointerLeave={(e)=> setTimeout(makeInvisible, 1000, e) }
        font={fonts[Math.floor(Math.random() * fonts.length)]}
        
        >
          {x}
          <meshPhongMaterial opacity={0}/>
         </Text>
        </>
      )} )}

   
      </>
    )
}