import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from '@root/prop-types';
import { colors } from '@ui/shared/constants';
import { TopologyGraph } from '@ui/components/topology';
import { LayoutContainer } from '@components/layout';
import ServicesTooltip from '@components/services/tooltip';

import { toggleTooltip } from '@state/actions';

import {
  orgByIdSelector,
  projectByIdSelector,
  servicesForTopologySelector,
  serviceUiTooltipSelector
} from '@state/selectors';

const StyledBackground = styled.div`
  background-color: ${colors.base.whiteActive};
`;

const StyledContainer = styled(LayoutContainer)`
  position: relative;
`;

const Services = (props) => {
  const {
    services = [],
    org = {},
    project = {},
    toggleTooltip,
    uiTooltip
  } = props;

  const onQuickActions = (evt, tooltipData) => {
    const service = services.reduce((acc, service) =>
      service.uuid === tooltipData.service ? service : acc
    , {});
    const ttData = {
      ...tooltipData,
      data: {
        serviceId: service.id,
        orgId: org.id,
        projectId: project.id
      }
    };
    toggleTooltip(ttData);
  };

  return (
    <StyledBackground>
      <StyledContainer>
        <TopologyGraph
          onQuickActions={onQuickActions}
          services={services}
        />
        <ServicesTooltip {...uiTooltip} />
      </StyledContainer>
    </StyledBackground>
  );
};

Services.propTypes = {
  org: PropTypes.org,
  services: React.PropTypes.arrayOf(PropTypes.service),
  project: PropTypes.project,
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
