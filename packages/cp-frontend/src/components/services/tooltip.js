// import React from 'react';
import PropTypes from 'prop-types';

// import Tooltip, { TooltipButton, TooltipDivider } from 'joyent-ui-toolkit';

const ServicesTooltip = ({ show, position, data, ...rest }) => {
  if (!show) {
    return null;
  }

  return null;

  // return (
  //   <Tooltip {...position} {...rest}>
  //     <li>
  //       <TooltipButton>Scale</TooltipButton>
  //     </li>
  //     <li>
  //       <TooltipButton>Start</TooltipButton>
  //     </li>
  //     <li>
  //       <TooltipButton>Restart</TooltipButton>
  //     </li>
  //     <TooltipDivider />
  //     <li>
  //       <TooltipButton>Stop</TooltipButton>
  //     </li>
  //     <li>
  //       <TooltipButton>Delete</TooltipButton>
  //     </li>
  //   </Tooltip>
  // );
};

ServicesTooltip.propTypes = {
  data: PropTypes.object,
  position: PropTypes.object,
  show: PropTypes.bool
};

export default ServicesTooltip;
