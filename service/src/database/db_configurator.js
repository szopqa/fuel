'use strict';

const mongoose = require('mongoose');

const logger = require ('../logger');

module.exports = ({host, port, dbName}) => {

    const connectionString = `mongodb://${host}:${port}/${dbName}`
    mongoose.Promise = global.Promise;

    const handleSuccessfulConnection = () => {
        logger.info(`Connected to ${dbName} database`);
    };
    
    const handleConnectionError = (err) => {
        logger.log('error',{err});
    };
    
    const connect = () => {
        mongoose.connect(connectionString);

        const dbConnection = mongoose.connection;
            dbConnection.once('open', handleSuccessfulConnection);
            dbConnection.on('error',handleConnectionError);
    };

    return {connect};
};