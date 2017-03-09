import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from '@root/prop-types';
import { TopologyGraph } from '@ui/components/topology';
import ServicesTooltip from '@components/services/tooltip';

import { toggleTooltip } from '@state/actions';

import {
  orgByIdSelector,
  projectByIdSelector,
  servicesForTopologySelector,
  serviceUiTooltipSelector
} from '@state/selectors';

const StyledContainer = styled.div`
  position: relative;
`;

const Services = (props) => {
  const {
    services = [],
    toggleTooltip,
    uiTooltip
  } = props;

  const onQuickActions = (evt, tooltipData) => {
    toggleTooltip(tooltipData);
  };

  return (
    <StyledContainer>
      <TopologyGraph
        onQuickActions={onQuickActions}
        services={services}
      />
      <ServicesTooltip {...uiTooltip} />
    </StyledContainer>
  );
};

Services.propTypes = {
  services: React.PropTypes.arrayOf(PropTypes.service),
  toggleTooltip: React.PropTypes.func,
  uiTooltip: React.PropTypes.object
};

const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.projectId)(state),
  services: servicesForTopologySelector(match.params.projectId)(state),
  uiTooltip: serviceUiTooltipSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleTooltip: (data) => dispatch(toggleTooltip(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Services);
