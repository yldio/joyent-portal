import React from 'react';
import Section from './section';
import { LayoutContainer } from '@components/layout';

export default (props) => (
  <Section {...props}>
    <LayoutContainer>
      <p>Project Feed</p>
    </LayoutContainer>
  </Section>
);
