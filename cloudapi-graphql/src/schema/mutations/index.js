const {
  GraphQLObjectType
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: Object.assign(
    require('./account'),
    require('./keys'),
    require('./users'),
    require('./roles'),
    require('./policies'),
    require('./machines'),
    require('./images'),
    require('./firewall-rules'),
    require('./snapshots')
  )
});
