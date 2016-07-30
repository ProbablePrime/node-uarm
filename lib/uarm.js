const Serial = require('serialport');
const EventEmitter = require('events');

const commandFactory = require('./sysex/command/factory');
const constants = require('./sysex/constants');

class UArm extends EventEmitter {
	constructor(port) {
		super();
		this.serialSettings = {
			baudRate: 57600,
			bufferSize: 1,
			parser: Serial.parsers.byteDelimiter([constants.control.END_SYSEX])
		};
		this.transport = new Serial(port, this.serialSettings);
		this.transport.on('open', () => this.emit('open'));
		this.transport.on('error', error => this.emit('error', error));
		this.transport.on('data', data => this.processData(data));
	}

	attachAll() {
		this.setStatusAll(1);
	}

	dettachAll() {
		this.setStatusAll(0);
	}

	setStatusAll(val) {
		[UArm.BASE, UArm.SHOULDER, UArm.ELBOW, UArm.WRIST].forEach(servo => this.setStatus(servo, val));
	}

	moveTo(x, y, z) {
		const command = commandFactory.WRITE_COORDS();
		command.addArguments(x, y, z)
		.addArgument(30)
		.addArgument(1)
		.addArgument(8000)
		.addArgument(1)
		.addArgument(0);
		this.send(command);
	}

	writeAngle(servo, angle, offset = 0) {
		const command = commandFactory.WRITE_ANGLE()
		.addArguments(servo, angle, offset);
		this.send(command);
	}

	setStatus(servo, value) {
		console.log(arguments);
		const command = commandFactory.SERVO_STATUS();
		command.addArguments(servo, value);
		this.send(command);
	}
	send(command) {
		const valid = command.validate();
		if (valid && valid.error !== null) {
			this.emit('error', valid.error);
		}
		const buffer = new Buffer(command.build());
		console.log(buffer);
		this.transport.write(buffer);
	}

	reset() {
		this.writeAngle(0, 90);
		this.writeAngle(1, 270);
		this.writeAngle(2, 0);
	}

	pumpStatus(value) {
		const command = commandFactory.PUMP_STATUS();
		command.addArgument(value);
		this.send(command);
	}
	processData(data) {
		if (data[1] !== constants.control.UARM_CODE) {
			return;
		}
		if (data[2] === 0x01) {
			this.emit('ready');
			return;
		}
		console.log('<<<<');
		console.log(new Buffer(data));
	}
	readCoords() {
		this.send(commandFactory.READ_COORDS());
	}
	alert(times, runTime, stopTime) {
		this.send(commandFactory.BUZZER_ALERT().addArguments(times, runTime, stopTime));
	}
	unwrittenFun() {
		this.alert(50, 10, 10);
	}
}

UArm.BASE = 0;
UArm.SHOULDER = 1;
UArm.ELBOW = 2;
UArm.WRIST = 3;

module.exports = UArm;
