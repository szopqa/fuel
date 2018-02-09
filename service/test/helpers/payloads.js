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

const generateNonExistingUser = () => {
    return Object.assign(sampleUserPayload, {
        username: generateRandomStringOfLength(7),
        password: generateRandomStringOfLength(7),
        emailAddress: `${generateRandomStringOfLength(5)}@example.com`
    });
};

module.exports = {
    sampleUserPayload,
    sampleVehiclePayload,
    generateNonExistingUser
};