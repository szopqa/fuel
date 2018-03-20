'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const logger = require('./logger');
const {port, db: dbConfig} = require('./config');


const app = express();

app.use(bodyParser.json());
app.use(require('./middleware/requestsLogger'));
app.use(require('./middleware/errorHandler'));

require('./database/db_configurator')(dbConfig).connect();
require('./REST/router')(app);


app.listen(port, function () {
    logger.info(`Server started on port ${port}`);
});

module.exports = {app};