import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface PerspectiveCameraParams {
  fov: number;
  aspect: number;
  near: number;
  far: number;
}

interface Controls {
  canControl: boolean;
  element: HTMLElement;
  enableDamping: boolean;
  dampingFactor: number;
}

export type PerspectiveCameraOptions = Partial <PerspectiveCameraParams & Controls>

export class PerspectiveCamera extends THREE.PerspectiveCamera {

  public controls: OrbitControls | null;
  public time: number;
  protected canControl: boolean;


  constructor(options?: PerspectiveCameraOptions) {
    super(options?.fov, options?.aspect, options?.near, options?.far);

    this.time = 0;
    this.canControl = true;
    this.controls = null;

    if (!options?.element) return;
    if (!this.canControl) return;
    this.controls = new OrbitControls(this, options?.element);
    this.controls.enableDamping = options?.enableDamping || false;
    this.controls.dampingFactor = options?.dampingFactor ?? 0.2;
  }

  init() {
    this.position.set(0, 0, 20);
    this.lookAt(new THREE.Vector3(0, 0, 0));
  }

  resize(resolution) {
    this.aspect = resolution.x / resolution.y;
    this.updateProjectionMatrix();
  }

  update(deltaTime) {
    this.time += deltaTime;

    if (!this.controls) return;
    this.controls.update();
  }
}
