const Styled = require('styled-components');
const composers = require('../../shared/composers');

const {
  Baseline
} = composers;

const {
  default: styled
} = Styled;

const Fieldset = styled.fieldset`
  display: inline-block;
  margin: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  width: 100%;
  height: auto;

  -webkit-margin-start: 0;
  -webkit-margin-end: 0;
  -webkit-padding-before: 0;
  -webkit-padding-start: 0;
  -webkit-padding-end: 0;
  -webkit-padding-after: 0;
`;

module.exports = Baseline(
  Fieldset
);
