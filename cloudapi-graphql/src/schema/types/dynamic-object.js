const {
  GraphQLScalarType,
  Kind
} = require('graphql');

const kinds = {
  [Kind.STRING]: (ast) => {
    return ast.value;
  },
  [Kind.BOOLEAN]: (ast) => {
    return kinds[Kind.STRING](ast);
  },
  [Kind.INT]: (ast) => {
    return Number(ast.value);
  },
  [Kind.FLOAT]: (ast) => {
    return kinds[Kind.INT](ast);
  },
  [Kind.OBJECT]: (ast) => {
    const value = Object.create(null);
    ast.fields.forEach(field => {
      value[field.name.value] = parseLiteral(field.value);
    });

    return value;
  },
  [Kind.LIST]: (ast) => {
    return ast.values.map(parseLiteral);
  }
};

// https://github.com/taion/graphql-type-json/blob/master/src/index.js
const parseLiteral = (ast) => {
  const kind = kinds[ast.kind];
  return kind ? kinds[ast.kind](ast) : null;
};

// from http://stackoverflow.com/a/34229603
module.exports = new GraphQLScalarType({
  name: 'DynamicObjectType',
  serialize: v => v,
  parseValue: v => v,
  parseLiteral: parseLiteral
});
