'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

const logger = require('./logger');
const {port} = require('./config');


const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
    logger.info('HTTP Request', {
        method: req.method,
        url: req.originalUrl,
        body: _.omit(req.body, 'password'),
        timestamp: Date.now()
    });
    next();
});



require('./database/db_configurator') (mongoose);
require('./REST/router') (app);

app.listen(port, function () {
    logger.info(`Server started on port ${port}`);
});

module.exports = {app};