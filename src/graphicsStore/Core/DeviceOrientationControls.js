import { MathUtils } from 'three';

const DEG2RAD = (deg) => MathUtils.DEG2RAD * deg;

class DeviceOrientationControls {
  initialDeviceOrientation = {};

  deviceOrientation = {};

  connected = false;

  enabled = false;

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  connect() {
    window.addEventListener('deviceorientation', this.update);

    this.connected = true;
  }

  disconnect() {
    window.removeEventListener('deviceorientation', this.update);

    this.connected = false;
  }

  update = (event) => {
    this.deviceOrientation = event;

    if (Object.keys(this.initialDeviceOrientation).length === 0) {
      this.initialDeviceOrientation = event;
    }

    if (this.enabled === false) return;

    const beta = DEG2RAD(this.initialDeviceOrientation.beta) - DEG2RAD(event.beta);
    const gamma = DEG2RAD(this.initialDeviceOrientation.gamma) - DEG2RAD(event.gamma);
    const alpha = DEG2RAD(this.initialDeviceOrientation.alpha) - DEG2RAD(event.alpha);

    this.onUpdate({ beta, gamma, alpha });
  };

  onUpdate = () => {};
}

export default DeviceOrientationControls;
