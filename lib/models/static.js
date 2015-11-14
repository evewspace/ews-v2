/**
 * @module ews/models/static
 * @requires nedb
 * @requires co-nedb
 */
'use strict';

const Datastore = require('nedb')
  , co = require('co')
  , wrap = require('co-nedb');

// Load the collection
const db = wrap(new Datastore({
  filename: '../db/staticData.db',
  autoload: true
}));

// Ensure the proper indexes are set on the collection
co(function * () {
  try {
    yield db.ensureIndex({ fieldName: 'itemID' });
    yield db.ensureIndex({ fieldName: 'groupID' });
    yield db.ensureIndex({ fieldName: 'graphicID' });
  } catch(err) {
    console.error(`${ module.filename } - Error: ${ err }`)
  }
});

/**
 * Export the collection, wrapped with co
 * @class Static
 * @exports
 */
module.exports = db;

/*
var CCPStaticSchema = new Schema({
  itemID:
});
*/
