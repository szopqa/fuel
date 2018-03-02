'use strict';

const _ = require('lodash');

const {addCreatedResourceToArrayInUserModel} = require('../controllers/utils/utils');
const {UserModel} = require('../../database/models/UserModel');
const {VehicleModel} = require('../../database/models/VehicleModel');
const utils = require('../controllers/utils/utils');

const addToTransactionsHistory = async (newTransaction) => {
    return await addCreatedResourceToArrayInUserModel(newTransaction, 'userDomainInfo.historyOfTransactions');
};

const updateUserDomainFields = async (userID, distance,transactionPrice) => {
    return await UserModel
        .findByIdAndUpdate(userID, {
            $inc: {
                'userDomainInfo.totalDistanceTravelled': distance,
                'userDomainInfo.totalMoneySpentOnFuel': transactionPrice
            }
        },{new: true});
}

const updateAvgCombustion = (currentComb, currentTransAmount, transactionComb) => {
    return ((currentComb * currentTransAmount) + transactionComb) / (currentTransAmount + 1);
};

const updateVehicleDomainFields = async (vehicleID, distance, fuelConsumed) => {
    const avgCombustion = utils.setAvarageCombustionFromTransaction(fuelConsumed, distance)
    
    const transactionVehicle = await VehicleModel.findById(vehicleID);
    if(_.isNil(transactionVehicle)) {return null}

    const {averageCombustion,distanceTravelled,currentTransactionsNum} = transactionVehicle;
    return await transactionVehicle.update({$set: {
        'distanceTravelled': distanceTravelled + distance,
        'averageCombustion': updateAvgCombustion(averageCombustion, currentTransactionsNum, avgCombustion),
        'currentTransactionsNum': (currentTransactionsNum + 1)
    }});
};


module.exports = {
    updateUserBasedOnTransactionData: async (userID, newTransaction) => {
        const {distanceSinceLastRefueling, transactionPrice} = newTransaction;
        
        //TODO: Refactor - user builder
        let updatedUser;
        updatedUser = await addToTransactionsHistory(newTransaction);    
        updatedUser = await updateUserDomainFields(userID, distanceSinceLastRefueling, transactionPrice);
        
        return updatedUser;
    },
    updateVehicleBasedOnTransactionData: async (vehicleID, newTransaction) => {
        const {distanceSinceLastRefueling, refueledAmount} = newTransaction;

        const updatedVehicle 
            = await updateVehicleDomainFields(vehicleID, distanceSinceLastRefueling, refueledAmount);

        return updatedVehicle;           
    },
    updateAvgCombustion
};