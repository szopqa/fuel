const {generateRandomStringOfLength} = require('./helpers');

const sampleUserPayload = {
    username: 'sample_user',
    password: 'pass123!@#',
    emailAddress: `sample@example.com`
};

const sampleVehiclePayload = (owner) => {
    return {
        owner: owner,
        brand: 'sample vehicle brand',
        averageCombustion: 6.7
    };
};

const sampleTransactionPayload = (vehicle) => {
    return {
        vehicle,
        refueledAmount: 58,
        transactionPrice: 250,
        pricePerLiter: 4.3,
        distanceSinceLastRefueling: 560,
        location: "Knurów, LOTOS"
    }
}

const generateNonExistingUser = () => {
    return Object.assign(sampleUserPayload, {
        username: generateRandomStringOfLength(7),
        password: generateRandomStringOfLength(7),
        emailAddress: `${generateRandomStringOfLength(5)}@example.com`
    });
};

module.exports = {
    sampleUserPayload,
    generateNonExistingUser,    
    sampleVehiclePayload,
    sampleTransactionPayload
};