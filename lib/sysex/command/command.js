const Joi = require('joi');

const constants = require('../constants');

module.exports = class command {
  constructor (code) {
    this.code = code;
    this.args = [];
    this.schema = null;
  }
  setSchema(schema) {
    this.schema = schema;
  }
  addArgument(arg) {
    this.args.push(arg);
    return this;
  }
  getCode() {
    return this.code;
  }
  getArgs() {
    return this.args;
  }

  validate() {
    return Joi.validate(this.args, this.schema);
  }

  build() {
    let res = [];
    res.push(constants.control.START_SYSEX);
    res.push(constants.control.UARM_CODE);
    res.push(this.code);
    res = res.concat(this.args);
    res.push(constants.control.END_SYSEX);
    return res;
  }
}
