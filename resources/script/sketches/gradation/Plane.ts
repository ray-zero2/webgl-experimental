import * as THREE from 'three';
import { PlaneBufferGeometry, RawShaderMaterial } from 'three';

import { TextureAssets } from '../../utils/zero';

import planeVert from './shaders/plane.vert';
import planeFrag from './shaders/plane.frag';

export class Plane extends THREE.Mesh {

  constructor(assets: TextureAssets) {

    const noiseTexture = assets.snoise;

    noiseTexture.wrapS = THREE.RepeatWrapping;
    noiseTexture.wrapT = THREE.RepeatWrapping;
    noiseTexture.format = THREE.RGBFormat;
    noiseTexture.type = THREE.FloatType;
    noiseTexture.minFilter = THREE.NearestFilter;
    noiseTexture.magFilter = THREE.NearestFilter;

    const geometry = new PlaneBufferGeometry(100, 100, 2, 2);

    const material = new RawShaderMaterial({
      vertexShader: planeVert,
      fragmentShader: planeFrag,
      uniforms: {
        time: { value: 0 },
        noise: { value: noiseTexture }
      },
    })

    super(geometry, material);

  }

  update(deltaTIme: number) {
    (this.material as THREE.RawShaderMaterial).uniforms.time.value += deltaTIme;

  }
}
