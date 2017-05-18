import { parse_dammit as looseParse } from 'acorn/dist/acorn_loose';
import isUndefined from 'lodash.isundefined';
import isNull from 'lodash.isnull';
import hasOwnProp from 'has-own-prop';

export const loc = Symbol('pseudo-json-ast-loc');

const isPrimitive = v =>
  Number.isNaN(v) || isNull(v) || isUndefined(v) || typeof v === 'symbol';

const isPrimitiveNode = node =>
  isPrimitive(node.value) || !hasOwnProp(node, 'value');

const visitors = {
  // eslint-disable-next-line new-cap
  VariableDeclaration: (node = {}, ctx = {}) => walk(node.declarations, ctx),
  // eslint-disable-next-line new-cap
  VariableDeclarator: (node = {}, ctx = {}) => walk([node.init], ctx),
  // eslint-disable-next-line new-cap
  ObjectExpression: (node = {}, ctx = {}) =>
    walk(node.properties, {
      [loc]: node.loc
    }),
  // eslint-disable-next-line new-cap
  Property: (node = {}, ctx = {}) => {
    const value = walk([node.value]);

    const isPrimitiveProperty = !node.key.value || isPrimitive(value);

    if (isPrimitiveProperty) {
      return ctx;
    }

    ctx[node.key.value] = value;

    return ctx;
  },
  // eslint-disable-next-line new-cap
  Literal: (node = {}, ctx = {}) => {
    if (isPrimitiveNode(node)) {
      return node.value;
    }

    const wrappable = Constructor => () => {
      const v = new Constructor(node.value);
      v[loc] = node.loc;
      return v;
    };

    const object = () => {
      node.value[loc] = node.loc;
      return node.value;
    };

    const types = {
      boolean: wrappable(Boolean),
      number: wrappable(Number),
      string: wrappable(String),
      function: object,
      object
    };

    return types[typeof node.value]();
  },
  // eslint-disable-next-line new-cap
  Identifier: (node = {}) => undefined,
  // eslint-disable-next-line new-cap
  ArrayExpression: (node = {}) => {
    const ctx = [];
    ctx[loc] = node.loc;

    return walk(node.elements, ctx);
  }
};

const walk = (nodes = [], ctx = {}) => {
  const onNode = (node, ctx, fallback) => {
    const visitor = visitors[node.type];
    return visitor ? visitor(node, ctx) : fallback;
  };

  const walkObj = () =>
    nodes.reduce((sum, node) => onNode(node, sum, sum), ctx);

  const walkArr = () => {
    const arr = nodes.map(node => onNode(node, ctx, null)).filter(Boolean);
    arr[loc] = ctx[loc];
    return arr;
  };

  return Array.isArray(ctx) ? walkArr() : walkObj();
};

export default input => {
  const isValid = typeof input === 'string' && input.trim().indexOf('{') === 0;

  if (!isValid) {
    return null;
  }

  const ast = looseParse(`var payload = ${input}`, {
    ecmaVersion: 5,
    sourceType: 'script',
    locations: true,
    range: true
  });

  return walk(ast.body);
};
