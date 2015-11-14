/**
 * Eve-WSpace Utilities
 * @module ews/utils
 */
'use strict';

/** @requires path */
const path = require('path');

/** @class Utils */
class Utils {

  /**
   * @function rootDir
   * @static
   * @return {String} Path to the server directory.
   */
  static rootDir() {
    return __dirname;
  }

  /**
   * @function modelsDir
   * @static
   * @return {String} Path relative the models directoy.
   */
  static modelsDir(subdir) {
    return path.join(this.rootDir(), 'models', (subdir || ''));
  }

  /**
   * @function controllersDir
   * @static
   * @return {String} Path relative to the controllers directory.
   */
  static controllersDir(subdir) {
    return path.join(this.rootDir(), 'controllers', (subdir || ''));
  }

  /**
   * @function pluginsDir
   * @static
   * @return {String} Path relative to the plugins directory.
   */
  static pluginsDir(subdir) {
    return path.join(this.rootDir(), 'plugins', (subdir || ''));
  }

  /**
   * @function viewsDir
   * @static
   * @return {String} Path relative to the views directory.
   */
  static viewsDir(subdir) {
    return path.join(this.rootDir(), 'views', (subdir || ''));
  }

  /**
   * @function publicDir
   * @static
   * @return {String} Relative path to the public directory.
   */
  static publicDir(subdir) {
    return path.join(path.dirname(module.parent.parent), 'public', (subdir || ''));
  }

  /**
   * @function dbDir
   * @static
   * @return {String} Relative path to the datastore directory.
   */
   static dbDir(subdir) {
     return path.join(this.rootDir(), 'db', (subdir || ''));
   }

  constructor() { }

}

module.exports = Utils;
