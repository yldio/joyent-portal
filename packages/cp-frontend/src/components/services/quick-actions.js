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

  const handleStopClick = evt => {
    onStopClick(evt, service);
  };

  const handleStartClick = evt => {
    onStartClick(evt, service);
  };

  // TODO we'll need to check for service status and diplay start or restart & stop accordingly

  return (
    <Tooltip {...p} onBlur={onBlur}>
      <TooltipButton to={scaleUrl}>Scale</TooltipButton>
      <TooltipButton onClick={handleRestartClick}>Restart</TooltipButton>
      <TooltipButton onClick={handleStopClick}>Stop</TooltipButton>
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
