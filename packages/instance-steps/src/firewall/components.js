import React from 'react';
import Flex, { FlexItem } from 'styled-flex-component';
import { Margin } from 'styled-components-spacing';

import { H3, TickIcon } from 'joyent-ui-toolkit';
import { StatusIcon, ErrorIcon } from 'joyent-ui-resource-step';

export const Preview = ({ enabled }) => (
  <Flex>
    <FlexItem>
      <Margin right="2">
        {enabled ? (
          <StatusIcon
            fill="green"
            border="greenDark"
            Icon={() => <TickIcon fill="white" />}
          />
        ) : (
          <ErrorIcon noLabel inverted />
        )}
      </Margin>
    </FlexItem>
    <FlexItem>
      <H3>
        {enabled ? 'Firewall rules are enabled' : 'Firewall rules are disabled'}
      </H3>
    </FlexItem>
  </Flex>
);
