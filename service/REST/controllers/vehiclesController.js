'use strict';

const {VehicleModel} = require('../../database/models/VehicleModel');
const {UserModel} = require('../../database/models/UserModel');
const logger = require('../../logger');

module.exports = (() => {
    const addNewVehicle = async (req, res) => {

        const vehicleBody = req.body;
        const vehicle = new VehicleModel({
            owner: req.user,
            brand: vehicleBody.brand,
            averageCombustion: vehicleBody.averageCombustion,
            avatar: vehicleBody.avatar,
            description: vehicleBody.description
        });

        let savedVehicle;
        try{
            savedVehicle = await vehicle.save();
        } catch (e) {
            logger.log('error', 'Failed to save vehicle to database', {e});
            res.status(400).send(e);
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            {_id: savedVehicle.owner},
            {$push: {'userDomainInfo.vehicles': savedVehicle}},
            {new: true} );

        if (! updatedUser) {return res.status(404).send(`User not found!`)}

        res.json({
            owner: updatedUser,
            addedVehicleId: savedVehicle._id
        });
    };

    const getUserVehicles = async (req, res) => {
        const userVehicles = await VehicleModel.find({
            owner: req.user._id
        });
        if(!userVehicles) {res.status(400).send()}

        res.send(userVehicles)
    };

    const deleteVehicle = (req, res) => {
        throw new Error('Not implemented exception!');
    };

    return {
        addNewVehicle,
        getUserVehicles,
        deleteVehicle
    }
})();