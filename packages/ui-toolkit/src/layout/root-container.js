import { Component } from 'react';
import { withTheme, injectGlobal } from 'styled-components';
import FontFaceObserver from 'fontfaceobserver';

import { fontFaces } from '../typography/fonts';
import { loadedFontFamily } from '../typography';
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
        document.documentElement.className += ' fonts-loaded';
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return this.props.children;
  }
}

export default withTheme(RootContainer);
