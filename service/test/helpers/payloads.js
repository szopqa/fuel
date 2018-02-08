const {generateRandomStringOfLength} = require('./helpers');

exports.userPayload = {
    username: generateRandomStringOfLength(7),
    password: generateRandomStringOfLength(7),
    emailAddress: `${generateRandomStringOfLength(5)}@gmail.com`
};