import { reduxBatch } from '@manaflair/redux-batch';
import { createStore, combineReducers, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { reducer as valuesReducer } from 'react-redux-values';

const {
  REACT_APP_GQL_PORT = 443,
  REACT_APP_GQL_PROTOCOL = 'https',
  REACT_APP_GQL_HOSTNAME = window.location.hostname
} = process.env;

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${REACT_APP_GQL_PROTOCOL}://${REACT_APP_GQL_HOSTNAME}:${REACT_APP_GQL_PORT}/graphql`
  })
});

const initialState = {};

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
