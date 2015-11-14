/**
 * Eve-WSpace Routes
 * @module ews/controllers
 */
'use strict';

const Router = require('koa-router')
  , jwt = require('koa-jwt')
  , Mount = require('koa-mount');

const Util = require('../utils');

module.exports = function WSpaceRouter(app) {

  /** Load Controllers
   * @todo load controllers automatically
   */
  let AuthCtrl = require('./v1/auth')
    , SiteCtrl = require('./v1/site')
    , AccountCtrl = require('./v1/account')
    , MapCtrl = require('./v1/map');

  // Create our routers
  let indexRouter = Router()
    , unprotectedRouter = Router()
    , mapRouter = Router();

  indexRouter.get('/', function * () {
    yield this.render('index');
  });

  unprotectedRouter.prefix('/api/v1');
  // Site navigation
  unprotectedRouter.get('/navigation', SiteCtrl.navigation);
  // Authentication
  unprotectedRouter.get('/auth', AuthCtrl.authenticate);

  // Maps
  mapRouter.prefix('/api/v1/maps');
  mapRouter.use(jwt({ secret: app.keys[0] }));
  mapRouter.get('/', MapCtrl.read);
  mapRouter.post('/', MapCtrl.create);
  mapRouter.put('/:id', MapCtrl.update);
  mapRouter.del('/:id', MapCtrl.delete);

  // Custom 401 handler
  app.use(function *(next) {

    try {
      yield next;
    } catch(err) {
      if(err.status === 401) {
        this.status = 401;
        this.body = 'You are not authorized to view this resource.'
      } else {
        this.throw(err);
      }
    }

  });

  // Mount the routers to the application
  app.use(indexRouter.routes());
  app.use(unprotectedRouter.routes());
  app.use(mapRouter.routes());

}
