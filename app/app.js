/**
 * Core Eve-WSpace angular app module
 *
 * @module evewspace
 * @requires angular
 * @requires modernizr
 * @requires lodash
 * @requires moment-timezone
 * @requires d3
 * @requires kbjr/polyfill.js
 */
'use strict';

/**
 * Prepare shims for browser compatability
 *
 */
Polyfill.needs(['json', 'queryselectorall', 'xhr', 'filter', 'isarray', 'classlist']);

// Vendors
var angular = require('angular'),
  Modernizr = require('modernizr');

module.exports = angular.module('EveWspace', [
  // Vendor Modules - Keep vendor module require()s in alphabetical order
  require('angular-cookies'),
  require('angular-formly'),
  require('angular-formly-templates-bootstrap'),
  require('angular-jwt'),
  require('angular-loading-bar'),
  require('angular-moment'),
  require('angular-resource'),
  require('angular-sanitize'),
  require('angular-ui-bootstrap'),
  require('angular-ui-router'),
  require('satellizer'),
  // Site modules - App level modules -> plugin modules -> partials
  require('./modules/services'),
  require('./modules/directives'),
  require('./modules/controllers'),
  require('./modules/map/*.js', {mode: 'expand'}),
  // Partials are packaged externally
  require('partials')
])
.config(require('./modules/config'))
.run(require('./modules/run'))
.constant('$lodash', require('lodash'))
.constant('$moment', require('moment-timezone'))
.constant('$d3', require('d3'))
// Inject Modernizr as a constant
.constant('$Modernizr', Modernizr);
