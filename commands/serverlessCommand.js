const util = require('gulp-util');

/**
 * This specializes the serverless CLI that gets injected into the main serverless class
 * and referenced in run()
 */
class ServerlessCommand {
  setLoadedPlugins(plugins) { }
  setLoadedCommands(commands) { }

  processInput() { return { commands: [], options: {} }; }

  displayHelp(processedInput) { util.log('Processed input', processedInput); }

  displayCommandUsage(commandObject, command) { }
  displayCommandOptions(commandObject) { }

  generateMainHelp() { }

  generateCommandsHelp(commandsArray) { }

  getVersionNumber() { util.log(version); }

  asciiGreeting() { }

  logBreakingChanges(nextVersion) { }
}

module.exports = ServerlessCommand;
