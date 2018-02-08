const {generateRandomStringOfLength} = require('./helpers');

const sampleUserPayload = {
    username: 'sample_user',
    password: 'pass123!@#',
    emailAddress: `sample@example.com`
};

const generateNonExistingUser = () => {
    return Object.assign(sampleUserPayload, {
        username: generateRandomStringOfLength(7),
        password: generateRandomStringOfLength(7),
        emailAddress: `${generateRandomStringOfLength(5)}@example.com`
    });
};

module.exports = {
    sampleUserPayload: sampleUserPayload,
    generateNonExistingUser
};