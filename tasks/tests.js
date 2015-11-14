/**
 * Testing gulp tasks
 * @module evewspace
 * @requires gulp
 * @requires mocha
 * @requires chai
 * @requires karma
 */
'use strict'

const path = require('path');

module.exports = function(gulp, plugins, utils) {

  gulp.task('test:frontend', function(done) {

  //   new Karma({
  //     basePath: path.join(__dirname, '..', '/test/frontend'),
  //     frameworks: ['mocha', 'chai'],
  //     files: [
  //       '**/*.spec.js'
  //     ],
  //     exclude: [
  //       '**/*.json'
  //     ],
  //     reporters: ['spec'],
  //     port: 9876,
  //     colors: true,
  //     logLevel: 'WARN',
  //     autoWatch: false,
  //     browsers: ['PhantomJS'],
  //     singleRun: true
  //   }, done).start();

  });

  gulp.task('test:backend', function() {

    gulp.src('./test/test.spec.js', { read: false })
      .pipe(plugins.mocha({ reporter: 'spec' }))
      .once('error', (err) => {
        process.exit(1);
      })
      .once('end', () => {
        process.exit();
      });
  });

  gulp.task('test', [
    'test:frontend',
    'test:backend'
  ]);

}
