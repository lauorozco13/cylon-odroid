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
};

Cylon.Utils.subclass(Odroid, Cylon.Adaptor);

Odroid.prototype.connect = function(callback) {
  this.BOARD = OdroidCore.getHardware();
  if(this.BOARD !== null){
    Cylon.Logger.log("ODROID-" + this.BOARD + " Detected.");
    callback();
  }else{
    Cylon.Logger.log("ODROID board not detected.");
  }
};

Odroid.prototype.disconnect = function(callback) {
  this.emit("disconnect");
  Cylon.Logger.debug("ODROID-" + this.BOARD + " Disconnected.");

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