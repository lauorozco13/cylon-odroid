var i2s = {
  /**
   * I2S Inter-IC Sound
   **/
  
  //Serial Continuos Clock Line
  SCLK: 225,
  //Serial Data IN
  SDI: 228,
  //Serial Data OUT
  SDO: 229,
  //WORD SELECT line
  WS: 227,
  //WORD SELECT ALIAS
  LRCK: 227,
  //MASTER CLOCK
  CDCLK: 226,
}

var i2c = {
  /**
   * I2C
   **/
   
  SDA: 187,
  SCL: 188
}
 
var digitalPins = {
  XU3: {
    4: 188,
    5: 34,
    6: 187
  },
  SHIFTERSHIELD: {
    4: 188,
    5: 34,
    6: 187
  }
}

var PINS = {
  I2S: i2s,
  I2C: i2c,
  DIGITAL: digitalPins
}

module.exports = PINS;