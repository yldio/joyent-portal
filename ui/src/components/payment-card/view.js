const React = require('react');
const Styled = require('styled-components');
const composers = require('../../shared/composers');
const fns = require('../../shared/functions');

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
  display: flex;
  flex-direction: row;
  margin: 0 0 ${remcalc(48)} 0;
`;

const View = (props) => (
  <Container>
    {props.children}
  </Container>
);

View.propTypes = {
  children: React.PropTypes.node
};

module.exports = Baseline(
  View
);
