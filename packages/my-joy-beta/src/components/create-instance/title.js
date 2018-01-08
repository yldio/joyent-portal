import React, { Fragment } from 'react';
import Flex from 'styled-flex-component';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';

import { Divider, P } from 'joyent-ui-toolkit';

export default ({ icon, label }) => (
  <Fragment>
    <Flex>
      <Margin right={1}>{icon}</Margin>
      <P>{label}</P>
    </Flex>
    <Margin top={1} bottom={3}>
      <Divider height={remcalc(1)} />
    </Margin>
  </Fragment>
);
