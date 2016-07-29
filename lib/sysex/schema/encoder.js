const _ = require('lodash');

const encoder = require('../encoder7bit');

module.exports = {
  ANY: _.identity,
  SERVO: _.identity,
  FLAG: _.identity,
  DATA_TYPE: _.identity,
  PIN: _.identity,
  // 3b float
  ANGLE: (angle) => encoder.toFloatAsThree7bitBytes(angle),
  COORD: (coord) => encoder.toFloatAsFour7bitBytes(coord),
  ANALOG: (analog) => encoder.toTwo7bitBytes(analog),
  TIME: time => encoder.toFloatAsFour7bitBytes(time),
}
