import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { ThemeProvider } from 'styled-components';
import pathToRegexp from 'path-to-regexp';
import pascalCase from 'pascal-case';
import qs from 'qs';

import { theme, RootContainer } from 'joyent-ui-toolkit';
import * as Routes from './routes';

const history = createHistory();
const path = pathToRegexp('/:page?', [], { end: false });
const query = search => qs.parse(search.replace(/^\?/, ''));
const name = pathname => path.exec(pathname)[1] || 'index';

const toState = location => ({
  name: name(location.pathname),
  location: {
    query: query(location.search),
    hash: location.hash,
    pathname: location.pathname
  }
});

class Router extends Component {
  state = toState(history.location);

  componentWillMount = () => {
    this.unlisten = history.listen(this._onLocationChange);
  };

  componentWillUnmount = () => this.unlisten();

  _onLocationChange = location => this.setState(location);

  render = () => {
    const { name } = this.state;
    const route = pascalCase(name);
    const View = Routes[route];

    return View ? (
      <View location={this.state.location} />
    ) : (
      <span>
        <span>Not Found</span>
        <br />
        <br />
        <span>
          Pathname: <code>{name}</code>
        </span>
        <br />
        <span>
          Expected page: <code>pages/{name}</code>
        </span>
        <br />
        <br />
        <span>
          Expected export: <br />
          <code
          >{`export { default as ${route} } from './pages/${name}';`}</code>
        </span>
      </span>
    );
  };
}

export default () => (
  <ThemeProvider theme={theme}>
    <RootContainer>
      <Router />
    </RootContainer>
  </ThemeProvider>
);
