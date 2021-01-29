import * as THREE from 'three';
import * as ZERO from '../../../utils/zero';

import { Contents } from './Contents';

import uvTex from '../../../../texture/uv.jpg';

export class Init {

  public canvas: HTMLCanvasElement;
  public resolution: THREE.Vector2;
  public clock: THREE.Clock;

  protected contents: Contents;
  protected assetLoader: ZERO.AssetLoader;

  constructor(canvas: HTMLCanvasElement) {

    console.log('frameBuffer-01');

    this.canvas = canvas;

    this.resolution = new THREE.Vector2(
      document.body.clientWidth,
      window.innerHeight
    );

    this.clock = new THREE.Clock(true);

    this.contents = new Contents(this.canvas, this.resolution);

    this.assetLoader = new ZERO.AssetLoader({
      onLoad: this.onLoad.bind(this)
    });

    this.assetLoader.load({
      texture: [{
        name: 'uvTex',
        src: uvTex
      }]
    });

    this.bind();
  }

  protected update() {
    const deltaTime = this.clock.getDelta();
    this.contents.update(deltaTime);
    requestAnimationFrame(this.update.bind(this));
  }

  protected start () {
    this.update();
  }

  protected resize() {
    this.resolution = new THREE.Vector2(
      document.body.clientWidth,
      window.innerHeight
    );

    this.contents.resize(this.resolution);
  }

  protected bind() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  protected async onLoad() {
    const textures = this.assetLoader.getTexture();
    await this.contents.init(textures);
    this.start();
  }
}
