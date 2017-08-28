import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Tooltip, TooltipLabel } from 'joyent-ui-toolkit';

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const healthMessages = {
  healthy: 'Your instance is operating as expected',
  unhealthy: 'Your instance is not operating as expected',
  maintenance:
    "You've set your instance to this manually, use the Container Pilot CLI to change",
  unknown: "We've connected to your instance but we have no health information",
  unavailable: 'We cannot connect to your instance'
};

const statusMessages = {
  running: 'Your instance is operating',
  provisioning: 'Your instance is downloading dependencies and compiling',
  ready:
    "Your instance finished provisioning and is ready to be run, it'll be running soon",
  stopping: 'Your instance is going to be stopped soon',
  stopped: "Your instance isn't doing anything, you can start it",
  offline: 'We have no idea what this means, do you??????',
  failed: 'Your instance has crashed',
  unknown: 'We cannot work out what status your instance is in'
};

export const InstancesTooltip = ({ instancesTooltip }) => {
  if (instancesTooltip.show) {
    const { type, instance } = instancesTooltip;

    const message =
      type === 'healthy'
        ? healthMessages[instance.healthy.toLowerCase()]
        : type === 'status'
          ? statusMessages[instance.status.toLowerCase()]
          : '';

    return (
      <StyledContainer>
        <Tooltip {...instancesTooltip.position} secondary>
          <TooltipLabel>{message}</TooltipLabel>
        </Tooltip>
      </StyledContainer>
    );
  }

  return null;
};

const mapStateToProps = (state, ownProps) => ({
  instancesTooltip: state.ui.instances.tooltip
});

const mapDispatchToProps = dispatch => ({});

const UiConnect = connect(mapStateToProps, mapDispatchToProps);

export default UiConnect(InstancesTooltip);
