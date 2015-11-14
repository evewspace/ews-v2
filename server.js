'use strict';

require('babel/register');

const co = require('co');
const port = (process.env.NODE_PORT || 3000);

var app = require('./lib/index');

co(function * () {
  app.listen(port);
  console.log('App started on port ' + port);
});
