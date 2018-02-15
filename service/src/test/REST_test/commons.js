const request = require('supertest');
const _ = require('lodash');

const logger = require('../../logger');

const commonsFactory = ({host, path, contentType}) => {

    const createResource = (requestParams) => {
        return {
            post: async (payload) => {
                const token = !_.isUndefined(requestParams) ? requestParams.token : null;
                logger.info('createResource.post',{host, path, contentType, requestParams, payload, token});
                return await request(host)
                    .post(path)
                    .set('Content-Type', contentType)
                    .set('x-auth', token)
                    .send(payload);
            }
        }
    };

    const getResource = () => {
        return {
            getByToken: async (token) => {
                logger.info('getResource.getByToken',{host, path, contentType, token});
                return await request(host)
                    .get(path)
                    .set('Content-Type', contentType)
                    .set('x-auth', token);
            }
        }
    };

    return {
        createResource,
        getResource
    }
};

module.exports = {commonsFactory};
