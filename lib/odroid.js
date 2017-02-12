"use strict";

var Cylon = require("cylon");

var Odroid = module.exports = function Odroid(opts) {
  Odroid.__super__.constructor.apply(this, arguments);
  opts = opts || {};
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Odroid.prototype.connect = function(callback) {
  //this.BOARD = //Get board
  //Cylon.Logger.log("ODROID-" + this.BOARD + " Detected.")
  callback();
};

Adaptor.prototype.disconnect = function(callback) {
  this.emit("disconnect");
  Cylon.Logger.debug("ODROID-" + this.BOARD + " Disconnected.");

  callback();
};
