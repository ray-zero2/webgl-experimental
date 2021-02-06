import * as THREE from 'three';

interface CursorOptions {
  useRaycaster: boolean;
  enableDamping: boolean;
  dampingFactor: number;
}

export class Cursor {
  static transformToNormalizedDeviceCoord(position: THREE.Vector2, resolution: THREE.Vector2) {
    const resolutionX = resolution.x;
    const resolutionY = resolution.y;
    if (resolutionX === 0 || resolutionY === 0) return new THREE.Vector2(0, 0);

    const positionX = position.x;
    const positionY = position.y;

    const transformedX = positionX / (resolutionX / 2) - 1;
    const transformedY = positionY / (resolutionY / 2) - 1;

    const transformedPosition = new THREE.Vector2(transformedX, -transformedY);
    transformedPosition.clampScalar(-1, 1);
    return transformedPosition;
  }

  public raycaster?: THREE.Raycaster;
  public resolution: THREE.Vector2;
  public position: THREE.Vector2;
  public start: THREE.Vector2;
  public lastStart: THREE.Vector2;
  public lastPosition: THREE.Vector2;
  public isTouched: boolean;
  public isDumping: boolean;
  public canHover: boolean;

  constructor(resolution: THREE.Vector2, cursorOption: Partial<CursorOptions>) {
    if(cursorOption.useRaycaster) this.raycaster = new THREE.Raycaster();
    this.resolution = resolution;
    this.position = new THREE.Vector2();
    this.start = new THREE.Vector2();
    this.lastStart = new THREE.Vector2();
    this.lastPosition = new THREE.Vector2();
    this.isTouched = false;
    this.isDumping = false;
    this.canHover = false;
  }

  touchStart(event) {
    if (!('touches' in event)) event.preventDefault();
    this.isTouched = true;
  }

  touchMove(event) {
    if (!this.canHover && !this.isTouched) return;
    if (!('touches' in event)) event.preventDefault();
    const x = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const y = 'touches' in event ? event.touches[0].clientY : event.clientY;
    this.position.set(x, y);
    const normalizedDeviceCoord = Cursor.transformToNormalizedDeviceCoord(
      this.position,
      this.resolution
    );
    const _x = normalizedDeviceCoord.x;
    const _y = normalizedDeviceCoord.y;
  }

  touchEnd(event) {
    this.isTouched = false;
  }

  resize(resolution) {
    this.resolution = resolution;
  }

  update() {
    if (!this.isDumping) return;
  }

  public bind() {
    window.addEventListener('mousedown', this.touchStart.bind());
  }
}
