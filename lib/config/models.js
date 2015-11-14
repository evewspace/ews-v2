/**
 * Configure the Eve-WSpace models.
 * @module ews/config/models
 * @requires co
 * @requires ews/models/account
 * @requires ews/models/character
 * @requires ews/models/map
 * @requires ews/models/system
 */
'use strict';
const co = require('co');

const Account = require('../models/account');
const Character = require('../models/character');
const Map = require('../models/map');
const System = require('../models/system');

module.exports = function () {
  co(function *() {
    yield Account.index('username', { unique: true });
    yield Account.index('email', { unique: true });

    yield Character.index('characterID', { unique: true });
    yield Character.index('name', { unique: true });

    yield Map.index('name', { unique: true });

    yield System.index('systemName', { unique: true });
    yield System.indeX('systemTag', { unique: true });
  });
};
