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
  onStartClick
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

  const scaleUrl = `${url}/${service.slug}/scale`;
  const deleteUrl = `${url}/${service.slug}/delete`;

  const handleRestartClick = evt => {
    onRestartClick(evt, service);
  };

  const handleStartClick = evt => {
    onStartClick(evt, service);
  };

  const handleStopClick = evt => {
    onStopClick(evt, service);
  };

  const status = service.instances.reduce((status, instance) => {
    return status
      ? instance.status === status ? status : 'MIXED'
      : instance.status;
  }, null);

  const startService = status === 'RUNNING'
    ? null
    : <TooltipButton onClick={handleStartClick}>Start</TooltipButton>;

  const stopService = status === 'STOPPED'
    ? null
    : <TooltipButton onClick={handleStopClick}>Stop</TooltipButton>;

  return (
    <Tooltip {...p} onBlur={onBlur}>
      <TooltipButton to={scaleUrl}>Scale</TooltipButton>
      <TooltipButton onClick={handleRestartClick}>Restart</TooltipButton>
      {startService}
      {stopService}
      <TooltipDivider />
      <TooltipButton to={deleteUrl}>Delete</TooltipButton>
    </Tooltip>
  );
};

ServicesQuickActions.propTypes = {
  service: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  position: PropTypes.object,
  show: PropTypes.bool,
  onBlur: PropTypes.func,
  onRestartClick: PropTypes.func,
  onStopClick: PropTypes.func,
  onStartClick: PropTypes.func
};

export default ServicesQuickActions;
