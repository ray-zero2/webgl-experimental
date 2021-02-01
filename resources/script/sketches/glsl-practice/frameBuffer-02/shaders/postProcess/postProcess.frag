precision highp float;

uniform sampler2D bufferTexture;
uniform sampler2D noiseTexture;

uniform vec2 resolution;
uniform bool useNoiseTexture;
uniform float saturation;
uniform float time;

varying vec2 vUv;

float rnd(vec2 p) {
  return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(){
  vec4 samplerColor = texture2D(bufferTexture, vUv);

  float n = 0.;
  if(useNoiseTexture) {
    vec4 noiseColor = texture2D(noiseTexture, vUv + time * 0.1);
    n = noiseColor.r;
  } else {
    n = rnd(gl_FragCoord.st + time * 0.01);
  }

  n = 1.0 - n * saturation;

  gl_FragColor = vec4(samplerColor.rgb * n, 1.0);
}
