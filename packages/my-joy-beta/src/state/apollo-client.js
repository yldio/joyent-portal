import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'cross-fetch';

import global from './global';

const {
  REACT_APP_GQL_PORT = global.port,
  REACT_APP_GQL_PROTOCOL = global.protocol,
  REACT_APP_GQL_HOSTNAME = global.hostname
} = process.env;

const PORT = REACT_APP_GQL_PORT ? `:${REACT_APP_GQL_PORT}` : '';
const URI = `${REACT_APP_GQL_PROTOCOL}://${REACT_APP_GQL_HOSTNAME}${PORT}/graphql`;

export default (opts = {}) => {
  let cache = new InMemoryCache();

  if (global.__APOLLO_STATE__) {
    cache = cache.restore(global.__APOLLO_STATE__);
  }

  return new ApolloClient({
    cache,
    link: new HttpLink({
      uri: URI,
      credentials: 'same-origin',
      fetch
    }),
    ...opts
  });
};
