/**
 * @module ews/models/character
 * @requires mongorito
 * @requires joi
 */
'use strict';

const Mongorito = require('mongorito')
  , Joi = require('joi');

const Model = Mongorito.Model;

/**
 * @class Character
 * @implements {Model}
 * @exports
 */
module.exports = class Character extends Model {

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

    const schema = Joi.object.keys({
      characterID: Joi.number(),
      name: Joi.string(),
      // DoB: Joi.date(),
      // race: Joi.string(),
      // bloodLine: Joi.string(),
      // ancestry: Joi.string(),
      // gender: Joi.string(),
      corporationName: Joi.string(),
      corporationID: Joi.number(),
      allianceName: Joi.string(),
      allianceID: Joi.string(),
      // cloneName: Joi.string(), // is this even given any more?
      // balance: Joi.number(),
      // attributeEnhancers: Joi.object().keys({})
      // attributes: Joi.object().keys({})
      skills: Joi.array().items(Joi.object().keys({
        typeID: Joi.number(),
        // skillpoints: Joi.number(),
        level: Joi.number() //,
        // published: Joi.boolean()
      })),
      // certificates: Joi.array().items(Joi.number())
      corporationRoles: Joi.array().items(Joi.object().keys({
        roleID: Joi.number(),
        roleName: Joi.string()
      })),
      // corporationRolesAtHQ: Joi.array().items(Joi.object().keys({
      //   roleID: Joi.number(),
      //   roleName: Joi.string()
      // })),
      // corporationRolesAtBase: Joi.array().items(Joi.object().keys({
      //   roleID: Joi.number(),
      //   roleName: Joi.string()
      // })),
      // corporationRolesAtOther: Joi.array().items(Joi.object().keys({
      //   roleID: Joi.number(),
      //   roleName: Joi.string()
      // })),
      corporationTitles: Joi.array().items(Joi.object().keys({
        titleID: Joi.number(),
        titleName: Joi.string()
      })),
      cached_until: Joi.date()
    });

    yield this.set(schema);
    yield next;

  }

}
