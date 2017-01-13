const React = require('react');
const Styled = require('styled-components');
const fns = require('../../shared/functions');

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const StyledBody = styled.div`
  margin: 0;
  width: 100%;
  height: ${remcalc(264)};
`;

const Body = ({
  children
}) => {
  return (
    <StyledBody name='metric-body'>
      {children}
    </StyledBody>
  );
};

Body.propTypes = {
  children: React.PropTypes.node
};

module.exports = Body;
