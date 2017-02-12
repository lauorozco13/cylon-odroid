

var digitalPins = {
  4: {
    XU3: 173
  },
  5: {
    XU3: 174
  },
  6: {
    XU3: 171
  },
  7: {
    XU3: 192,
    SHIFTERSHIELD: 18
  },
  8: {
    XU3: 172
  },
  9: {
    XU3: 191
  },
  10: {
    XU3: 189
  },
  11: {
    XU3: 190
  },
  12: {
    SHIFTERSHIELD: 173
  },
  13: {
    XU3: 21,
    SHIFTERSHIELD: 21
  },
  14: {
    XU3: 210
  },
  15: {
    XU3: 18,
    SHIFTERSHIELD: 22
  },
  16: {
    XU3: 209,
    SHIFTERSHIELD: 19
  },
  17: {
    XU3: 22
  },
  18: {
    XU3: 19,
    SHIFTERSHIELD: 23
  },
  19: {
    XU3: 30
  },
  20: {
    XU3: 28
  },
  21: {
    XU3: 29
  },
  22: {
    XU3: 31,
    SHIFTERSHIELD: 22
  },
  24: {
    XU3: 25,
    SHIFTERSHIELD: 190
  },
  25: {
    XU3: 23
  },
  26: {
    XU3: 24,
    SHIFTERSHIELD: 25
  },
  27: {
    XU3: 33
  },
  29: {
    SHIFTERSHIELD: 28
  }
  31: {
    SHIFTERSHIELD: 30
  },
  32: {
    SHIFTERSHIELD: 29
  },
  33: {
    SHIFTERSHIELD: 31
  }
  36: {
    SHIFTERSHIELD: 33
  }
};

var analogPins = {
  3: {
    XU3: "XADC0AIN_0"
  },
  23: {
    XU3: "XADC0AIN_1"
  },
  37: {
    SHIFTERSHIELD: "AIN0"
  },
  38: {
    SHIFTERSHIELD: "ADC"
  },
  40: {
    SHIFTERSHIELD: "AIN3"
  }
}

var i2cPins = {
   XU3: {

   },
   SHIFTERSHIELD: 
      I2C0: {
	    SDA: 209,
	    SCL: 210
      },
	  I2C1: {
        SDA: 187,
        SCL: 188
      }
   }
}

var uartPins = {
   SHIFTERSHIELD: {
      TX: 172,
      RX: 171,
      CTS: 174,
      RTS: 173
   }
}

var PINS = {
  DIGITAL: digitalPins,
  ANALOG: analogPins,
  I2C: i2cPins,
  UART: uartPins
}

module.exports = PINS;
