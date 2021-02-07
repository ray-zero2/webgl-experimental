import * as THREE from 'three';
import { Hello } from '../utils/Hello';

interface BaseParams extends THREE.WebGLRendererParameters {
  skipHello?: boolean;
}

export class Base {
  protected renderer: THREE.WebGLRenderer;
  protected resolution: THREE.Vector2;
  protected clock: THREE.Clock;

  constructor(params: BaseParams, resolution: THREE.Vector2) {
    if(!params.skipHello) new Hello();



    this.renderer = new THREE.WebGLRenderer(params);
    this.renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, 1), 2));
    this.renderer.setClearColor(0x000000, 1.0);

    const { domElement } = this.renderer;
    console.log({ domElement });

    this.resolution = new THREE.Vector2(domElement.clientWidth, domElement.clientHeight);

    console.log(this.resolution);
    console.log(resolution);

    this.renderer.setSize(resolution.x, resolution.y);

    this.clock = new THREE.Clock(false);
  }

  public getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  public onResize() {}
  public onOrientationDevice() {}
  public render() {}
}
