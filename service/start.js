'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const logger = require('./logger');
const db_configurator = require('./database/db_configurator');
const {db} = require('./secrets');
const {port} = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(function (req, res, next) {
    logger.info('HTTP Request', {
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        timestamp: Date.now()
    });
    next();
});

db_configurator(mongoose);

require('./REST/router') (app);

app.listen(port,function () {
    logger.info(`Server started on port ${port}`);
});
