'use strict';

const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const {TransactionModel} = require('../../database/models/TransactionModel')

module.exports = (() => {
    
    const addTransaction = async (payload, cb) => {
        const transactionSchema = joi.object().keys({
            owner: joi.objectId().required(),
            vehicle: joi.objectId().required(),
            transactionDate: joi.date().required(),
            refueledAmount: joi.number().min(1).max(300),
            transactionPrice: joi.number().min(1),
            pricePerLiter: joi.number().min(1),
            distanceSinceLastRefueling: joi.number().min(1),
            location: joi.string()
        })

        const transacionBody = Object.assign({
            owner: payload.user._id.toString(),
            transactionDate: Date.now()
        }, payload.body);

        const schemaValidation = joi.validate(transacionBody, transactionSchema);
        //TODO: Handling error with joi validation
        if(schemaValidation.error !== null) {throw new Error(schemaValidation.error)}

        return await new TransactionModel(transacionBody).save();
    };
    

    return{
        addTransaction  
    }
})();