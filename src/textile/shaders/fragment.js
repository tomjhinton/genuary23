export default /* glsl */`uniform float uTime;

varying vec2 vUv;
const float PI = 3.1415926535897932384626433832795;



const float TAU = PI * 2.;
  


 
 void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (uTime * .15) + length(vUv));
  trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (uTime * .15)+ length(vUv));
  trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (uTime * .15) + length(vUv));
  
} 
  
void main() {
	vec2 uv = vUv;
  

 float t = (uTime * .2) + length(uv-.5);

  vec2 uv2 =uv;

  
  vec2 uv3 = uv;
  
  vec3 color = vec3( uv.x, uv.y, 1.);
  
  coswarp(color, 3.);
   coswarp(color, 3.);
   coswarp(color, 3.);
  

  color -= fract(uv * 400.).x;
  color -= fract(uv * 400.).y;
  //  coswarp(color2, 3.);
  //  coswarp(color2, 3.);
  //  coswarp(color2, 3.);
  

	
    gl_FragColor = vec4(vec3(color.r, color.g, color.b), 1.);
  
  
}`