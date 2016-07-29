const chai = require('chai');
const expect = chai.expect;

const Joi = require('joi');

const Command = require('../../lib/sysex/command/command');

describe('command', () => {
  it('sequentially adds arguments', () => {
    const command = new Command('');
    command.addArgument(1)
      .addArgument(2)
      .addArgument(3);
    expect(command.getArgs()).to.deep.equal([1,2,3]);
  });

  it('validates a schema using joi', () => {
    const command = new Command('');
    command.setSchema(["PIN"]);
    expect(command.validate().error).to.not.be.null
    command.addArgument(1);
    expect(command.validate().error).to.be.null
  });

  it('builds itself into a valid array for encoding', () => {
    const command = new Command(0x1E);
    command.setSchema(["PIN"]);
    command.addArgument(1);
    expect(command.build()).to.deep.equal([0xF0, 0xAA, 0x1E, 1, 0xF7]);
  });
});
