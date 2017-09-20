import { Component } from 'react';
import { injectGlobal, withTheme } from 'styled-components';
import FontFaceObserver from 'fontfaceobserver';
import { global } from '../base';
import { fontFaces } from '../typography/fonts';

const families = Object.keys(
  Object.values(fontFaces)
    .map(({ family }) => family)
    .reduce((sum, name) => Object.assign(sum, { [name]: 1 }), {})
);

const observers = families.map(name => new FontFaceObserver(name));

class RootContainer extends Component {
  componentWillMount() {
    // eslint-disable-next-line no-unused-expressions
    injectGlobal`
      ${global(this.props)}
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
