import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { H2 } from 'joyent-ui-toolkit';

class ServiceScale extends Component {

  render() {
    return (
      <div>
        <H2>Scaling a service:</H2>
      </div>
    )
  }
}

ServiceScale.propTypes = {
  service: PropTypes.object
}

export default ServiceScale;
