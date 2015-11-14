'use strict';

/**
 * @requires path
 * @requires winston
 * @requires moment-timezone
 */
const path = require('path')
  , winston = require('winston')
  , moment = require('moment-timezone');

const logDir = path.join(process.cwd(), 'log');

module.exports = function(opts) {

  const logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: process.env.NODE_ENV === 'development' ? 'debug' : 'error'
      }),
      new winston.transports.File({
        filename: path.join(logDir, `${ moment(new Date()).format('YYYY-MM-DD') }.log`),
        level: process.env.NODE_ENV === 'development' ? 'debug' : 'error'
      })
    ]
  });

  return function * (next) {

    this.logger = logger;

    yield next;

  }

}

module.exports.reqLog = function(opts) {

  return function * (next) {

    const req = this.request
      , header = req.header
      , nReq = this.req;

    this.logger.info('%s %s -- %s %s HTTP/%s, %s %s',
      moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
      req.ip,
      req.method,
      req.url,
      nReq.httpVersion,
      (req.length || 0),
      header['user-agent']
    );

    yield next;

  }

}
