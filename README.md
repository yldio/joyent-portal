# Joyent Dashboard

## Installation

To run the stack locally:

```sh
docker-compose -f local-compose.yml up -d
```

And then navigate to https://localhost:8000.

## Development

If you would like to contribute to the project, the recommended way to setup is to
insure that you have docker installed, and optionally have a triton account and profile
setup using the triton tool.

Currently requires [yarn](https://yarnpkg.com/en/docs/install) for installing dependencies.

```
make || make install
```

Then to run each individual component locally (subject to change).

## Project Management

This project is using [Github Projects](https://www.youtube.com/watch?v=C6MGKHkNtxU) for organisation and development of the Joyent Dashboard.

## Repository Layout

Currently we are using this repository as a monolithic catch-all for all project communication, development and designs.
We will also include multiple PoC's of various bits of functionality from UI's prototypes to API development.

```
.
├── frontend
├── ui
├── cloudapi-graphql
└── spikes
```

### cloudapi-graphql

An implementation of the [Joyent CloudAPI](https://apidocs.joyent.com/cloudapi/) in GraphQL.

### frontend

The client side code with a dev-server, this also includes the production server for the meantime, however we are looking at moving towards a deployment of the build artifacts to manta, and another server to host these assets.

### ui

Code for the reusable UI framework.

### spikes

Implementation examples from spikes, this directory is experimental and is likely broken.
