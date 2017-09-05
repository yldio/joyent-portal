# remcalc

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg?style=flat-square)](https://opensource.org/licenses/MPL-2.0)
[![npm](https://img.shields.io/npm/v/remcalc.svg?style=flat-square)](https://npmjs.com/package/remcalc)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Calculate the `rem`'s from `px` values.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [License](#license)

## Install

```
yarn add --dev remcalc
```

## Usage

```js
import remcalc from 'remcalc';
import assert from 'assert';


assert.deepEqual(remcalc.withBase(10, 1, 2, 3, 4), '0.1rem 0.2rem 0.3rem 0.4rem');

assert.deepEqual(remcalc('1'), '0.0625rem');

assert.deepEqual(remcalc('1px'), '0.0625rem');

assert.deepEqual(remcalc.withBase(10, '1px'), '0.1rem');

assert.deepEqual(
  remcalc('1', '2', '3', '4'),
  '0.0625rem 0.125rem 0.1875rem 0.25rem'
);

assert.deepEqual(
  remcalc('1px', '2px', '3px', '4px'),
  '0.0625rem 0.125rem 0.1875rem 0.25rem'
);

assert.deepEqual(
  remcalc.withBase(10, '1', '2', '3', '4'),
  '0.1rem 0.2rem 0.3rem 0.4rem'
);

assert.deepEqual(
  remcalc.withBase(10, '1px', '2px', '3px', '4px'),
  '0.1rem 0.2rem 0.3rem 0.4rem'
);

assert.deepEqual(remcalc('1 2 3 4'), '0.0625rem 0.125rem 0.1875rem 0.25rem');

assert.deepEqual(remcalc.withBase(10, '1 2 3 4'), '0.1rem 0.2rem 0.3rem 0.4rem');
```

## License

MPL-2.0
