# Joyent Dashboard

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

Implementation examples from spikes.
