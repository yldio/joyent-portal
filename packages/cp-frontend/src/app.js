import React, { Component } from 'react';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { theme, global } from 'joyent-ui-toolkit';
import { ApolloProvider } from 'react-apollo';

import { client, store } from '@state/store';
import Router from '@root/router';

class App extends Component {
  componentWillMount() {
    // eslint-disable-next-line no-unused-expressions
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
