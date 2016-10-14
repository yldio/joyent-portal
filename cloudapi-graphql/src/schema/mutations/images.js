const AccountType = require('../types/login');
const DynamicObjectType = require('../types/dynamic-object');
const api = require('../../api');

const {
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

module.exports.createImage = {
  type: AccountType,
  description: 'Create a new custom image from an instance',
  args: {
    machine: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The prepared and stopped instance UUID from which the image is to be created'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the custom image, e.g. "my-image". Maximum 512 characters. However, typical names should be much shorter, e.g. 5-20 characters'
    },
    version: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The version of the custom image, e.g. "1.0.0". Maximum 128 characters'
    },
    description: {
      type: GraphQLString,
      description: 'A short prose description of this image. Maximum 512 characters'
    },
    homepage: {
      type: GraphQLString,
      description: 'Homepage URL where users can find more information about the image. Maximum 128 characters'
    },
    eula: {
      type: GraphQLString,
      description: 'URL of the End User License Agreement (EULA) for the image. Maximum 128 characters'
    },
    acl: {
      type: new GraphQLList(GraphQLID),
      description: 'An array of user/account UUIDs to which to give read access to a private image. I.e. this is only relevant for images with public === false'
    },
    tags: {
      type: DynamicObjectType,
      description: 'An object of key/value pairs that allows clients to categorize images by any given criteria'
    }
  },
  resolve: (root, args) => {
    const {
      create
    } = api.images;

    return create(args);
  }
};
