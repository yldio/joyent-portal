# joyent-portal-gql-cp-schema

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg?style=flat-square)](https://opensource.org/licenses/MPL-2.0)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

[GraphQL](http://graphql.org) schema that represents the data structure and dependencies of the Container Pilot Portal. To be used by other packages so that they can lock and adapt properly to changes made to it, rather than having duplicates of this schema.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [License](#license)

## Install

```
yarn add --dev joyent-portal-gql-cp-schema
```

## Usage

```js
const containerPilotSchema = require('joyent-portal-gql-cp-schema');

containerPilotSchema().then((schema) => console.log(schema))
```

## License

MPL-2.0
