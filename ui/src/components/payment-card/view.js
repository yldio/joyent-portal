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

module.exports = View;
