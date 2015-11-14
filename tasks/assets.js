/**
 * Assets gulp tasks
 * @module eve-wspace
 * @requires gulp
 * @requires path
 * @requires gulp-manifest
 */

module.exports = function(gulp, plugins, utils) {

  gulp.task('assets:manifest', ['build'], function () {

    gulp.src(utils.publicFolder())
      .pipe(plugins.manifest({
        hash: true,
        preferOnline: true,
        network: ['http://*', 'https://*', '*'],
        exclude: [
          'app.manifest'
        ]
      }))
      .pipe(plugins.if(process.node.NODE_ENV === 'development', plugins.notify('<%= file.relative %> written.')))
      .pipe(gulp.dest(utils.publicFolder()));

  });

  gulp.task('assets', ['assets:manifest']);

}
