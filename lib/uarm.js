const com = require('serialport');

module.exports = class UArm {
  constructor(port) {
    this.serialSettings = {
      baudRate: 57600,
      bufferSize: 1
    };
    this.transport = new com.SerialPort(port, this.serialSettings);

    this.transport.on("open", function() {
      this.emit("connect");
    }.bind(this));

    this.transport.on("error", function(string) {
      if (typeof callback === "function") {
        callback(string);
      }
    });

    this.transport.on("data", ()=>{});
  }


}
