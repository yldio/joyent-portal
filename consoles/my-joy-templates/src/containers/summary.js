import React from 'react';
import { Margin } from 'styled-components-spacing';

import { ViewContainer } from 'joyent-ui-toolkit';

import { Meta, Template } from '@components/summary';

export default ({ match }) => (
  <ViewContainer main>
    <Margin top="5">
      <Margin bottom="5">
        <Meta id={match.params.template} name="compassionate-trout" />
      </Margin>
      <Template />
    </Margin>
  </ViewContainer>
);
