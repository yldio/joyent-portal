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

const GQL_PORT = process.env.REACT_APP_GQL_PORT || 443;
const GQL_PROTOCOL = process.env.REACT_APP_GQL_PROTOCOL || 'https';
const GQL_HOSTNAME =
  process.env.REACT_APP_GQL_HOSTNAME || GLOBAL.location.hostname;

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
    uri: `${GQL_PROTOCOL}://${GQL_HOSTNAME}:${GQL_PORT}/graphql`
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
    applyMiddleware(client.middleware()),
    // If you are using the devToolsExtension, you can add it here also
    // eslint-disable-next-line no-negated-condition
    typeof GLOBAL.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? GLOBAL.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);
