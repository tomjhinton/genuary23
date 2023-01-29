export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;

attribute vec3 position2;
varying vec3 pos;

void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (uTime * .15));
    
  }  

  void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.);


    vec4 modelPosition2 = modelMatrix * vec4(position, 1.);

    coswarp(modelPosition2.xyz, 3.);
    coswarp(modelPosition2.xyz, 3.);
  //   modelPosition.y += (sin(uTime  + modelPosition.x) +1.)/2. * 1. * .2;
  //   modelPosition.z += (cos(uTime  + modelPosition.y) +1.)/2. * 1. * .3;

  //  modelPosition.y  -= (sin(uTime + length(modelPosition.xz) ) );
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectionPosition;
    
    // gl_PointSize = mix( 
    //   (120. * ((sin(uTime) + length(modelPosition2.xy) +1. ) *.5)  )  * 1. * 1.,
    //   (120. * ((cos(uTime) + length(modelPosition.yz) +1. ) *.5)  )  * 1. * 1.,
    //   sin(uTime)
    // );

    // gl_PointSize = 100.  * 1. * 1.;
    gl_PointSize = (350. * ((cos(uTime) + length(modelPosition.xy) +1. ) *.5)  )  * 1. * 1.;
    gl_PointSize *= (1.0/ -viewPosition.z);

    vUv = uv;
    pos = modelPosition.xyz;
}`