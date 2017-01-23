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

const View = (props) => (
  <Container {...props}>
    <Shadow />
    {props.children}
  </Container>
);

View.propTypes = {
  children: React.PropTypes.node
};

module.exports = View;
