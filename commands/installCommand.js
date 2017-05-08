const exec = require('child_process').exec;
const util = require('gulp-util');

module.exports = (serviceDirectory, installDevDependencies) => {
  util.log(`Executing npm install in directory ${serviceDirectory}, install dev dependencies = ${installDevDependencies ? 'true' : 'false'}`)
  return new Promise((resolve, reject) => {
    const intallScript = installDevDependencies
      ? 'npm install'
      : 'npm install --production --ignore-scripts';
    exec(intallScript, { cwd: serviceDirectory }, (error, stdout, stderr) => {
      if (error) {
        util.log(`exec error: ${error}`);
        return reject(error);
      }

      util.log(`stdout: ${stdout}`);
      return resolve();
    });
  });
}
