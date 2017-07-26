import React from 'react';
import PropTypes from 'prop-types';

import { ModalHeading, ModalText, Button } from 'joyent-ui-toolkit';
import {
  FormGroup,
  NumberInput,
  NumberInputNormalize,
  FormMeta
} from 'joyent-ui-toolkit';

const ServiceScale = ({
  service,
  handleSubmit,
  onCancelClick,
  invalid,
  pristine
}) =>
  <form onSubmit={handleSubmit}>
    <ModalHeading>
      Scaling a service: <br />
      {service.name}
    </ModalHeading>
    <ModalText>
      Choose how many instances of a service you want to have running.
    </ModalText>
    <FormGroup
      name="replicas"
      normalize={NumberInputNormalize({ minValue: 1 })}
      reduxForm
    >
      <FormMeta />
      <NumberInput minValue={1} />
    </FormGroup>
    <Button secondary onClick={onCancelClick}>
      Cancel
    </Button>
    <Button type="submit" disabled={pristine || invalid} secondary>
      Scale
    </Button>
  </form>;

ServiceScale.propTypes = {
  service: PropTypes.object,
  onSubmitClick: PropTypes.func,
  onCancelClick: PropTypes.func
};

export default ServiceScale;
