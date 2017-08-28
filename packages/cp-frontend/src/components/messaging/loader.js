import React from 'react';
import styled from 'styled-components';

import { P, StatusLoader } from 'joyent-ui-toolkit';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;

  flex: 1 0 auto;
  align-self: stretch;
`;

const Loader = styled(StatusLoader)`
  flex: 0 0 auto;
  align-self: stretch;
`;

const Msg = P.extend`
  flex: 0 0 auto;
  align-self: stretch;
  text-align: center;
  margin-bottom: 0;
`;

export default ({ msg }) => (
  <Container>
    <Loader />
    <Msg>{msg || 'Loading...'}</Msg>
  </Container>
);
