/**
 * Images gulp tasks
 * @module evewspace
 * @requires gulp
 * @requires path
 * @requires gulp-imagemin
 * @requires gulp-newer
 */

const path = require('path');

module.exports = function(gulp, plugins, utils) {

  var imgFilter = '**/*.{png,gif,jpg,jpeg,svg}';

  gulp.task('images:static', function() {

    gulp.src(utils.appFolder('assets/img/' + imgFilter))
      .pipe(plugins.newer(utils.publicFolder('img')))
      .pipe(plugins.imagemin())
      .pipe(gulp.dest(utils.publicFolder('img')));

  });

  gulp.task('images:minify', function() {

    gulp.src(utils.appFolder('assets/img/' + imgFilter))
      .pipe(plugins.imagemin())
      .pipe(gulp.dest(utils.appFolder('assets/img/')));

  });

  gulp.task('images', [
    'images:static'
  ]);

}
