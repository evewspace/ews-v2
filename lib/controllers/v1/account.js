'use strict';
/**
 * @module ews/controllers/v1/account
 * @requires ews/model/account
 */
const Account = require('../../models/account');

/**
 * Read an account's info
 * @function read
 * @return {Object} The requested Account document
 */
exports.read = function * () {

  // Check if a username was sent
  if(!this.request.query.username) {

    this.throw('Username not specified');
    this.status = 400;

  }

  try {

    const user = yield Account.findOne({ username: this.request.query.username });
    if(!user) {
      this.throw('Username ' + this.request.query.username + ' not found.');
    }

    this.body = user;

  } catch(err) {

    this.throw(err);
    this.status = 400;

  }

  this.status = 200;

}

/**
 * Create an account
 * @function create
 * @return {Object} The newly created Account document
 */
exports.create = function * () {

  try {

    const user = new Account(this.request.body);
    yield user.save();
    this.body = 'User ' + user.get('username') + ' created';

  } catch(err) {

    this.throw(err);

  }

  this.status = 201;

}

/**
 * Update an account
 * @function update
 * @return {Object} The updated Account document
 */
exports.update = function * () {
  this.status = 200;
}
