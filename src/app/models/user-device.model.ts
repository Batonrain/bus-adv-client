import { Device } from "./device.models";

interface UserDevice {
    id: number;
    userId: string;
    user: User;
    deviceId: number;
    device: Device;
  }