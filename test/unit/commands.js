const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');

const commands = require('../../lib/sysex/command/factory');
const constants = require('../../lib/sysex/constants');

describe('command compiler', () => {
  												it('creates a command factory for each type of command', () => {
    												var keys = Object.keys(constants.command);
    												var commandKeys = Object.keys(commands);
    												expect(commandKeys).to.deep.equal(keys);
    												expect(_.every(commands, command => typeof command === 'function')).to.be.ok;
  });
  												it('creates a valid command object when a factory function is used', () => {
    												const command = commands.WRITE_ANGLE();
    												expect(command.code).to.equal(constants.command.WRITE_ANGLE);
    												expect(command.schema).to.not.be.null;
  });
});
