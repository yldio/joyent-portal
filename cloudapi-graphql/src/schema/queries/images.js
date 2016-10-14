const ImageType = require('../types/image');
const graphql = require('graphql');
const api = require('../../api');

const {
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLID
} = graphql;

module.exports = {
  type: new GraphQLList(ImageType),
  args: {
    id: {
      type: GraphQLID,
      description: 'Filter on id'
    },
    name: {
      type: GraphQLString,
      description: 'Filter on "friendly" name'
    },
    os: {
      type: GraphQLString,
      description: 'Filter on the underlying operating system'
    },
    version: {
      type: GraphQLString,
      description: 'Filter on the version'
    },
    'public': {
      type: GraphQLBoolean,
      description: 'Filter public/private images'
    },
    state: {
      type: GraphQLString,
      description: 'Filter on image state. By default only active images are shown. Use "all" to list all images'
    },
    owner: {
      type: GraphQLString,
      description: 'Filter on owner UUID'
    },
    type: {
      type: GraphQLString,
      description: 'Filter on image type'
    }
  },
  resolve(root, args) {
    const {
      list,
      get
    } = api.images;

    return args.id ? get({
      id: args.id
    }).then((img) => [img]) : list(args);
  }
};
