import * as THREE from 'three';
import * as ZERO from '../../../utils/zero';

import { Contents } from './Contents';
import { Cursor } from './Cursor';


export class Init {

  public canvas: HTMLCanvasElement;
  public resolution: THREE.Vector2;
  public clock: THREE.Clock;

  protected contents: Contents;
  protected cursor: Cursor;
  protected assetLoader: ZERO.AssetLoader;

  constructor(canvas: HTMLCanvasElement) {

    console.log('glitch');

    this.canvas = canvas;

    this.resolution = new THREE.Vector2(
      document.body.clientWidth,
      window.innerHeight
    );

    this.clock = new THREE.Clock(true);

    this.contents = new Contents(this.canvas, this.resolution);
    this.cursor = new Cursor(this.resolution, {
      element: this.canvas,
      useRaycaster: true,
    });

    this.assetLoader = new ZERO.AssetLoader({
      onLoad: this.onLoad.bind(this)
    });

    this.assetLoader.load({
      texture: [{
        name: 'img1',
        src: '../../images/glsl-practice/glitch/img1.png'
      },
      {
        name: 'img2',
        src: '../../images/glsl-practice/glitch/img2.png'
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
