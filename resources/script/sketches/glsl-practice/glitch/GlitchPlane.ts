import * as THREE from 'three';

import { GlitchTexture } from "./GlitchTexture";
import Pane from 'tweakpane';


import { TextureAssets } from '../../../utils/zero';

import planeVert from './shaders/plane.vert';
import planeFrag from './shaders/plane.frag';


export class GlitchPlane extends THREE.Mesh {
  public isBillboard: boolean;
  public time: number;
  public glitchTexture: GlitchTexture;

  private pane?: Pane;

  constructor(assets: TextureAssets) {
    const geometry = new THREE.PlaneBufferGeometry(50, 50);

    const material = new THREE.RawShaderMaterial({
      vertexShader: planeVert,
      fragmentShader: planeFrag,
      uniforms: {
        time: { value: 0 },
        glitchTex: { value: null },
        img1: { value: null },
        img2: { value: null },
      },
      side: THREE.DoubleSide
    })
    material.needsUpdate = true;
    super(geometry, material);
    this.time = 0;
    this.isBillboard = false;
    this.glitchTexture = new GlitchTexture(new THREE.Vector2(256, 256));
    (this.material as THREE.RawShaderMaterial).uniforms.glitchTex.value = this.glitchTexture.texture;
  }

  public update(deltaTIme: number, camera?: THREE.Camera) {
    this.time += deltaTIme;

    if(this.isBillboard && camera) this.rotation.copy(camera.rotation);
    this.glitchTexture.update();
    (this.material as THREE.RawShaderMaterial).uniforms.time.value = this.time;
  }

  public setGui(pane: Pane) {
    this.pane = pane;
  }
}
