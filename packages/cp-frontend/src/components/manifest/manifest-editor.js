import React, { Component } from 'react';
import Bundle from 'react-bundle';

import { Loader } from '@components/messaging';

class ManifestEditorBundle extends Component {
  constructor() {
    super();

    this.state = {};

    this.handleRender = this.handleRender.bind(this);
  }
  handleRender(ManifestEditor) {
    if (ManifestEditor) {
      setTimeout(() => {
        this.setState({ ManifestEditor });
      }, 80);
    }

    return <Loader />;
  }
  render() {
    if (!this.state.ManifestEditor) {
      return (
        <Bundle load={() => import('joyent-manifest-editor')}>
          {this.handleRender}
        </Bundle>
      );
    }

    const { ManifestEditor } = this.state;
    const { children, ...rest } = this.props;

    return <ManifestEditor {...rest}>{children}</ManifestEditor>;
  }
}

export default ManifestEditorBundle;
