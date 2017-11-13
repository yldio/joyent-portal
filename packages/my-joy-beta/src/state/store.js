import { reduxBatch } from '@manaflair/redux-batch';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { ApolloClient, createNetworkInterface } from 'react-apollo';

import { ui } from './reducers';
import state from './state';

const GLOBAL =
  typeof window === 'object'
    ? window
    : {
        location: {
          hostname: '0.0.0.0'
        }
      };

const GQL_URL = process.env.REACT_APP_GQL_URL || `${window.location.origin}/graphql`;
export const client = new ApolloClient({
  dataIdFromObject: o => {
    const id = o.id
      ? o.id
      : o.slug
        ? o.slug
        : o.uuid
          ? o.uuid
          : o.timestamp
            ? o.timestamp
            : o.name && o.instance
              ? `${o.name}-${o.instance}`
              : o.name
                ? o.name
                : o.time && o.value
                  ? `${o.time}-${o.value}`
                  : 'apollo-cache-key-not-defined';

    return `${o.__typename}:${id}`;
  },
  networkInterface: createNetworkInterface({
    uri: GQL_URL,
    opts: {
      credentials: process.env.REACT_APP_GQL_URL ? 'include' : 'same-origin',
      headers: {
        'X-CSRF-Token': document.cookie.replace(/(?:(?:^|.*;\s*)crumb\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      }
    }
  })
});

export const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    form: formReducer,
    ui
  }),
  state, // Initial state
  compose(
    reduxBatch,
    applyMiddleware(client.middleware()),
    // If you are using the devToolsExtension, you can add it here also
    // eslint-disable-next-line no-negated-condition
    typeof GLOBAL.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? GLOBAL.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);
