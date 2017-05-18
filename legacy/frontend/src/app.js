import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { client, store } from '@state/store';
import Router from '@root/router';

import { injectGlobal } from 'styled-components';
import Base, { global } from '@ui/components/base';

class App extends Component {

  componentWillMount() {
    injectGlobal`
      ${global}
    `;
  }

  render() {
    return (
      <ApolloProvider client={client} store={store} >
        <article>
          {Router}
        </article>
      </ApolloProvider>
    );
  }
}



export default App;
