export enum DEVICE_TYPE {
  SMARTPHONE = 'SMARTPHONE',
  TABLET = 'TABLET',
  CAMERA = 'CAMERA'
}
export interface Device {
  id: string;
  name: string;
  type: DEVICE_TYPE;
  ownerName: string;
  batteryStatus: number;
}

export const newDevice: Device = {
  id: '',
  name: '',
  type: DEVICE_TYPE.SMARTPHONE,
  ownerName: '',
  batteryStatus: 40
};
