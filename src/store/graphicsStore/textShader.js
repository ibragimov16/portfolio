export const vertex = `
uniform vec3 bboxMin;
uniform vec3 bboxMax;

varying vec3 vUv;

void main() {
  vUv.z = (position.z - bboxMin.z) / (bboxMax.z - bboxMin.z);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragment = `
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;

varying vec3 vUv;

void main() {
  gl_FragColor = vec4(mix(mix(color1, color2, vUv.z), mix(color2, color3, vUv.z), vUv.z), 1.0);
}
`;
