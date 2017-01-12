const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const Item = require('./item');
const React = require('react');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const StyledItem = styled(Item)`
  position: absolute;

  background-color: ${colors.brandPrimary};
  border: solid ${remcalc(1)} ${colors.borderPrimary};
  box-shadow: none;

  width: calc(100% + ${remcalc(2)});
  margin: 0;

  top: ${remcalc(-1)};
  left: ${remcalc(-1)};
  right: ${remcalc(-1)};
`;

const addFromHeader = (children) => React.Children.map(children, (c) => {
  return React.cloneElement(c, {
    ...c.props,
    fromHeader: true
  });
});

const Header = (props) => (
  <StyledItem
    collapsed
    headed
    name='list-item-header'
  >
    {addFromHeader(props.children)}
  </StyledItem>
);

Header.propTypes = {
  children: React.PropTypes.node
};

module.exports = Header;
