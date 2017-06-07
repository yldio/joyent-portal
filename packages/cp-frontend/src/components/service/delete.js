import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H2, Button, P } from 'joyent-ui-toolkit';

const ModalHeading = styled(H2)`
  line-height: 1.25;
	color: ${props => props.theme.secondary};
  `;

const ModalText = styled(P)`
    color: ${props => props.theme.secondary};
  `;

const ServiceDelete = ({ service, onCancelClick }) => (
  <div>
    <ModalHeading>
      Deleting a service: <br /> {service.name}
    </ModalHeading>
    <ModalText marginBottom="3">
      Deleting a service can lead to irreverasable loss of data and failures
      in your application. Are you sure you want to continue?
    </ModalText>
    <Button secondary onClick={onCancelClick}>Cancel</Button>
    <Button>Delete service</Button>
  </div>
);

ServiceDelete.propTypes = {
  service: PropTypes.object,
  onCancelClick: PropTypes.func.isRequired
};

export default ServiceDelete;
