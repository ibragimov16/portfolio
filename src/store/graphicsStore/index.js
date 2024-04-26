import { makeAutoObservable } from 'mobx';
import { projects } from 'data/projects';
import gsap from 'gsap';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AmbientLight, Box3, Clock, Color, Euler, Group, Scene, Vector3 } from 'three';
import Renderer from './Core/Renderer';
import Camera from './Core/Camera';
import Plane from './Plane';
import Text from './Text';

class Store {
  initialized = false;

  planesGroup = new Group();

  renderer = new Renderer();

  camera = new Camera();

  clock = new Clock();

  scene = new Scene();

  scrollProgress = 0;

  controls;

  light;

  constructor() {
    makeAutoObservable(this);

    this.scene.background = new Color(0x000000);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = false;

    this.light = new AmbientLight(new Color(0xffffff), 1.25);

    this.planesGroup.position.set(1.5, 1.25, 0);

    this.scene.add(this.light, this.planesGroup);

    this.createText();

    this.createPlanes();

    this.addEventListeners();

    this.animate();
  }

  updateWindowSize(width, height) {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    this.render();

    return this;
  }

  render() {
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    const elapsedTime = this.clock.getElapsedTime();
    const delta = this.clock.getDelta();
    this.controls.update(delta);

    this.planesGroup.children.forEach((plane, index) => {
      const { position } = plane.geometry.attributes;

      for (let i = 0; i < position.count; i++) {
        let x = position.getX(i);
        let y = position.getY(i);
        let z = position.getZ(i);

        const scale = 0.6;
        const speed = 1;
        const multiplier = 4;
        const coord = x / multiplier;
        const gap = 2 * (index + multiplier);

        z = Math.sin(gap + coord + (elapsedTime + this.planesGroup.position.z) * speed) * scale;

        position.setXYZ(i, x, y, z);
      }

      position.needsUpdate = true;
    });

    this.render();
  };

  addEventListeners() {
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

    this.scroll = gsap.quickTo(this.planesGroup.position, 'z', {
      ease: 'power2.out',
      duration: 1
    });

    window.addEventListener('mousemove', this.onPointerMove);
  }

  onPointerMove = ({ x, y }) => {
    const { innerWidth, innerHeight } = window;
    const newX = 15 + (x - innerWidth / 2) / 350;
    const newY = 12 + (y - innerHeight / 2) / 350;

    this.xTo(newX);
    this.yTo(newY);
  };

  onScroll = (progress) => {
    this.scrollProgress = progress;

    const box = new Box3().setFromObject(this.planesGroup);
    const size = box.getSize(new Vector3());
    const z = (size.z - 30) * progress;

    this.scroll(z);
  };

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

  async createPlanes() {
    for (let index = 0; index < projects.length; index++) {
      const project = projects[index];

      const plane = new Plane({
        position: new Vector3(0, 0, 8 - index * 10),
        rotation: new Euler(Math.PI / 2, 0, Math.PI / 2),
        preview: project.preview
      });

      await plane.loadTexture(project.preview);

      this.planesGroup.add(plane);

      this.onScroll(this.scrollProgress);
    }
  }
}

export default new Store();
