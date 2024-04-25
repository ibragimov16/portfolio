import { OrthographicCamera } from 'three';

class Camera extends OrthographicCamera {
  constructor() {
    const near = 0.001;
    const far = 1000;

    super(-10, 10, 10, -10, near, far);

    this.position.set(15, 12, 9);
  }
}

export default Camera;
