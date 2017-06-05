import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { H2, P, Button } from 'joyent-ui-toolkit';
import { Input } from 'joyent-ui-toolkit';

class ServiceScale extends Component {

  render() {
    console.log('this.props.service = ', this.props.service);
    const {
      service,
      onCancelClick
    } = this.props;

    return (
      <div>
        <H2>Scaling a service: <br/>{service.name}</H2>
        <P>Choose how many instances of a service you want to have running.</P>
        <div>
          <Input></Input>
          <Button secondary disabled>-</Button>
          <Button secondary>+</Button>
        </div>
        <Button secondary onClick={onCancelClick}>Cancel</Button>
        <Button secondary disabled>Scale</Button>
      </div>
    )
  }
}

ServiceScale.propTypes = {
  service: PropTypes.object,
  onCancelClick: PropTypes.func
}

export default ServiceScale;
