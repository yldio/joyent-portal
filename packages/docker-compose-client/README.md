# docker-compose-client

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![npm](https://img.shields.io/npm/v/docker-compose-client.svg)](https://npmjs.com/package/docker-compose-client)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg)](https://github.com/RichardLitt/standard-readme)

Server that exposes [CloudApi](https://apidocs.joyent.com/cloudapi/) through [GraphQL](http://graphql.org).

## Table of Contents

- [Install](#install)
- [Server](#server)
- [Usage](#usage)
- [License](#license)

## Install

```
yarn add docker-compose-client
```

## Server

### build

```
λ git clone git@github.com:yldio/docker-compose-api.git
λ cd docker-compose-api
λ docker build -t docker-compose-api .
```

### run

**local**:

```
λ docker run -p 4242:4242 -d docker-compose-api
```

**remote**:
```
λ docker run \
-v "/local/path/to/docker/cert":"/usr/src/cert" \
-e DOCKER_CERT_PATH=/usr/src/cert \
-e DOCKER_HOST="http://us-sw-1.docker.joyent.com:2376" \
-e DOCKER_CLIENT_TIMEOUT=300 \
-e COMPOSE_HTTP_TIMEOUT=300 \
-p 4242:4242 \
-d \
docker-compose-api
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
