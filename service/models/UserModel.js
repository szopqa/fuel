const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const {vehiclesCollectionName} = require('./VehicleModel');
const {transactionsCollectionName} = require('./TransactionModel');

const UserModel = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true,
        minlength: 5
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength:6
    },
    emailAddress: {
        type: String,
        required: [true, 'Email address is required!'],
        unique: true,
        validator: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email address'
        },
    },
    avatar: String,
    entryDate: {
        type: Date,
        default: Date.now()
    },
    tokens: [{
        access: { type: String, required: true },
        token: { type: String, required: true }
    }],
    userDomainInfo: {
        vehicles: [{
            type: Schema.Types.ObjectId,
            ref: vehiclesCollectionName
        }],
        historyOfTransactions: [{
            type: Schema.Types.ObjectId,
            ref: transactionsCollectionName
        }],
        distanceTravelled: {
            type: Number,
            default: 0
        },
        moneySpentOnFuel: {
            type: Number,
            default: 0
        }
    }
});

const usersCollectionName = 'Users';
module.exports = {
    UserModel : mongoose.model(usersCollectionName, UserModel),
    usersCollectionName
};