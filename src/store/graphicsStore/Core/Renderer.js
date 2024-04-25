import { Color, LinearToneMapping, WebGLRenderer } from 'three';

class Renderer extends WebGLRenderer {
  constructor() {
    super({ preserveDrawingBuffer: true, antialias: true, alpha: true });

    this.toneMapping = LinearToneMapping;
    this.physicallyCorrectLights = true;
    this.toneMappingExposure = 1;
    this.autoClear = true;

    this.setPixelRatio(window.devicePixelRatio);
    this.setClearColor(new Color(0), 0);
    this.setClearAlpha(1);
  }
}

export default Renderer;
