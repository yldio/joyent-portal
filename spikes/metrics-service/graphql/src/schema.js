const graphql = require('graphql');

const {
  GraphQLID,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = graphql;

const EventType = new GraphQLObjectType({
  name: 'EventType',
  fields: {
    value: {
      type: GraphQLString
    },
    when: {
      type: GraphQLString
    }
  }
});

const EventSubscription = {
  type: EventType,
  args: {
    container: {
      type: GraphQLID
    }
  },
  start: function() {
    console.log('start', arguments);
  },
  stop: function() {
    console.log('stop', arguments);
  },
  resolve: function() {
    console.log('resolve', arguments);
  }
};

const subscription = new GraphQLObjectType({
  name: 'RootSubscriptionType',
  fields: {
    events: EventSubscription
  }
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Q',
    fields: {
      a: { type: GraphQLString },
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'M',
    fields: {
      c: { type: GraphQLString },
    }
  }),
  subscription
});
