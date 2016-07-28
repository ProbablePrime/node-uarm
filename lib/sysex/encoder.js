const constants = require('./constants');
const encoder7bit = require('./encoder7bit');
module.exports = function(command) {
  return  Buffer([constants.START_SYSEX,command.getCode(),...encoder7bit.to7BitArray(command.getData()),constants.END_SYSEX];

}
