var Cylon = require("cylon");
var CylonGPIO = require("cylon-gpio");
var OdroidCore = require("../../odroid-core");
var _PINS = require("./PINMAPPING");

var XU4_12PIN = module.exports = function XU4_12PIN(opts){
    OdroidCon11.__super__.constructor.apply(this, arguments);
    opts = opts || {};
    this.BOARD = "";
    this.pins = {};
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

  for (pin in this.pins) {
    this.digitalPins[pin].closeSync();
  }
};