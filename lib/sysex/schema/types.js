const Joi = require('joi');

const MAX_VALUE = 16383.99;
const types = {
  SERVO: Joi.number().min(0).max(3).required(),
  ANGLE: Joi.number().precision(2).min(0.00).max(MAX_VALUE).required(),
  FLAG: Joi.number().min(0).max(1).required(),
  COORD: Joi.number().precision(2).min(MAX_VALUE * -1).max(MAX_VALUE).required(),
  PIN: Joi.number().min(0).max(128).required(),
  ANALOG: Joi.number().min(0).max(16383).required(),
  DATA_TYPE: Joi.number().allow(1,2,4).required(),
  ANY: Joi.any()
};

types.TIME = types.ANGLE;

module.exports = types;
