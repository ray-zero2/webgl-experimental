import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

import Pane from 'tweakpane';

import { TextureAssets } from '../../../utils/zero';

import { Camera } from './Camera';
import { Plane } from './Plane';
import { PostProcess } from './PostProcess';


export class Contents {

  public time: number;

  private plane: Plane | null;
  private resolution: THREE.Vector2;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: Camera;

  private postProcess: PostProcess;

  private stats: Stats = Stats();
  private pane: Pane = new Pane();

  constructor(canvas: HTMLCanvasElement, resolution: THREE.Vector2) {
    this.resolution = resolution;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
    })


    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x0e0e0e, 1.0);
    this.renderer.setSize(this.resolution.x, this.resolution.y);
    this.renderer.autoClear = false;

    this.scene = new THREE.Scene();
    this.camera = new Camera({
      fov: 50,
      aspect: resolution.x / resolution.y,
      far: 1000,
      element: canvas,
      enableDamping: true,
      dampingFactor: 0.1
    });

    this.plane = null;
    this.postProcess = new PostProcess(this.renderer, this.resolution);

    this.time = 0;
  }

  public update(deltaTime: number) {
    this.stats.begin();

    this.renderer.setRenderTarget(null);

    this.time += deltaTime;

    this.camera.update(deltaTime);
    this.plane!.update(deltaTime);

    this.postProcess.render(this.scene, this.camera, deltaTime);

    this.stats.end();
  }

  public resize( resolution: THREE.Vector2 ) {
    this.resolution = resolution;
    this.postProcess.resize(this.resolution);
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
    this.plane!.setGui(this.pane);
    this.postProcess.setGui(this.pane);
  }
}
