import React, { Component } from 'react';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { theme, global } from 'joyent-ui-toolkit';
import { ApolloProvider } from 'react-apollo';

import { client, store } from '@state/store';
import Router from '@root/router';
import { register } from './sw';

class App extends Component {
  componentWillMount() {
    injectGlobal`
      ${global}
    `;
  }

  render() {
    return (
      <ApolloProvider client={client} store={store}>
        <ThemeProvider theme={theme}>{Router}</ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;

register();
