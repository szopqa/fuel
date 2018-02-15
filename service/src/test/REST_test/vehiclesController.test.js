const should = require('should');
const _ = require('lodash');

const payloads = require('../helpers/payloads');
const {VehicleModel} = require('../../database/models/VehicleModel');
const globals = require('../helpers/globals');

beforeEach((done) => {
    VehicleModel.remove({})
        .then(() => done());
});

describe('POST /vehicles', function () {
    it('Should add vehicle for logged user', async () => {
        const userPayload = payloads.generateNonExistingUser();
        const postUserRes = await globals.usersResource
            .createResource()
            .post(userPayload);
        postUserRes.statusCode.should.be.equal(200, postUserRes.error);

        const token = _.get(postUserRes.headers, 'x-auth');
        const vehiclePayload = payloads.sampleVehiclePayload(postUserRes.body._id);
        const postVehicleRes = await globals.vehiclesResource
            .createResource({token})
            .post(vehiclePayload);
        postVehicleRes.statusCode.should.be.equal(200, postVehicleRes.error);

        const {addedVehicleId} = postVehicleRes.body;
        const userWithAddedVehicle = await globals.loggedUserResource
            .getResource()
            .getByToken(token);
        userWithAddedVehicle.body.userDomainInfo.vehicles.pop().should.be.equal(addedVehicleId);
    });

    it('Should return validation error if request is invalid', async () => {
        const userPayload = payloads.generateNonExistingUser();
        const postUserRes = await globals.usersResource
            .createResource()
            .post(userPayload);
        postUserRes.statusCode.should.be.equal(200, postUserRes.error);

        const token = _.get(postUserRes.headers, 'x-auth');
        const vehiclePayload = payloads.sampleVehiclePayload(postUserRes.body._id);
        const postVehicleRes = await globals.vehiclesResource
            .createResource({token})
            .post(_.omit(vehiclePayload,'brand'));
        postVehicleRes.statusCode.should.be.equal(400, postVehicleRes.error);
    });
});

describe('GET /vehicles', function () {
    it('Should return an empty array if user has no vehicles', async () => {
        const userPayload = payloads.generateNonExistingUser();
        const postUserRes = await globals.usersResource
            .createResource()
            .post(userPayload);
        postUserRes.statusCode.should.be.equal(200, postUserRes.error);

        const token = _.get(postUserRes.headers, 'x-auth');
        const userWithAddedVehicle = await globals.loggedUserResource
            .getResource()
            .getByToken(token);
        userWithAddedVehicle.body.userDomainInfo.vehicles.should.be.empty();
    });
});
