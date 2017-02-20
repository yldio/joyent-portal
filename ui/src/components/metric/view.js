import React from 'react';
import styled from 'styled-components';
import { Baseline } from '../../shared/composers';
import { boxes, colors } from '../../shared/constants';
import { remcalc } from '../../shared/functions';

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: ${remcalc(24)} 0;
  width: 100%;
  max-width: ${remcalc(940)};
  box-shadow: ${boxes.bottomShaddow};
  border: 1px solid ${colors.base.grey};
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
