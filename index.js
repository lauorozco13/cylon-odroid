"use strict";

var OdroidAdaptors = {
  "odroid" : require('./lib/odroid'),
  "xu4-12pin" : require('./lib/adaptors/XU4-12PIN/xu4_12pin')
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