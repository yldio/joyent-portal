const constants = require('../../shared/constants');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  default: styled
} = Styled;

module.exports = styled.div`
  height: 127px;
  width: 158px;
  background-color: ${colors.miniBackground};
  border: solid 1px ${colors.borderSecondary};

  &::before {
    position: absolute;
    z-index: 1;
    width: 9px;
    height: 127px;
    content: '';
    background-image:
      linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(216, 216, 216, 0));
  }
`;
