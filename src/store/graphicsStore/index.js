import { makeAutoObservable } from 'mobx';
import { createRenderer, createCamera } from 'utils/threeHelpers';
import gsap from 'gsap';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Clock, Color, Euler, Scene, Vector3 } from 'three';
import Text from './text';

class Store {
  initialized = false;

  clock = new Clock();

  scene = new Scene();

  controls;

  renderer;

  camera;

  constructor() {
    makeAutoObservable(this);

    this.scene.background = new Color(0x000000);

    this.renderer = createRenderer();

    this.camera = createCamera();
    this.camera.position.set(15, 12, 9);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = false;

    this.xTo = gsap.quickTo(this.camera.position, 'x', {
      ease: 'back',
      duration: 1
    });
    this.yTo = gsap.quickTo(this.camera.position, 'y', {
      ease: 'back',
      duration: 1
    });
    this.zTo = gsap.quickTo(this.camera.position, 'z', {
      ease: 'back',
      duration: 1
    });

    this.createText();

    this.addEventListeners();

    this.animate();
  }

  updateWindowSize(width, height) {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    this.render();

    return this;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    this.controls.update(delta);

    this.render();
  }

  render() {
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }

  addEventListeners() {
    window.addEventListener('pointermove', this.onPointerMove.bind(this));
  }

  onPointerMove({ x, y }) {
    const { innerWidth, innerHeight } = window;
    const newX = 15 + (x - innerWidth / 2) / 350;
    const newY = 12 + (y - innerHeight / 2) / 350;

    this.xTo(newX);
    this.yTo(newY);
  }

  createText() {
    const text1 = new Text({
      text: 'ARTUR',
      position: new Vector3(-5, -0.5, 12),
      rotation: new Euler(-Math.PI / 2, 0, Math.PI / 2)
    });
    const text2 = new Text({
      text: 'IBRAGIMOV',
      position: new Vector3(1, -0.5, 12),
      rotation: new Euler(-Math.PI / 2, 0, Math.PI / 2)
    });
    const text3 = new Text({
      text: 'PORTFOLIO',
      position: new Vector3(7, -0.5, 12),
      rotation: new Euler(-Math.PI / 2, 0, Math.PI / 2)
    });

    this.scene.add(text1, text2, text3);
  }
}

export default new Store();
