/**
 * @module ews/models/wormhole
 * @requires nedb
 * @requires co-nedb
 */
'use strict';

const Datastore = require('nedb')
  , wrap = require('co-nedb');

// Load the collection
const db = wrap(new Datastore({
  filename: '../db/wormholes.db',
  autoload: true
}));

// Ensure the proper indexes are set on the collection
try {

} catch(err) {
  console.error(`${ module.filename } - Error: ${ err }`)
}

/**
 * Export the collection, wrapped with co
 * @class Wormhole
 * @exports
 */
module.exports = db;
