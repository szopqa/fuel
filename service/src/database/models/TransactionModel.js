'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {usersCollectionName} = require('./UserModel');
const {vehiclesCollectionName} = require('./VehicleModel');
const {setAvarageCombustionFromTransaction} = require('../../REST/controllers/utils/utils');

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

TransactionModel.pre('save', function (next) {
    if (this.isModified('refueledAmount') && this.isModified('distanceSinceLastRefueling')) {
        this.averageCombustionFromTransaction 
            = setAvarageCombustionFromTransaction(this.refueledAmount, this.distanceSinceLastRefueling);
        next();    
    } else { next(); }
 });

const transactionsCollectionName = 'Transactions';
module.exports = {
    TransactionModel : mongoose.model(transactionsCollectionName, TransactionModel),
    transactionsCollectionName
};