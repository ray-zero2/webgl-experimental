import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

import { TextureAssets } from '../../../utils/zero';

import { Camera } from './Camera';
import { Plane } from './Plane';
import { PostEffect } from './PostEffect';

export class Contents {

  public time: number;

  private plane: Plane | null;
  private resolution: THREE.Vector2;
  private renderer: THREE.WebGLRenderer;
  private rendererTarget: THREE.WebGLRenderTarget;
  private scene: THREE.Scene;
  private camera: Camera;

  private postEffect: PostEffect;

  private stats: Stats = Stats();
  private gui: GUI = new GUI();

  constructor(canvas: HTMLCanvasElement, resolution: THREE.Vector2) {
    this.resolution = resolution;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // antialias: true,
      alpha: true
    })


    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x0e0e0e, 1.0);
    this.renderer.setSize(this.resolution.x, this.resolution.y);
    this.rendererTarget = new THREE.WebGLRenderTarget(this.resolution.x, this.resolution.y, {
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter
    });

    this.scene = new THREE.Scene();
    this.camera = new Camera({
      fov: 50,
      aspect: resolution.x / resolution.y,
      far: 1000,
      element: canvas,
      enableDamping: true,
    });

    this.plane = null;
    this.postEffect = new PostEffect(this.resolution);

    this.time = 0;
  }

  public update(deltaTime: number) {
    this.stats.begin();

    this.time += deltaTime;


    this.camera.update(deltaTime);

    this.plane!.update(deltaTime);

    // change renderTarget
    // render in renderTarget
    // update postEffect component
    // change original renderTarget
    // render
    this.renderer.setRenderTarget(this.rendererTarget);
    this.renderer.render(this.scene, this.camera);

    this.postEffect.render(this.renderer, deltaTime, { 'frame': this.rendererTarget.texture });

    this.stats.end();
  }

  public resize( resolution: THREE.Vector2 ) {
    this.resolution = resolution;
    this.postEffect.resize(this.resolution);
    this.camera.resize(this.resolution);
    this.renderer.setSize(this.resolution.x, this.resolution.y);
  }

  public async init( textures: TextureAssets ) {
    document.body.appendChild(this.stats.dom)
    this.camera.init();
    this.plane = new Plane(textures);
    this.scene.add(this.plane);

    this.setGui();
  }

  private setGui() {
    this.plane!.setGui(this.gui);
    this.postEffect.setGui(this.gui);
  }
}
