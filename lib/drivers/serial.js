"use strict";

var Cylon = require("cylon"),
    SerialPort = require("serialport"),
    UART_DIRS = require("../SYSFS_DIRECTORIES").UART_DIRS;

var Serial = module.exports = function Serial(opts) {
  Serial.__super__.constructor.apply(this, arguments);
  opts = opts || {};
  this.BAUDRATE = opts.baudRate || 9600;
  this.PARSER = typeof opts.parser == "object" ? opts.parser : undefined;
  this.UART_PORT = opts.port || UART_DIRS[this.connection.BOARD];  
  
  // A list of commands that will be made available to external APIs.
  this.commands = {
    write: this.write,
    pause: this.pause,
    resume: this.resume,
    flush: this.flush,
    close: this.close,
    update: this.update,
    set: this.set,
    on: this.on
  };

  this.events = [
      'data','open','close','error','disconnect'
  ];

};

Cylon.Utils.subclass(Serial, Cylon.Driver);

Serial.prototype.start = function(callback) {

  var __serialPort = new SerialPort(this.UART_PORT,{
      autoOpen: true,
      baudRate: this.BAUDRATE,
      parser: this.PARSER ?  SerialPort.parsers[Object.keys(this.PARSER)[0]](this.PARSER[Object.keys(this.PARSER)[0]]) : SerialPort.parsers.raw 
  }, function(err) {
      if(err){
          console.log("Error : " + err.message);
      }
      callback();
      Cylon.Logger.log("Serial port opened at " + this.BAUDRATE + " baud for " + this.name);
  }.bind(this));
  this.__serial = __serialPort;
};

Serial.prototype.halt = function(callback) {
  callback();
};

Serial.prototype.write = function(buffer,callback) {
    this.__serial.write(buffer,callback);
};

Serial.prototype.pause = function() {
    this.__serial.pause();
};

Serial.prototype.resume = function() {
    this.__serial.resume();
};

Serial.prototype.flush = function(callback) {
    this.__serial.flush(callback);
};

Serial.prototype.close = function(callback) {
    this.__serial.close(callback);
};

Serial.prototype.update = function(callback) {
    this.__serial.update(callback);
};

Serial.prototype.set = function(options,callback) {
    this.__serial.update(options,callback);
};

Serial.prototype.on = function(event,callback) {
    this.__serial.on(event,callback);
};