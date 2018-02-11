'use strict';
const _ = require('lodash');

const {UserModel} = require('../../database/models/UserModel');
const logger = require('../../logger');

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
                logger.log('error',e);
                res.status(400).send(e);
            });
    };

    // TODO : Return not found when user doesn't exist
    const loginUser = (req, res) => {
        const credentials = _.pick(req.body,['username', 'password', 'emailAddress']);
        UserModel
            .findByCredentials(credentials)
            .then((user) => {
                return user.generateAuthToken()
                    .then((token) => {
                        res.header('x-auth', token).send(user);
                    });
            })
            .catch((e) => {
                res.status(400).send(e);
            })

    };

    const logoutUser = (req, res) => {
        req.user.removeToken(req.token)
            .then(() => res.status(200).send())
            .catch((e) => res.status(400).send())
    };

    const getLoggedUser = (req, res) => {
        const loggedUser = req.user;
        res.send(loggedUser);
    };

    const getUserById = (req, res) => {
        throw new Error('Not implemented exception!');
    };

    const deleteUser = (req, res) => {
        throw new Error('Not implemented exception!');
    };

    return {
        addNewUser,
        loginUser,
        logoutUser,
        getLoggedUser,
        getUserById,
        deleteUser
    }
})();