'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const logger = require('./logger');
const {port} = require('./config');
const dbConfig = require('./database/dbConfig');


const app = express();

app.use(bodyParser.json());
app.use(require('./middleware/requestsLogger'));


require('./database/db_configurator')(dbConfig).connect();
require('./REST/router') (app);


app.listen(port, function () {
    logger.info(`Server started on port ${port}`);
});

module.exports = {app};