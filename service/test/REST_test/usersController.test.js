const request = require('supertest');
const should = require('should');
const _ = require('lodash');

const {app} = require('../../start');
const payloads = require('../helpers/payloads');
const {UserModel} = require('../../database/models/UserModel');

beforeEach((done) => {
   UserModel.remove({})
       .then(() => done());
});

describe('POST /users Adding new user', () => {

    it('Should create a new user', (done) => {
        const userPayload = payloads.generateNonExistingUser();
        request(app)
            .post('/users')
            .send(userPayload)
            .expect((res) => {
                const {username, emailAddress} = res.body;

                username.should.be.equal(userPayload.username);
                emailAddress.should.be.equal(userPayload.emailAddress);
                should.exist(res.headers['x-auth']);
                should.exist(res.body._id);
                res.statusCode.should.be.equal(200);
                done();
            })
            .end((err) => {
                if (err) return done(err);
            })
   });

    it('Should return validation error if request is invalid', (done) => {
       request(app)
           .post('/users')
           .send({username: 'abc', password: 'abc123!', emailAddress:'abccc'})
           .expect(400)
           .end(done);
    });

    it('Should return error if username is not defined', (done) => {
        request(app)
            .post('/users')
            .send(_.omit(payloads.generateNonExistingUser(), 'username'))
            .expect(400)
            .end(done);
    });

    it('Should return error if password is not defined', (done) => {
        request(app)
            .post('/users')
            .send(_.omit(payloads.generateNonExistingUser(), 'password'))
            .expect(400)
            .end(done);
    });

    it('Should return error if email is not defined', (done) => {
        request(app)
            .post('/users')
            .send(_.omit(payloads.generateNonExistingUser(), 'emailAddress'))
            .expect(400)
            .end(done);
    });

    it('Should not create user with duplicated fields', (done) => {
        request(app)
            .post('/users')
            .send(payloads.sampleUserPayload)
            .expect(200)
            .end(() => {
                request(app)
                    .post('/users')
                    .send(payloads.sampleUserPayload)
                    .expect(400)
                    .end(done);
            });
    });
});