import React from 'react';
import Flex from 'styled-flex-component';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';
import styled from 'styled-components';
import is from 'styled-is';

import { Divider, Small } from 'joyent-ui-toolkit';

const IsEmpty = styled(Margin)`
  + div:empty,
  + form:empty {
    margin-bottom: ${remcalc(40)};
  }
`;

const Container = styled.div`
  ${is('onClick')`
    cursor: pointer;
  `};
`;

export default ({ icon, children, ...rest }) => (
  <Container {...rest}>
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
  </Container>
);
