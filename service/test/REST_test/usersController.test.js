const request = require('supertest');
const should = require('should');

const {app} = require('../../start');
const payloads = require('../helpers/payloads');

describe('POST /users Adding new user', () => {
   it('Should create a new user', (done) => {
        request(app)
            .post('/users')
            .send(payloads.userPayload)
            .expect((res) => {
                res.statusCode.should.be.equal(200); done();
            })
            .end((err) => {
                if (err) return done(err);
            })
   });
});