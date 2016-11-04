module.exports = [
  require('inert'), {
    register: require('hapi-graphql'),
    options: {
      query: {
        pretty: true,
        graphiql: true,
        schema: require('./schema')
      },
      route: {
        path: '/graphql'
      }
    }
  }
];
