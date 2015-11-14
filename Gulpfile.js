/**
 * Eve-WSpace Gulp entry
 * @module evewspace
 * @requires gulp
 * @requires path
 * @requires fs
 * @requires auto- plug
 */

const gulp = require('gulp')
  , path = require('path')
  , fs = require('fs')
  , plugins = require('auto-plug')('gulp');

const utils = require('./tasks/utils');

const taskDir = path.join(__dirname, 'tasks');

/**
 * Filter the files in the tasks directory to only return javascript
 * or coffee-script files.
 *
 * @param {String} name
 * @return {String}
 */
const scriptFilter = function (name) {
  if (path.extname(name) === '.js' && name !== 'utils.js') {
    return name;
  }
}

// Read the task directory and apply the script filter
var Tasks = fs.readdirSync(taskDir).filter(scriptFilter);

// node-require each valid task script
Tasks.forEach(function (task) {
  if (task !== 'utils') {
    require(path.join(taskDir, task))(gulp, plugins, utils);
  }
});

// Set our default Gulp task
gulp.task('default', [
  'browserify',
  'styles',
  'fonts',
  'images:static',
  'modernizr'
]);
