"use strict";

var Cylon = require("cylon");
var OdroidCore = require("./odroid-core");
var _PINS = require('./PINMAPPING');

var Odroid = module.exports = function Odroid(opts) {
  Odroid.__super__.constructor.apply(this, arguments);
  opts = opts || {};
  this.digitalPins = {};
  this.analogPins = {};
  this.BOARD = "";
  this.shifterShield = opts.shifterShield;
};

Cylon.Utils.subclass(Odroid, Cylon.Adaptor);

Odroid.prototype.connect = function(callback) {
  this.BOARD = OdroidCore.getHardware();
  if(this.BOARD !== null){
    Cylon.Logger.log("ODROID-" + this.BOARD + " Detected.");
    if(this.shifterShield && this.BOARD === "XU4" || this.BOARD === "XU3"){
      this.BOARD = "SHIFTERSHIELD";
    }else{
      Cylon.Logger.log("ODROID-" + this.BOARD + " Does not support the Shifter Shield");
    }
    callback();
  }else{
    Cylon.Logger.log("ODROID board not detected.");
  }
};

Odroid.prototype.disconnect = function(callback) {
  //Disconnect pins
  this._disconnectPins();
  this.emit("disconnect");
  Cylon.Logger.debug("ODROID-" + OdroidCore.getHardware() + " Disconnected.");
  callback();
};

Odroid.prototype._digitalPinMap = function(pinNum) {
  var pin = _PINS.DIGITAL[pinNum];
  return pin[this.BOARD];
};

Odroid.prototype._analogPinMap = function(pinNum) {
  var pin = _PINS.ANALOG[pinNum];
  return pin[this.BOARD];
};

Odroid.prototype._digitalPin = function(pinNum, mode) {
  var gpioExportNumber = this._digitalPinMap(pinNum);

  if (this.pins[gpioExportNumber] === null) {
    this.pins[gpioExportNumber] = new Cylon.IO.DigitalPin({
      pin: gpioExportNumber,
      mode: mode
    });
  }

  return this.pins[gpioExportNumber];
};

Odroid.prototype._disconnectPins = function() {
  var pin;

  for (pin in this.pins) {
    this.pins[pin].closeSync();
  }
};

Odroid.prototype.digitalRead = function(pinNum, callback) {
  var pin = this.pins[this._digitalPinMap(pinNum)];

  if (pin === null) {
    pin = this._digitalPin(pinNum, "r");

    pin.on("digitalRead", function(val) {
      this.respond("digitalRead", callback, null, val, pinNum);
    }.bind(this));


    /**
     * Listen for the connect event to make sure the pin
       has been setup in Linux IO first. Once connected we
       trigger the digitalRead, this happens only once.
     */
    pin.on("connect", function() {
      pin.digitalRead(20);
    });

    pin.connect();
  }

  return true;
};

Odroid.prototype.digitalWrite = function(pinNum, value, callback) {
  var pin = this.pins[this._digitalPinMap(pinNum)];

  if (pin !== null) {
    pin.digitalWrite(value);
  } else {
    pin = this._digitalPin(pinNum, "w");

    pin.on("digitalWrite", function(val) {
      this.respond("digitalWrite", callback, null, val, pinNum);
    }.bind(this));

    /**
     * Listen for the connect event to make sure the pin
       has been setup in Linux IO first. Once connected we
       trigger the digitalRead, this happens only once.
     */
    pin.on("connect", function() {
      pin.digitalWrite(value);
    });

    // Connect the pin to Linux IO.
    pin.connect();
  }

  return value;
};

Odroid.prototype.commands = [
  "pins",
  "pinMode",
  "digitalRead",
  "digitalWrite",
  "analogRead"
];