var ADC_Directories = {
    XU4 : {
        ch0: "/sys/devices/12d10000.adc/iio:device0/in_voltage0_raw",
        ch3: "/sys/devices/12d10000.adc/iio:device0/in_voltage3_raw"
    }
}

module.exports = {
    ADC_DIRS: ADC_Directories
}