import * as THREE from 'three';

import { PerspectiveCamera } from '../cameras/PerspectiveCamera';
import { OrthographicCamera } from '../cameras/OrthographicCamera';

export abstract class Scene {
  protected renderer: THREE.WebGLRenderer;
  protected resolution: THREE.Vector2;

  protected scene: THREE.Scene;
  protected camera: THREE.Camera | null;

  constructor(renderer: THREE.WebGLRenderer, resolution: THREE.Vector2) {
    this.renderer = renderer;
    this.resolution = resolution;

    this.scene = new THREE.Scene;
    this.camera = null;
  }

  setCamera<T extends PerspectiveCamera | OrthographicCamera>(camera: T) {
    this.camera = camera;
  }
}
