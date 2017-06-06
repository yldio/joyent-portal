import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { H2 } from 'joyent-ui-toolkit';

const propTypes = {
  service: PropTypes.object
};

export default class ServiceDelete extends PureComponent {
  render() {
    return (
      <div>
        <H2>Deleting a service:</H2>
      </div>
    );
  }
}

ServiceDelete.propTypes = propTypes;
