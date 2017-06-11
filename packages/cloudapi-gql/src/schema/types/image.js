const DynamicObjectType = require('./dynamic-object');

const {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLID
} = require('graphql');

const ErrorType = new GraphQLObjectType({
  name: 'ErrorType',
  fields: {
    code: {
      type: GraphQLString,
      description:
        'A CamelCase string code for this error, e.g. "PrepareImageDidNotRun". See GetImage docs for a table of error.code values'
    },
    message: {
      type: GraphQLString,
      description: 'A short description of the image creation failure'
    }
  }
});

const ImageFileType = new GraphQLObjectType({
  name: 'ImageFileType',
  fields: {
    compression: {
      type: GraphQLString,
      description:
        'The type of file compression used for the image file. One of "bzip2", "gzip", "none"'
    },
    sha1: {
      type: GraphQLString,
      description:
        'SHA-1 hex digest of the file content. Used for corruption checking'
    },
    size: {
      type: GraphQLInt,
      description: 'File size in bytes'
    }
  }
});

module.exports = new GraphQLObjectType({
  name: 'ImageType',
  description:
    'An image contains the software packages that will be available on newly-provisioned instance. In the case of hardware virtual machines, the image also includes the operating system',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Unique id for this image'
    },
    name: {
      type: GraphQLString,
      description: 'The "friendly" name for this image'
    },
    os: {
      type: GraphQLString,
      description: 'The underlying operating system for this image'
    },
    version: {
      type: GraphQLString,
      description: 'The version for this image'
    },
    type: {
      type: GraphQLString,
      description: 'What kind of image this is. The values differ after v8.0.0+'
    },
    requirements: {
      type: DynamicObjectType,
      description:
        'Contains a grouping of various minimum requirements for provisioning an instance with this image. For example "password" indicates that a password must be provided'
    },
    homepage: {
      type: GraphQLString,
      description:
        'The URL for a web page with more detailed information for this image'
    },
    files: {
      type: new GraphQLList(ImageFileType),
      description:
        'An array of image files that make up each image. Currently only a single file per image is supported'
    },
    publishedAt: {
      type: GraphQLString,
      description: 'The time this image has been made publicly available'
    },
    owner: {
      type: GraphQLString,
      description: 'The UUID of the user who owns this image'
    },
    public: {
      type: GraphQLBoolean,
      description: 'Indicates if this image is publicly available',
      resolve: root => {
        return Boolean(root.public);
      }
    },
    state: {
      type: GraphQLString,
      description:
        'The current state of the image. One of "active", "unactivated", "disabled", "creating", "failed"'
    },
    tags: {
      type: DynamicObjectType,
      description:
        'An object of key/value pairs that allows clients to categorize images by any given criteria'
    },
    eula: {
      type: GraphQLString,
      description: 'URL of the End User License Agreement (EULA) for the image'
    },
    acl: {
      type: new GraphQLList(GraphQLString),
      description:
        'Access Control List. An array of account UUIDs given access to a private image. The field is only relevant to private images'
    },
    error: {
      type: ErrorType,
      description:
        'If state=="failed", resulting from CreateImageFromMachine failure, then there may be an error object of the form {"code": "<string error code>", "message": "<string desc>"}'
    }
  }
});
