'use strict';

const {addCreatedResourceToArrayInUserModel} = require('../controllers/utils/utils');
const {UserModel} = require('../../database/models/UserModel')

const addToTransactionsHistory = async (newTransaction) => {
    return await addCreatedResourceToArrayInUserModel(newTransaction, 'userDomainInfo.historyOfTransactions');
};

const updateUserDomainInfo = async (userID, distance,transactionPrice) => {
    return await UserModel
        .findByIdAndUpdate(userID, {
            $inc: {
                'userDomainInfo.distanceTravelled': distance,
                'userDomainInfo.moneySpentOnFuel': transactionPrice
            }
        },{new: true});
}


module.exports = {
    updateUserBasedOnTransactionData: async (userID, newTransaction) => {
        const {distanceSinceLastRefueling, transactionPrice} = newTransaction;
        
        //TODO: Refactor - user builder
        let updatedUser;
        updatedUser = await addToTransactionsHistory(newTransaction);    
        updatedUser = await updateUserDomainInfo(userID, distanceSinceLastRefueling, transactionPrice);
        
        return updatedUser;
    },
    setAuthTokenForUser: async (user) => {
        return await user.generateAuthToken();
    }
    
};