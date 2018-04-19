import React from 'react';
import { Margin } from 'styled-components-spacing';

import { ViewContainer } from 'joyent-ui-toolkit';

import { Meta, EventLogContainer } from '@components/summary';

export default () => (
  <ViewContainer main>
    <Margin top="5">
      <Margin bottom="5">
        <Meta name="delightful-stingray" />
      </Margin>
      <EventLogContainer />
    </Margin>
  </ViewContainer>
);
