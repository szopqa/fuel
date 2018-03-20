'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {usersCollectionName} = require('./UserModel');
const {vehiclesCollectionName} = require('./VehicleModel');
const {setAvarageCombustionFromTransaction} = require('../../REST/controllers/utils/utils');
const transactionModelHelpers = require('./orm_helpers/transactionModelHelpers');
/**
 * By now Transaction has only 'location' field. In future it will be 
 * transformed to separate object containing all organization's info
 */
const TransactionModel = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: usersCollectionName
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: vehiclesCollectionName
    },
    transactionDate: {
        type: Date,
        default: Date.now(),
        required: [true, 'Transaction\'s date is mandatory!']
    },
    refueledAmount: {
        type: Number,
        required: [true, 'Refueled amount is mandatory!']
    },
    transactionPrice: {
        type: Number,
        required: [true, 'Transaction\'s price is mandatory!']
    },
    pricePerLiter: {
        type: Number,
        required: [true, 'Transaction\'s price per liter is mandatory!']
    },
    distanceSinceLastRefueling: Number,
    location: String,
    averageCombustionFromTransaction: Number
});

transactionModelHelpers.initORMHelpers(TransactionModel);

const transactionsCollectionName = 'Transactions';
module.exports = {
    TransactionModel : mongoose.model(transactionsCollectionName, TransactionModel),
    transactionsCollectionName
};