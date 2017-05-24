import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import state from './state';
import { ui } from './reducers';

export const client = new ApolloClient({
  dataIdFromObject: o => {
    const id = o.slug ? o.slug : o.id ? o.id : o.uuid ? o.uuid : o.timestamp ? o.timestamp : o.name ? o.name : 'apollo-cache-key-not-defined';
    return `${o.__typename}:${id}`;
  },
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/graphql'
  })
});

export const store = createStore(
  combineReducers({
    ui: ui,
    apollo: client.reducer(),
  }),
  state, // initial state
  compose(
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ?
        window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);
