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

//	Classic Perlin 2D Noise
//	by Stefan Gustavson
//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}


vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 *
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}


void main() {
  vec2 uv = vUv;
  float t = (uTime *.8) +(length(uv-.5) * 2.) + uv.x;
  
  float t2 = (uTime *.05) +length(uv-.5);
  
  // vec2 uvR = rotateUV(uv, vec2(.5), PI + uTime);

  vec2 uv2 = fract(uv * 8.);
  

  vec2 uv3 = fract(uv * (10. + cos(t2)));
  uv2 = rotateUV(uv2, vec2(.5), PI + (mix(uv3.x, uv2.y,sin(t) * 4.) ));
  
 vec3 color = vec3(.8, .1, .2);
 vec3 color1 = vec3(.8, .1, .2);
 vec3 color2 = vec3(.95, 0.95, 0.1);
 vec3 color3 = vec3(.1, 0.2, 0.9);

 color = mix(  color1, color2, shape(uv2, 3., 1.3).r);

 color = mix(  color,color1, shape(uv2, 4., 1.2).r);

 color = mix(  color, color2, shape(uv2, 5., 1.1).r);

 color = mix(  color,color1, shape(uv2, 3., 1.).r);

 color = mix(  color, color2, shape(uv2, 4., .9).r);

 color = mix(  color,color3, shape(uv2, 5., .8).r);

 

 color = mix(  color, color1, shape(uv, 8., .1).r);

 color = mix(  color,color2, shape(uv2, 4., .6).r);

 color = mix(  color, color3, shape(uv2, 5., .5).r);

 color = mix(  color,color1, shape(uv2, 3., .4).r);

 color = mix(  color, color2, shape(uv2, 4., .3).r);

 color = mix(  color, color1, shape(uv2, 5., .2).r);

 color = mix(  color, color2, shape(uv2, 3., .1).r);

 color = mix(  color, vec3(0.), shape(uv2, 4., .05).r);

 color = mix(  color, color1, shape(uv, 8., .6).r);

 color = mix(  color, color2, shape(uv, 8., .4).r);
 color = mix(  color, color3, shape(uv, 8., .35).r);

 color = mix(  vec3(.8), color, shape(uv, 4., .95).r);
 


color += cnoise(uv * 1500. + cnoise(uv3 * 100.));


      

  
    gl_FragColor = vec4(vec3(color.r, color.g, color.b), 1.);
}`