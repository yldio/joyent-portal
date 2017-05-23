import React from 'react';
import Tooltip, { TooltipButton, TooltipDivider } from '@ui/components/tooltip';

const ServicesTooltip = ({
  show,
  position,
  data,
  ...rest
}) => {
  if(!show) {
    return null;
  }
  return (
    <Tooltip {...position} {...rest}>
      <li>
        <TooltipButton>Scale</TooltipButton>
      </li>
      <li>
        <TooltipButton>Start</TooltipButton>
      </li>
      <li>
        <TooltipButton>Restart</TooltipButton>
      </li>
      <TooltipDivider />
      <li>
        <TooltipButton>Stop</TooltipButton>
      </li>
      <li>
        <TooltipButton>Delete</TooltipButton>
      </li>
    </Tooltip>
  );
};

ServicesTooltip.propTypes = {
  data: React.PropTypes.object,
  position: React.PropTypes.object,
  show: React.PropTypes.bool
};

export default ServicesTooltip;
