const Button = require('../button');
const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const React = require('react');
const transferProps = require('../../shared/transfer-props');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  Baseline
} = composers;

const {
  default: styled
} = Styled;

const height = (props) => props.collapsed
  ? remcalc(46)
  : remcalc(124);

const borderLeftColor = (props) => !props.fromHeader
  ? colors.base.grey
  : colors.base.primary;

const Nav = styled.nav`
  flex: 0 0 ${remcalc(47)};
  border-left: ${remcalc(1)} solid ${borderLeftColor};
`;

const StyledButton = styled(Button)`
  border-width: 0;
  box-shadow: none;
  width: 100%;
  height: ${height}; /* 100% doest work on safari */

  &:focus {
    border-width: 0;
  }

  &:hover {
    border-width: 0;
  }

  &:active,
  &:active:hover,
  &:active:focus {
    border-width: 0;
  }
`;

const Options = transferProps([
  'collapsed',
  'headed',
  'fromHeader'
], (props) => (
  <Nav
    fromHeader={props.fromHeader}
    name='list-item-options'
  >
    <StyledButton
      rect
      secondary={!props.fromHeader}
      {...props}
    >
      {props.children}
    </StyledButton>
  </Nav>
));

Options.propTypes = {
  children: React.PropTypes.node
};

module.exports = Baseline(
  Options
);
