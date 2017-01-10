const constants = require('../../shared/constants');
const React = require('react');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  default: styled
} = Styled;

const TopologyView = styled.div`
  border: 1px solid ${colors.borderSecondary};
  background-color: ${colors.brandSecondary};
`;

const Topology = (props) => (
  <TopologyView {...props}>
    {props.children}
  </TopologyView>
);

Topology.propTypes = {
  children: React.PropTypes.node,
};

module.exports = Topology;
