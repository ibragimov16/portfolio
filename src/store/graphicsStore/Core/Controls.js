import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Controls extends OrbitControls {
  constructor(camera, renderer) {
    super(camera, renderer.domElement);

    this.enabled = false;
  }
}

export default Controls;
