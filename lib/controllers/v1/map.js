/**
 * Eve-WSpace Administration Controller
 * @module ews/controllers/v1/admin
 * @requires ews/models/map
 */
'use strict';

const Map = require('../../models/map');

/**
 * @function read
 * @returns {Object} The requested map object
 */
exports.read = function * () {

  try {
    /** If there is no requested Map document Id, send back all the maps.
     * @todo Probably get rid of this unless there's a valid reason to
     */
    if(!this.request.query.id) {

      this.body = yield Map.find({});

    } else {

      // If there is a requested document Id, return that map.
      this.body = yield Map.findOne({ _id: this.request.query.id });

    }

  } catch (err) {

    // Catch errors and throw them.
    this.throw(err);

  }

  this.status = 200;

}

/**
 * @function create
 * @returns {Object} the newly created map
 */
exports.create = function * () {

  // if(!this.request.body) {

  //   this.throw('No body was sent', 400);

  // }

  this.assert(this.request.body, 400, 'No body was sent');

  try {

    const map = new Map({ name: this.request.body.name });
    yield map.save();
    this.status = 201;
    this.message = 'Map created';
    this.body = map;

  } catch(err) {

    this.throw(err);

  }

}

/**
 * @function update
 * @returns {Object} the updated map object
 */
exports.update = function * () {

  this.status = 200;

}

/**
 * @function delete
 * @returns null
 */
exports.delete = function * () {

  this.status = 200;

}
