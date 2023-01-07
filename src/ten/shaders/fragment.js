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
    uvRipple(uvC, .5);

   
   
    vec3 color = vec3(uvC.x, uv.y, uv.x );
    vec3 color2 = color;

    coswarp(color2, 3.);
    coswarp(color2, 3.);
    coswarp(color2, 3.);

    color = vec3(uv.x);

    float t = (uTime * .2) + length(uv-.5);

    
    vec2 uv2 = fract(uv *4. *sin(t * .2));
    vec2 uv3 = fract(uv *8.  *cos(t * .2));
    vec2 uv4 = fract(uv *12.  *sin(t * .2));
    vec2 uv5 = fract(uv *15.  *cos(t * .2));

    color = mix(color, 1.-color, step(uv2.x, .5));
    color = mix(color, 1.-color, step(uv3.y, .5));
    color = mix(color, 1.-color, step(uv4.x, .5));
    color = mix(color, 1.-color, step(uv5.y, .5));

    color = mix(color, color2, step(uv2.y, .15));
    color = mix(color, color2, step(uv3.y, .15));
    color = mix(color, color2, step(uv4.y, .15));
    color = mix(color, color2, step(uv5.y, .15));


   color = mix(color2, vec3(step(color.r, .2), step(color.g, .2), step(color.b, .2)), uv5.x);


    gl_FragColor = vec4(color, 1.0);
}`