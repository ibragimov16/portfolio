import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { Font } from 'three/addons/loaders/FontLoader.js';
import { Color, DoubleSide, Group, Mesh, ShaderMaterial, Vector3 } from 'three';
import { fragment, vertex } from './textShader';

import Aventa from 'assets/fonts/Aventa/Aventa-Thin.json';

const font = new Font(Aventa);

class Text extends Group {
  isText = true;

  mesh;

  constructor(data = {}) {
    super();

    this.data = data;

    const geometry = new TextGeometry(data.text, {
      bevelEnabled: false,
      curveSegments: 100,
      height: 1.2,
      size: 4,
      font
    });

    geometry.computeBoundingBox();

    const material = new ShaderMaterial({
      uniforms: {
        color1: { value: new Color(0x000000) },
        color2: { value: new Color(0x000000) },
        color3: { value: new Color(0x5a5a5a) },
        bboxMin: { value: geometry.boundingBox.min },
        bboxMax: { value: geometry.boundingBox.max }
      },
      fragmentShader: fragment,
      vertexShader: vertex,
      side: DoubleSide
    });

    this.mesh = new Mesh(geometry, material);

    this.position.copy(data.position);
    this.rotation.copy(data.rotation);

    this.add(this.mesh);
  }
}

export default Text;
