import React from 'react';
import Tooltip, { TooltipButton, TooltipDivider } from '@ui/components/tooltip';

// eslint-disable-next-line max-len
const scaleLink = 'https://projects.invisionapp.com/share/YDAKI8CW4#/screens/221841542_Deployed_Services_1-8';

const ServicesTooltip = ({
  show,
  position,
  ...rest
}) => show ? (
  <Tooltip {...position} {...rest}>
    <li>
      <TooltipButton href={scaleLink}>
        Scale
      </TooltipButton>
    </li>
    <li>
      <TooltipButton>Rollback</TooltipButton>
    </li>
    <li>
      <TooltipButton>Reprovision</TooltipButton>
    </li>
    <li>
      <TooltipButton>Transfer</TooltipButton>
    </li>
    <li>
      <TooltipButton>Setup metrics</TooltipButton>
    </li>
    <TooltipDivider />
    <li>
      <TooltipButton>Stop</TooltipButton>
    </li>
    <li>
      <TooltipButton>Delete</TooltipButton>
    </li>
  </Tooltip>
) : null;

ServicesTooltip.propTypes = {
  position: React.PropTypes.object,
  show: React.PropTypes.bool
};

export default ServicesTooltip;
