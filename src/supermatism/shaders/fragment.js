export default /* glsl */`uniform float uTime;

varying vec2 vUv;
uniform sampler2D pic;
uniform float noise;

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

vec3 shape( in vec2 p, int sides )
{
  
   float d = 0.0;
  vec2 st = p *2.-1.;

  // Number of sides of your shape
  int N = sides ;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI ;
  float r = (2.* PI)/float(N) ;

  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);
  

  return  vec3(1.0-smoothstep(.4,.41,d));
}



void main() {
  vec2 uv = vUv;

 
vec3 bg = vec3(uv.x, uv.y, 1.);

coswarp(bg, 3.);
coswarp(bg, 3.);
coswarp(bg, 3.);
 
  vec2 uv2= rotate2D(uv,  (uTime * .2));
  vec2 uv3= rotate2D(uv ,  -(uTime * .2));
  vec2 uv4= rotate2D(uv,  -(uTime * .3));
  vec2 uv5= rotate2D(uv,  (uTime * .3));
  

  vec4 texture1 = texture2D(pic, uv);
  vec4 texture2 = texture2D(pic, uv2);
  vec4 texture3 = texture2D(pic, uv3);

  vec3 color = vec3(texture1.rgb);

  float square = step(shape(vec2(uv2.x + (sin(uTime * .15 ) * .12), uv2.y), 4).r, .5);
  float tri = step(shape(vec2(uv3.x, uv3.y + (sin(uTime * .12)  * .15)), 3).r, .5);
  float hex = step(shape(vec2(uv2.x + (sin(uTime * .2) * .33), uv2.y), 6).r, .5);
  float pen = step(shape(vec2(uv3.x, uv3.y + (sin(uTime * .27) * .3)), 5).r, .5);
  float circ = step(length(vec2(uv.x, uv.y)-.5), .3);

  float square2 = step(shape(vec2(uv2.x +( cos(uTime * .12) * .25), uv2.y), 4).r, .5);
  float tri2 = step(shape(vec2(uv3.x, uv3.y +( cos(uTime * .12) * .18)), 3).r, .5);
  float hex2 = step(shape(vec2(uv2.x + (cos(uTime * .2)* .25) * .12, uv2.y), 6).r, .5);
  float pen2 = step(shape(vec2(uv3.x, uv3.y + (cos(uTime * .2)* .25)), 5).r, .5);

  color = mix( texture3.rgb, color, square);
  color = mix( texture2.rgb, color, tri);

  color = mix( texture3.gbr, color, hex);
  color = mix( texture2.brg, color, pen);


  color = mix( 1.-color, color, square);
  color = mix(  1.-color, color, tri);

  color = mix(  1.-color, color, hex);
  color = mix(  1.-color, color, pen);

  // coswarp(color, 3.);

  

  gl_FragColor = vec4(color, 1.);
}`