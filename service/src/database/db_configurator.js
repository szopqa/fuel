'use strict';

const mongoose = require('mongoose');

const {db} = require ('../secrets');
const logger = require ('../logger');

module.exports = (() => {
    // const connectionString =
    //     `mongodb://${db.username}:${db.password}@ds141068.mlab.com:41068/fuel`;
    const connectionString = 'mongodb://mongo_database:27017/fuel'

    const handleSuccessfulConnection = () => {
        logger.info(`Connected to ${db.databaseName} database`);
    };

    const handleConnectionError = (err) => {
        logger.log('error',{err});
    };

    return ({host, port, dbName}) => {
        mongoose.Promise = global.Promise;

        mongoose.connect(connectionString);

        const dbConnection = mongoose.connection;
            dbConnection.once('open', handleSuccessfulConnection);
            dbConnection.on('error',handleConnectionError);
    };
})();