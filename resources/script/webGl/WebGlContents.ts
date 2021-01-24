import * as THREE from 'three';
import * as ZERO from '../utils/zero/';

import { MyScene } from './MyScene';

export class WebGlContents {

  // public scene: THREE.Scene;
  // public camera: Camera;
  protected base: ZERO.Base;
  protected assetLoader: ZERO.AssetLoader;
  protected scene: MyScene | null;


  constructor(canvas: HTMLCanvasElement, resolution: THREE.Vector2) {
    const params: THREE.WebGLRendererParameters = {
      canvas,
      antialias: true,
      alpha: true,
    }
    this.base = new ZERO.Base(params, resolution);

    this.scene = null;

    this.assetLoader = new ZERO.AssetLoader({
      onLoad: () => {
        this.next();
      },
      onProgress: (url, loadedNum, totalNum) => {
        console.log({url});
        console.log({loadedNum});
        console.log({totalNum});
      }
    });

    this.assetLoader.load({
      texture: [{
        name: 'noise',
        path: './images/textures/noise.png'
      }],
      obj: [{
        name: 'cow',
        path: './model/cow.obj'
      }]
    })
  }

  private next() {
    // this.scene = new MyScene(this.renderer, this.resolution);

    console.log('finish');
    console.log(this.assetLoader);
  }
}
