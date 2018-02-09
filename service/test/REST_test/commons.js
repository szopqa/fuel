const request = require('supertest');
const _ = require('lodash');

const commonsFactory = ({host, path, contentType}) => {

    const createResource = (requestParams) => {
        return {
            post: async (payload) => {
                const token = !_.isUndefined(requestParams) ? requestParams.token : null;

                return await request(host)
                    .post(path)
                    .set('Content-Type', contentType)
                    .set('x-auth', token || null)
                    .send(payload);
            }
        }
    };

    return {
        createResource
    }
};

module.exports = {commonsFactory};
