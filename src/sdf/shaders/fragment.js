export default /* glsl */`const float PI = 3.1415926535897932384626433832795;
const float TAU = 2.* PI;

varying vec2 vUv;
uniform float uTime;

precision highp float;

#define PI 3.14159265359




const int RAYMARCH_MAX_STEPS = 200;
const float RAYMARCH_MAX_DIST = 50.;
const float EPSILON = 0.0001;

void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (uTime * .25));
  trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (uTime * .25));
  trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (uTime * .25));
}


mat2 rot (float a) {
	return mat2(cos(a),sin(a),-sin(a),cos(a));
}



// p: position c: corner
float sdBox(vec3 p, vec3 c) {
  vec3 q = abs(p) - c;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}



float sdSphere( vec3 p, float s )
{
  return length(p)-s;
}

float opSmoothUnion( float d1, float d2, float k )
{
    float h = max(k-abs(d1-d2),0.0);
    return min(d1, d2) - h*h*0.25/k;
	//float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
	//return mix( d2, d1, h ) - k*h*(1.0-h);
}

float opSmoothSubtraction( float d1, float d2, float k ) {
  float h = clamp( 0.5 - 0.5*(d2+d1)/k, 0.0, 1.0 );
  return mix( d2, -d1, h ) + k*h*(1.0-h); }

  mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

  vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
  }

float scene(vec3 pos) {

  vec3 pos2 = pos;
  vec3 pos3 = pos;

  vec3 rote = rotate(vec3(pos.x, pos.y, pos.z), vec3(0., 1., 1.5), PI * uTime * .5);


  float box = sdBox(rote, vec3(1. ) );
  float sphere = sdSphere(pos2, 1.5);


  return opSmoothSubtraction(box, sphere, .1);
}

vec3 getnormalsmall (vec3 p)
{
		vec2 epsilon = vec2(0.001, 0.);
		return normalize(scene(p) - vec3(scene(p-epsilon.xyy),
										   scene(p-epsilon.yxy),
										   scene(p-epsilon.yyx))
						);
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


vec4 raymarch(vec3 rayDir, vec3 pos) {
	// Define the start state
	// reset to 0 steps
	float currentDist = 0.0; // signed distance
	float rayDepth = 0.0;
	vec3 rayLength = vec3(0.0);
	vec3 light = normalize(vec3(1.,sin(uTime),2.));
  vec2 uv = vUv;
	vec3 gradient = mix(vec3(0.0, 0.0, sin(uTime)*.2), vec3(0.5, 0.0 ,0.5), rayDir.y);
  float warpsScale =  1. ;
  vec2 rote = rotateUV(uv, vec2(.5), PI * uTime * .05);
  vec2 roteC = rotateUV(uv, vec2(.5), -PI * uTime * .05);


  vec3 color = vec3(uv.x, uv.y, 1.);
  coswarp(color, 3.);
  coswarp(color, 3.);


  vec4 bgColor = vec4(0., 0., 0., color.r);


  vec3 color1 = vec3(uv.y, uv.x, cos(uTime) * .5 + 1.);
  color1.xyz += warpsScale * .1 * cos(3. * color1.yzx + uTime);

  vec3 color2 = vec3(sin(uTime) * .5 + 1., uv.x, uv.y);
  color2.xyz += warpsScale * .1 * sin(3. * color2.yzx + uTime);

	// shooting the ray
 	for (int i=0; i < RAYMARCH_MAX_STEPS; i++) {
     	// steps traveled
		vec3 new_p = pos + rayDir * rayDepth;
		currentDist = scene(new_p);
		rayDepth += currentDist;

		vec3 normals = getnormalsmall(new_p);
		float lighting = max(0.,dot(normals,light));



 		vec4 shapeColor = mix(
			vec4(color1, 1.),
			vec4(color2, 1.),
			lighting
		);


 	    if (currentDist < EPSILON) return shapeColor; // We're inside the scene - magic happens here
 		if (rayDepth > RAYMARCH_MAX_DIST) return bgColor; // We've gone too far
	}

	return bgColor;
}

void main() {
	vec2 uv = vUv-.5;

	vec3 camPos = vec3(uv*6. ,30.); // x, y, z axis
	vec3 rayDir = normalize(vec3(0.,0., -1.0)); // DOF

  vec4 final = vec4(raymarch(rayDir, camPos));
  // final.a = .8;
    gl_FragColor = final;


}`