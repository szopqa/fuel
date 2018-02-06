'use strict';
const {db} = require ('../secrets');
const logger = require ('../logger');

module.exports = (() => {
    const connectionString =
        `mongodb://${db.username}:${db.password}@ds125368.mlab.com:25368/fuel`;


    const handleSuccessfulConnection = () => {
        logger.info(`Connected to ${db.databaseName} database`);
    };

    const handleConnectionError = (err) => {
        logger.log('error',{err});
    };

    return (mongoose) => {
        mongoose.Promise = global.Promise;

        mongoose.connect(connectionString);

        const dbConnection = mongoose.connection;
            dbConnection.once('open', handleSuccessfulConnection);
            dbConnection.on('error',handleConnectionError);
    };
})();