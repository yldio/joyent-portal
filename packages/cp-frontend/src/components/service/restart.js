import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { H2, Button, P } from 'joyent-ui-toolkit';

const propTypes = {
  service: PropTypes.object
};

const ModalHeading = styled(H2)`
  line-height: 1.25;
	color: ${props => props.theme.secondary};
  `;

const ModalText = styled(P)`
    color: ${props => props.theme.secondary};
  `;

const ServiceRestart = ({ service }) => (
  <div>
    <ModalHeading>
      Restarting a service:
    </ModalHeading>
    <ModalText marginBottom="3">
      Sample text
    </ModalText>
    <Button secondary>Cancel</Button>
    <Button>Restart service</Button>
  </div>
);

ServiceRestart.propTypes = propTypes;

export default ServiceRestart;
