'use strict';

const _ = require('lodash');

const logger = require('../logger');

module.exports = (req, res, next) => {
    logger.info('HTTP Request', {
        method: req.method,
        url: req.originalUrl,
        body: _.omit(req.body, 'password'),
        timestamp: Date.now()
    });
    next();
};