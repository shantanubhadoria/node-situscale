import * as noble from "noble";
import { Peripheral }  from "noble";

export class SituScale {
  public static serviceId: string = "6e400001b5a3f393e0a9e50e24dcca9e";
  public static weightNotificationId: string = "6e400003b5a3f393e0a9e50e24dcca9e";

  public static searchScales(callback: (scale: SituScale) => void) {
    SituScale.startScanning();
    noble.on("discover", (peripheral) => {
      peripheral.on("disconnect", () => {
        noble.stopScanning();
        noble.startScanning();
      });
      callback(new SituScale(peripheral));
    });
  }

  public static startScanning() {
    noble.on("stateChange", (state) => {
      if (state === "poweredOn") {
        noble.startScanning([SituScale.serviceId], false);
      } else {
        noble.stopScanning();
        throw new Error("State is " + state + " (not poweredOn). Switch on your bluetooth dongle/module.");
      }
    });
  }

  public static stopScanning() {
    noble.stopScanning();
  }

  public address: string;
  public callback: (weight: number) => void;
  public peripheral: Peripheral;
  public weightService: noble.Service;
  public weightNotifyCharacteristic: noble.Characteristic;

  constructor(peripheral: string | Peripheral, callback?: (weight: number) => void) {
    if (typeof peripheral !== "string") {
      this.address = peripheral.address;
      this.peripheral = peripheral;
    } else if (typeof peripheral === "string") {
      this.address = peripheral;
    }
    this.callback = callback;

    this.getWeight();
  }

  public pauseNotifications() {
    this.weightNotifyCharacteristic.notify(false, (error: string) => {
      if (error) {
        throw new Error(error);
      }
    });
  }

  public startNotifications() {
    this.weightNotifyCharacteristic.notify(true, (error: string) => {
      if (error) {
        throw new Error(error);
      }
    });
  }

  public disconnect() {
    this.peripheral.disconnect();
  }

  private getWeight() {
    if (! this.peripheral) {
      SituScale.startScanning();
      noble.on("discover", (peripheral) => {
        if (peripheral.id === this.address || peripheral.address === this.address) {
          this.peripheral = peripheral;
          SituScale.stopScanning();
          this.getService();
        }
      });
    } else {
      this.getService();
    }
  }

  private getService() {
    this.peripheral.connect((error) => {
      if (error) {
        throw new Error(error);
      }

      this.peripheral.discoverServices([SituScale.serviceId], (serviceDiscoveryError, services) => {
        if (serviceDiscoveryError) {
          throw new Error(serviceDiscoveryError);
        }

        this.weightService = services[0];
        this.getWeightFromService();
      });
    });
  }

  private getWeightFromService() {
    this.weightService.discoverCharacteristics([SituScale.weightNotificationId], (error, characteristics) => {
      if (error) {
        throw new Error(error);
      }

      this.weightNotifyCharacteristic = characteristics[0];
      this.weightNotifyCharacteristic.on("read", (data, isNotification) => {
        this.callback(parseInt(data.toString("ascii"), 10));
      });

      this.startNotifications();
    });
  }
}
