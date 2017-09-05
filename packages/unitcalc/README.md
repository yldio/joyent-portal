# unitcalc

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg?style=flat-square)](https://opensource.org/licenses/MPL-2.0)
[![npm](https://img.shields.io/npm/v/unitcalc.svg?style=flat-square)](https://npmjs.com/package/unitcalc)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Calculate the `rem`'s from unit values.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [License](#license)

## Install

```
yarn add --dev unitcalc
```

## Usage

```js
import unitcalc from 'unitcalc';
import assert from 'assert';


assert.deepEqual(unitcalc(1, 2, 3, 4), '0.375rem 0.75rem 1.125rem 1.5rem');

assert.deepEqual(unitcalc('1'), '0.375rem');

assert.deepEqual(unitcalc.withBase(10, '1'), '0.625rem');

assert.deepEqual(
  unitcalc('1', '2', '3', '4'),
  '0.375rem 0.75rem 1.125rem 1.5rem'
);

assert.deepEqual(
  unitcalc.withBase(10, '1', '2', '3', '4'),
  '0.625rem 1.25rem 1.875rem 2.5rem'
);

assert.deepEqual(unitcalc('1 2 3 4'), '0.375rem 0.75rem 1.125rem 1.5rem');

assert.deepEqual(
  unitcalc.withBase(10, '1 2 3 4'),
  '0.625rem 1.25rem 1.875rem 2.5rem'
);
```

## License

MPL-2.0
