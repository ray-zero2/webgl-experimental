import * as THREE from 'three';
import { TextureAssets } from '../../../utils/zero';

import { Camera } from './Camera';
import { Plane } from './Plane';

export class Contents {

  public time: number;

  private plane: Plane | null;
  private resolution: THREE.Vector2;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: Camera;

  constructor(canvas: HTMLCanvasElement, resolution: THREE.Vector2) {
    this.resolution = resolution;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    })

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x0e0e0e, 1.0);
    this.renderer.setSize(this.resolution.x, this.resolution.y);

    this.scene = new THREE.Scene();

    this.camera = new Camera({
      fov: 50,
      aspect: resolution.x / resolution.y,
      far: 1000,
      element: canvas,
      enableDamping: true,
    });

    this.plane = null;

    this.time = 0;
  }

  public update(deltaTime: number) {
    this.time += deltaTime;
    this.camera.update(deltaTime);

    this.plane!.update(deltaTime);

    this.renderer.render(this.scene, this.camera);
  }

  public resize( resolution: THREE.Vector2 ) {
    this.resolution = resolution;
    this.camera.resize(this.resolution);
    this.renderer.setSize(this.resolution.x, this.resolution.y);
  }

  public async init( textures: TextureAssets ) {
    // console.log(textures.snoise);
    this.camera.init();
    this.plane = new Plane(textures);
    this.scene.add(this.plane);
  }
}
