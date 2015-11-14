/**
 * Eve-WSpace utilities
 */
'use strict';

const path = require('path')
  , _ = require('lodash')

const rootDir = path.resolve(path.join(__dirname, '..'));

const pkg = require('../package.json');

/**
 * @return {Array} the front-end dependencies
 */
exports.jsVendors = () => {

  return _.filter(_.keys(pkg.devDependencies), function(dep) {
    return /^(angular|moment|satellizer|sigma)/i.test(dep);
  });

}

/**
 * Builds a path string starting at the public folder path
 * @param {String} subdir
 * @return {String}
 */
exports.publicFolder = (subdir) => {
  if(typeof subdir === 'undefined') {
    return path.join(rootDir, 'public');
  } else if(typeof subdir === 'string') {
    return path.join(rootDir, 'public', subdir);
  } else {
    console.log(typeof subdir);
    throw new Error('subdir must be a string');
  }
}

/**
 * Builds a path string starting at the app folder path
 * @param {String} subdir
 * @return {String}
 */
exports.appFolder = (subdir) => {
  if(typeof subdir === 'undefined') {
    return path.join(rootDir, 'app');
  } else if(typeof subdir === 'string') {
    return path.join(rootDir, 'app', subdir);
  } else {
    throw new Error('subdir must be a string');
  }
}

/**
 * Builds a path string starting at the root directory
 * @param {String} subdir
 * @return {String}
 */
exports.rootFolder = (subdir) => {
  if(typeof subdir === 'undefined') {
    return rootDir
  } else if(typeof subdir === 'string') {
    return path.join(rootDir, subdir);
  } else {
    throw new Error('subdir must be a string');
  }
}
