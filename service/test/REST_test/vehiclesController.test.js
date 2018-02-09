const request = require('supertest');
const should = require('should');
const _ = require('lodash');

const {app} = require('../../start');
const payloads = require('../helpers/payloads');
const {UserModel} = require('../../database/models/UserModel');
const {VehicleModel} = require('../../database/models/VehicleModel');
const globals = require('../helpers/globals');

beforeEach((done) => {
    VehicleModel.remove({})
        .then(() => done());
});

describe('POST /vehicles', function () {
    // it('Should add vehicle for logged user', async () => {
    //     const userPayload = payloads.generateNonExistingUser();
    //     const postUserRes = await request(app)
    //         .post('/users')
    //         .send(userPayload)
    //         .expect(200);
    //
    //     const response = await request(app)
    //        .post('/vehicles')
    //        .send({brand: 'Example Vehicle'})
    //        .expect(200);
    //
    //    repsonse.statusCode.should.be.equal(200);
    // });

    it('Should add vehicle for logged user ', async () => {
        const userPayload = payloads.generateNonExistingUser();
        const postUserRes = await globals.usersResource
            .createResource()
            .post(userPayload);
        postUserRes.statusCode.should.be.equal(200);

        const token = _.get(postUserRes.headers, 'x-auth');
        const vehiclePayload = payloads.sampleVehiclePayload(postUserRes.body._id);
        console.log(vehiclePayload);
        const postVehicleRes = await globals.vehiclesResource
            .createResource({token})
            .post(userPayload);
        postVehicleRes.statusCode.should.be.equal(200);
    });
});
