import { OrthographicCamera, Vector3 } from 'three';

class Camera extends OrthographicCamera {
  defaultPosition = new Vector3(15, 12, 9);

  constructor() {
    const near = 0.001;
    const far = 1000;

    super(-10, 10, 10, -10, near, far);

    this.position.copy(this.defaultPosition);
  }
}

export default Camera;
