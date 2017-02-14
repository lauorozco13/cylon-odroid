"use strict";

var OdroidAdaptors = {
  "odroid" : require('./lib/odroid'),
  "odroid-con11" : require('./lib/drivers/con11/con11.js')
}

var OdroidDrivers = {
  
}

module.exports = {
  // Adapters your module provides, e.g. ["spark"]
  adaptors: Object.keys(OdroidAdaptors),

  // Drivers your module provides, e.g. ["led", "button"]
  drivers: Object.keys(OdroidDrivers),

  // Modules intended to be used with yours, e.g. ["cylon-gpio"]
  dependencies: ["cylon-gpio"],

  adaptor: function(opts) {
    return new OdroidAdaptors[opts.adaptor](opts);
  },
  
  driver: function(opts) {
    return new OdroidDrivers[opts.driver](opts);
  }
};