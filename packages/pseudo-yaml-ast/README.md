# pseudo-yaml-ast

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg?style=flat-square)](https://opensource.org/licenses/MPL-2.0)
[![npm](https://img.shields.io/npm/v/pseudo-yaml-ast.svg?style=flat-square)](https://npmjs.com/package/pseudo-yaml-ast)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Parse a YAML string into an object with location properties.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [License](#license)

## Install

```
yarn add --dev pseudo-yaml-ast
```

## Usage

```js
import yamlAST, { loc } from 'pseudo-yaml-ast';
import assert from 'assert';

const ast = yamlAST(`
  obj:
    arr:
    - nums:
      - 1
      - 2
      - 3
      strs1:
      - '1'
      - '2'
      - '3'
    str: '1'
    num: 1
`);

assert.deepEqual(Object.keys(ast), ['obj']);
assert.deepEqual(ast[loc].start.line, 2);
assert.deepEqual(ast[loc].end.line, 14);

assert.deepEqual(Object.keys(ast.obj), ['arr', 'str', 'num']);
assert.deepEqual(ast.obj[loc].start.line, 2);
assert.deepEqual(ast.obj[loc].end.line, 13);

assert.deepEqual(ast.obj.str[loc].start.line, 12);
assert.deepEqual(ast.obj.str[loc].end.line, 12);
assert.deepEqual(ast.obj.num[loc].start.line, 13);
assert.deepEqual(ast.obj.num[loc].end.line, 13);
assert.deepEqual(ast.obj.arr[0][loc].start.line, 4);
assert.deepEqual(ast.obj.arr[0][loc].end.line, 12);

assert.deepEqual(Object.keys(ast.obj.arr[0]), ['nums', 'strs1']);
assert.deepEqual(ast.obj.arr[0].nums[loc].start.line, 4);
assert.deepEqual(ast.obj.arr[0].nums[loc].end.line, 8);
assert.deepEqual(ast.obj.arr[0].strs1[loc].start.line, 8);
assert.deepEqual(ast.obj.arr[0].strs1[loc].end.line, 12);
```

## License

MPL-2.0
