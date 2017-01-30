const React = require('react');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const Container = styled.p`
  margin: 0;
  line-height: 1.2;
`;

const Detail = (props) => (
  <Container>
    {props.children}
  </Container>
);

Detail.propTypes = {
  children: React.PropTypes.node
};

module.exports = Detail;
