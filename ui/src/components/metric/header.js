const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
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

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 0;
  width: 100%;
  background-color: ${colors.brandPrimaryDark};
  border: solid ${remcalc(1)} ${colors.brandPrimaryDarkest};
`;

const Header = (props) => (
  <StyledHeader {...props}>
    {props.children}
  </StyledHeader>
);

Header.propTypes = {
  children: React.PropTypes.node
};

module.exports = Header;
