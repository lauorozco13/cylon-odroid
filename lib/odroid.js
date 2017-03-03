"use strict";

var Cylon = require("cylon"),
    OdroidCore = require("./odroid-core"),
    _PINS = require('./PINMAPPING'),
    AnalogPin = require('./analog-pin'),
    I2CDevice = require("./i2c-device");

var Odroid = module.exports = function Odroid(opts) {
  Odroid.__super__.constructor.apply(this, arguments);
  opts = opts || {};
  this.digitalPins = {};
  this.analogPins = {};
  this.BOARD = "";
  //
  this.i2cDevices = {};
  //Allow passing more options to shifterShield property
  //Allowed options
  /**
   * shifterShield: {
      inverted: true||false
     }
   *
   * */
  this.shifterShieldInverted = typeof opts.shifterShield === "object"? opts.shifterShield.inverted : false;
  
  if(this.shifterShieldInverted){
    this.shifterShield = true;
  } else {
    this.shifterShield = typeof opts.shifterShield === "boolean"? opts.shifterShield : false;
  }

  this.events = [
    "analogRead",
    "digitalRead",
    "digitalWrite",
    "i2cWrite",
    "i2cRead"
  ];
};

Cylon.Utils.subclass(Odroid, Cylon.Adaptor);

Odroid.prototype.connect = function(callback) {
  this.BOARD = OdroidCore.getHardware();
  if(this.BOARD !== null){
    Cylon.Logger.log("ODROID-" + this.BOARD + " Detected.");
    if(this.shifterShield && (this.BOARD === "XU4" || this.BOARD === "XU3")){
      Cylon.Logger.log("ODROID-" + this.BOARD + " attached to the Shifter Shield");
      
      //Default shifterShield Mapping else invert mappings
      this.shifterShieldInverted? this.BOARD = "_SHIFTERSHIELD" : this.BOARD = "SHIFTERSHIELD";
      
    }else if(!(this.BOARD === "XU4" || this.BOARD === "XU3")){
      Cylon.Logger.log("ODROID-" + this.BOARD + " Does not support the Shifter Shield");
    }

    //Use right i2c bus for this BOARD
    this.__assignBus();

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

  if (this.digitalPins[gpioExportNumber] == null) {
    this.digitalPins[gpioExportNumber] = new Cylon.IO.DigitalPin({
      pin: gpioExportNumber,
      mode: mode
    });
  }

  return this.digitalPins[gpioExportNumber];
};

Odroid.prototype._disconnectPins = function() {
  var digitalPin;

  for (digitalPin in this.digitalPins) {
    this.digitalPins[digitalPin].closeSync();
  }
  
  var analogPin;
  for (analogPin in this.analogPins) {
    this.analogPins[analogPin].closeSync();
  }
};

Odroid.prototype.digitalRead = function(pinNum, callback) {
  var pin = this.digitalPins[this._digitalPinMap(pinNum)];

  if (pin == null) {
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
  var pin = this.digitalPins[this._digitalPinMap(pinNum)];

  if (pin != null) {
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

Odroid.prototype.analogRead = function(pinNum, callback) {
  var pin = this.analogPins[this._analogPinMap(pinNum)];

  if(pin == null) {
    pin = new AnalogPin({
      BOARD: this.BOARD, 
      pin: this._analogPinMap(pinNum)
    });
    
    pin.on("analogRead", function(val) {
      this.respond("analogRead", callback, null, val, pinNum);
    }.bind(this));

    pin.on("connect", function() {
      pin.analogRead();
    });

    pin.connect();
  }

  return true;
}

/**
 * I2C 
 */
Odroid.prototype.i2cWrite = function(address, cmd, buff, callback) {
  buff = buff || [];

  this._i2cDevice(address).write(cmd, buff, function() {
    this.respond("i2cWrite", callback, null, address, cmd, buff);
  }.bind(this));
};

Odroid.prototype.i2cRead = function(address, cmd, length, callback) {
  this._i2cDevice(address).read(cmd, length, function(err, data) {
    this.respond("i2cRead", callback, err, data);
  }.bind(this));
};

Odroid.prototype._i2cDevice = function(address) {
  if (this.i2cDevices[address] == null) {
    this.i2cDevices[address] = new I2CDevice({
      address: address,
      bus: this.bus
    });
    this.i2cDevices[address].connect();
  }
  return this.i2cDevices[address];
};

Odroid.prototype.__assignBus = function() {
  switch(this.BOARD){
    case 'XU3':
    case 'XU4':
    case 'SHIFTERSHIELD':
    case '_SHIFTERSHIELD':
      this.bus = 4
      break;
  }
}

Odroid.prototype.commands = [
  "pins",
  "pinMode",
  "digitalRead",
  "digitalWrite",
  "analogRead",
  "i2cWrite",
  "i2cRead"
];