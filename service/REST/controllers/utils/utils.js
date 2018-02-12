'use strict';
const  _ = require('lodash');
const {UserModel} = require('../../../database/models/UserModel');

module.exports = (() => {
    const addCreatedResourceToArrayInUserModel = async (createdResource, fieldPath) => {
        let newObj = {};
        newObj[fieldPath] = createdResource;

        return await UserModel.findOneAndUpdate (
            {_id: createdResource.owner},
            {$push: newObj},
            {new: true});
    };

    return {
        addCreatedResourceToArrayInUserModel
    }
})();