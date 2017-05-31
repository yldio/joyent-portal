# docker-compose-client

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![npm](https://img.shields.io/npm/v/docker-compose-client.svg)](https://npmjs.com/package/docker-compose-client)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg)](https://github.com/RichardLitt/standard-readme)

Server that exposes [CloudApi](https://apidocs.joyent.com/cloudapi/) through [GraphQL](http://graphql.org).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [License](#license)

## Install

```
yarn add docker-compose-client
```

## Usage

```js
const client = new DockerComposeClient();

const res = await client.provision({
  projectName: 'docker-compose-client',
  manifest: `
    hello:
      image: hello-world:latest
    world:
      image: consul:latest
    node:
      image: node:latest
  `
});
```

## License

MPL-2.0
