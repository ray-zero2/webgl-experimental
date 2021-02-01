import * as THREE from 'three';
import * as ZERO from '../../../utils/zero';

import Pane from 'tweakpane';

import ppShader from './shaders/postProcess/postProcess.frag';
import antialias from './shaders/postProcess/antialias.frag';

export class PostProcess extends ZERO.PostProcess {

  constructor(renderer: THREE.WebGLRenderer, resolution: THREE.Vector2 ) {
    super(renderer, resolution);
    this.name = 'Post Process';

    this.add({
      fragmentShader: ppShader,
      uniforms: {
        brightness: {
          value: 1.0,
        },
        saturation: {
          value: 1.0
        },
        vignett: {
          value: 1.0
        }
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

  public setGui(pane: Pane) {
    super.setGui(pane);

    const uniform0 = this.materials[0].uniforms;
    const uniform1 = this.materials[1].uniforms;

    this.pane = pane;

    this.pane.addInput(uniform0.brightness, 'value', {
      label: 'brightness',
      min: 0,
      max: 1,
      step: 0.01,
    });
    this.pane.addInput(uniform0.saturation, 'value', {
      label: 'saturation',
      min: 0,
      max: 1,
      step: 0.01,
    });
    this.pane.addInput(uniform0.vignett, 'value', {
      label: 'vignett',
      min: 0,
      max: 1,
      step: 0.01,
    });
    this.pane.addInput(uniform1.isFxaa, 'value', {
      label: 'use antialias',
    });
  }
}
