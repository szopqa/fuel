'use strict';

const  _ = require('lodash');

module.exports = (() => {
    const addCreatedResourceToArrayInUserModel = async (createdResource, fieldPath) => {
        let newObj = {};
        newObj[fieldPath] = createdResource;
        
        /**
         * TODO : Change that to {UserModel}- by now it has to be done this way becouse it keeps
         * returning undefined 
         */
        return await require('../../../database/models/UserModel').UserModel.findOneAndUpdate (
            {_id: createdResource.owner},
            {$push: newObj},
            {new: true});
    };

    const setAvarageCombustionFromTransaction = (fuelConsumed, distance) => {
        return (100 * fuelConsumed) / distance;
    };

    return {
        addCreatedResourceToArrayInUserModel,
        setAvarageCombustionFromTransaction
    }
})();