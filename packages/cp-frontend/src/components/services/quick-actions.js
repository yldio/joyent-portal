import React from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  TooltipButton,
  TooltipDivider,
  TooltipList
} from 'joyent-ui-toolkit';

const ServicesQuickActions = ({
  show,
  position,
  service,
  onBlur = () => {},
  onRestartClick = () => {},
  onStopClick = () => {},
  onStartClick = () => {},
  onScaleClick = () => {},
  onDeleteClick = () => {}
}) => {
  if (!show) {
    return null;
  }

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
    status === 'RUNNING' ? null : (
      <li>
        <TooltipButton onClick={handleStartClick} disabled={disabled}>
          Start
        </TooltipButton>
      </li>
    );

  const stopService =
    status === 'STOPPED' ? null : (
      <li>
        <TooltipButton onClick={handleStopClick} disabled={disabled}>
          Stop
        </TooltipButton>
      </li>
    );

  return (
    <Tooltip {...position} onBlur={onBlur}>
      <TooltipList>
        <li>
          <TooltipButton onClick={handleScaleClick} disabled={disabled}>
            Scale
          </TooltipButton>
        </li>
        <li>
          <TooltipButton onClick={handleRestartClick} disabled={disabled}>
            Restart
          </TooltipButton>
        </li>
        {startService}
        {stopService}
        <TooltipDivider />
        <li>
          <TooltipButton onClick={handleDeleteClick} disabled={disabled}>
            Delete
          </TooltipButton>
        </li>
      </TooltipList>
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
