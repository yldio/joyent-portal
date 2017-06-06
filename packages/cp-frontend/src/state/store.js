import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import { enableBatching } from 'redux-batched-actions';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import state from './state';
import { ui } from './reducers';

const GLOBAL = typeof window === 'object'
  ? window
  : {
      location: {
        hostname: 'http://0.0.0.0'
      }
    };

const GQL_HOSTNAME = process.env.REACT_APP_GQL_HOSTNAME || GLOBAL;

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
                  : o.name ? o.name : 'apollo-cache-key-not-defined';
    return `${o.__typename}:${id}`;
  },
  networkInterface: createNetworkInterface({
    uri: `http://${GQL_HOSTNAME}:3000/graphql`
  })
});

export const store = createStore(
  combineReducers({
    ui,
    apollo: client.reducer()
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
