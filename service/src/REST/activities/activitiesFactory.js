'use strict';

const joi = require('joi');

const inputValidationError = (input, JoiSchema) => {
    return (joi.validate(input, JoiSchema)).error;
};

module.exports = ({MongooseModel, JoiSchema, getResourceBody}) => {

    const addNew = async (payload) => {
        const body = getResourceBody(payload);

        if(inputValidationError(body, JoiSchema) !== null) {
            throw new Error(schemaValidation.error)
        }

        const dbModel = MongooseModel();
        return await new dbModel(body).save();
    }

    const getById = async (resourceId) => {
        const dbModel = MongooseModel();
        return await dbModel.findById(resourceId);
    };

    const getAllForUser = async (userID) => {
        return await MongooseModel().find({
            owner: userID
        })
    }

    return {
        addNew,
        getById,
        getAllForUser
    }
}