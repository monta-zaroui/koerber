enum TYPE {
  SMARTPHONE,
  TABLET,
  Camera
}
export interface Device {
  id: string;
  name: string;
  type: TYPE;
  ownerName: string;
  batteryStatus: number;
}
