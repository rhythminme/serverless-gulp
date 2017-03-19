const exec = require('child_process').exec;
const util = require('gulp-util');

module.exports = (serviceDirectory) => {
  util.log(`Executing npm install in directory ${serviceDirectory}`)
  return new Promise((resolve, reject) => {
    exec('npm install --production --ignore-scripts', { cwd: serviceDirectory }, (error, stdout, stderr) => {
      if (error) {
        util.log(`exec error: ${error}`);
        return reject(error);
      }

      util.log(`stdout: ${stdout}`);
      return resolve();
    });
  });
}
