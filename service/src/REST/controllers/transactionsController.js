'use strict';

const _ = require('lodash');

const {TransactionModel} = require('../../database/models/TransactionModel');
const {addCreatedResourceToArrayInUserModel} = require('./utils/utils');
const transactionActivities = require('../activities/transactionActivities');
const userActivities = require('../activities/userActivities');
const logger = require('../../logger');

module.exports = (() => {

    const addNewTransaction = async (req, res) => {
        const userID = req.user._id;

        let savedTransaction;
        let updatedUser;        
        try{
            savedTransaction = await transactionActivities.addTransaction(req);
            updatedUser = await userActivities.updateUserBasedOnTransactionData(userID, savedTransaction);
        } catch (e) {
            //TODO : Error handling 
            logger.log('error', `Failed to add new transaction ${savedTransaction, updatedUser}`);
            return res.status(400).send(`Failed to add new transaction ${savedTransaction, updatedUser}`);
        };
        
        return res.json({
            owner: updatedUser,
            addedTransactionId: savedTransaction._id
        });
    };

    const getUserTransactions = async (req, res) => {
        const userTransactions = await TransactionModel.find({
            owner: req.user._id
        }); 
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