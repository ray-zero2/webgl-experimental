precision highp float;

uniform sampler2D bufferTexture;

uniform vec2 resolution;
uniform float brightness;
uniform float saturation;
uniform float vignett;

varying vec2 vUv;



void main(){
  vec4 samplerColor = texture2D(bufferTexture, vUv);

  float simpleGray = dot(vec3(1.), samplerColor.rgb) / 3.;
  vec3 rgb = mix(vec3(simpleGray), samplerColor.rgb, saturation);

  vec2 normalizedUv = vUv * 2. - 1.;
  float vig = vignett - length(normalizedUv);

  gl_FragColor = vec4(rgb * vig * vec3(brightness), 1.0);
}
