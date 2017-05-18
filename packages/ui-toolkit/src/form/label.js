import React from 'react';
import { Subscriber } from 'react-broadcast';
import styled from 'styled-components';
import remcalc from 'remcalc';
import Label from '../label';

const StyledLabel = styled(Label)`
  margin-right: ${remcalc(12)};
`;

export default props => {
  const render = value => {
    const { id = '' } = value || {};
    return <StyledLabel {...props} htmlFor={id} />;
  };

  return (
    <Subscriber channel="input-group">
      {render}
    </Subscriber>
  );
};
