const ServiceType = require('../types/service');
const graphql = require('graphql');
const api = require('../../api');

const {
  GraphQLList
} = graphql;

module.exports = {
  type: new GraphQLList(ServiceType),
  resolve() {
    return api.services().then((services) => {
      return Object.keys(services).map((name) => {
        return {
          url: services[name],
          name
        };
      });
    });
  }
};
