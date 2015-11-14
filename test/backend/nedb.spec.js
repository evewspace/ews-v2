'use strict';

const fs = require('fs')
  , path = require('path')
  , expect = require('chai').expect
  , co = require('co')
  , nedb = require('nedb')
  , wrapper = require('co-nedb');

const sdeFixture = require('./fixtures/sde.json');
const sdeDbFile = path.join(__dirname, '../../lib/db/staticData.db');

const sdeMapFixture = require('./fixtures/sde_map.json');
const sdeMapDbFile = path.join(__dirname, '../../lib/db/universeData.db');

describe('CCP Item SDE', () => {

  var db;

  before(() => {

    db = wrapper(new nedb({
      filename: sdeDbFile,
      autoload: true
    }));

  });

  after(() => {
    db = undefined;
  });

  it('should load', () => {

    expect(db).to.be.an('object');
    expect(db.filename).to.equal(sdeDbFile);

  });

  it('should let us query the collection', () => {
    expect(db).to.respondTo('findOne');
  });

  it('should correctly find a thing', () => {

    co(function * () {
      let thing = yield db.findOne({ id: 583 });
      return expect(thing).to.equal(sdeFixture);
    });

  });

});

describe('CCP Map SDE', () => {

  var db;

  before(() => {

    db = wrapper(new nedb({
      filename: sdeMapDbFile,
      autoload: true
    }));

  });

  after(() => {
    db = undefined;
  });

  it('should load', () => {
    expect(db).to.be.an('object');
    expect(db.filename).to.equal(sdeMapDbFile);
  });

  it('should let us query the collection', () => {
    expect(db).to.respondTo('findOne');
  });

  it('should correctly find a celestial thing', () => {

    co(function * () {
      let mapData = yield db.findOne({ itemID: 40151384 });
      return expect(mapData).to.equal(sdeMapFixture);
    });

  });

});
