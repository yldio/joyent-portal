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
  // eslint-disable-next-line max-len
  const scaleLink = 'https://projects.invisionapp.com/share/YDAKI8CW4#/screens/221841542_Deployed_Services_1-8';
  // eslint-disable-next-line max-len
  const metricsLink = `/${data.orgId}/projects/${data.projectId}/services/${data.serviceId}/metrics`;
  return (
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
        <TooltipButton to={metricsLink}>
          Setup metrics
        </TooltipButton>
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
