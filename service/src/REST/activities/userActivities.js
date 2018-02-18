'use strict';

const {addCreatedResourceToArrayInUserModel} = require('../controllers/utils/utils');
const {UserModel} = require('../../database/models/UserModel')

const addToTransactionsHistory = async (transaction) => {
    return await addCreatedResourceToArrayInUserModel(transaction, 'userDomainInfo.historyOfTransactions');
};

const updateUSerDomainInfo = async (userID, distance,transactionPrice) => {
    return await UserModel
        .findByIdAndUpdate(userID, {
            $inc: {
                'userDomainInfo.distanceTravelled': distance,
                'userDomainInfo.moneySpentOnFuel': transactionPrice
            }
        },{new: true});
}


module.exports = (() => {
    const updateUserBasedOnTransactionData = async (userID, addedTransaction) => {
        const {distanceSinceLastRefueling, transactionPrice} = addedTransaction;
        
        let updatedUser;
        updatedUser = await addToTransactionsHistory(addedTransaction);    
        updatedUser = await updateUSerDomainInfo(userID, distanceSinceLastRefueling, transactionPrice);
        
        return updatedUser;
    };

    return {
        updateUserBasedOnTransactionData
    }
})()