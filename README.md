# Cylon.js For ODROID

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things (IoT) using Node.js.

This module provides an adaptor for ODROID Linux computers (http://www.hardkernel.com/main/main.php).

## Supported Odroid Boards
- Odroid XU4
- Odroid XU3

More devices to be added shortly...

## How to Install

Installing Cylon.js  is easy, and must be done on an Odroid Board with NodeJS.

    $ npm install cylon cylon-odroid cylon-gpio cylon-i2c

## How to Use

```javascript
var Cylon = require("cylon");
var odroid = require("cylon-odroid");

// Initialize the robot
Cylon.robot({
  connections: {
    odroid: { adaptor: "odroid" }
  },

  devices: {
    led: { driver: "led", pin: 27 },
    button: { driver: "button", pin:  26, type: "closed"}
  },

  work: function(my) {
    my.button.on('push', function() { my.led.toggle() });
  }
}).start();
```

## How to Use The XU4 ShifterShield

```javascript
var Cylon = require("cylon");
var odroid = require("cylon-odroid");

// Initialize the robot
Cylon.robot({
  connections: {
    odroid: { adaptor: "odroid", shifterShield: true }
    //You could also invert the ShifterShield pins such that pin 40 = pin 1, pin 39 = pin 2...
    //odroid: {   
    //    adaptor: "odroid", 
    //    shifterShield: {
    //            inverted: true
    //        } 
    //    }
  },

  devices: {
    led: { driver: "led", pin: 27 },
    button: { driver: "button", pin:  26, type: "closed"}
  },

  work: function(my) {
    my.button.on('push', function() { my.led.toggle() });
  }
}).start();
```


## How to Use The XU4 12 Pin Header

```javascript
var Cylon = require("cylon");
var odroid = require("cylon-odroid");

// Initialize the robot
Cylon.robot({
  connections: {
    odroid: { adaptor: "odroid" },
    con11: { adaptor: 'xu4-12pin' }
  },

  devices: {
    led: { driver: "led", pin: 27 },
    //Set the button to use pin 6 on the 12 pin header
    button: { driver: "button", pin:  6, type: "closed", connection: 'con11' }
  },

  work: function(my) {
    my.button.on('push', function() { my.led.toggle() });
  }
}).start();
```

## How to Use Serial Communication

The Serial driver is a wrapper the node library : serialport.
Use as if the driver is the package itself.

```javascript
var Cylon = require("cylon");
var odroid = require("cylon-odroid");

// Initialize the robot
Cylon.robot({
  connections: {
    odroid: { adaptor: "odroid" }
  },

  devices: {
     serialDevice: { driver: 'serial' } //9600 BaudRate
  },

  work: function(my) {
    my.serialDevice.write('hello \n');
  }
}).start();
```
Options available
```javascript
devices: {
 serialDevice: { driver: 'serial', baudRate: 57600, port: '/dev/ttyS0', parser: { byteLength : 5} }
},
//The default port used is the Odroid Boards pin serial port
//Parsers
//Other parsers avaialable
parser: { byteDelimiter: [10,12] }
```
Commands available are such as:
- write
- pause
- resume
- flush
- close
- update
- set

Looking for a something like ```serial.available()?``` listen for the data event instead 
```javascript
my.serialDevice.on('data',function(data) {
  //Do something with the data passed
});
```
Other events available
- open
- close
- error
- disconnect

You can checkout the serialport repo [here](https://github.com/EmergingTechnologyAdvisors/node-serialport)  or [here](https://www.npmjs.com/package/serialport)




## Contributing

For our contribution guidelines, please [visit this document](https://github.com/odroidjs/cylon-odroid/blob/master/CONTRIBUTING.md
).

## Release History

For the release history, please go to [visit this document](https://github.com/odroidjs/cylon-odroid/blob/master/RELEASES.md
).

## License
Copyright (c) 2017 ODROIDJS. Licensed under the Apache 2.0 license.