import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient, createNetworkInterface } from 'react-apollo';

export const client = new ApolloClient({
  dataIdFromObject: o => {
    const id = o.id ? o.id : o.uuid ? o.uuid : o.timestamp ? o.timestamp : 'apollo-cache-key-not-defined';
    return `${o.__typename}:${id}`;
  },
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/graphql'
  })
});

export const store = createStore(
  combineReducers({
    // todos: todoReducer,
    // users: userReducer,
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ?
        window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);
