const composers = require('../../shared/composers');
const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');

const {
  remcalc
} = fns;

const {
  Baseline
} = composers;

const {
  default: styled
} = Styled;

const Container = styled.div`
  flex: none;
  padding: ${remcalc(12)};
`;

const Details = (props) => (
  <Container>
    {props.children}
  </Container>
);

Details.propTypes = {
  children: React.PropTypes.node
};

module.exports = Baseline(
  Details
);
