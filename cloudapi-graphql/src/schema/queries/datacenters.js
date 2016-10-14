const DatacenterType = require('../types/datacenter');
const graphql = require('graphql');
const api = require('../../api');

const {
  GraphQLList
} = graphql;

module.exports = {
  type: new GraphQLList(DatacenterType),
  resolve() {
    return api.datacenters().then((datacenters) => {
      return Object.keys(datacenters).map((name) => {
        return {
          url: datacenters[name],
          name
        };
      });
    });
  }
};
