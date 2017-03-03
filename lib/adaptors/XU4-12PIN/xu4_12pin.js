"use strict";

var Cylon = require("cylon"),
  CylonGPIO = require("cylon-gpio"),
  OdroidCore = require("../../odroid-core"),
  _PINS = require("./PINMAPPING"),
  I2CDevice = require("../../i2c-device");

var XU4_12PIN = module.exports = function XU4_12PIN(opts) {
  XU4_12PIN.__super__.constructor.apply(this, arguments);
  opts = opts || {};
  this.BOARD = "";
  this.digitalPins = {};
  this.i2cDevices = {};

  this.events = [
    "digitalRead",
    "digitalWrite",
    "i2cWrite",
    "i2cRead"
  ];
};

Cylon.Utils.subclass(XU4_12PIN, Cylon.Adaptor);

XU4_12PIN.prototype.connect = function(callback) {
  this.BOARD = OdroidCore.getHardware();
  
  if (this.BOARD !== null) {
    if (this.BOARD === "XU4" || this.BOARD === "XU3") {
      Cylon.Logger.log("ODROID-XU4 board is ready to use CON11 12 pin GPIOs.");
    } else {
      Cylon.Logger.log("ODROID-" + this.BOARD + " Does not feature the CON11 12 pin GPIOs");
    }
    callback();
  } else {
    Cylon.Logger.log("ODROID board not detected.");
  }
};

XU4_12PIN.prototype.disconnect = function(callback) {
  // Disconnect pins
  this._disconnectPins();
  
  this.emit("disconnect");
  Cylon.Logger.debug("ODROID-" + this.BOARD + " Disconnected.");
  callback();
};

XU4_12PIN.prototype._disconnectPins = function() {
  var pin;

  for (pin in this.digitalPins) {
    this.digitalPins[pin].closeSync();
  }
};

XU4_12PIN.prototype._digitalPinMap = function(pinNum) {
  var pin = _PINS.DIGITAL[this.BOARD][pinNum];
  return pin;
};

XU4_12PIN.prototype._digitalPin = function(pinNum, mode) {
  var gpioExportNumber = this._digitalPinMap(pinNum);

  if (this.digitalPins[gpioExportNumber] == null) {
    this.digitalPins[gpioExportNumber] = new Cylon.IO.DigitalPin({
      pin: gpioExportNumber,
      mode: mode
    });
  }

  return this.digitalPins[gpioExportNumber];
};


XU4_12PIN.prototype.digitalRead = function(pinNum, callback) {
  var pin = this.digitalPins[this._digitalPinMap(pinNum)];

  if (pin == null) {
    pin = this._digitalPin(pinNum, "r");

    pin.on("digitalRead", function(val) {
      this.respond("digitalRead", callback, null, val, pinNum);
    }.bind(this));

    pin.on("connect", function() {
      pin.digitalRead(20);
    });

    pin.connect();
  }

  return true;
};

XU4_12PIN.prototype.digitalWrite = function(pinNum, value, callback) {
  var pin = this.digitalPins[this._digitalPinMap(pinNum)];

  if (pin != null) {
    pin.digitalWrite(value);
  } else {
    pin = this._digitalPin(pinNum, "w");
    
    pin.on("digitalWrite", function(val) {
      this.respond("digitalWrite", callback, null, val, pinNum);
    }.bind(this));

    pin.on("connect", function() {
      pin.digitalWrite(value);
    });

    pin.connect();
  }

  return value;
};

XU4_12PIN.prototype.i2cWrite = function(address, cmd, buff, callback) {
  buff = buff || [];

  this._i2cDevice(address).write(cmd, buff, function() {
    this.respond("i2cWrite", callback, null, address, cmd, buff);
  }.bind(this));
};

XU4_12PIN.prototype.i2cRead = function(address, cmd, length, callback) {
  this._i2cDevice(address).read(cmd, length, function(err, data) {
    this.respond("i2cRead", callback, err, data);
  }.bind(this));
};

XU4_12PIN.prototype._i2cDevice = function(address) {
  if (this.i2cDevices[address] == null) {
    this.i2cDevices[address] = new I2CDevice({
      address: address,
      bus: 1
    });
    this.i2cDevices[address].connect();
  }
  return this.i2cDevices[address];
};

XU4_12PIN.prototype.commands = [
  "pins",
  "pinMode",
  "digitalRead",
  "digitalWrite",
  "i2cWrite",
  "i2cRead"
];