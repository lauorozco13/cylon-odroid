var fs = require("fs");

module.exports = {
    getHardware: function(){
        return fs.readFileSync("/proc/cpuinfo", { encoding: "utf-8" }).match(/Hardware\s*:\s*ODROID-\s*(\w+)/)[1];
    }
}