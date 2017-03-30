import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from '@root/prop-types';
import { colors } from '@ui/shared/constants';
import { unitcalc } from '@ui/shared/functions';
import { TopologyGraph } from '@ui/components/topology';
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

const StyledContainer = styled.div`
  position: relative;
  padding: ${unitcalc(4)};
`;

const Services = (props) => {
  const {
    services = [],
    org = {},
    project = {},
    toggleTooltip,
    uiTooltip,
    push
  } = props;

  if(!services || !services.length) {
    return null;
  }

  const getService = (uuid) => services.reduce((acc, service) =>
    service.uuid === uuid ? service : acc
  , {});

  const onQuickActions = (evt, tooltipData) => {
    const service = getService(tooltipData.service);
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

  const handleTooltipBlur = (evt) => onQuickActions(evt, {
    service: uiTooltip.service
  });

  const onNodeTitleClick = (uuid) => {
    const service = getService(uuid);

    const path = `/${org.id}/projects/${project.id}/services/${service.id}`;

    push(path);
  };

  return (
    <StyledBackground>
      <StyledContainer>
        <TopologyGraph
          onQuickActions={onQuickActions}
          onNodeTitleClick={onNodeTitleClick}
          services={services}
        />
        <ServicesTooltip {...uiTooltip} onBlur={handleTooltipBlur} />
      </StyledContainer>
    </StyledBackground>
  );
};

Services.propTypes = {
  org: PropTypes.org,
  services: React.PropTypes.arrayOf(PropTypes.service),
  project: PropTypes.project,
  push: React.PropTypes.func.isRequired,
  toggleTooltip: React.PropTypes.func,
  uiTooltip: React.PropTypes.object
};

const mapStateToProps = (state, {
  match = {
    params: {}
  },
  push
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.project)(state),
  services: servicesForTopologySelector(match.params.project)(state),
  uiTooltip: serviceUiTooltipSelector(state),
  push: push
});

const mapDispatchToProps = (dispatch) => ({
  toggleTooltip: (data) => dispatch(toggleTooltip(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Services);
