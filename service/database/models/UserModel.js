'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Schema = mongoose.Schema;

const {vehiclesCollectionName} = require('./VehicleModel');
const {transactionsCollectionName} = require('./TransactionModel');
const {tokenSecret} = require('../../secrets');

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

UserModel.methods.toJSON = function () {
    const userObject = this.toObject();
    return _.omit(userObject, ['password', 'tokens']);
};

UserModel.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(), access}, tokenSecret).toString();

    user.tokens.push({access, token});

    return user.save()
        .then(() => {
            return token;
        });
};

UserModel.statics.findByToken = function (token) {
    const User = this;

    let decoded;
    try {
        decoded = jwt.verify(token, tokenSecret);
    } catch (e) {
        return Promise.reject(e);
    }

    return User.findOne({
       _id: decoded._id,
       'tokens.token': token,
        'tokens.access' : 'auth'
    });
};

const usersCollectionName = 'Users';
module.exports = {
    UserModel : mongoose.model(usersCollectionName, UserModel),
    usersCollectionName
};