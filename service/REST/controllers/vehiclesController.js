'use strict';

const {VehicleModel} = require('../../database/models/VehicleModel');
const {UserModel} = require('../../database/models/UserModel');

module.exports = (() => {
    const addNewVehicle = (req, res) => {
        const vehicle = new VehicleModel({
            owner: req.user,
            brand: req.body.brand,
        });

        // TODO: Refactor
        vehicle.save()
            .then((vehicle) => {
                UserModel.findOneAndUpdate({_id:vehicle.owner}, {
                    $push: {
                        'userDomainInfo.vehicles': vehicle
                    }
                }, (err, owner) => {
                    if (err) return res.status(400).send(err);

                    res.json(owner);
                })
            })
            .catch((e) => {
                res.status(400).send(e);
            })
    };

    const getVehicleById = (req, res) => {
        throw new Error('Not implemented exception!');
    };

    const deleteVehicle = (req, res) => {
        throw new Error('Not implemented exception!');
    };

    return {
        addNewVehicle,
        getVehicleById,
        deleteVehicle
    }
})();