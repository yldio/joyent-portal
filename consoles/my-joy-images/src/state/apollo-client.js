import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'cross-fetch';
import get from 'lodash.get';

import global from './global';

const {
  REACT_APP_GQL_PORT = global.port,
  REACT_APP_GQL_PROTOCOL = global.protocol,
  REACT_APP_GQL_HOSTNAME = global.hostname
} = process.env;

const PORT = REACT_APP_GQL_PORT ? `:${REACT_APP_GQL_PORT}` : '';
const URI = `${REACT_APP_GQL_PROTOCOL}://${REACT_APP_GQL_HOSTNAME}${PORT}/images/graphql`;

export default (opts = {}, request = {}) => {
  const host = get(request, 'raw.req.headers.host', '');

  let cache = new InMemoryCache();

  if (global.__APOLLO_STATE__) {
    cache = cache.restore(global.__APOLLO_STATE__);
  }

  return new ApolloClient({
    cache,
    link: new HttpLink({
      uri: host ? `${REACT_APP_GQL_PROTOCOL}//${host}/images/graphql` : URI,
      credentials: 'same-origin',
      fetch,
      headers: {
        'X-CSRF-Token': global.cookie.replace(
          /(?:(?:^|.*;\s*)crumb\s*=\s*([^;]*).*$)|^.*$/,
          '$1'
        )
      }
    }),
    ...opts
  });
};
