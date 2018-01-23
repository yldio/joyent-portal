import React from 'react';
import styled from 'styled-components';
import { Margin, Padding } from 'styled-components-spacing';
import Flex from 'styled-flex-component';

import { H3, Card } from 'joyent-ui-toolkit';
import NoPackagesImage from '@assets/no-packages.svg';

const NoPackagesTitle = styled(H3)`
  color: ${props => props.theme.greyDark};
`;

export default ({ children }) => (
  <Card>
    <Padding all={6}>
      <Flex alignCenter justifyCenter column>
        <Margin bottom={2}>
          <img src={NoPackagesImage} alt="No packages were found" />
        </Margin>
        <NoPackagesTitle>{children}</NoPackagesTitle>
      </Flex>
    </Padding>
  </Card>
);
