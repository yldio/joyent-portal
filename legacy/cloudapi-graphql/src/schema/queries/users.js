const UserType = require('../types/login');
const graphql = require('graphql');
const api = require('../../api');

const { GraphQLList, GraphQLID } = graphql;

module.exports = {
  type: new GraphQLList(UserType),
  args: {
    id: {
      type: GraphQLID,
      description: '`id` or `login` of the `UserType` to filter'
    }
  },
  resolve(root, args) {
    const { list, get } = api.users;

    return !args.id
      ? list()
      : get(args).then(user => [user]).then(user => {
          return Object.assign(user, {
            isUser: true
          });
        });
  }
};
