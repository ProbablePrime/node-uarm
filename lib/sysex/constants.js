const Joi = require('joi');

const types = require('./schema/types');
module.exports = {
  control: {
    "START_SYSEX": 0xF0,
    "UARM_CODE": 0xAA,
    "END_SYSEX": 0xF7,
  },
  command: {
    "READ_ANGLE" : 0x10,
    "WRITE_ANGLE" : 0x11,
    "READ_COORDS" : 0x12,
    "WRITE_COORDS" : 0x13,
    "READ_DIGITAL" : 0x14,
    "WRITE_DIGITAL" : 0x15,
    "READ_ANALOG" : 0x16,
    "WRITE_ANALOG" : 0x17,
    "READ_EEPROM" : 0x1A,
    "WRITE_EEPROM" : 0x1B,
    "DETACH_SERVO" : 0x1C,
    "PUMP_STATUS" : 0x1D,
    "GRIPPER_STATUS" : 0x20,
    "WRITE_STRETCH" : 0x1E,
    "WRITE_LEFT_RIGHT_ANGLE" : 0x1F,
    "READ_SERIAL_NUMBER" : 0x21,
    "WRITE_SERIAL_NUMBER" : 0x22,
    "REPORT_LIBRARY_VERSION" : 0x23
  },
  arguments: {
    "READ_ANGLE" : Joi.array().items(types.SERVO, types.FLAG),
    "WRITE_ANGLE" : Joi.array().items(types.SERVO, types.ANGLE, types.FLAG),
    "READ_COORDS" : Joi.any().forbidden(),
    "WRITE_COORDS" : Joi.array().items(types.COORD, types.COORD, types.COORD, types.COORD, types.FLAG, types.TIME, types.FLAG, types.FLAG),
    "READ_DIGITAL" : Joi.array().items(types.PIN, types.FLAG),
    "WRITE_DIGITAL" : Joi.array().items(types.PIN, types.FLAG),
    "READ_ANALOG" : Joi.array().items(types.PIN),
    "WRITE_ANALOG" : Joi.array().items(types.PIN, types.ANALOG),
    "READ_EEPROM" : Joi.array().items(types.DATA_TYPE, types.ANALOG),
    "WRITE_EEPROM" : Joi.array().items(types.DATA_TYPE, types.ANALOG, types.ANY),
    "DETACH_SERVO" : Joi.any().forbidden(),
    "PUMP_STATUS" : Joi.array().items(types.FLAG),
    "GRIPPER_STATUS" :Joi.array().items(types.FLAG),
    "WRITE_STRETCH" : Joi.array().items(types.COORD, types.COORD),
    "WRITE_LEFT_RIGHT_ANGLE" : Joi.array().items(types.ANGLE,types.ANGLE)
  }
}
// I don't care about these
// "READ_SERIAL_NUMBER" : [],
// "WRITE_SERIAL_NUMBER" : [FB_BYTE,FB_BYTE,FB_BYTE,FB_BYTE,FB_BYTE,FB_BYTE,FB_BYTE,FB_BYTE,FB_BYTE,FB_BYTE,FB_BYTE,FB_BYTE,FB_BYTE,FB_BYTE,],
// "REPORT_LIBRARY_VERSION" : []
