import { Vector2 } from 'three';

export default class Cursor {
  static transformToNormalizedDeviceCoord(position, resolution) {
    const resolutionX = resolution.x;
    const resolutionY = resolution.y;
    if (resolutionX === 0 || resolutionY === 0) return new Vector2(0, 0);

    const positionX = position.x;
    const positionY = position.y;

    const transformedX = positionX / (resolutionX / 2) - 1;
    const transformedY = positionY / (resolutionY / 2) - 1;

    const transformedPosition = new Vector2(transformedX, -transformedY);
    transformedPosition.clampScalar(-1, 1);
    return transformedPosition;
  }

  constructor(resolution) {
    this.resolution = resolution;
    this.position = new Vector2();
    this.start = new Vector2();
    this.lastStart = new Vector2();
    this.lastPosition = new Vector2();
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
}
