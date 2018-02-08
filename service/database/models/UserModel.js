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

UserModel.methods.removeToken = function (token) {
  const user = this;

  return user.update({
      $pull: {
          tokens:{token}
      }
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

UserModel.statics.findByCredentials = function (userCredentials) {
    const {password, emailAddress} = userCredentials;
    const User = this;

    return User.findOne({emailAddress})
        .then((user) => {
            if (! user) return Promise.reject();

            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        resolve (user);
                    } else {
                        reject ();
                    }
                })
            })
        })
};

UserModel.pre('save', function (next) {
   let user = this;
   if (user.isModified('password')) {
       bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hashedPass) => {
                user.password = hashedPass;
                next();
            })
       });
   } else { next(); }
});

const usersCollectionName = 'Users';
module.exports = {
    UserModel : mongoose.model(usersCollectionName, UserModel),
    usersCollectionName
};