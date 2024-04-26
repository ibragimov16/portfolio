import { configure, makeAutoObservable } from 'mobx';
import UAParser from 'ua-parser-js';

configure({ useProxies: 'never' });

export const deviceOrientationStatuses = {
  GRANTED: 'granted',
  DENIED: 'denied'
};

class DeviceStore {
  parser = null;

  deviceOrientationStatus = deviceOrientationStatuses.DENIED;

  constructor() {
    makeAutoObservable(this);

    this.parser = new UAParser();
  }

  get device() {
    return this.parser.getDevice();
  }

  get isMobile() {
    return this.device.type === 'mobile';
  }

  get isTablet() {
    return this.device.type === 'tablet';
  }

  get deviceOrientationGranted() {
    return this.deviceOrientationStatus === deviceOrientationStatuses.GRANTED;
  }

  setDeviceOrientationStatus = (status) => {
    this.deviceOrientationStatus = status;
    return status;
  };

  requestDeviceOrientation = async () => {
    try {
      if (!DeviceOrientationEvent.requestPermission) {
        return this.setDeviceOrientationStatus(deviceOrientationStatuses.GRANTED);
      }
      return await DeviceOrientationEvent.requestPermission().then((status) => {
        return this.setDeviceOrientationStatus(status);
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export default new DeviceStore();
