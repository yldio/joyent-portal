import React from 'react';
import Flex from 'styled-flex-component';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';
import styled from 'styled-components';
import is from 'styled-is';

import { Divider, Small } from 'joyent-ui-toolkit';

const Container = styled.div`
  ${is('onClick')`
    cursor: pointer;
  `};
`;

export default ({ icon, children, invalid, collapsed = true, ...rest }) => (
  <Container {...rest}>
    <Flex>
      <Margin right={1}>
        <Flex alignCenter full>
          {icon}
        </Flex>
      </Margin>
      <Small noMargin>{children}</Small>
    </Flex>
    <Margin top={1} bottom={collapsed ? 7 : 3}>
      <Divider height={remcalc(1)} error={invalid} />
    </Margin>
  </Container>
);
