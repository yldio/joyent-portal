import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import CpuIcon from '../../assets/cpu.svg';
import GpIcon from '../../assets/gp.svg';
import MoIcon from '../../assets/mo.svg';
import SoIcon from '../../assets/so.svg';
import { TooltipContainer, TooltipTarget, Tooltip } from 'joyent-ui-toolkit';

const IconWrapper = styled.div`
  float: left;
  margin-right: ${remcalc(12)};
`;

export const returnIcon = group => {
  let icon;
  switch (group) {
    case 'Compute Optimized':
      icon = <CpuIcon />;
      break;
    case 'General Purpose':
      icon = <GpIcon />;
      break;
    case 'Memory Optimized':
      icon = <MoIcon />;
      break;
    case 'Storage Optimized':
      icon = <SoIcon />;
      break;
    default:
      icon = <GpIcon />;
  }

  return (
    <IconWrapper>
      <TooltipContainer hoverable>
        <TooltipTarget>{icon}</TooltipTarget>
        <Tooltip placement="bottom">
          {group}
        </Tooltip>
      </TooltipContainer>
    </IconWrapper>
  );
};
