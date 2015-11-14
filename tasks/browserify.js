/**
 * Browserify gulp tasks
 * @module eve-wspace
 * @requires gulp
 * @requires path
 * @requires fs
 * @requires vinyl
 * @requires vinyl-source-stream
 * @requires vinyl-buffer
 * @requires browserify
 * @requires through2
 */
'use strict';

const path = require('path')
  , fs = require('fs')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , browserify = require('browserify')
  , through = require('through2')
  , vinyl = require('vinyl');

module.exports = function(gulp, plugins, utils) {

  /** Configuration for browserify */
  var browserifyCfg = {
    extensions: [
      '.js',
      '.json'
    ],
    baseDir: utils.appFolder(),
    debug: process.env.NODE_ENV === 'development',
    fullPaths: process.env.NODE_ENV === 'development',
    packageCache: {},
    cache: {}
  }

  /** Compose the partial files for $templateCache */
  var compPartials = function() {
    return gulp.src(path.join(utils.appFolder('html/partials/**/*.jade')));
  }

  /** Build the vendor bundle */
  gulp.task('browserify:vendors', function(done) {

    let b = browserify(browserifyCfg) // function-scoped browserify instance
      .require(utils.jsVendors()) // require the vendor files from package.json
      .external('modernizr') // make Modernizr an external dependency
      .transform('deamdify') // support modules using requirejs
      .transform('browserify-shim') // shim modules with poor CommonJS implementations
      .on('log', plugins.util.log); // log errors to the console

    b.bundle() // execute Browserify#bundle()
      .pipe(source('vendors.js')) // name the vinyl stream vendors.js
      .pipe(buffer()) // convert the stream into a buffer
      .pipe(plugins.if(process.env.NODE_ENV === 'development', plugins.notify('<%= file.relative %> written.'))) // gulp-notify if we're in a development environment
      .pipe(gulp.dest(utils.publicFolder('js'))); // write the file to public/js/vendors.js

    return done(); // the task is now done

  });

  /** Build the app bundle */
  gulp.task('browserify:app', function(done) {

    let b = browserify(utils.appFolder('app.js'), browserifyCfg) // function-scoped browserify instance
      //.require(compPartials(), { expose: 'partials' }) // build the partials file and expose it to browserify
      .ignore('partials') // ignore the missing physical partials file
      .external(utils.jsVendors()) // external our vendor files
      .external('modernizr') // make Modernizr an external dependency
      .transform('require-globify') // transform require() statements with globs
      .transform('brfs') // in-line fs.readFileSync calls
      .on('log', plugins.util.log); // log errors to console

    b.bundle() // execute Browserify#bundle()
      .pipe(source('app.js')) // name the vinyl stream app.js
      .pipe(buffer()) // convert the stream into a buffer
      .pipe(plugins.replace(/\.catch\(/g, "['catch'](")) // replace ES6-ready Object.catch() with Object['catch'] to support older browsers
      .pipe(plugins.if(process.env.NODE_ENV === 'development', plugins.notify('<%= file.relative %> written.'))) // gulp-notify if we're in a development environment
      .pipe(gulp.dest(utils.publicFolder('js'))); // write the file to public/js/app.js

    done(); // the task is now done

  });

  gulp.task('browserify', [
    'browserify:app',
    'browserify:vendors'
  ]);
}
