'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {usersCollectionName} = require('./UserModel');

const VehicleModel = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: usersCollectionName
    },
    brand: {
        type: String,
        required: [true, 'Vehicle\'s brand is mandatory!']
    },
    avatar: String,
    description: String,
    fuelType: {
        type: String,
        required: [true, 'Fuel type is required!'],
    },
    plate: {
        type: String,
        unique: true
    },
    averageCombustion: {
        type: Number,
        default: 0
    },
    distanceTravelled: {
        type: Number,
        default: 0
    },
    currentTransactionsNum: {
        type: Number,
        default: 0
    }
});

const vehiclesCollectionName = 'Vehicles';
module.exports = {
    VehicleModel : mongoose.model(vehiclesCollectionName, VehicleModel),
    vehiclesCollectionName
};