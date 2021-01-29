import * as THREE from 'three';
import * as ZERO from '../../../utils/zero';

import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

import brightness from './shaders/postProcess/brightness.frag';
import antialias from './shaders/postProcess/antialias.frag';

export class PostProcess extends ZERO.PostProcess {

  constructor(renderer: THREE.WebGLRenderer, resolution: THREE.Vector2 ) {
    super(renderer, resolution);
    this.name = 'Post Process';
    this.add({
      fragmentShader: brightness,
      uniforms: {
        brightness: {
          value: 1.0,
        },
      }
    })
    .add({
      fragmentShader: antialias,
      uniforms: {
        isFxaa: {
          value: true,
        },
      }
    });
  }

  public setGui(gui: GUI) {
    super.setGui(gui);

    const uniform0 = this.materials[0].uniforms;
    const uniform1 = this.materials[1].uniforms;

    this.guiFolder.add(uniform0.brightness, 'value', 0, 1, 0.01).name('brightness');
    this.guiFolder.add(uniform1.isFxaa, 'value').name('use FXAA');
  }
}
