module.exports = {
    port: process.env.PORT || 3000,
    logsPath: `${__dirname}/logs/logs.log`,
    db: {
        host: 'mongo_database',
        port: 27017,
        dbName: 'fuel'
    }
};