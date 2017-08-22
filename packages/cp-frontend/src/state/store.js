import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import state from './state';
import { ui } from './reducers';

const GLOBAL =
  typeof window === 'object'
    ? window
    : {
        location: {
          hostname: '0.0.0.0'
        }
      };

const GQL_PORT = process.env.REACT_APP_GQL_PORT || 443;
const GQL_HOSTNAME =
  process.env.REACT_APP_GQL_HOSTNAME || GLOBAL.location.hostname;
const GQL_PROTOCOL = process.env.REACT_APP_GQL_PROTOCOL || 'https';

export const client = new ApolloClient({
  dataIdFromObject: o => {
    const id = o.slug
      ? o.slug
      : o.id
        ? o.id
        : o.uuid
          ? o.uuid
          : o.timestamp
            ? o.timestamp
            : o.name && o.instance
              ? `${o.name}-${o.instance}`
                : o.name ? o.name : o.time && o.value
                  ? `${o.time}-${o.value}` : 'apollo-cache-key-not-defined';
    return `${o.__typename}:${id}`;
  },
  networkInterface: createNetworkInterface({
    uri: `${GQL_PROTOCOL}://${GQL_HOSTNAME}:${GQL_PORT}/api/graphql`
  })
});

export const store = createStore(
  combineReducers({
    ui,
    apollo: client.reducer(),
    form: formReducer
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
