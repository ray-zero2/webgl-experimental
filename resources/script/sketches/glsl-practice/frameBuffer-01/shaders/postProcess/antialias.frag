precision highp float;

uniform sampler2D bufferTexture;
uniform vec2 resolution;
uniform bool isFxaa;

varying vec2 vUv;

#pragma glslify: fxaa = require(glsl-fxaa)

void main(){

  vec4 samplerColor = vec4(0.);

  if(isFxaa) {
    vec2 fragCoord = vUv * resolution;
    samplerColor = fxaa(bufferTexture, fragCoord, resolution);
  } else {
    samplerColor = texture2D(bufferTexture, vUv);
  }

  gl_FragColor = samplerColor;
}
