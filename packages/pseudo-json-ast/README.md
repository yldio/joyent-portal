# pseudo-json-ast

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![npm](https://img.shields.io/npm/v/pseudo-json-ast.svg)](https://npmjs.com/package/pseudo-json-ast)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg)](https://github.com/RichardLitt/standard-readme)

Parse a JSON string into an object with location properties.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [License](#license)

## Install

```
yarn add --dev pseudo-json-ast
```

## Usage

```js
import jsonAST, { loc } from 'pseudo-json-ast';
import assert from 'assert';

const ast = jsonAST(`{
  "obj": {
    "arr": [{
      "nums": [1, 2, 3],
      "strs1": ["1", "2", "3"],
      "strs: ["1", "2", "3"]
    }],
    "str": "1",
    "num": 1
  }
}`);

assert.deepEqual(Object.keys(ast), ['obj']);
assert.deepEqual(ast[loc].start.line, 1);
assert.deepEqual(ast[loc].end.line, 11);

assert.deepEqual(Object.keys(ast.obj), ['arr', 'str', 'num']);
assert.deepEqual(ast.obj[loc].start.line, 2);
assert.deepEqual(ast.obj[loc].end.line, 10);

assert.deepEqual(ast.obj.str[loc].start.line, 8);
assert.deepEqual(ast.obj.str[loc].end.line, 8);
assert.deepEqual(ast.obj.num[loc].start.line, 9);
assert.deepEqual(ast.obj.num[loc].end.line, 9);
assert.deepEqual(ast.obj.arr[0][loc].start.line, 3);
assert.deepEqual(ast.obj.arr[0][loc].end.line, 7);

assert.deepEqual(Object.keys(ast.obj.arr[0]), ['nums', 'strs1']);
assert.deepEqual(ast.obj.arr[0].nums[loc].start.line, 4);
assert.deepEqual(ast.obj.arr[0].nums[loc].end.line, 4);
assert.deepEqual(ast.obj.arr[0].strs1[loc].start.line, 5);
assert.deepEqual(ast.obj.arr[0].strs1[loc].end.line, 5);
```

## License

MPL-2.0
