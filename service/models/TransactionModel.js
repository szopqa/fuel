const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {usersCollectionName} = require('./UserModel');
const {vehiclesCollectionName} = require('./VehicleModel');

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
    location: String
});

const transactionsCollectionName = 'Transactions';
module.exports = {
    TransactionModel : mongoose.model(transactionsCollectionName, TransactionModel),
    transactionsCollectionName
};