'use strict';

const _ = require('lodash');

const {updateUserBasedOnTransactionData} = require('../activities/userActivitiesHelper');
const resources = require('../activities/resources');
const logger = require('../../logger');

module.exports = (() => {

    const addNewTransaction = async (req, res) => {
        const userID = req.user._id;

        let savedTransaction;
        try{
            savedTransaction = await resources.transactions.addNew(req);
        } catch (e) {
            logger.log('error', `Failed to add new transaction`);
            return res.status(400).send(`Failed to add new transaction ${e}`);
        };

        let updatedUser;        
        try {
            updatedUser = await updateUserBasedOnTransactionData(userID, savedTransaction);
        } catch (e) {
            //TODO: Delete added transaction if it couldn't be added for user
            logger.log('error', `Failed to update user data`);
            return res.status(400).send(`Failed to update user data`);
        }   

        return res.json({
            owner: updatedUser,
            addedTransactionId: savedTransaction._id
        });
    };

    const getUserTransactions = async (req, res) => {
        const userTransactions = await resources
                .transactions
                .getAllForUser(req.user._id);
        
        if(! userTransactions) {return res.status(400).send()}

        return res.send({
            amount: userTransactions.length,
            userTransactions
        })
    };

    const getTransactionById = (req, res) => {
        throw new Error('Not implemented exception!');
    };

    const deleteTransaction = (req, res) => {
        throw new Error('Not implemented exception!');
    };

    return {
        addNewTransaction,
        getUserTransactions,
        getTransactionById,
        deleteTransaction
    }
})();