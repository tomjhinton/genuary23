import { OrbitControls , shaderMaterial, Center, Text, Float, Point, Points} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'


import * as random from "maath/random";
import * as buffer from "maath/buffer";
import * as misc from "maath/misc";

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

let planeArr = Array.from(sliceIntoChunks(plane.attributes.position.array, 3))


let box = new THREE.BoxGeometry( 2, 2, 2, 15, 15, 15 );
let torus = new THREE.TorusKnotGeometry( 1, .25, 150, 8 );

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

    const final = torus.attributes.position.array.slice(0); // final buffer that will be used for the points mesh

    useFrame(({ clock }) => {
      const et = clock.getElapsedTime();
      const t = misc.remap(Math.sin(et), [-1, 1], [0, 1]);
      const t2 = misc.remap(Math.cos(et * 3), [-1, 1], [0, 1]);
    
      // buffer.rotate(box, {
      //   q: q.setFromAxisAngle(rotationAxis, t2 * 0.1),
      // });
    
      buffer.lerp(box.attributes.position.array, torus.attributes.position.array, final, t);
    });

const ref = useRef()
// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)




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
useFrame((state, delta) => (ref.current.rotation.x += delta))
useFrame((state, delta) => (ref.current.rotation.y -= (delta * .4)))
useFrame((state, delta) => (ref.current.rotation.z += (delta * .55)))


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
          {'Maximalism'.toUpperCase()}
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
     onClick={()=>window.location = '#/minimalism' }
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
       onClick={()=>window.location ='#/poetry' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="orange" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>


    
        <Points positions={final} stride={3} ref={ref} >
        <pointMaterial ref={pointMaterial} depthWrite={false} transparent />
    </Points>
      </>
    )
}