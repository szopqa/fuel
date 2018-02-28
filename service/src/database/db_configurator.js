'use strict';

const mongoose = require('mongoose');

const logger = require ('../logger');

module.exports = (() => {

    const handleSuccessfulConnection = () => {
        logger.info(`Connected to database`);
    };
    
    const handleConnectionError = (err) => {
        logger.log('error',{err});
    };
    
    return ({host, port, dbName}) => {        
        const connectionString = `mongodb://${host}:${port}/${dbName}`
        mongoose.Promise = global.Promise;

        mongoose.connect(connectionString);

        const dbConnection = mongoose.connection;
            dbConnection.once('open', handleSuccessfulConnection);
            dbConnection.on('error',handleConnectionError);
    };
})();