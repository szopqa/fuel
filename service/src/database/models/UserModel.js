'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const {vehiclesCollectionName} = require('./VehicleModel');
const {transactionsCollectionName} = require('./TransactionModel');
const {tokenSecret} = require('../../secrets');
const userModelHelpers = require('./orm_helpers/userModelHelpers');

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
    name: String,
    surname: String,
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
        totalDistanceTravelled: {
            type: Number,
            default: 0
        },
        totalMoneySpentOnFuel: {
            type: Number,
            default: 0
        }
    }
});

userModelHelpers.initORMHelpers(UserModel);

const usersCollectionName = 'Users';
module.exports = {
    UserModel : mongoose.model(usersCollectionName, UserModel),
    usersCollectionName
};