'use strict';
const winston = require('winston');

const {logsPath} = require('./config');

module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: logsPath }),
        new (winston.transports.Console)()
    ]
});