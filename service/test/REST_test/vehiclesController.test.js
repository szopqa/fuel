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
});
