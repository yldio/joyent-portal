import { Component } from 'react';
import { withTheme, injectGlobal } from 'styled-components';
import FontFaceObserver from 'fontfaceobserver';

import { fontFaces } from '../typography/fonts';
import global from '../base/global';

const observers = Object.values(fontFaces).map(
  ({ family, style, weight }) =>
    new FontFaceObserver(family, {
      weight,
      style
    })
);

class RootContainer extends Component {
  componentWillMount() {
    const { theme } = this.props;

    // eslint-disable-next-line no-unused-expressions
    injectGlobal`
      ${global({ theme })};
    `;

    Promise.all(observers.map(obs => obs.load()))
      .then(() => {
        // eslint-disable-next-line
        if (!document.documentElement.className.match(/fonts-loaded/)) {
          document.documentElement.className += ' fonts-loaded';
        }
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

  render() {
    return this.props.children;
  }
}

export default withTheme(RootContainer);
