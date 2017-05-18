import { load, Kind } from 'yaml-ast-parser';
import isUndefined from 'lodash.isundefined';
import isNull from 'lodash.isnull';
import hasOwnProp from 'has-own-prop';

export const loc = Symbol('pseudo-yaml-ast-loc');

const isPrimitive = v =>
  Number.isNaN(v) || isNull(v) || isUndefined(v) || typeof v === 'symbol';

const isPrimitiveNode = node =>
  isPrimitive(node.value) || !hasOwnProp(node, 'value');

const getLoc = (input, { start = 0, end = 0 }) => {
  const lines = input.split(/\n/);

  const loc = {
    start: {},
    end: {}
  };

  const isBetween = (start, pos, end) => pos <= end && pos >= start;

  let sum = 0;

  for (const i of lines.keys()) {
    const line = lines[i];
    const ls = sum;
    const le = sum + line.length + 1; // +1 because the break is also a char

    if (isUndefined(loc.start.line) && isBetween(ls, start, le)) {
      loc.start.line = i + 1;
      loc.start.column = start - ls;
    }

    if (isUndefined(loc.end.line) && isBetween(ls, end, le)) {
      loc.end.line = i + 1;
      loc.end.column = end - ls;
    }

    sum = le;
  }

  return loc;
};

const visitors = {
  MAP: (node = {}, input = '', ctx = {}) =>
    Object.assign(walk(node.mappings, input), {
      [loc]: getLoc(input, {
        start: node.startPosition,
        end: node.endPosition
      })
    }),
  MAPPING: (node = {}, input = '', ctx = {}) => {
    const value = walk([node.value], input);

    if (!isPrimitive(value)) {
      value[loc] = getLoc(input, {
        start: node.startPosition,
        end: node.endPosition
      });
    }

    return Object.assign(ctx, {
      [node.key.value]: value
    });
  },
  SCALAR: (node = {}, input = '') => {
    if (isPrimitiveNode(node)) {
      return node.value;
    }

    const _loc = getLoc(input, {
      start: node.startPosition,
      end: node.endPosition
    });

    const wrappable = Constructor => () => {
      const v = new Constructor(node.value);
      v[loc] = _loc;
      return v;
    };

    const object = () => {
      node.value[loc] = _loc;
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
  SEQ: (node = {}, input = '') => {
    const items = walk(node.items, input, []);

    items[loc] = getLoc(input, {
      start: node.startPosition,
      end: node.endPosition
    });

    return items;
  }
};

const walk = (nodes = [], input, ctx = {}) => {
  const onNode = (node, ctx, fallback) => {
    const visitor = visitors[Kind[node.kind]];
    return visitor ? visitor(node, input, ctx) : fallback;
  };

  const walkObj = () =>
    nodes.reduce((sum, node) => {
      return onNode(node, sum, sum);
    }, ctx);

  const walkArr = () =>
    nodes
      .map(node => {
        return onNode(node, ctx, null);
      }, ctx)
      .filter(Boolean);

  return Array.isArray(ctx) ? walkArr() : walkObj();
};

export default input => walk([load(input)], input);
