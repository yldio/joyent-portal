import React from 'react';
import { Baseline } from '../../shared/composers';
import styled from 'styled-components';

const StyledBaselineBackground = styled.div`
  position: relative;

  &:after {
    position: absolute;
    width: auto;
    height: auto;
    z-index: 9999;
    content: '';
    display: block;
    pointer-events: none;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      to bottom,
      rgba(93, 150, 52, 0.50),
      rgba(93, 150, 52, 0.50) 50%,
      transparent 50%,
      transparent
    );
    background-size: 100% 6px;
  }
`;

const BaselineGrid = ({
  children
}) => (
  <StyledBaselineBackground>
    {children}
  </StyledBaselineBackground>
);

BaselineGrid.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  BaselineGrid
);
