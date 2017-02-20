import { remcalc } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import styled from 'styled-components';
import React from 'react';

const TopologyView = styled.div`
  border: ${remcalc(1)} solid ${colors.borderSecondary};
  background-color: ${colors.brandSecondary};
`;

const Topology = ({
  children,
  ...props
}) => (
  <TopologyView {...props}>
    {children}
  </TopologyView>
);

Topology.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  Topology
);
