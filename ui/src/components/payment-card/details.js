const React = require('react');
const Styled = require('styled-components');
const fns = require('../../shared/functions');

const {
  remcalc
} = fns;

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

module.exports = Details;
