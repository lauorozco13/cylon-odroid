"use strict";

var Cylon = require("cylon"),
  SYSFS = require("fs"),
  EventEmitter = require("events").EventEmitter,
  ADC_DIR = require("./SYSFS_DIRECTORIES").ADC_DIRS;
    

var AnalogPin = module.exports = function AnalogPin(opts) {
  this.BOARD = opts.BOARD;
  this.pin = opts.pin;
  this.interval = opts.inverval;
}; 

Cylon.Utils.subclass(AnalogPin, EventEmitter);

AnalogPin.prototype.connect = function() {
  if (SYSFS.existsSync(ADC_DIR[this.BOARD] + this.pin)) {
    this.emit("connect"); 
    this.RAWFILE =  ADC_DIR[this.BOARD] + this.pin;
  }
};

AnalogPin.prototype.analogRead = function() {
  var self = this;
  setInterval(function() {
    SYSFS.readFile(self.RAWFILE, function(err, data) {
      if (err) {
        self.emit(
                "error",
                "Error occurred while reading from pin " + self.pin
                );
        return;
      }

      self.emit("analogRead", parseInt(data.toString(), 10));
    });
  }, self.interval < 5 ? 10 : self.interval);

  return true;
};

AnalogPin.prototype.closeSync = function() {
};