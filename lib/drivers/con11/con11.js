var Cylon = require("cylon");
var CylonGPIO = require("cylon-gpio");
var OdroidCore = require("../../odroid-core");
var _PINS = require("./PINMAPPING");

var OdroidCon11 = module.exports = function OdroidCon11(opts){
    OdroidCon11.__super__.constructor.apply(this, arguments);
    opts = opts || {};
    this.BOARD = "";
    this.pins = {};
}

Cylon.Utils.subclass(OdroidCon11, Cylon.Adaptor);

OdroidCon11.prototype.connect = function(callback) {
  this.BOARD = OdroidCore.getHardware();
  
  if(this.BOARD !== null){
    if(this.BOARD === "XU4" || this.BOARD === "XU3"){
      Cylon.Logger.log("ODROID-XU4 board is ready to use CON11.");
    }else{
      Cylon.Logger.log("ODROID-" + this.BOARD + " Does not feature the CON11 12 pin GPIOs");
    }
    callback();
  }else{
    Cylon.Logger.log("ODROID board not detected.");
  }
};

OdroidCon11.prototype.disconnect = function(callback) {
  //Disconnect pins
  this._disconnectPins();
  
  this.emit("disconnect");
  Cylon.Logger.debug("ODROID-" + this.BOARD + " Disconnected.");
  callback();
};

OdroidCon11.prototype._disconnectPins = function() {
  var pin;

  for (pin in this.pins) {
    this.digitalPins[pin].closeSync();
  }
};