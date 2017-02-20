import { remcalc } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import styled from 'styled-components';
import React from 'react';

const border = (props) => !props.borderless
  ? `solid ${remcalc(1)} ${colors.borderSecondary}`
  : 'none';

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-color: ${colors.miniBackground};
  border: ${border};
`;

const Shadow = styled.div`
  z-index: 1;
  position: absolute;
  height: 100%;
  width: ${remcalc(9)};
  left: 0;
  top: 0;
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(216, 216, 216, 0));
`;

const View = ({
  children,
  ...props
}) => (
  <Container {...props}>
    <Shadow />
    {children}
  </Container>
);

View.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  View
);
