/**
 * Devices : {
     XU4: 'ODROID-XU4',
     XU3: 'ODROID-XU3', NOTE: NO EXACT DISTICTION BETWEEN XU3 and XU4 in respective PROC FILES
     SHIFTERSHIELD: 'ODROID-XU4 with the SHIFTERSHIELD ATTACHED',
     _SHIFTERSHIELD: 'ODROID-XU4 with the SHIFTERSHIELD and INVERTED MAPPING such that pin 40 is pin 1, 39 is 2 ...',
     
     //Coming soon...
     C2: 'ODROID-C2',
     C1: 'ODROID-C1'
   }
   *
   **/
"use strict";

var digitalPins = {
  4: {
    XU3: 173
  },
  5: {
    XU3: 174,
    _SHIFTERSHIELD: 33
  },
  6: {
    XU3: 171
  },
  7: {
    XU3: 192,
    SHIFTERSHIELD: 18
  },
  8: {
    XU3: 172,
    _SHIFTERSHIELD: 31
  },
  9: {
    XU3: 191,
    _SHIFTERSHIELD: 29
  },
  10: {
    XU3: 189,
    _SHIFTERSHIELD: 30
  },
  11: {
    XU3: 190
  },
  12: {
    SHIFTERSHIELD: 173,
    _SHIFTERSHIELD: 28
  },
  13: {
    XU3: 21,
    SHIFTERSHIELD: 21,
    _SHIFTERSHIELD: 188
  },
  14: {
    XU3: 210,
    _SHIFTERSHIELD: 187
  },
  15: {
    XU3: 18,
    SHIFTERSHIELD: 22,
    _SHIFTERSHIELD: 25
  },
  16: {
    XU3: 209,
    SHIFTERSHIELD: 19
  },
  17: {
    XU3: 22,
    _SHIFTERSHIELD: 190
  },
  18: {
    XU3: 19,
    SHIFTERSHIELD: 23,
    _SHIFTERSHIELD: 189
  },
  19: {
    XU3: 30,
    _SHIFTERSHIELD: 24
  },
  20: {
    XU3: 28,
    XU4: 28,
    _SHIFTERSHIELD: 191
  },
  21: {
    XU3: 29
  },
  22: {
    XU3: 31,
    SHIFTERSHIELD: 22,
    _SHIFTERSHIELD: 192
  },
  23: {
    _SHIFTERSHIELD: 23
  },
  24: {
    XU3: 25,
    SHIFTERSHIELD: 190
  },
  25: {
    XU3: 23,
    _SHIFTERSHIELD: 19
  },
  26: {
    XU3: 24,
    SHIFTERSHIELD: 25,
    _SHIFTERSHIELD: 22
  },
  27: {
    XU3: 33
  },
  28: {
    _SHIFTERSHIELD: 21
  },
  29: {
    SHIFTERSHIELD: 28,
    _SHIFTERSHIELD: 173
  },
  30: {
    _SHIFTERSHIELD: 174
  },
  31: {
    SHIFTERSHIELD: 30,
    _SHIFTERSHIELD: 171
  },
  32: {
    SHIFTERSHIELD: 29
  },
  33: {
    SHIFTERSHIELD: 31,
    _SHIFTERSHIELD: 172
  },
  34: {
    _SHIFTERSHIELD: 18
  },
  36: {
    SHIFTERSHIELD: 33,
    _SHIFTERSHIELD: 210
  },
  38: {
    _SHIFTERSHIELD: 209
  }
};

var analogPins = {
  /**
   * ACCESS AS CHANNELS WHERE CHANNEL 0 = AIN0 || AS <ADC PIN NUMBER>
   */

  // AS PIN NUMBERS
  1: {
    _SHIFTERSHIELD: "in_voltage3_raw"
  },
  3: {
    XU3: "in_voltage0_raw"
  },
  4: {
    _SHIFTERSHIELD: "in_voltage0_raw"
  },
  23: {
    XU3: "in_voltage3_raw"
  },
  37: {
    SHIFTERSHIELD: "in_voltage0_raw"
  },
  40: {
    SHIFTERSHIELD: "in_voltage3_raw"
  },

  // AS CHANNELS
  AIN0: {
    XU3: "in_voltage0_raw",
    SHIFTERSHIELD: "in_voltage0_raw",
    _SHIFTERSHIELD: "in_voltage0_raw"
  },
  AIN3: {
    XU3: "in_voltage3_raw",
    SHIFTERSHIELD: "in_voltage0_raw",
    _SHIFTERSHIELD: "in_voltage3_raw"
  }
};

var i2cPins = {
  XU3: {

  },
  _SHIFTERSHIELD: {
    I2C0: {
	      SDA: 209,
	      SCL: 210
    },
	    I2C1: {
      SDA: 187,
      SCL: 188
    }
  },
  SHIFTERSHIELD: {
    I2C0: {
      SDA: 187,
      SCL: 188
    },
    I2C1: {
	      SDA: 209,
	      SCL: 210
    }
  }
};

var uartPins = {
  SHIFTERSHIELD: {
    TX: 172,
    RX: 171,
    CTS: 174,
    RTS: 173
  },
  _SHIFTERSHIELD: {
    TX: 172,
    RX: 171,
    CTS: 174,
    RTS: 173
  }
};

var PINS = {
  DIGITAL: digitalPins,
  ANALOG: analogPins,
  I2C: i2cPins,
  UART: uartPins
};

module.exports = PINS;
