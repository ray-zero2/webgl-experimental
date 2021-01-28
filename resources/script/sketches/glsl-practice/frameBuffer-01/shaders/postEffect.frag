precision mediump float;
uniform sampler2D frameTexture;
uniform vec2 resolution;
uniform float brightness;
uniform bool isFxaa;

varying vec2 vUv;

#pragma glslify: fxaa = require(glsl-fxaa)

void main(){

  if(isFxaa) {
    vec2 fragCoord = vUv * resolution;
    gl_FragColor = fxaa(frameTexture, fragCoord, resolution);
  } else {
    vec4 samplerColor = texture2D(frameTexture, vUv);
    gl_FragColor = samplerColor * vec4(vec3(brightness), 1.0);
  }
}
