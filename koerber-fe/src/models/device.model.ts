enum DeviceType {
  SMARTPHONE,
  TABLET,
  Camera
}
export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  ownerName: string;
  batteryStatus: number;
}
