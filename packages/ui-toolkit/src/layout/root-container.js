import { Component } from 'react';
import { withTheme, injectGlobal } from 'styled-components';
import FontFaceObserver from 'fontfaceobserver';

import { fontFaces } from '../typography/fonts';
import { loadedFontFamily } from '../typography';

const families = Object.keys(
  Object.values(fontFaces)
    .map(({ family }) => family)
    .reduce((sum, name) => Object.assign(sum, { [name]: 1 }), {})
);

const observers = families.map(name => new FontFaceObserver(name));

class RootContainer extends Component {
  componentWillMount() {
    const { theme } = this.props;

    // eslint-disable-next-line no-unused-expressions
    injectGlobal`
      [hidden] {
        display: none;
      }

      html {
        line-height: 1.15;
        text-size-adjust: 100%;
      }

      body {
        font-size: 15px;
        margin: 0;
        padding: 0;
        background: ${theme.background};

        ${loadedFontFamily};
      }

      html,
      body,
      #root {
        height: 100%;
      }

      .CodeMirror,
      .ReactCodeMirror {
        height: 100% !important;
      }

      .CodeMirror {
        border: solid 1px ${theme.grey};
      }
    `;

    Promise.all(observers.map(obs => obs.load())).then(() => {
      document.documentElement.className += ' fonts-loaded';
    });
  }

  render() {
    return this.props.children;
  }
}

export default withTheme(RootContainer);
