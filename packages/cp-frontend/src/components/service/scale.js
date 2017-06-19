import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import unitcalc from 'unitcalc';

import { H2, P, Button } from 'joyent-ui-toolkit';
import {
  FormGroup,
  NumberInput,
  NumberInputNormalize,
  FormMeta
} from 'joyent-ui-toolkit';

const StyledH2 = styled(H2)`
  margin: 0 0 ${unitcalc(2)} 0;
`;

const ServiceScale = ({
  service,
  handleSubmit,
  onCancelClick,
  invalid,
  pristine
}) =>
  <form onSubmit={handleSubmit}>
    <StyledH2>Scaling a service: <br />{service.name}</StyledH2>
    <P>Choose how many instances of a service you want to have running.</P>
    <FormGroup
      name="replicas"
      normalize={NumberInputNormalize({ minValue: 1 })}
      reduxForm
    >
      <FormMeta />
      <NumberInput minValue={1} />
    </FormGroup>
    <Button secondary onClick={onCancelClick}>Cancel</Button>
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
