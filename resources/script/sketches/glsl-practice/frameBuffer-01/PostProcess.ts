import * as THREE from 'three';
import * as ZERO from '../../../utils/zero';

import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

import peFrag from './shaders/postProcess.frag';

export class PostProcess extends ZERO.PostProcess {

  constructor(renderer: THREE.WebGLRenderer, resolution: THREE.Vector2 ) {
    super(renderer, resolution);
    this.name = 'PP TEST';
    this.add({
      fragmentShader: peFrag,
      uniforms: {
        brightness: {
          value: 0.2,
        },
        isFxaa: {
          value: false
        }
      }
    });
  }

  public setGui(gui: GUI) {
    super.setGui(gui);

    const uniform0 = (this.materials[0] as THREE.RawShaderMaterial).uniforms;

    this.guiFolder.add(uniform0.brightness, 'value', 0, 1, 0.01).name('brightness');
    this.guiFolder.add(uniform0.isFxaa, 'value').name('use FXAA');
  }
}
