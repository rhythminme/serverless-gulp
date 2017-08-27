const util = require('gulp-util')
const ServerlessCommand = require('./serverlessCommand')

module.exports = (command) => {
  return {
    create: (options) => {
      class GenericCommand extends ServerlessCommand {
        processInput() {
          util.log(`Processing command ${command} with options:`, options)
          return {commands: command.split(' '), options};
        }
      }

      return GenericCommand
    }
  }
}
