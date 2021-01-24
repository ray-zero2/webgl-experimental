import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface OrthographicCameraParams {
  left: number,
  right: number,
  top: number,
  bottom: number,
  near?: number,
  far?: number
}

interface Controls {
  canControl: boolean;
  element: HTMLElement;
  enableDamping: boolean;
  dampingFactor: number;
}

type Options = OrthographicCameraParams & Partial <Controls>

export class OrthographicCamera extends THREE.OrthographicCamera {

  public controls: OrbitControls | null;
  public time: number;
  protected canControl: boolean | undefined;


  constructor(options: Options) {
    super(options.top, options.right, options.top, options.bottom, options?.near, options?.far);

    this.time = 0;
    this.canControl = options.canControl;
    this.controls = null;

    if (!options.element) return;
    if (!this.canControl) return;
    this.controls = new OrbitControls(this, options.element);
    this.controls.enableDamping = options.enableDamping || false;
    this.controls.dampingFactor = options.dampingFactor ?? 0.2;
  }

  init() {
    this.position.set(-5, 5, 20);
    this.lookAt(new THREE.Vector3(0, 0, 0));
  }

  resize(resolution) {
    this.updateProjectionMatrix();
  }

  update(deltaTime) {
    this.time += deltaTime;

    if (!this.controls) return;
    this.controls.update();
  }
}
