'use strict';
const _ = require('lodash');

const {UserModel} = require('../../database/models/UserModel');
const resources = require('../activities/resources')
const {setAuthTokenForUser} = require('../activities/userActivitiesHelper')
const logger = require('../../logger');

module.exports = (() => {

    const addNewUser = async (req, res) => {
        
        let savedUser;
        let authToken; 
        try{
            savedUser = await resources.users.addNew(req);
            authToken = await setAuthTokenForUser(savedUser);
        } catch (e) {
            logger.log('error', 'Failed to save user',e);
            return res.status(400).send(e);
        }
        
        res.header('x-auth', authToken).send(savedUser);
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

    const getLoggedUser = async (req, res) => {
        let userInfo;
        try {
            userInfo = await UserModel
                .findById(req.user)
                .populate('userDomainInfo.vehicles')
                .populate('userDomainInfo.historyOfTransactions')
                .exec();
        } catch (e) {
            res.status(400).send(e);
        }
        return userInfo ? res.send(userInfo) : res.status(404).send('User not found');
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