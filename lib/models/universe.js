/**
 * @module ews/models/universe
 * @requires nedb
 * @requires co-nedb
 */
'use strict';

const Datastore = require('nedb')
  , co = require('co')
  , wrap = require('co-nedb');

// Load the collection
const db = wrap(new Datastore({
  filename: '../db/universeData.db',
  autoload: true
}));

// Ensure the proper indexes are set on the collection
co(function * () {
  try {
    yield db.ensureIndex({ fieldName: 'itemID' });
    yield db.ensureIndex({ fieldName: 'constellationID' });
    yield db.ensureIndex({ fieldName: 'orbitID' });
    yield db.ensureIndex({ fieldName: 'regionID' });
    yield db.ensureIndex({ fieldName: 'solarSystemID' });
  } catch(err) {
    console.error(`${ module.filename } - Error: ${ err }`)
  }
});

/**
 * Export the collection, wrapped with co
 * @class Universe
 * @exports
 */
module.exports = db;

/*
const CCPMapDenormalizeSchema = new Schema({
  itemID: joi.number(),
  typeID: joi.number(),
  groupID: joi.number(),
  solarSystemID: joi.number(),
  constellationID: joi.number(),
  regionID: joi.number(),
  orbitID: joi.number(),
  x: joi.number(),
  y: joi.number(),
  z: joi.number(),
  radius: joi.number(),
  itemName: joi.string().max(100),
  security: joi.number(),
  celestialIndex: joi.number(),
  orbitIndex: joi.number()
})
*/
