/**
 * @module ews/models/system
 * @requires mongorito
 * @requires joi
 */
'use strict';

const Mongorito = require('mongorito')
  , Joi = require('joi');

const Model = Mongorito.Model;

/**
 * @class System
 * @implements {Model}
 * @exports
 */
module.exports = class System extends Model {

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

    const schema = Joi.object().keys({
      systemName: Joi.string(),
      systemID: Joi.number(),
      securityStatus: Joi.number(),
      wormhole: Joi.string(),
      signatures: Joi.array().items(Joi.object().keys({
        id: Joi.string(),
        info: Joi.string(),
        type: Joi.string()
      })),
      structures: Joi.array().items(Joi.object().keys({
        planet: Joi.number(),
        moon: Joi.number(),
        name: Joi.string(),
        tower: Joi.string(),
        owner: Joi.string(),
        rfTime: Joi.date()
      }))
    });

    const result = yield Joi.validate(this.attributes, schema);

    if(result.error) {
      throw result.error;
    }

    yield this.set(schema.value);
    yield next;

  }

}
