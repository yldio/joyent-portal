import React from 'react';
import { client, store } from '@state/store';
import { ApolloProvider } from 'react-apollo';

export default ({ children }) => (
  <ApolloProvider client={client} store={store}>{children}</ApolloProvider>
);
