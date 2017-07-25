const path = require('path')
const through = require('through2')
const proxyquire = require('proxyquire')
const util = require('gulp-util')
const commands = require('./commands')

module.exports.exec = (command, options) => {
  return through.obj((file, enc, callback) => {
    const serviceDirectory = path.dirname(file.path);

    util.log('Deploying serverless project from path', serviceDirectory);
    process.chdir(serviceDirectory);

    const Serverless = proxyquire('serverless', {'./classes/CLI': commands.generate(command).create(options)});
    const serverless = new Serverless({});
    return serverless.init()
      .then(() => { return serverless.run(); })
      .then(() => { callback(null, file); })
      .catch(error => { callback(error); })
  })
}

module.exports.install = (installDevDependencies) => {
  return through.obj((file, enc, callback) => {
    const serviceDirectory = path.dirname(file.path);

    util.log('Installing packages from', serviceDirectory);
    commands.install(serviceDirectory, installDevDependencies)
      .then(() => { callback(null); })
      .catch(error => { callback(error); })
  })
}
