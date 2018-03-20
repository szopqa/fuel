
const { setAvarageCombustionFromTransaction } = require('../../../REST/controllers/utils/utils');

const initORMHelpers = (TransactionModel) => {
  TransactionModel.pre('save', function (next) {
    if (this.isModified('refueledAmount') && this.isModified('distanceSinceLastRefueling')) {
      this.averageCombustionFromTransaction
        = setAvarageCombustionFromTransaction(this.refueledAmount, this.distanceSinceLastRefueling);
      next();
    } else { next(); }
  });
};

module.exports = { initORMHelpers };
