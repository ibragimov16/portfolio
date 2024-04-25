import gsap from 'gsap';
import {
  LinearMipMapLinearFilter,
  MeshStandardMaterial,
  SRGBColorSpace,
  PlaneGeometry,
  TextureLoader,
  LinearFilter,
  DoubleSide,
  Vector2,
  Color,
  Group,
  Mesh
} from 'three';

class Plane extends Group {
  isPlane = true;

  mesh;

  constructor(data = {}) {
    super();

    this.data = data;

    this.geometry = new PlaneGeometry(16, 9, 10, 10);

    this.geometry.computeBoundingBox();

    this.material = new MeshStandardMaterial({
      color: new Color(0xffffff),
      transparent: true,
      side: DoubleSide,
      opacity: 0
    });

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.scale.setScalar(0.5);

    this.position.copy(data.position);
    this.rotation.copy(data.rotation);

    this.add(this.mesh);
  }

  async loadTexture(url) {
    if (!url) return;

    const loader = new TextureLoader();
    const texture = await new Promise((resolve) => {
      loader.load(url, (texture) => {
        loader.manager.onLoad = () => resolve(texture);
      });
    });

    texture.center = new Vector2(0.5, 0.5);
    texture.repeat = new Vector2(-1, 1);
    texture.minFilter = LinearMipMapLinearFilter;
    texture.colorSpace = SRGBColorSpace;
    texture.magFilter = LinearFilter;
    texture.anisotropy = 8;

    this.mesh.material.map = texture;

    gsap.quickTo(this.mesh.material, 'opacity', {
      ease: 'power1',
      duration: 1
    })(1);

    return texture;
  }
}

export default Plane;
