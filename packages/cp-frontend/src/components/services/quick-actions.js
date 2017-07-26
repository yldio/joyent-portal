import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, TooltipButton, TooltipDivider } from 'joyent-ui-toolkit';

const ServicesQuickActions = ({
  show,
  position,
  service,
  url,
  onBlur,
  onRestartClick,
  onStopClick,
  onStartClick,
  onScaleClick,
  onDeleteClick
}) => {
  if (!show) {
    return null;
  }

  const p = Object.keys(position).reduce((p, key) => {
    if (typeof position[key] === 'number') {
      p[key] = `${position[key]}px`;
    } else {
      p[key] = position[key];
    }
    return p;
  }, {});

  const handleRestartClick = evt => {
    onRestartClick(evt, service);
  };

  const handleStartClick = evt => {
    onStartClick(evt, service);
  };

  const handleStopClick = evt => {
    onStopClick(evt, service);
  };

  const handleScaleClick = evt => {
    onScaleClick(evt, service);
  };

  const handleDeleteClick = evt => {
    onDeleteClick(evt, service);
  };

  const disabled = service.transitionalStatus;

  const status = service.instances.reduce((status, instance) => {
    return status
      ? instance.status === status ? status : 'MIXED'
      : instance.status;
  }, null);

  const startService =
    status === 'RUNNING'
      ? null
      : <TooltipButton onClick={handleStartClick} disabled={disabled}>
          Start
        </TooltipButton>;

  const stopService =
    status === 'STOPPED'
      ? null
      : <TooltipButton onClick={handleStopClick} disabled={disabled}>
          Stop
        </TooltipButton>;

  return (
    <Tooltip {...p} onBlur={onBlur}>
      <TooltipButton onClick={handleScaleClick} disabled={disabled}>
        Scale
      </TooltipButton>
      <TooltipButton onClick={handleRestartClick} disabled={disabled}>
        Restart
      </TooltipButton>
      {startService}
      {stopService}
      <TooltipDivider />
      <TooltipButton onClick={handleDeleteClick} disabled={disabled}>
        Delete
      </TooltipButton>
    </Tooltip>
  );
};

ServicesQuickActions.propTypes = {
  service: PropTypes.object.isRequired,
  position: PropTypes.object,
  show: PropTypes.bool,
  onBlur: PropTypes.func,
  onRestartClick: PropTypes.func,
  onStopClick: PropTypes.func,
  onStartClick: PropTypes.func,
  onScaleClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};

export default ServicesQuickActions;
