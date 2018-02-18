const should = require('should');
const _ = require('lodash');

const payloads = require('../helpers/payloads');
const {TransactionModel} = require('../../database/models/TransactionModel');
const globals = require('../helpers/globals');

beforeEach((done) => {
    TransactionModel.remove({})
        .then(() => done());
});

describe('POST /user/transactions', function () {
    it('Should add transaction for logged user', async () => {
        const userPayload = payloads.generateNonExistingUser();
        const postUserRes = await globals.usersResource
            .createResource()
            .post(userPayload);
        postUserRes.statusCode.should.be.equal(200, postUserRes.error);

        const token = _.get(postUserRes.headers, 'x-auth');
        const sampleVehicleID = "5a81d0c66aa47014126aeb58";
        const transPayload = payloads.sampleTransactionPayload(sampleVehicleID);
        const postTransactionRes = await globals.transactionResource
            .createResource({token})
            .post(transPayload);
        postTransactionRes.statusCode.should.be.equal(200, postTransactionRes.error);

        const {addedTransactionId} = postTransactionRes.body;
        const userWithAddedTransaction = await globals.loggedUserResource
            .getResource()
            .getByToken(token);
        userWithAddedTransaction.body.userDomainInfo.historyOfTransactions.pop()._id.should.be.equal(addedTransactionId);
    });

});
