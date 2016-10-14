const changes = require('./data/changes.json');
const products = require('./data/products.json');
const values = require('lodash.values');

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const ProductType = new GraphQLObjectType({
  name: 'ProductType',
  fields: {
    id: {
      type: GraphQLID
    },
    artist: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    label: {
      type: GraphQLString
    },
    format: {
      type: GraphQLString
    },
    price: {
      type: GraphQLInt
    },
    currency: {
      type: GraphQLString
    }
  }
});

const ChangeType = new GraphQLObjectType({
  name: 'ChangeType',
  fields: {
    id: {
      type: GraphQLID
    },
    product: {
      type: ProductType,
      resolve: (root, args) => {
        return products[root.product]
      }
    },
    price: {
      type: GraphQLInt
    },
    currency: {
      type: GraphQLString
    }
  }
});

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(root, args, ctx) {
        return args.id ? [products[args.id]] : values(products)
      }
    },
    changes: {
      type: new GraphQLList(ChangeType),
      args: {
        id: {
          type: GraphQLID
        },
        product: {
          type: GraphQLID
        }
      },
      resolve(root, args, ctx) {
        if (args.id) {
          return [changes[args.id]];
        }

        if (!args.product) {
          return values(changes);
        }

        return values(changes).filter((change) => {
          return change.product === args.product;
        });
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    removeChange: {
      type: ChangeType,
      args: {
        id: {
          type: GraphQLID
        },
        product: {
          type: GraphQLID
        }
      },
      resolve(root, args, ctx) {
        const changes = (() => {
          if (args.id) {
            return [args.id];
          }

          if (!args.product) {
            return Object.keys(changes);
          }

          return Object.keys(changes).filter((id) => {
            return changes[id].product === args.product;
          });
        })();

        changes.forEach((id) => {
          delete changes[id];
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query,
  mutation
});
