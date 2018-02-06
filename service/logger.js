'use strict';
const winston = require('winston');

const {logs} = require('./config');

module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: logs }),
        new (winston.transports.Console)()
    ]
});