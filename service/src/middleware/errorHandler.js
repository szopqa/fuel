const {logger} = require('../logger')

module.exports = async (req, res, next) => {
    try {
        await next();
    } catch (err) {
        res.status(401).send(err);
        return logger.warn('Error : ', err);
    }
};