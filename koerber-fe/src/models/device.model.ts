export enum DEVICE_TYPE {
  SMARTPHONE,
  TABLET,
  CAMERA
}
export interface Device {
  id: string;
  name: string;
  type: DEVICE_TYPE;
  ownerName: string;
  batteryStatus: number;
}
