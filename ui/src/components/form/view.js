const composers = require('../../shared/composers');
const Styled = require('styled-components');

const {
  Baseline
} = composers;

const {
  default: styled
} = Styled;

const View = styled.div``;

module.exports = Baseline(
  View
);
