const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  Baseline
} = composers;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const TopologyView = styled.div`
  border: ${remcalc(1)} solid ${colors.borderSecondary};
  background-color: ${colors.brandSecondary};
`;

const Topology = (props) => (
  <TopologyView {...props}>
    {props.children}
  </TopologyView>
);

Topology.propTypes = {
  children: React.PropTypes.node
};

module.exports = Baseline(
  Topology
);
