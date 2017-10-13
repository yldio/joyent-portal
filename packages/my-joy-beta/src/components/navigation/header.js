import React from 'react';
import { Link } from 'react-router-dom';

import {
  Header,
  HeaderBrand,
  ViewContainer,
  TritonIcon
} from 'joyent-ui-toolkit';

export default () => (
  <Header>
    <ViewContainer>
      <HeaderBrand>
        <Link to="/">
          <TritonIcon alt="Triton" />
        </Link>
      </HeaderBrand>
    </ViewContainer>
  </Header>
);
