import { reduxBatch } from '@manaflair/redux-batch';
import { createStore, combineReducers, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { reducer as valuesReducer } from 'react-redux-values';
import paramCase from 'param-case';

const {
  REACT_APP_GQL_PORT = window.location.port,
  REACT_APP_GQL_PROTOCOL = window.location.protocol.replace(/\:$/, ''),
  REACT_APP_GQL_HOSTNAME = window.location.hostname
} = process.env;

const PORT = REACT_APP_GQL_PORT ? `:${REACT_APP_GQL_PORT}` : '';
const URI = `${REACT_APP_GQL_PROTOCOL}://${REACT_APP_GQL_HOSTNAME}${PORT}/graphql`;

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    credentials: 'same-origin',
    uri: URI
  })
});

const initialState = {
  ui: {
    sections: {
      instances: [
        'Summary',
        'CNS',
        'Snapshots',
        'Tags',
        'Metadata',
        'User Script',
        'Networks',
        'Firewall'
      ].map(name => ({
        pathname: paramCase(name),
        name
      }))
    }
  }
};

export const store = createStore(
  combineReducers({
    values: valuesReducer,
    form: formReducer,
    ui: (state = {}) => state
  }),
  initialState,
  compose(
    reduxBatch,
    // If you are using the devToolsExtension, you can add it here also
    // eslint-disable-next-line no-negated-condition
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);
