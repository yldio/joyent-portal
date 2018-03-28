import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import { Arrow } from '../icons';
import Popover, { Container, Target } from '../popover';
import BaseButton from './';

const DropdownButton = styled(BaseButton)`
  padding: 0;
  min-width: ${remcalc(47)};
  max-width: ${remcalc(47)};
  width: ${remcalc(47)};
`;

const InnerContainer = styled.div`
  padding: ${remcalc(15)} ${remcalc(18)};
`;

export default ({ children, ...rest }) => (
  <DropdownButton {...rest}>
    <Container clickable>
      <Target>
        <InnerContainer>
          <Arrow />
        </InnerContainer>
      </Target>
      <Popover placement="bottom">{children}</Popover>
    </Container>
  </DropdownButton>
);
