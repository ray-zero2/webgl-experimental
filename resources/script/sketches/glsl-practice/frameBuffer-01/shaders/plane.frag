precision highp float;

uniform float time;
uniform sampler2D uvTex;

varying vec2 vUv;

float PI = 3.141592653589793238;

void main() {

  vec4 uvTexColor = texture2D(uvTex, vUv);
  gl_FragColor = uvTexColor;
}
