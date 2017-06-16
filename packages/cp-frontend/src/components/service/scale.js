import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import unitcalc from 'unitcalc';

import { H2, P, Button } from 'joyent-ui-toolkit';
import { FormGroup, Input, NumberInput } from 'joyent-ui-toolkit';

const StyledH2 = styled(H2)`
  margin: 0 0 ${unitcalc(2)} 0;
`;

const ServiceScale = ({ service, onConfirmClick, onCancelClick }) => {
  const handleScaleClick = () => {
    onConfirmClick(2);
  };
  return (
    <div>
      <StyledH2>Scaling a service: <br />{service.name}</StyledH2>
      <P>Choose how many instances of a service you want to have running.</P>
      <form onSubmit={() => {}}>
        <NumberInput />
        <Button secondary onClick={onCancelClick}>Cancel</Button>
        <Button secondary onClick={handleScaleClick}>Scale</Button>
      </form>
    </div>
  );
};

ServiceScale.propTypes = {
  service: PropTypes.object,
  onScaleClick: PropTypes.func,
  onCancelClick: PropTypes.func
};

export default ServiceScale;
