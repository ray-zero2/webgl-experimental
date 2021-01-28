precision mediump float;
uniform sampler2D frameTexture;
uniform vec2 resolution;
uniform float brightness;
uniform bool isFxaa;

varying vec2 vUv;

#pragma glslify: fxaa = require(glsl-fxaa)

void main(){

  vec4 samplerColor = vec4(0.);

  if(isFxaa) {
    vec2 fragCoord = vUv * resolution;
    samplerColor = fxaa(frameTexture, fragCoord, resolution);
  } else {
    samplerColor = texture2D(frameTexture, vUv);
  }

  gl_FragColor = samplerColor * vec4(vec3(brightness), 1.0);
}
