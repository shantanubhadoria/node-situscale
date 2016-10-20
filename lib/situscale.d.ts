import * as noble from "noble";
import { Peripheral } from "noble";
export declare class SituScale {
    static serviceId: string;
    static weightNotificationId: string;
    static searchScales(callback: (scale: SituScale) => void): void;
    static startScanning(): void;
    static stopScanning(): void;
    address: string;
    callback: (weight: number) => void;
    peripheral: Peripheral;
    weightService: noble.Service;
    weightNotifyCharacteristic: noble.Characteristic;
    constructor(peripheral: string | Peripheral, callback?: (weight: number) => void);
    pauseNotifications(): void;
    startNotifications(): void;
    disconnect(): void;
    private getWeight();
    private getService();
    private getWeightFromService();
}
