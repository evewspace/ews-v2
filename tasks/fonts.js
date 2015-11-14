/**
 * Fonts gulp task
 * @module evewspace
 * @requires gulp
 * @requires bootstrap-sass
 * @requires material-design-iconic-font
 * @requires path
 */

const path = require('path');

module.exports = function(gulp, plugins, utils) {

  var bootstrapFontsDir = utils.rootFolder('node_modules/bootstrap-sass/assets/fonts')
    , mdFontDir = utils.rootFolder('node_modules/material-design-iconic-font/dist/fonts')
    , fontFilter = '**/*.{eot,svg,ttf,woff,woff2}';

  gulp.task('fonts', function() {

    gulp.src([
      path.join(bootstrapFontsDir, fontFilter),
      path.join(mdFontDir, fontFilter),
      utils.appFolder('assets/fonts/' + fontFilter)
    ])
      .pipe(plugins.newer(utils.publicFolder('fonts')))
      .pipe(plugins.if(process.env.NODE_ENV === 'development', plugins.notify('<%= file.relative %> written.')))
      .pipe(gulp.dest(utils.publicFolder('fonts')));

  });

};
