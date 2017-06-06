import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, TooltipButton, TooltipDivider } from 'joyent-ui-toolkit';

const ServicesQuickActions = ({ show, position, service, url, onBlur }) => {
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
  const restartUrl = `${url}/${service.slug}/restart`;
  const stopUrl = `${url}/${service.slug}/stop`;

  return (
    <Tooltip {...p} onBlur={onBlur}>
      <TooltipButton to={scaleUrl}>Scale</TooltipButton>
      <TooltipButton to={restartUrl}>Restart</TooltipButton>
      <TooltipButton to={stopUrl}>Stop</TooltipButton>
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
  onBlur: PropTypes.func
};

export default ServicesQuickActions;
