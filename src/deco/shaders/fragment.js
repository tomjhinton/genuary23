export default /* glsl */`uniform float uTime;

varying vec2 vUv;
const float PI = 3.1415926535897932384626433832795;



  
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;

}

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


vec2 rotateUV(vec2 uv, vec2 pivot, float rotation) {
  mat2 rotation_matrix=mat2(  vec2(sin(rotation),-cos(rotation)),
                              vec2(cos(rotation),sin(rotation))
                              );
  uv -= pivot;
  uv= uv*rotation_matrix;
  uv += pivot;
  return uv;
}

vec3 shape( in vec2 p, float sides ,float size)
{
  
   float d = 0.0;
  vec2 st = p *2.-1.;

  // Number of sides of your shape
  float N = sides ;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI ;
  float r = (2.* PI)/(N) ;

  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);
  

  return  vec3(1.0-smoothstep(size,size +.01,d));
}



void main() {
  vec2 uv = vUv;
  float t = (uTime *.8) +(length(uv-.5) * 2.) + uv.x;
  
  float t2 = (uTime *.05) +length(uv-.5);
  
  // vec2 uvR = rotateUV(uv, vec2(.5), PI + uTime);

  vec2 uv2 = fract(uv * 5.);
  vec2 uv3 = fract(uv * 10.);
  uv2 = rotateUV(uv2, vec2(.5), PI + t);
  
 vec3 color = vec3(0.);
 vec3 color2 = vec3(.95, 0.95, 0.1);

 color = mix(  color, color2, shape(uv2, 4., 1.3).r);

 color = mix(  color, vec3(0.), shape(uv2, 4., 1.2).r);

 color = mix(  color, color2, shape(uv2, 4., 1.1).r);

 color = mix(  color, vec3(0.), shape(uv2, 4., 1.).r);

 color = mix(  color, color2, shape(uv2, 4., .9).r);

 color = mix(  color, vec3(0.), shape(uv2, 4., .8).r);

 color = mix(  color, color2, shape(uv2, 4., .7).r);

 color = mix(  color, vec3(0.), shape(uv2, 4., .6).r);

 color = mix(  color, color2, shape(uv2, 4., .5).r);

 color = mix(  color, vec3(0.), shape(uv2, 4., .4).r);

 color = mix(  color, color2, shape(uv2, 4., .3).r);

 color = mix(  color, vec3(0.), shape(uv2, 4., .2).r);

 color = mix(  color, color2, shape(uv2, 4., .1).r);

 color = mix(  color, vec3(0.), shape(uv2, 4., .05).r);


 





      

  
    gl_FragColor = vec4(vec3(color.r, color.g, color.b), 1.);
}`