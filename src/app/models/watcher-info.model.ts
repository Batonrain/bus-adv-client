import { WatcherDeviceModel } from "./watcher-device.model";

export interface WatcherInfoModel {
    id: string;
    name: string;
    email: string;
    devices: WatcherDeviceModel[];
}