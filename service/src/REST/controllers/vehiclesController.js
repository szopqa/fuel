'use strict';

const _ = require('lodash');

const resources = require('../activities/resources')
const {addCreatedResourceToArrayInUserModel} = require('./utils/utils');
const {VehicleModel} = require('../../database/models/VehicleModel');
const {UserModel} = require('../../database/models/UserModel');
const logger = require('../../logger');

module.exports = (() => {

    const addVehicleToUserVehicles = async (savedVehicle) => {
        return addCreatedResourceToArrayInUserModel(savedVehicle, 'userDomainInfo.vehicles');
    };


    const addNewVehicle = async (req, res) => {

        let savedVehicle;
        try{
            savedVehicle = await resources.vehicles.addNew(req);
        } catch (e) {
            logger.log('error', 'Failed to save vehicle to database', {e});
            return res.status(400).send(e);
        }

        const updatedUser = await addVehicleToUserVehicles(savedVehicle);
        if (_.isNil(updatedUser)) {return res.status(404).send(`User not found!`)}

        res.json({
            owner: updatedUser,
            addedVehicleId: savedVehicle._id
        });
    };

    const getUserVehicles = async (req, res) => {
        const userVehicles = await resources
                .vehicles
                .getAllForUser(req.user._id);
                
        if(! userVehicles) { return res.status(400).send() }

        return res.send({
            amount: userVehicles.length,
            userVehicles
        })
    };

    const getSingleVehicle = async (req, res) => {
        const userVehicle = await resources
                .vehicles
                .getById(req.params.id);

        if(! userVehicle) { return res.status(404).send() }

        return res.send({
            userVehicle
        })        
    };

    const deleteVehicle = (req, res) => {
        throw new Error('Not implemented exception!');
    };

    return {
        addNewVehicle,
        getUserVehicles,
        getSingleVehicle,
        deleteVehicle
    }
})();