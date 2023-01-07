export default /* glsl */`uniform float uTime;

varying vec2 vUv;
uniform sampler2D pic;
uniform float noise;


  
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




void main() {
  vec2 uv = vUv;
  vec2 uv2= rotate2D(uv, (uTime * .2));
 
  vec4 texture = texture2D(pic, uv);


 



  vec3 color = texture.rgb;

  vec3 color2 = vec3(uv.x, uv.y, 1.);

  coswarp(color2, 3.);
  coswarp(color2, 3.);
  coswarp(color2, 3.);

  if(color == vec3(1.)){
    color = color2;
  }

  else if(color.b > .8 && color.r < .4){
    color = vec3(fract(uv2 * 30.).x);
    color = mix(color, vec3(uv.x, uv.y, 1.), fract(uv2 * 20.).y);
    coswarp(color, 3.);

    color = vec3(step(color.r, .4), step(color.r, .3), step(color.r, .5));
  }

 

  // color.r += step(uv2.x, color2.r);
  // color.g += step(uv2.y, color2.g);



  gl_FragColor = vec4(color, 1.);
}`