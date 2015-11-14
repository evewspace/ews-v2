/**
 * Lint gulp tasks
 * @module evewspace
 * @requires gulp
 * @requires gulp-eslint
 */

module.exports = function (gulp, plugins, utils) {

  gulp.task('lint', function () {

    gulp.src(['lib/**/*.js'])
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.failAfterError());

  });

}
