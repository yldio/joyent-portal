[![CircleCI](https://circleci.com/gh/yldio/joyent-portal.svg?style=shield&circle-token=0bbeaaafc4868c707ca0ed0568f5193a04daddb4)](https://circleci.com/gh/yldio/joyent-portal)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

# Protype Triton Portal

This is a prototype project intended to explore some ideas that might contribute to new capabilities and a new user experience for managing applications on [Joyent's Triton](https://www.joyent.com/triton).

**This is not intended for general use and is completely unsupported.**

## Development

If you would like to contribute to the project, the recommended way to setup is to
insure that you have docker installed, and optionally have a triton account and profile
setup using the triton tool.

Currently requires [yarn](https://yarnpkg.com/en/docs/install) for installing dependencies,
as well as `docker` and `docker-compose` are installed correctly, this can be done by
running `make`, make continues without any errors, then you are good to go. [node-triton](https://github.com/joyent/node-triton)
is also needed if deployment to Triton is required.

```
make && make install 
```

Then to run each individual component locally (subject to change).

## Setup

```sh
make
```

## Run services

To run the stack locally:

```sh
docker-compose -f local-compose.yml up -d
```

This will run the front-end at [http://127.0.0.1:8000](http://127.0.0.1:8000),
the UI framework at [http://127.0.0.1:8001](http://127.0.0.1:8001),

## Project Management

This project is using [Github Projects](https://www.youtube.com/watch?v=C6MGKHkNtxU) for organisation and development of the Joyent Dashboard.

## Repository Layout

Currently we are using this repository as a monolithic catch-all for all project communication, development and designs.
We will also include multiple PoC's of various bits of functionality from UI's prototypes to API development.

```
.
├── cloudapi-graphql
├── docs
├── frontend
├── nginx
├── ui
└── spikes
```

### cloudapi-graphql

An implementation of the [Joyent CloudAPI](https://apidocs.joyent.com/cloudapi/) in GraphQL.

### Docs

Documentation about the project, mainly focused on information for the technical runnings of this project.
Can be view online at the [documentation website](http://docs.svc.f4b20699-b323-4452-9091-977895896da6.eu-ams-1.triton.zone/)

### frontend

The client side code with a dev-server, this also includes the production server for the meantime, however we are looking at moving towards a deployment of the build artifacts to manta, and another server to host these assets.

### nginx

Nginx will be sitting in-front of the `ui` service, allowing the `ui` to scale out.

### ui

Code for the reusable UI framework.

### spikes

Implementation examples from spikes, this directory is experimental and is likely broken.
