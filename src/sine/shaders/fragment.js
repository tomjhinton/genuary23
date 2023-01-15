export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;

const float PI = 3.1415926535897932384626433832795;
const float TAU = PI * 2.;
  

void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (uTime * .25));
  trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (uTime * .25));
  trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (uTime * .25));
  
}
  
void main() {
	vec2 uv = vUv;
  
 
 
float alpha = 1.;
  
  float t = (uTime *1.) + length(uv-.5) + uv.x;
  
  
	vec3 color = vec3( uv.y, uv.x, 1.);
  
  coswarp(color, 3.);
  coswarp(color, 3.);
  coswarp(color, 3.);

  vec3 color2 = vec3( sin(uv.y),sin( uv.x), sin(t));
  
  coswarp(color2, 3.);

  color2 = vec3(step(color2.r, .5), step(color2.g, .5), step(color2.b, .5));

 
   

   float a =  step(fract(sin(uv.y -=.6 ) + sin(uv.x *( 12. * sin(t) ) ) * .1), .5 );
  
  
  color = mix(vec3(0.), color, a);

  
 
  

	
    gl_FragColor = vec4(vec3(color.r, color.g, color.b), alpha);
}`