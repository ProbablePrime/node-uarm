const _ = require('lodash');

const encoder7bit = require('../encoder7bit');

module.exports = {
  ANY: _.identity,
  SERVO: _.identity,
  FLAG: _.identity,
  DATA_TYPE: _.identity,
  PIN: _.identity,
  // 3b float
  ANGLE: (angle) => toFloatAsThree7bitBytes,
  COORD: (coord) => toFloatAsFour7bitBytes,
  ANALOG: (analog) => toTwo7bitBytes

}
