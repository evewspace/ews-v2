'use strict';

/**
 * @module ews/controllers/site
 * @requires ews/models/map
 */
const Maps = require('../../models/map');

/**
 * Build the navigation list for the site
 * @function navigation
 * @todo generate available navigation based on the user's roles.
 */
exports.navigation = function * () {

  const Navigation = [];

  try {

    const mapLinks = yield Maps.find({})

    Navigation.push({
      label: 'Map',
      links: mapLinks.map(function(val) {
        return {
          label: val.name,
          href: '/api/v1/maps/' + val._id
        }})
    });

    this.body = Navigation

  } catch(err) {

    this.status = 403;
    this.throw(err);

  }

  this.status = 200;

}
