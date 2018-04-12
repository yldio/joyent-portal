import React from 'react';
import Flex, { FlexItem } from 'styled-flex-component';
import { Margin } from 'styled-components-spacing';

import { H3, TickIcon } from 'joyent-ui-toolkit';
import { StatusIcon } from 'joyent-ui-resource-step';

export const Preview = ({ enabled }) => (
  <Flex>
    <FlexItem>
      <Margin right={2}>
        <StatusIcon
          fill="green"
          border="greenDark"
          Icon={() => <TickIcon fill="white" />}
        />
      </Margin>
    </FlexItem>
    <FlexItem>
      <H3>{enabled ? 'Firewall enabled' : 'Firewall not enabled'}</H3>
    </FlexItem>
  </Flex>
);
