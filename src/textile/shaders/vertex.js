export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;

void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (uTime * .35) + length(vUv));
    trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (uTime * .35)+ length(vUv));
    trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (uTime * .35) + length(vUv));
    
  } 

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    coswarp(modelPosition.xyz, 3. * (1.-uv.y));
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}`