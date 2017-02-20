import React from 'react';
import styled from 'styled-components';
import { boxes, breakpoints, colors } from '../../shared/constants';
import { Baseline } from '../../shared/composers';
import { remcalc } from '../../shared/functions';

const spacing = remcalc(24);

const StyledTile = styled.div`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  margin: 0 ${spacing} ${spacing} 0;
  padding: ${spacing};
  width: ${remcalc(300)};
  height: ${remcalc(247)};
  box-shadow: ${boxes.bottomShaddow};
  border: ${remcalc(1)} solid ${colors.base.grey};
  background-color: ${colors.base.white};

  ${breakpoints.small`
    width: ${remcalc(300)};
    height: ${remcalc(247)};
  `}

  ${breakpoints.medium`
    width: ${remcalc(300)};
    height: ${remcalc(247)};
  `}

  ${breakpoints.large`
    width: ${remcalc(300)};
    height: ${remcalc(247)};
  `}
`;

const Tile = ({
  children
}) => (
  <StyledTile name='add-metric-tile'>
    {children}
  </StyledTile>
);

Tile.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  Tile
);
