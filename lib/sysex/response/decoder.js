const constants = require('../constants');
const responses = require('./responses');

module.exports = function(data) {
  const code = data[1];
  if (code !== constants.control.UARM_CODE) {
    // Ignore
    return;
  }
  const commandCode = data[2];
  if (responses[commandCode]) {
    return responses[commandCode];
  }
}
