precision highp float;

uniform sampler2D bufferTexture;
uniform vec2 resolution;
uniform float brightness;

varying vec2 vUv;



void main(){
  vec4 samplerColor = texture2D(bufferTexture, vUv);
  gl_FragColor = samplerColor * vec4(vec3(brightness), 1.0);
}
