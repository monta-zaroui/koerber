enum DeviceType {
  SMARTPHONE,
  TABLET,
  Camera
}
export type Device = {
  id: string;
  name: string;
  type: DeviceType;
  ownerName: string;
  batteryStatus: number;
}