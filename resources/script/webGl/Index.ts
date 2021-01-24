import * as THREE from 'three';

import { WebGlContents } from './WebGlContents';

export class Index {

  public canvas: HTMLCanvasElement;
  public resolution: THREE.Vector2;

  protected webGlContents: WebGlContents;

  constructor() {
    const canvas = document.querySelector<HTMLCanvasElement>('#canvas');
    if(!canvas) throw new Error('canvas element is not found');
    this.canvas = canvas;
    this.resolution = new THREE.Vector2(
      document.body.clientWidth,
      window.innerHeight
    )
    this.webGlContents = new WebGlContents(canvas, this.resolution);
  }
}
