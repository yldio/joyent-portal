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

const ServiceDelete = ({ service }) => (
  <div>
    <ModalHeading>
      Deleting a service:
    </ModalHeading>
    <ModalText marginBottom="3">
      Deleting a service can lead to irreverasable loss of data and failures
      in your application. Are you sure you want to continue?
    </ModalText>
    <Button secondary>Cancel</Button>
    <Button>Delete service</Button>
  </div>
);

ServiceDelete.propTypes = propTypes;

export default ServiceDelete;
