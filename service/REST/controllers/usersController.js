'use strict';
const _ = require('lodash');

const {UserModel} = require('../../database/models/UserModel');

module.exports = (() => {
    const addNewUser = (req, res) => {
        const body = _.pick(req.body,['username', 'password', 'emailAddress']);
        const user = new UserModel(body);

        user.save()
            .then(() => {
                return user.generateAuthToken();
            })
            .then((token) => {
                res.header('x-auth', token).send(user);
            })
            .catch((e) => {
                res.status(400).send(e);
            });
    };

    const getUserById = (req, res) => {
        throw new Error('Not implemented exception!');
    };

    const deleteUser = (req, res) => {
        throw new Error('Not implemented exception!');
    };

    return {
        addNewUser,
        getUserById,
        deleteUser
    }
})();