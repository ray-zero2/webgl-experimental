precision highp float;

uniform sampler2D bufferTexture;

uniform vec2 resolution;
uniform float brightness;
uniform float saturation;
uniform float vignett;

varying vec2 vUv;

#pragma glslify: grayScale = require('./grayScale');


void main(){
  vec4 samplerColor = texture2D(bufferTexture, vUv);

  vec3 grayColor = grayScale(samplerColor.rgb);
  vec3 rgb = mix(grayColor, samplerColor.rgb, saturation);

  vec2 normalizedUv = vUv * 2. - 1.;
  float vig = clamp(vignett * 2. - length(normalizedUv), .0, 1.);

  gl_FragColor = vec4(rgb * vig * vec3(brightness), 1.0);
}
