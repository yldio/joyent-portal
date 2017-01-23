const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');

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

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: ${remcalc(24)} 0;
  width: 100%;
  max-width: ${remcalc(940)};
  box-shadow: ${boxes.bottomShaddow};
  border: 1px solid ${colors.borderSecondary};
`;

const View = (props) => (
  <Container {...props}>
    {props.children}
  </Container>
);

View.propTypes = {
  children: React.PropTypes.node
};

module.exports = View;
