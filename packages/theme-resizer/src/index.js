import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { ValueBreakpoints } from 'joyent-ui-toolkit';
import debounce from 'lodash.debounce';

export default class extends Component {
  state = {
    screen: 'desktop'
  };

  setScreen = () => {
    const screen =
      window.innerWidth <= ValueBreakpoints.small.upper ? 'mobile' : 'desktop';
    this.setState({ screen });
  };

  componentWillMount() {
    window.addEventListener('resize', debounce(this.setScreen, 100));
    this.setScreen();
  }

  render() {
    const { theme, children, ...props } = this.props;
    const { screen } = this.state;

    return (
      <ThemeProvider theme={{ ...theme, screen }} {...props}>
        {children}
      </ThemeProvider>
    );
  }
}
