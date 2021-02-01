import * as ZERO from '../../../utils/zero';

export class Camera extends ZERO.PerspectiveCamera {
  constructor(options: ZERO.PerspectiveCameraOptions) {
    super(options);
  }

  init() {
    super.init();
    this.position.set(0, 0, 100);
  }
}
