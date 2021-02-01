import * as THREE from 'three';
import * as ZERO from '../../../utils/zero';

import Pane from 'tweakpane';

import ppShader from './shaders/postProcess/postProcess.frag';
import antialias from './shaders/postProcess/antialias.frag';

import noiseTexture from '../../../../texture/noise/snoise.png';

export class PostProcess extends ZERO.PostProcess {

  constructor(renderer: THREE.WebGLRenderer, resolution: THREE.Vector2, targetOptions?: THREE.WebGLRenderTargetOptions ) {
    super(renderer, resolution, targetOptions);
    this.name = 'Post Process';

    this.add({
      fragmentShader: antialias,
      uniforms: {
        isFxaa: {
          value: true,
        },
      }
    })
    .add({
      fragmentShader: ppShader,
      uniforms: {
        saturation: {
          value: 0,
        },
        useNoiseTexture: {
          value: false,
        },
        noiseTexture: {
          value: new THREE.Texture(noiseTexture),
        }
      }
    });
  }

  public setGui(pane: Pane) {
    super.setGui(pane);

    const uniform0 = this.materials[0].uniforms;
    const uniform1 = this.materials[1].uniforms;

    this.pane = pane;

    this.pane.addInput(uniform0.isFxaa, 'value', {
      label: 'use antialias',
    });
    this.pane.addInput(uniform1.saturation, 'value', {
      label: 'saturation',
      min: 0,
      max: 1,
      step: 0.01
    });
    this.pane.addInput(uniform1.useNoiseTexture, 'value', {
      label: 'use noiseTex'
    });
  }
}
