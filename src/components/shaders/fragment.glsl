uniform float uOpacity;
uniform float uDeepPurple;
uniform float uTime;

varying float vDistortion;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}     

void main() {
    float distort = vDistortion * 3.;

    vec3 brightness = vec3(.05, .1, .05);  // More Green, Less brightness
    vec3 contrast = vec3(.2, .2, .2);  // Increase contrast
    vec3 oscilation = vec3(.6, .2, .6);  // More Green
    vec3 phase = vec3(.9, .5, .8);

    vec3 color = cosPalette(distort + uTime, brightness, contrast, oscilation, phase);  // Add uTime here

    gl_FragColor = vec4(color, vDistortion);
    gl_FragColor += vec4(min(uDeepPurple, 1.), 0., .5, min(uOpacity, 1.));
}