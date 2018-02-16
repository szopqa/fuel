const should = require('should');
const _ = require('lodash');

const payloads = require('../helpers/payloads');
const {UserModel} = require('../../database/models/UserModel');
const globals = require('../helpers/globals');

beforeEach((done) => {
   UserModel.remove({})
       .then(() => done());
});

describe('POST /users Adding new user', () => {
    this.timeout =5000;
    it('Should create a new user', async () => {
        const userPayload = payloads.generateNonExistingUser();
        const postUserRes = await globals.usersResource
            .createResource()
            .post(userPayload);

        postUserRes.statusCode.should.be.equal(200, postUserRes.error);
        const {username, emailAddress} = postUserRes.body;

        username.should.be.equal(userPayload.username);
        emailAddress.should.be.equal(userPayload.emailAddress);
        should.exist(postUserRes.headers['x-auth']);
        should.exist(postUserRes.body._id);
        postUserRes.statusCode.should.be.equal(200);
   });

    it('Should return validation error if request is invalid', async () => {
        const response = await globals.usersResource
            .createResource()
            .post({username: 'abc', password: 'abc123!', emailAddress:'abccc'});
        response.statusCode.should.be.equal(400, response.error);
    });

    it('Should return error if username is not defined', async () => {
        const response = await globals.usersResource
            .createResource()
            .post(_.omit(payloads.generateNonExistingUser(), 'username'));
        response.statusCode.should.be.equal(400, response.error);
    });

    it('Should return error if password is not defined', async () => {
        const response = await globals.usersResource
            .createResource()
            .post(_.omit(payloads.generateNonExistingUser(), 'password'));
        response.statusCode.should.be.equal(400, response.error);
    });

    it('Should return error if email is not defined', async () => {
        const response = await globals.usersResource
            .createResource()
            .post(_.omit(payloads.generateNonExistingUser(), 'emailAddress'));
        response.statusCode.should.be.equal(400, response.error);
    });

    it('Should not create user with duplicated fields', async () => {
        const userPayload = payloads.generateNonExistingUser();

        const resWithUniqueFields = await globals.usersResource
            .createResource()
            .post(userPayload);
        resWithUniqueFields.statusCode.should.be.equal(200, resWithUniqueFields.error);

        const resWithDuplicatedFields = await globals.usersResource
            .createResource()
            .post(userPayload);
        resWithDuplicatedFields.statusCode.should.be.equal(400, resWithDuplicatedFields.error);
    });
});