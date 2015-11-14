'use strict';

const fs = require('fs')
  , path = require('path')
  , expect = require('chai').expect
  , co = require('co')
  , Mongorito = require('mongorito');

const accountFixture = require('./fixtures/account');
const Account = require('../../lib/models/account');

describe('Account Model', () => {

  before(() => {
    Mongorito.connect('mongodb://localhost/ews_test');
  });

  after(() => {
    Mongorito.disconnect();
  });

  it('should be a valid class of Account', function * () {

    let account = new Account(accountFixture);

    expect(account).to.be.an('object');
    expect(account.get()).to.deep.equal(accountFixture);

  });

  it('should have a public function #comparePassword', function * () {

    let account = new Account(accountFixture);

    expect(account).to.respondTo('comparePassword');

  });

  it('should create a new account', function * () {

    let account = new Account(accountFixture);

    expect(account).to.respondTo('get');

    let attrs = account.get();

    expect(attrs).to.deep.equal(accountFixture);

  });

  it('should save the account correctly', function * () {

    try {

      let account = new Account(accountFixture);

      expect(account).to.respondTo('save');

      account.save()

    } catch (err) {
      expect(err).to.not.exist;
    }

  });

  it('should not save an incorrect account object', function * () {

    let account2 = new Account({ username: 'thisshouldfail' });
    let error = {};

    try {
      yield* account2.save();
    } catch (err) {
      error = err;
    }

    expect(error.name).to.equal('ValidationError');

  });

});
