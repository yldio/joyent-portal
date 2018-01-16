import React, { Fragment } from 'react';
import Flex from 'styled-flex-component';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';
import styled from 'styled-components';

import { Divider, Small } from 'joyent-ui-toolkit';

const IsEmpty = styled(Margin)`
  + div:empty,
  + form:empty {
    margin-bottom: ${remcalc(40)};
  }
`;

export default ({ icon, children }) => (
  <Fragment>
    <Flex>
      <Margin right={1}>
        <Flex alignCenter full>
          {icon}
        </Flex>
      </Margin>
      <Small noMargin>{children}</Small>
    </Flex>
    <IsEmpty top={1} bottom={3}>
      <Divider height={remcalc(1)} />
    </IsEmpty>
  </Fragment>
);
