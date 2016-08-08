var async = require('async');
var noble = require('noble');


function SituScale(address) {
  this.address = undefined;

  // Initialize peripheral if peripheral address is provided
  if(typeof address == 'string') {
    this.address = address.toLowerCase();
  }
}

function startScanning() {
  noble.on('stateChange', function(state) {
    if (state === 'poweredOn') {
      noble.startScanning(['6e400001b5a3f393e0a9e50e24dcca9e'], false);
    } else {
      console.log("State is " + state + " (not poweredOn). Switch on your bluetooth dongle/module.");
      noble.stopScanning();
    }
  });
}

function setNotification(characteristic, status) {
  characteristic.notify(status, function(error) {
    if(error)
      console.error(error);
  });
}

SituScale.prototype.searchScales = function(callback) {
  startScanning();
  noble.on('discover', function(peripheral) {
    if(typeof callback == 'function')
      callback(peripheral);
  });
};

SituScale.prototype.stopSearching = function(callback) {
  noble.stopScanning(callback);
};

SituScale.prototype.getWeight = function(callback) {
  var situScale = this;
  startScanning();

  noble.on('discover', function(peripheral) {
    if(peripheral.id === situScale.address || peripheral.address === situScale.address) {
      situScale.peripheral = peripheral;
      noble.stopScanning();
      getService(peripheral);
    }
  });

  function getService(peripheral) {
    peripheral.connect(function(error) {
      if(error)
        console.error(error);

      peripheral.discoverServices(['6e400001b5a3f393e0a9e50e24dcca9e'], function(error, services) {
        if(error)
          console.error(error);

        var weightService = services[0];
        getWeight(weightService);
      });
    });
  }

  function getWeight(weightService) {
    weightService.discoverCharacteristics(['6e400003b5a3f393e0a9e50e24dcca9e'], function(error, characteristics) {
      if(error)
        console.error(error);

      var weightNotifyCharacteristic = characteristics[0];
      situScale.notifyCharacteristic = weightNotifyCharacteristic;
        weightNotifyCharacteristic.on('read', function(data, isNotification) {
          callback(parseInt(data.toString(0)));
        });

        setNotification(weightNotifyCharacteristic, true);
    });
  }
};

SituScale.prototype.disconnect = function() {
  var situScale = this;
  situScale.peripheral.disconnect();
};

SituScale.prototype.startNotifications = function() {
  var situScale = this;
  setNotification(situScale.notifyCharacteristic, true);
};

SituScale.prototype.stopNotifications = function() {
  var situScale = this;
  setNotification(situScale.notifyCharacteristic, false);
};

module.exports = SituScale;
