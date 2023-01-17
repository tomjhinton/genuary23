import { OrbitControls , shaderMaterial, Center, Text, Float, Point, Points, MeshReflectorMaterial} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
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

let torus = new THREE.TorusKnotGeometry( 1, .1, 50, 8 );






let torusArr = Array.from(sliceIntoChunks(torus.attributes.position.array, 3))
console.log(torus)

// useFrame((state, delta) => (torus.rotation.y += (delta*.5)))

// useFrame((state, delta) => (torusArr = Array.from(sliceIntoChunks(torus.attributes.position.array, 3))))



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

    console.log(PointMaterial)

const ref = useRef()

const mirror1 = useRef()
const mirror2 = useRef()


// useFrame((state, delta) => (ref.current.geometry.attributes.position.needsUpdate = true))


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
// useFrame((state, delta) => (ref.current.rotation.x += delta))

 useFrame((state, delta) => (ref.current.rotation.y += (delta*.5)))
 useFrame((state, delta) => (ref.current.rotation.x += (delta*.44)))

 useFrame((state, delta) => (mirror1.current.rotation.y += (delta*.5)))
//  useFrame((state, delta) => (mirror2.current.rotation.z -= (delta*.44)))

    return(

<>
<OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>

<Float>
         <Text
        
        font="../Basement.otf"
        scale={4 }
        maxWidth={1}
        position={ [ .0, -0.65, -2 ] }
        
        
        >
          {'Reflection of a reflection'.toUpperCase()}
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
     onClick={()=>window.location = '#/grid' }
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
       onClick={()=>window.location ='#/sine' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="orange" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>



        <mesh  position-z={-3} ref={mirror1}>
  <planeGeometry args={[6,4]}/>
  <MeshReflectorMaterial
    blur={[30, 10]}
    resolution={1024}
    mixBlur={0}
    mixStrength={50}
    roughness={1}
    depthScale={1.2}
    minDepthThreshold={0.4}
    maxDepthThreshold={1.4}
    color="#0505f5"
    metalness={2.5}
  />
</mesh>


<mesh  rotation-x={ - Math.PI * 0.5 } position-z={-1 } position-y={ -2 }  ref={mirror2}>
<planeGeometry args={[6,6]} />
  <MeshReflectorMaterial
    blur={[30, 10]}
    resolution={1024}
    mixBlur={0}
    mixStrength={5}
    roughness={1}
    depthScale={.2}
    minDepthThreshold={0.4}
    maxDepthThreshold={1.4}
    color="#05f505"
    metalness={.5}
  />
</mesh>

{/* <mesh>
<boxBufferGeometry args={[.1, .1, .1]} />
      <meshStandardMaterial color={"red"} />
</mesh> */}


    <Points
  limit={1000} 
  range={1000} 
  ref={ref}
    >
      
      {torusArr.map( (x, i) => {
        
        return(
          <>
        <Point position={[x[0], x[1], x[2]]}  key={i}   
        />
         <pointMaterial ref={pointMaterial} depthWrite={false} transparent />
        </>
      )} )}
    </Points>
      </>
    )
}