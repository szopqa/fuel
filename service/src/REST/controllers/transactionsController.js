'use strict';

const _ = require('lodash');

const {UserModel} = require('../../database/models/UserModel');
const {TransactionModel} = require('../../database/models/TransactionModel');
const {addCreatedResourceToArrayInUserModel} = require('./utils/utils');
const calculator = require('../activities/calculator');

module.exports = (() => {

    const addTransactionToTransactionsHistory = async (transaction) => {
        return addCreatedResourceToArrayInUserModel(transaction, 'userDomainInfo.historyOfTransactions');
    };

    const addNewTransaction = async (req, res) => {

        const transacionBody = Object.assign({
            owner: req.user._id,
            transactionDate: Date.now()
        }, req.body);

        const transaction = new TransactionModel(transacionBody);

        let savedTransaction;
        try{
            savedTransaction = await transaction.save();
        } catch (e) {
            logger.log('error', 'Failed to save transaction to database', {e});
            return res.status(400).send(e);
        };

        const updatedUser = await addTransactionToTransactionsHistory(savedTransaction);
        if (_.isNil(updatedUser)) {return res.status(404).send(`User not found!`)}
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