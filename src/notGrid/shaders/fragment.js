export default /* glsl */`uniform float uTime;

varying vec2 vUv;
uniform vec2 uResolution;



  
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;

}

void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .05 * sin(uTime * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (uTime * .15));
  
}  

void uvRipple(inout vec2 uv, float intensity){

vec2 p = uv -.5;


  float cLength=length(p);

   uv= uv +(p/cLength)*cos(cLength*15.0-uTime*.5)*intensity;

} 




void main() {
  vec2 uv = vUv;
  vec2 uv2 = uv;
  uv = (gl_FragCoord.xy - uResolution * .5) / uResolution.yy + 0.5;
  
 
 vec3 color = vec3(0.);
  
 

      

   float alpha = 1.;


     float t = (uTime *.4) + length(uv-.5);

        color = vec3(0., 0., 0.);

        vec3 color2 = vec3(uv.x, uv.y, 1.);
        coswarp(color2, 3.);
        coswarp(color2, 3.);
        coswarp(color2, 3.);
        // uvRipple(color.rg, 2.);

        // color = vec3(step(fract((uv.x+ uv.y)*5.), .2));
        uv = rotate2D(uv-.5, (uTime * .2));
        color = mix(color,color2,step(fract((uv.x+ uv.y)*(15. + (sin(t) * 3.))), .2));
        color = mix(color,color2,step(fract((uv.x- uv.y)*(15. + (sin(t) * 3.))), .2));

      //  color = vec3(step(color.r, .5), step(color.g, .5), step(color.b, .5)) ;
      // color = mix(color, color2, .5);

        float distanceToCenter = distance(gl_PointCoord, vec2(.5));
    // alpha = step(uv.x-.5, .5) + step(uv.y-.5, .5) ;
      

  
    gl_FragColor = vec4(vec3(color.r, color.g, color.b), alpha);
}`