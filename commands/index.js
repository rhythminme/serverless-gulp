const genericCommand = require('./genericCommand');
const installCommand = require('./installCommand');

module.exports = {
  generate: (command) => { return genericCommand(command); },
  install: (serviceDirectory) => { return installCommand(serviceDirectory); }
}
