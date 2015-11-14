/**
 * @module ews/models/map
 * @requires mongorito
 * @requires joi
 */
'use strict';

const Mongorito = require('mongorito')
  , Joi = require('joi');

const Model = Mongorito.Model;

/**
 * @class Map
 * @implements {Model}
 * @exports
 */
module.exports = class Map extends Model {

  /**
   * Configure the model
   * @private
   */
  configure() {
    this.before('save', 'validate');
  }

  /**
   * Validate the model before saving
   * @private
   */
  * validate (next) {

    const mapNode = Joi.object().keys({
      tag: Joi.string().required(),
      // Save the systems as objectIDs from the system collection
      systemInfo: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      children: Joi.array()
    });

    const schema = Joi.object().keys({
      name: Joi.string().required(),
      nodes: mapNode
    });

    const result = yield Joi.validate(this.attributes, schema);

    if(result.error) {
      throw result.error;
    }

    yield this.set(schema.value);
    yield next;

  }

}
