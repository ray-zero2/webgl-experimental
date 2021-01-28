import * as THREE from 'three';
import { PlaneBufferGeometry, RawShaderMaterial } from 'three';

import { TextureAssets } from '../../../utils/zero';

import planeVert from './shaders/plane.vert';
import planeFrag from './shaders/plane.frag';

export class Plane extends THREE.Mesh {

  constructor(assets: TextureAssets) {

    const uvTex = assets.uvTex;

    // uvTex.wrapS = THREE.RepeatWrapping;
    // uvTex.wrapT = THREE.RepeatWrapping;
    // uvTex.format = THREE.RGBFormat;
    // uvTex.type = THREE.FloatType;
    // uvTex.minFilter = THREE.NearestFilter;
    // uvTex.magFilter = THREE.NearestFilter;

    const geometry = new PlaneBufferGeometry(2, 2);

    const material = new RawShaderMaterial({
      vertexShader: planeVert,
      fragmentShader: planeFrag,
      uniforms: {
        time: { value: 0 },
        uvTex: { value: uvTex }
      },
      side: THREE.DoubleSide
    })

    super(geometry, material);

  }

  update(deltaTIme: number) {
    (this.material as THREE.RawShaderMaterial).uniforms.time.value += deltaTIme;

  }
}
