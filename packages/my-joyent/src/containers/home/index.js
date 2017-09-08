import React from 'react';
import { LayoutContainer } from '@components/layout';
import { Home } from '@components/home';

const HomeHOC = () => (
  <LayoutContainer>
    <Home />
  </LayoutContainer>
);

export default HomeHOC;
