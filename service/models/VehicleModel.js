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
    averageCombustion: Number
});

const vehiclesCollectionName = 'Vehicles';
module.exports = {
    VehicleModel : mongoose.model(vehiclesCollectionName, VehicleModel),
    vehiclesCollectionName
};