import * as THREE from 'three';

import Pane from 'tweakpane';

import { PlaneBufferGeometry, RawShaderMaterial } from 'three';

import { TextureAssets } from '../../../utils/zero';

import planeVert from './shaders/plane.vert';
import planeFrag from './shaders/plane.frag';


export class Plane extends THREE.Mesh {
  public isBillboard: boolean;

  private pane?: Pane;


  constructor(assets: TextureAssets) {

    const uvTex = assets.uvTex;

    // uvTex.wrapS = THREE.RepeatWrapping;
    // uvTex.wrapT = THREE.RepeatWrapping;
    // uvTex.format = THREE.RGBFormat;
    // uvTex.type = THREE.FloatType;
    // uvTex.minFilter = THREE.NearestFilter;
    // uvTex.magFilter = THREE.NearestFilter;

    const geometry = new PlaneBufferGeometry(50, 50);

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
    this.isBillboard = false;
  }

  public update(deltaTIme: number, camera?: THREE.Camera) {
    if(this.isBillboard && camera) this.rotation.copy(camera.rotation);

    (this.material as THREE.RawShaderMaterial).uniforms.time.value += deltaTIme;
  }

  public setGui(pane: Pane) {
    this.pane = pane;
  }
}
