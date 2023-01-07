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




void main() {
  vec2 uv = vUv;
  float t = (uTime *.1) +length(uv-.5);
  
  float t2 = (uTime *.05) +length(uv-.5);
  
  vec2 uv2 = fract(vec2(uv.x, uv.y) * 4.);
  
   vec2 uv3 = fract(vec2(uv.x, uv.y) * 8.);
  
    vec2 uv4 = fract(vec2(uv.x, uv.y) * 16.);
  
      vec2 uv5 = fract(vec2(uv.x, uv.y) * 32.);
  
 
 vec3 color = vec3(1.);
  
 

      

       if(color == vec3(1.)){
        color = vec3(step(fract((uv.x+ uv.y)*5.), .2));
        color = mix(color,1.-color,step(fract((uv.x- uv.y)*5.), .2));
        
      }



      if(color == vec3(1.)){
        color = vec3(uv.x, uv.y, 1.);
        coswarp(color, 3.);
        coswarp(color, 3.);
        coswarp(color, 3.);
      }

      if(color == vec3(0.)){

        color = mix(color, 1.-color, step(length(uv2-.5), sin(t)));
  
        color = mix(color, 1.-color, step(length(uv3-.5), sin(t2)));
      
          color = mix(color, 1.-color, step(length(uv4-.5), sin(t)));
      
           color = mix(color,1.-color, step(length(uv5-.5), sin(t2)));
      }

  
    gl_FragColor = vec4(vec3(color.r, color.g, color.b), 1.);
}`