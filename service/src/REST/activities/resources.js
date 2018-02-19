'use strict';

const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const activitiesFactory = require('./activitiesFactory');
const {TransactionModel} = require('../../database/models/TransactionModel');
const {UserModel} = require('../../database/models/UserModel');
const {VehicleModel} = require('../../database/models/VehicleModel');

const transactionJoiSchema = {
    owner: joi.objectId().required(),
    vehicle: joi.objectId().required(),
    transactionDate: joi.date().required(),
    refueledAmount: joi.number().min(0).max(500),
    transactionPrice: joi.number().min(0),
    pricePerLiter: joi.number().min(0),
    distanceSinceLastRefueling: joi.number().min(0),
    location: joi.string()
};

const vehicleJoiSchema = {
    owner: joi.objectId().required(),
    brand: joi.string().required(),
    plate: joi.string().required(),
    avatar: joi.string(),
    description: joi.string(),
    averageCombustion: joi.number().min(0)
};

module.exports = {
    get transactions () {
        return activitiesFactory({
            MongooseModel: () => TransactionModel,
            JoiSchema: transactionJoiSchema,
            getResourceBody: (payload) => {
                return Object.assign({
                    owner: payload.user._id.toString(),
                    transactionDate: Date.now()
                }, payload.body);
            }
        })
    },
    get vehicles () {
        return activitiesFactory({
            MongooseModel: () => VehicleModel,
            JoiSchema: vehicleJoiSchema,
            getResourceBody: (payload) => {
                return Object.assign({
                    owner: payload.user._id.toString(),
                }, payload.body);
            }
        })
    },
    // get user () {
    //     return activitiesFactory({
    //         MongooseModel: UserModel,
    //     })
    // }
};