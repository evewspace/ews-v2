/**
 * @module ews/models/account
 * @requires mongorito
 * @requires joi
 * @requires co-bcrypt
 */
'use strict';

const Mongorito = require('mongorito')
  , Joi = require('joi')
  , bcrypt = require('co-bcrypt');

const Model = Mongorito.Model;

/**
 * @class Account
 * @implements {Model}
 * @exports
 */
module.exports = class Account extends Model {

  /**
   * Configure the model
   * @private
   */
  configure () {
    this.before('save', 'validate'); // Validate the schema before create/update
    this.before('save', 'saltPassword'); // Salt the password before create/update
  }

  /**
   * Validate the model before saving
   * @private
   */
  * validate (next) {

    /**
     * Create the model schema.
     * username is lowercased and trimmed. password is trimmed.
     * email is lowercased and trimmed. roles is set to ['guest'] for new accounts
     */
    const schema = Joi.object().keys({
      username: Joi.string().alphanum().min(3).lowercase().trim().required(),
      password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).trim().required(),
      email: Joi.string().email().trim().lowercase().required(),
      roles: [Joi.string().default('guest')],
      apiKeys: [Joi.string().regex(/^[0-9a-fA-F]{24}$/)], // ObjectIds
      characters: [Joi.string().regex(/^[0-9a-fA-F]{24}$/)], // ObjectIds
      created_at: Joi.date().required(),
      updated_at: Joi.date().required()
    });

    // Validate the schema versus the new attributes
    const result = yield Joi.validate(this.attributes, schema);

    // If there are errors, throw them.
    if(result.error) {
      throw result.error;
    }

    yield this.set(result.value);

    yield next;

  }

  /**
   * Salt a password before saving it. Salt only when the password
   * to be saved is changed or there is no previously saved password.
   * @private
   */
  * saltPassword (next) {

    if(this.changed.password || !this.previous.password) {

      const salt = yield bcrypt.genSalt();
      const hash = yield bcrypt.hash(this.attributes.password, salt);
      this.set('password', hash);

    }

    yield next;

  }

  /**
   * Compare a candidate password with the password stored in the datastore
   * @param {String} The candidate password
   * @returns {Boolean}
   * @public
   */
  * comparePassword (candidate) {

    //return yield bcrypt.compare(candidate, this.attributes.password);
    return yield bcrypt.compare(candidate, this.get('password'));

  }

}
