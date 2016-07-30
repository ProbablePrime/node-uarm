const Joi = require('joi');

const constants = require('../constants');
const types = require('../schema/types');

const encoder = require('../schema/encoder');

module.exports = class command {
	constructor(code) {
		this.code = code;
		this.args = [];
		this.schema = null;
		this.types = null;
	}
	setSchema(commandTypes) {
		Object.freeze(commandTypes);
		if (commandTypes !== null) {
			this.types = commandTypes;
			this.schema = Joi.array().items(commandTypes.map(type => types[type]));
		}
	}
	addArgument(arg) {
		this.args.push(arg);
		return this;
	}
	addArguments() {
		this.args = this.args.concat([...arguments]);
		return this;
	}
	getCode() {
		return this.code;
	}
	getArgs() {
		return this.args;
	}

	validate() {
		if (this.schema !== null) {
			return Joi.validate(this.args, this.schema);
		}
	}

	build() {
		let res = [];
		res.push(constants.control.START_SYSEX);
		res.push(constants.control.UARM_CODE);
		res.push(this.code);
		const builtArgs = this.args.reduce((previous, next, index) => {
			return previous.concat(this.encode(next, index));
		}, []);
		res = res.concat(builtArgs);
		res.push(constants.control.END_SYSEX);
		return res;
	}

	encode(value, index) {
		return encoder[this.types[index]](value);
	}
};
