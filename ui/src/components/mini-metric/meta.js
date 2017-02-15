const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  Baseline
} = composers;

const {
  default: styled
} = Styled;

const OuterBox = styled.div`
  height: ${remcalc(53)};
  padding: ${remcalc(8)} ${remcalc(12)};
  border-bottom: ${remcalc(1)} solid ${colors.seperator};
`;

const InnerBox = styled.div`
  width: 100%;
  height: ${remcalc(36)};
`;

const Meta = (props) => (
  <OuterBox {...props}>
    <InnerBox>
      {props.children}
    </InnerBox>
  </OuterBox>
);

Meta.propTypes = {
  children: React.PropTypes.node
};

module.exports = Baseline(
  Meta
);
