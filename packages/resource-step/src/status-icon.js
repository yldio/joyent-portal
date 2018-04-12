import React from 'react';
import Flex, { FlexItem } from 'styled-flex-component';
import { Margin } from 'styled-components-spacing';
import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

import { H5 as BaseH5, TickIcon, CloseIcon } from 'joyent-ui-toolkit';

const H5 = styled(BaseH5)`
  color: ${props => props.theme[props.color]};
`;

const Frame = styled.div`
  border-radius: 50%;
  border: ${remcalc(2)} solid ${props => props.theme[props.color]};
  height: ${remcalc(20)};
  width: ${remcalc(20)};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = ({ children, ...props }) => <H5 {...props}>{children}</H5>;

export const StatusIcon = ({ children, color, Icon = null, ...props }) => (
  <Flex {...props}>
    {children ? <FlexItem>{children}</FlexItem> : null}
    <FlexItem>
      <Frame color={color}>
        <Icon />
      </Frame>
    </FlexItem>
  </Flex>
);

export const Saved = ({ inverted, children }) => {
  const color = inverted ? 'white' : 'greenDark';

  return (
    <StatusIcon color={color} Icon={() => <TickIcon fill={color} />}>
      <Margin right="1">
        <Label color="greenDark">Saved</Label>
      </Margin>
    </StatusIcon>
  );
};

export const Error = ({ children }) => (
  <StatusIcon color="redDark" Icon={() => <CloseIcon fill="redDark" />}>
    <Margin right="1">
      <Label color="redDark">Error</Label>
    </Margin>
  </StatusIcon>
);
