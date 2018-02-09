const {commonsFactory} = require('../REST_test/commons');
const {app} = require('../../start');

module.exports = {
    get usersResource () {
        return commonsFactory({
            host: app,
            path: '/users',
            contentType: 'application/json'
        })
    },
    get vehiclesResource () {
        return commonsFactory({
            host: app,
            path: '/vehicles',
            contentType: 'application/json'
        })
    }
};