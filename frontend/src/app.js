import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { client, store } from '@state/store';
import Router from '@root/router';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client} store={store} >
        <div>
          {Router}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
