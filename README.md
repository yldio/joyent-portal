# Joyent Dashboard

## Project Management

This project is using [Github Projects](https://www.youtube.com/watch?v=C6MGKHkNtxU) for organisation and development of the Joyent Dashboard.

## Repository Layout

Currently we are using this repository as a monolithic catch-all for all project communication, development and designs.
We will also include multiple PoC's of various bits of functionality from UI's prototypes to API development.

```
.
├── frontend
├── backend
├── cloudapi-graphql
└── spikes
```

### cloudapi-graphql

An implementation of the [Joyent CloudAPI](https://apidocs.joyent.com/cloudapi/) in GraphQL.

### frontend

The client side code with a dev-server.

### backend

A simple backend for frontend that serves the static files and fallbacks to `/static/index.html`. To be used in production.

## spikes

Implementation examples from spikes.
