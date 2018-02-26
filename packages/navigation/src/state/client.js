import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

import defaultState from './local';

const {
  REACT_APP_GQL_PORT = window.location.port,
  REACT_APP_GQL_PROTOCOL = window.location.protocol.replace(/:$/, ''),
  REACT_APP_GQL_HOSTNAME = window.location.hostname
} = process.env;

const PORT = REACT_APP_GQL_PORT ? `:${REACT_APP_GQL_PORT}` : '';
const URI = `${REACT_APP_GQL_PROTOCOL}://${REACT_APP_GQL_HOSTNAME}${PORT}/graphql`;

const cache = new InMemoryCache();
const remote = new HttpLink({ uri: URI });

const local = withClientState({
  cache,
  ...defaultState
});

export default new ApolloClient({
  addTypename: true,
  link: ApolloLink.from([local, remote]),
  cache
});
