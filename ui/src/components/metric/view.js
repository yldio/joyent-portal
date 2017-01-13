const constants = require('../../shared/constants');
const React = require('react');
const Styled = require('styled-components');

const {
  boxes,
  colors
} = constants;

const {
  default: styled
} = Styled;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
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
