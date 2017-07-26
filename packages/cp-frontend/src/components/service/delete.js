import React from 'react';
import PropTypes from 'prop-types';
import { ModalHeading, ModalText, Button } from 'joyent-ui-toolkit';

const propTypes = {
  service: PropTypes.object,
  onCancelClick: PropTypes.func.isRequired,
  onConfirmClick: PropTypes.func.isRequired
};

const ServiceDelete = ({ service, onCancelClick, onConfirmClick }) =>
  <div>
    <ModalHeading>
      Deleting a service: <br /> {service.name}
    </ModalHeading>
    <ModalText marginBottom="3">
      Deleting a service can lead to irreverasable loss of data and failures in
      your application. Are you sure you want to continue?
    </ModalText>
    <Button onClick={onCancelClick} secondary>
      Cancel
    </Button>
    <Button onClick={onConfirmClick}>Delete service</Button>
  </div>;

ServiceDelete.propTypes = propTypes;

export default ServiceDelete;
