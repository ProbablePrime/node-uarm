const Joi = require('joi');
const MAX_VALUE = 16383.99;
const types = {
	ANY: Joi.any(),

	DATA_TYPE: Joi.number().allow(1, 2, 4).required(),
	FLAG: Joi.number().min(0).max(1).required(),
	SERVO: Joi.number().min(0).max(3).required(),
	PIN: Joi.number().min(0).max(127).required(),

	ANGLE: Joi.number().precision(2).min(0.00).max(MAX_VALUE).required(),
	COORD: Joi.number().precision(2).min(MAX_VALUE * -1).max(MAX_VALUE).required(),
	ANALOG: Joi.number().min(0).max(16383).required()

};

types.TIME = types.ANGLE;
types.NUMBER = types.PIN;

module.exports = types;
