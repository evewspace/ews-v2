/**
 * Eve-WSpace Backend
 * @module ews
 * @todo load configurations from parent module
 */
'use strict';

/**
 * @requires fs
 * @requires path
 * @requires koa
 * @requires co
 * @requires mongorito
 */
const fs = require('fs')
  , path = require('path')
  , koa = require('koa')
  , co = require('co')
  , Mongorito = require('mongorito');

/**
 * @requires ews/utils
 * @requires ews/logger
 */
const Utils = require('./utils')
  , logger = require('./plugins/logger');

/**
 * Load MongoDB
 *
 * Connection loads in the order of:
 *   Environment variables -> configuration -> defaults
 *
 * @todo load connection config from parent module
 */
Mongorito.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/ews');

// Create the app instance and export it to module.parent
const app = module.exports = koa();

/**
 * Basic app configuration
 *
 * @todo load custom configurations from module.parent
 */
app.keys = [fs.readFileSync(path.join(__dirname, 'token.pub'))];

/**
 * Load the models configuration, set indexes if not already set
 */
require('./config/models');

/**
 * Application logging
 *
 * @todo configurable logging directory
 */
app.use(logger());
app.use(logger.reqLog());

/**
 * Middleware
 *
 * @todo Clean up unnecessary middleware.
 */

// Load the CORS middleware
app.use(require('koa-cors')());

/**
 * Load the Helmet middleware
 * @todo experiment with more robust helmet config
 */
app.use(require('koa-helmet')());

// Load the etag middleware
app.use(require('koa-etag')());

/**
 * Load static assets
 * @todo consider moving static assets to a seperate repo
 */
app.use(require('koa-static')(Utils.publicDir(), {
  maxage: 3600
}));

// Load the view renderer
app.use(require('koa-views')({
  root: Utils.viewsDir(),
  default: 'jade',
  map: {
    html: 'jade'
  }
}));

// Load the routes
require('./controllers')(app);

// If another module is not the parent of the koa server, run the app
if(!module.parent) {
  co(function * () {
    const port = (process.env.NODE_PORT || 3000);
    app.listen(port);
    console.log('App started on port %s', port);
  }).catch(function(err) {
    console.error(err);
  });
}

console.log('EveWspace Environement: %s', process.env.NODE_ENV || 'development');

// Close the database connection if SIGTERM is sent
process.on('SIGTERM', function() {
  Mongorito.close();
  process.exit(0);
});
