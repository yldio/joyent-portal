import React from 'react';
import styled from 'styled-components';
import { Margin, Padding } from 'styled-components-spacing';
import Flex from 'styled-flex-component';
import is, { isNot } from 'styled-is';
import remcalc from 'remcalc';

import { H3, Card } from 'joyent-ui-toolkit';
import { EmptyState } from 'joyent-icons';

const NoPackagesTitle = styled(H3)`
  color: ${props => props.theme.greyDark};
  text-align: center;
`;

const FullWidthCard = styled(Card)`
  width: calc(100% - ${remcalc(2)});
  ${is('transparent')`
    background: transparent;
  `};
  ${isNot('borderTop')`
    border-top: none;
  `};
`;

export default ({ children, ...rest }) => (
  <FullWidthCard {...rest}>
    <Padding all={6}>
      <Flex alignCenter justifyCenter column>
        <Margin bottom="2">
          <EmptyState />
        </Margin>
        <NoPackagesTitle>{children}</NoPackagesTitle>
      </Flex>
    </Padding>
  </FullWidthCard>
);
