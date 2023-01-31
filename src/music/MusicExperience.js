import { OrbitControls , shaderMaterial, Center, Text, Float, Box, Torus } from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Physics, RigidBody, Debug, CuboidCollider } from "@react-three/rapier";
import * as Tone from 'tone'

const synth = new Tone.Synth().toDestination();

const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();


const notesHigh = ['E5','F5','G5','A5','D5','E6','F6','G6','A6','D6']

const notesLow = ['E2','F2','G2','A2','D2','E3','F3','G3','A3','D3']

const sampleNotes = ['C3', 'D3', 'F3', 'E3']
var cello = new Tone.Sampler({
  'C3': 'c2.wav',
  'D3': 'c3.wav',
  'F3': 'c4.wav',
  'E3': 'c5.wav'
  

}).toDestination()

var hi = new Tone.Sampler({
  'C3': 'hi1.wav',
  'D3': 'hi2.wav',
  'F3': 'hi3.wav',
  'E3': 'hi4.wav'
  

}).toDestination()

var snare = new Tone.Sampler({
  'C3': 'snare1.wav',
  'D3': 'snare2.wav',
  'F3': 'snare3.wav',
  'E3': 'snare4.wav'
  

}).toDestination()

var kick = new Tone.Sampler({
  'C3': 'kick1.wav',
  'D3': 'kick2.wav',
  'F3': 'kick3.wav',
  'E3': 'kick4.wav'
  

}).toDestination()

function ball1(){
  hi.triggerAttackRelease(sampleNotes[Math.floor(Math.random() * sampleNotes.length)], 4);

}

function ball2(){
  
  snare.triggerAttackRelease(sampleNotes[Math.floor(Math.random() * sampleNotes.length)], 4);

}

function ball3(){
  cello.triggerAttackRelease(sampleNotes[Math.floor(Math.random() * sampleNotes.length)], 4);

}

function ball4(){
  synthB.triggerAttackRelease(notesHigh[Math.floor(Math.random() * notesHigh.length)], '16n');

}

function ball5(){
  cello.triggerAttackRelease(sampleNotes[Math.floor(Math.random() * sampleNotes.length)], 4);

}

function ball6(){
  synthB.triggerAttackRelease(notesLow[Math.floor(Math.random() * notesLow.length)], '16n');

}

function ball7(){
  kick.triggerAttackRelease(sampleNotes[Math.floor(Math.random() * sampleNotes.length)], 4);

}

function ball8(){
  kick.triggerAttackRelease(sampleNotes[Math.floor(Math.random() * sampleNotes.length)], 4);

}

function ball9(){
  kick.triggerAttackRelease(sampleNotes[Math.floor(Math.random() * sampleNotes.length)], 4);

}


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
const body = useRef()
// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)
const planeMaterial = useRef()
// useFrame((state, delta) => {
//     planeMaterial.current.uTime += delta
// })


// Subscribe this component to the render-loop, rotate the mesh every frame
// useFrame((state, delta) => (ref.current.rotation.x += delta))
    return(

<>
<OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>

<Float>
         <Text
        
        font="Basement.otf"
        scale={ 5 }
       maxWidth={1.5}
        position={ [ .0, -2.65, 0 ] }
        
        
        >
          {'Generative Music'.toUpperCase()}
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
       onClick={()=>window.location ='#/plant' }
        
        >
          {'<'.toUpperCase()}
          <meshBasicMaterial color="orange" toneMapped={false}
          side={THREE.DoubleSide}
         
          />
        </Text>
        </Float>

      <Physics>
    
      <RigidBody 
    colliders="ball" 
    position ={[0,1  + Math.random() *3,0]}
    restitution={1.9}
    friction={1}
    onCollisionEnter={()=> ball1()}
    >
            <mesh castShadow>
                <sphereGeometry args={[ .3]} />
                <meshStandardMaterial flatShading color="red"  />
            </mesh>
        </RigidBody>

        <RigidBody 
    colliders="ball" 
    position ={[1,1  + Math.random() *3,0]}
    restitution={1.9}
    friction={1}
    onCollisionEnter={()=> ball2()}
    >
            <mesh castShadow>
                <sphereGeometry args={[ .3]} />
                <meshStandardMaterial flatShading color="green"  />
            </mesh>
        </RigidBody>


        <RigidBody 
    colliders="ball" 
    position ={[-1,1  + Math.random() *3,0]}
    restitution={1.9}
    friction={1}
    onCollisionEnter={()=> ball3()}
    >
            <mesh castShadow>
                <sphereGeometry args={[ .3]} />
                <meshStandardMaterial flatShading color="blue"  />
            </mesh>
        </RigidBody>

        <RigidBody 
    colliders="ball" 
    position ={[0,1  + Math.random() *3,-1]}
    restitution={1.9}
    friction={1}
    onCollisionEnter={()=> ball4()}
    >
            <mesh castShadow>
                <sphereGeometry args={[ .3]} />
                <meshStandardMaterial flatShading color="pink"  />
            </mesh>
        </RigidBody>


        <RigidBody 
    colliders="ball" 
    position ={[0,1  + Math.random() *3,-2]}
    restitution={1.9}
    friction={1}
    onCollisionEnter={()=> ball5()}
    >
            <mesh castShadow>
                <sphereGeometry args={[ .3]} />
                <meshStandardMaterial flatShading color="yellow"  />
            </mesh>
        </RigidBody>


        <RigidBody 
    colliders="ball" 
    position ={[-1,1  + Math.random() *3,-1]}
    restitution={1.9}
    friction={1}
    onCollisionEnter={()=> ball6()}
    >
            <mesh castShadow>
                <sphereGeometry args={[ .3]} />
                <meshStandardMaterial flatShading color="cyan"  />
            </mesh>
        </RigidBody>


        <RigidBody 
    colliders="ball" 
    position ={[1,1  + Math.random() *3,-1]}
    restitution={1.9}
    friction={1}
    onCollisionEnter={()=> ball7()}
    >
            <mesh castShadow>
                <sphereGeometry args={[ .3]} />
                <meshStandardMaterial flatShading color="orange"  />
            </mesh>
        </RigidBody>

        <RigidBody 
    colliders="ball" 
    position ={[1,1  + Math.random() *3,-2]}
    restitution={1.9}
    friction={1}
    onCollisionEnter={()=> ball8()}
    >
            <mesh castShadow>
                <sphereGeometry args={[ .3]} />
                <meshStandardMaterial flatShading color="purple"  />
            </mesh>
        </RigidBody>

        <RigidBody 
    colliders="ball" 
    position ={[-1,1  + Math.random() *3,-2]}
    restitution={1.9}
    friction={1}
    onCollisionEnter={()=> ball4()}
    >
            <mesh castShadow>
                <sphereGeometry args={[ .3]} />
                <meshStandardMaterial flatShading color="rose"  />
            </mesh>
        </RigidBody>



          <CuboidCollider position={[0, -2, 0]} args={[20, .5, 20]} />

          {/* <Debug /> */}
    </Physics>
      </>
    )
}