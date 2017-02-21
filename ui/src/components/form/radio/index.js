const Styled = require('styled-components');

const Toggle = require('../toggle');
const composers = require('../../../shared/composers');
const BaseInput = require('../base-input');

const {
  default: styled
} = Styled;

const {
  Baseline
} = composers;

const RadioItem = BaseInput(styled.li`
  list-style-type: none;
`);

const RadioList = styled.ul`
  margin: 0;
  padding: 0;
`;

const Radio = Toggle({
  container: RadioItem,
  type: 'radio'
});

module.exports = Baseline(
  Radio
);

module.exports.RadioList = Baseline(
  RadioList
);
