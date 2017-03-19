const path = require('path')
const through = require('through2')
const proxyquire = require('proxyquire')
const util = require('gulp-util')
const commands = require('./commands')

module.exports = (command, options) => {
  return through.obj((file, enc, callback) => {
    const serviceDirectory = path.dirname(file.path);

    util.log('Deploying serverless project from path', serviceDirectory);
    process.chdir(serviceDirectory);

    const Serverless = proxyquire('serverless', { './classes/CLI': commands(command).create(options) });

    const serverless = new Serverless({});
    return serverless.init()
      .then(() => {
        return serverless.run();
      }).then(() => {
        callback();
      }).catch(error => {
        callback(error);
      })
  })
}
