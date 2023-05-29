import { OrthographicCamera, LinearToneMapping, WebGLRenderer } from 'three';

export const createRenderer = () => {
  const renderer = new WebGLRenderer({
    preserveDrawingBuffer: true,
    antialias: true,
    alpha: true,
  });

  renderer.toneMappingExposure = 1;
  renderer.toneMapping = LinearToneMapping;
  renderer.physicallyCorrectLights = true;
  renderer.autoClear = true;

  renderer.setPixelRatio(window.devicePixelRatio);

  return renderer;
};

export const createCamera = () => {
  const near = 0.001;
  const far = 1000;

  return new OrthographicCamera(-10, 10, 10, -10, near, far);
};
