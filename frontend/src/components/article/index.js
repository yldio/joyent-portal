const React = require('react');
const Styled = require('styled-components');

const fns = require('@ui/shared/functions');

const {
  default: styled
} = Styled;

const {
  remcalc
} = fns;

module.exports = styled.article`
  margin-top: ${remcalc(78)};
`;
