precision highp float;

uniform float time;
uniform sampler2D noise;

varying vec2 vUv;

float PI = 3.141592653589793238;

void main() {
  float _time = time / 200.;
  float noiseDetail = 2.;

  vec4 noiseColor1 = texture2D(noise, vUv * vec2(1./noiseDetail) + sin(_time));
  vec2 noiseCoord1 = (noiseColor1.rg * 2.0 - 1.0) * 0.5;

  vec4 noiseColor2 = texture2D(noise, (vUv + noiseCoord1) * -.1 + _time );

  vec3 color1 = vec3(143., 26., 16.) / vec3(256.);
  vec3 color2 = vec3(140., 205., 226.) / vec3(256.);
  vec3 color3 = vec3(219., 189., 165.) / vec3(256.);
  vec3 color4 = vec3(119., 175., 168.) / vec3(256.);

  vec3 mixColor1 = mix(color1, color2, noiseColor2.r);
  vec3 mixColor2 = mix(color3, color4, noiseColor2.g);
  vec3 finalColor = mix(mixColor1, mixColor2, noiseColor2.b);


  gl_FragColor = vec4(finalColor, 1.0);
}
