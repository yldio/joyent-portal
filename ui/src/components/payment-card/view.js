import { remcalc } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import styled from 'styled-components';
import React from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0 ${remcalc(48)} 0;
`;

const View = ({
  children,
  ...props
}) => (
  <Container {...props}>
    {children}
  </Container>
);

View.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  View
);
