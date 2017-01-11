const React = require('react');
const Styled = require('styled-components');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');

const {
  boxes,
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
  margin: 0 ${spacing} ${spacing} 0;
  padding: ${spacing};
  width: ${300}px;
  height: ${247}px;
  box-shadow: ${boxes.bottomShaddow};
  border: 1px solid ${colors.borderSecondary};
  background-color: ${colors.brandSecondary};
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
