const com = require('serialport');
const EventEmitter = require('events');

const commandFactory = require('./sysex/command/factory');

const servos = [0,1,2,3];

module.exports = class UArm extends EventEmitter {
  constructor(port) {
    super();
    this.serialSettings = {
      baudRate: 57600,
      bufferSize: 1,
      parser: com.parsers.readline('\n')
    };
    this.transport = new com(port, this.serialSettings);
    this.transport.on("open",() => this.emit('open'));
    this.transport.on("error", error => this.emit('error', error));
    this.transport.on("data", (data)=>{
      console.log(data);
      this.emit('data', data);
    });
  }

  attachAll() {
    this.setStatusAll(1);
  }

  dettachAll() {
    this.setStatusAll(0);
  }

  setStatusAll(val) {
    servos.forEach(servo=> this.setStatus(servo, val));
  }

  setStatus(servo, value) {
    console.log(arguments);
    const command = commandFactory.SERVO_STATUS();
    command.addArgument(servo)
      .addArgument(value);
    this.send(command);
  }
  send (command) {
    const valid = command.validate();
    if (valid.error !== null) {
      this.emit("error", valid.error);
    }
    const buffer = new Buffer(command.build());
    console.log(buffer);
    this.transport.write(buffer);
  }

  pumpStatus(value) {
    const command = commandFactory.PUMP_STATUS();
    command.addArgument(value);
    this.send(command);
  }

}
