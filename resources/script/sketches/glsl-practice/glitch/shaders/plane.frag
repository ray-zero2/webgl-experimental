precision highp float;

uniform float time;
uniform sampler2D glitchTex;

varying vec2 vUv;

float PI = 3.141592653589793238;

void main() {
  vec4 glitchTexColor = texture2D(glitchTex, vUv);
  gl_FragColor = glitchTexColor;
}
