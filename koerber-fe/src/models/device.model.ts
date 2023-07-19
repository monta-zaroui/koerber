enum type {
  SMARTPHONE,
  TABLET,
  Camera
}
export interface Device {
  id: string;
  name: string;
  type: type;
  ownerName: string;
  batteryStatus: number;
}
