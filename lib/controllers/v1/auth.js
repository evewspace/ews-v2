'use strict';

/**
 * @module ews/controllers/auth
 * @requires ews/models/account
 * @requires jsonwebtoken
 */
const Account = require('../../models/account')
  , jwt = require('jsonwebtoken');

/**
 * Authenticate a user against the Account collection.
 * @function authenticate
 * @return {Object} A JWT token.
 * @throws {Error} Username not found.
 * @throws {Error} Password invalid.
 * @todo Customize private key per installation.
 * @todo Validation on the submitted login form.
 */
exports.authenticate = function * () {

  // Check to ensure a username was sent
  if(!this.request.body.username) {
    this.throw('No username submitted!');
    this.status = 400;
  }

  // Check to ensure a password was sent
  if(!this.request.body.password) {
    this.throw('No password submitted!');
    this.status = 400;
  }

  try {

    // Find the user in the Account collection.
    const user = yield Account.findOne({ username: this.request.body.username });

    // If no user is found, throw an error.
    if(!user) {
      this.throw('Username ' + this.request.body.username + ' not found.')
    }

    // Validate ctx.request.body.password against the user.
    const validPassword = yield user.comparePassword(this.request.body.password);

    // If the password is valid, return a JWT.
    if(validPassword) {

      const token = jwt.sign(user, this.keys[0], { algorithm: 'RS256', expiresInMinutes: 120 });
      this.status = 200;
      this.body = token;

    } else {

      // If the password is invalid, throw an error.
      this.throw('Invalid password.');

    }

  } catch (err) {
    // Catch any other errors.
    this.throw(err);

  }

}

/**
 * If we recieve an expired token, refresh the token for an additional 2 hours
 * if the refresh occurs within 30 minutes of the original token expiration.
 * @function refreshToken
 * @return {Object} A JWT token.
 * @todo Write the refresh function.
 */
exports.refreshToken = function * () {

}
