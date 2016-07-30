const constants = require('../constants');
const Command = require('./command');
const compiled = {};
Object.keys(constants.command).forEach(key => createCommand(key));
function createCommand(key) {
	compiled[key] = function () {
		const command = new Command(constants.command[key]);
		command.setSchema(constants.arguments[key]);
		return command;
	};
}

module.exports = compiled;
