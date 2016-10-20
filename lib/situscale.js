"use strict";
var noble = require("noble");
var SituScale = (function () {
    function SituScale(peripheral, callback) {
        if (typeof peripheral !== "string") {
            this.address = peripheral.address;
            this.peripheral = peripheral;
        }
        else if (typeof peripheral === "string") {
            this.address = peripheral;
        }
        this.callback = callback;
        this.getWeight();
    }
    SituScale.searchScales = function (callback) {
        SituScale.startScanning();
        noble.on("discover", function (peripheral) {
            peripheral.on("disconnect", function () {
                noble.stopScanning();
                noble.startScanning();
            });
            callback(new SituScale(peripheral));
        });
    };
    SituScale.startScanning = function () {
        noble.on("stateChange", function (state) {
            if (state === "poweredOn") {
                noble.startScanning([SituScale.serviceId], false);
            }
            else {
                noble.stopScanning();
                throw new Error("State is " + state + " (not poweredOn). Switch on your bluetooth dongle/module.");
            }
        });
    };
    SituScale.stopScanning = function () {
        noble.stopScanning();
    };
    SituScale.prototype.pauseNotifications = function () {
        this.weightNotifyCharacteristic.notify(false, function (error) {
            if (error) {
                throw new Error(error);
            }
        });
    };
    SituScale.prototype.startNotifications = function () {
        this.weightNotifyCharacteristic.notify(true, function (error) {
            if (error) {
                throw new Error(error);
            }
        });
    };
    SituScale.prototype.disconnect = function () {
        this.peripheral.disconnect();
    };
    SituScale.prototype.getWeight = function () {
        var _this = this;
        if (!this.peripheral) {
            SituScale.startScanning();
            noble.on("discover", function (peripheral) {
                if (peripheral.id === _this.address || peripheral.address === _this.address) {
                    _this.peripheral = peripheral;
                    SituScale.stopScanning();
                    _this.getService();
                }
            });
        }
        else {
            this.getService();
        }
    };
    SituScale.prototype.getService = function () {
        var _this = this;
        this.peripheral.connect(function (error) {
            if (error) {
                throw new Error(error);
            }
            _this.peripheral.discoverServices([SituScale.serviceId], function (serviceDiscoveryError, services) {
                if (serviceDiscoveryError) {
                    throw new Error(serviceDiscoveryError);
                }
                _this.weightService = services[0];
                _this.getWeightFromService();
            });
        });
    };
    SituScale.prototype.getWeightFromService = function () {
        var _this = this;
        this.weightService.discoverCharacteristics([SituScale.weightNotificationId], function (error, characteristics) {
            if (error) {
                throw new Error(error);
            }
            _this.weightNotifyCharacteristic = characteristics[0];
            _this.weightNotifyCharacteristic.on("read", function (data, isNotification) {
                _this.callback(parseInt(data.toString("ascii"), 10));
            });
            _this.startNotifications();
        });
    };
    SituScale.serviceId = "6e400001b5a3f393e0a9e50e24dcca9e";
    SituScale.weightNotificationId = "6e400003b5a3f393e0a9e50e24dcca9e";
    return SituScale;
}());
exports.SituScale = SituScale;
