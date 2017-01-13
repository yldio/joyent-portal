const React = require('react');
const Styled = require('styled-components');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');

const {
  boxes,
  breakpoints,
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

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
  border: ${remcalc(1)} solid ${colors.borderSecondary};
  background-color: ${colors.brandSecondary};

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
}) => {
  return (
    <StyledTile name='add-metric-tile'>
      {children}
    </StyledTile>
  );
};

Tile.propTypes = {
  children: React.PropTypes.node
};

module.exports = Tile;
