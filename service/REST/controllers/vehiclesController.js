'use strict';

const {VehicleModel} = require('../../database/models/VehicleModel');
const {UserModel} = require('../../database/models/UserModel');

module.exports = (() => {
    const addNewVehicle = (req, res) => {
        const vehicleBody = req.body;
        const vehicle = new VehicleModel({
            owner: req.user,
            brand: vehicleBody.brand,
            averageCombustion: vehicleBody.averageCombustion,
            avatar: vehicleBody.avatar,
            description: vehicleBody.description
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
                    if (! owner) return res.status(404).send(`User not found!`);

                    res.json({
                        owner: owner,
                        addedVehicleId: vehicle._id
                    });
                })
            })
            .catch((e) => {
                res.status(400).send(e);
            })
    };

    const getUserVehicles = (req, res) => {
        VehicleModel.find({
            owner: req.user._id
        })
        .then((vehicles) => {
            res.send(vehicles)
        })
        .catch((e) => {
            res.status(400).send(e);
        })
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