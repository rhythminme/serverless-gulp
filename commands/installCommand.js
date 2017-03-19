const gulpExec = require('gulp-exec');

module.exports = () => {
  return gulpExec(['npm install --production --ignore-scripts']);
}
