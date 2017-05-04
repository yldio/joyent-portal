import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { client, store } from './state/store';
import Router from './routing/routes';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client} store={store} >
        <div>
          <h2>Apollo Redux Spike</h2>
          {Router}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
