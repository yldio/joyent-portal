import { Component } from 'react';
import { withTheme, injectGlobal } from 'styled-components';

import global from '../base/global';

class RootContainer extends Component {
  componentWillMount() {
    const { theme = {} } = this.props;

    // eslint-disable-next-line no-unused-expressions
    injectGlobal`
      ${global({ theme })};
    `;
  }

  render() {
    return this.props.children;
  }
}

export default withTheme(RootContainer);
