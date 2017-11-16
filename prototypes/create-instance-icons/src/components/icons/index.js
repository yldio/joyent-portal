import React from 'react';
import styled from 'styled-components';

import CpuIcon from '../../assets/cpu.svg';
import GpIcon from '../../assets/gp.svg';
import MoIcon from '../../assets/mo.svg';
import SoIcon from '../../assets/so.svg';
import { TooltipContainer, TooltipTarget, Tooltip } from 'joyent-ui-toolkit';

import { Margin } from 'styled-components-spacing';

const IconWrapper = styled.div`
  float: left;
`;

const Flex = styled.div`
  display: flex;
`;

export const returnIcon = group => {
  let icon;
  switch (group) {
    case 'Compute Optimized':
      icon = <CpuIcon width="24" height="24" />;
      break;
    case 'General Purpose':
      icon = <GpIcon width="24" height="24" />;
      break;
    case 'Memory Optimized':
      icon = <MoIcon width="24" height="24" />;
      break;
    case 'Storage Optimized':
      icon = <SoIcon width="24" height="24" />;
      break;
    default:
      icon = <GpIcon width="24" height="24" />;
  }

  return (
    <IconWrapper>
      <TooltipContainer hoverable>
        <TooltipTarget>
          <Margin right={1}>
            <Flex>{icon}</Flex>
          </Margin>
        </TooltipTarget>
        <Tooltip placement="bottom">{group}</Tooltip>
      </TooltipContainer>
    </IconWrapper>
  );
};
