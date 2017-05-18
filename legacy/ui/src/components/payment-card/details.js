import React from 'react';
import { Baseline } from '../../shared/composers';
import { remcalc } from '../../shared/functions';
import styled from 'styled-components';

const Container = styled.div`
  flex: none;
  padding: ${remcalc(12)};
`;

const Details = ({
  children,
  ...props
}) => (
  <Container {...props}>
    {children}
  </Container>
);

Details.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  Details
);
