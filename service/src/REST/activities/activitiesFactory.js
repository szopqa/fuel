'use strict';

const joi = require('joi');

module.exports = ({MongooseModel, JoiSchema, getResourceBody}) => {

    const addNew = async (payload) => {
        const body = getResourceBody(payload);

        const bodyValidation = joi.validate(body, JoiSchema);        
        if(bodyValidation.error !== null) {
            throw new Error(schemaValidation.error)
        }

        const dbModel = MongooseModel();
        return await new dbModel(body).save();
    }

    const getAllForUser = async (userID) => {
        return await MongooseModel().find({
            owner: userID
        })
    }

    return {
        addNew,
        getAllForUser
    }
}