export default /* glsl */`uniform float uTime;

varying vec2 vUv;

void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .05 * sin(11. * trip.yzx + (uTime * .15));
    trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (uTime * .15));
    
  }  

  void uvRipple(inout vec2 uv, float intensity){

	vec2 p = uv -.5;


    float cLength=length(p);

     uv= uv +(p/cLength)*cos(cLength*15.0-uTime*.5)*intensity;

} 

void main()
{
 
    vec2 uv = vUv;
    vec2 uvC = vUv;

   
   
    vec3 color = vec3(uvC.x, uvC.y, 1. );

    
    vec2 uv2 = fract(uv *2. +sin(uTime * .2));
    vec2 uv3 = fract(uv *3.  +cos(uTime * .2));
    vec2 uv4 = fract(uv *4.  +sin(uTime * .2));
    vec2 uv5 = fract(uv *5.  +cos(uTime * .2));

    color = mix(color, vec3(1.), step(uv2.x, .5));
    color = mix(color, vec3(0.), step(uv3.y, .5));
    color = mix(color, vec3(1.), step(uv4.x, .5));
    color = mix(color, vec3(0.), step(uv5.y, .5));

    color = mix(color, 1.-color, step(uv2.y, .15));
    color = mix(color, 1.-color, step(uv3.y, .15));
    color = mix(color, 1.-color, step(uv4.y, .15));
    color = mix(color, 1.-color, step(uv5.y, .15));


   


    gl_FragColor = vec4(color, 1.0);
}`