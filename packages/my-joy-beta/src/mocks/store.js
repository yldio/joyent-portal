import React from 'react';
import { ApolloProvider } from 'react-apollo';

import createClient from '@state/apollo-client';

export default ({ children }) => (
  <ApolloProvider client={createClient()}>{children}</ApolloProvider>
);
