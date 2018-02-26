const should = require('should');

const {updateAvgCombustion} = require ('../../REST/activities/activitiesHelpers.js');

describe('Vehicle\'s data update after adding new transaction', () => {
    it('Should correctly calculate avg combustion for vehicle with no data', async () => {
        // given
            const currentComb = 0;
            const currentTransAmount = 0;
            const transactionComb = 5.8;
            
            const expectedCombustion = 5.8;
        // when
            const updatedCombustion
                 = updateAvgCombustion(currentComb, currentTransAmount, transactionComb);
        // then
            updatedCombustion.should.be.equal(expectedCombustion);
    });

    it('Should correctly calculate avg combustion for vehicle with existing data', async () => {
        // given
            const currentComb = 9;
            const currentTransAmount = 4;
            const transactionComb = 6;
            
            const expectedCombustion = 8.4;
        // when
            const updatedCombustion
                 = updateAvgCombustion(currentComb, currentTransAmount, transactionComb);
        // then
            updatedCombustion.should.be.equal(expectedCombustion);
    })
})