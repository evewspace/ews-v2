'use strict';

const fs = require('fs')
  , path = require('path')
  , expect = require('chai').expect
  , co = require('co');

const ewsServer = require('../../lib');

describe('Application', () => {

  describe('Map resource', () => {

    const mapController = require('../../lib/controllers/v1/map');

    it('should expose the resources', () => {
      expect(mapController).to.respondTo('read');
      expect(mapController).to.respondTo('create');
      expect(mapController).to.respondTo('update');
      expect(mapController).to.respondTo('delete');
    });

    it('should read correctly', () => {

    });
  });

});
