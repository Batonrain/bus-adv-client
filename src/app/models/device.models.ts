import { AllocationType } from "./allocation-type.models";
import { City } from "./city.models";
import { Technician } from "./technician.models";

export interface Device {
    id: number;
    name: string;
    cityId: number;
    city: City;
    allocationTypeId: number;
    allocationType: AllocationType;
    technicianId: number;
    technician: Technician;
    bucket: string;
    prefix: string;
    deviceId: string;
    routeNumber: string;
    isOnline: boolean;
    translationUrl: string;
}