export default /* glsl */`uniform float uTime;

varying vec2 vUv;



  
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

float flowerSDF(vec2 st, int N) {
  st = st*2.-1.;
  float r = length(st)*2.;
  float a = atan(st.y,st.x);
  float v = float(N)*.5;
  return 1.-(abs(cos(a*v))*.5+.5)/r;
}


void main() {
  vec2 uv = vUv;
 
  vec3 color = vec3(uv.x, uv.y, 1.);

  coswarp(color, 3.);
  coswarp(color, 3.);
  coswarp(color, 3.);


  vec3 color2 = vec3(uv.x, fract(uv * 3.).x, fract(uv * 5.).x);
coswarp(color2, 3.);
  color = mix(color, color2, step(length(uv-.5), .2));

 

  
float alpha = step(flowerSDF(uv, 9), .5);


  gl_FragColor = vec4(color, alpha);
}`