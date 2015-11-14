/**
 * Modernizr gulp task
 * @module evewspace
 * @requires gulp
 * @requires gulp-modernizr
 * @requires gulp-uglify
 * @requires modernizr
 * @requires path
 */

const path = require('path');

module.exports = function(gulp, plugins, utils) {

  gulp.task('modernizr', ['styles', 'browserify'], function() {

    gulp.src([
      utils.appFolder('**/*.js'),
      '!' + utils.publicFolder('js/modernizr.js'),
      utils.rootFolder('node_modules/angular/angular.js'),
      utils.rootFolder('node_modules/bootstrap-sass/assets/**/*.{scss,js}')
    ])
      .pipe(plugins.modernizr(utils.modernizr))
      .pipe(plugins.uglify({ mangle: false }))
      .pipe(plugins.if(process.env.NODE_ENV === 'development', plugins.notify('<%= file.relative %> written.')))
      .pipe(gulp.dest(utils.publicFolder('js')));

  });

}

