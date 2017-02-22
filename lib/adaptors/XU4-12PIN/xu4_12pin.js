var Cylon = require("cylon");
var CylonGPIO = require("cylon-gpio");
var OdroidCore = require("../../odroid-core");
var _PINS = require("./PINMAPPING");

var XU4_12PIN = module.exports = function XU4_12PIN(opts){
    XU4_12PIN.__super__.constructor.apply(this, arguments);
    opts = opts || {};
    this.BOARD = "";
    this.digitalPins = {};

    this.events = [
      "digitalRead",
      "digitalWrite"
    ];
}

Cylon.Utils.subclass(XU4_12PIN, Cylon.Adaptor);

XU4_12PIN.prototype.connect = function(callback) {
  this.BOARD = OdroidCore.getHardware();
  
  if(this.BOARD !== null){
    if(this.BOARD === "XU4" || this.BOARD === "XU3"){
      Cylon.Logger.log("ODROID-XU4 board is ready to use CON11 12 pin GPIOs.");
    }else{
      Cylon.Logger.log("ODROID-" + this.BOARD + " Does not feature the CON11 12 pin GPIOs");
    }
    callback();
  }else{
    Cylon.Logger.log("ODROID board not detected.");
  }
};

XU4_12PIN.prototype.disconnect = function(callback) {
  //Disconnect pins
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

XU4_12PIN.prototype.commands = [
  "pins",
  "pinMode",
  "digitalRead",
  "digitalWrite"
];