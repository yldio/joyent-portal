import React from 'react';
import { Margin } from 'styled-components-spacing';

import { ViewContainer, H2 } from 'joyent-ui-toolkit';

import Name from '@containers/create-instance/name';
import Image from '@containers/create-instance/image';
import Metadata from '@containers/create-instance/metadata';
import Tags from '@containers/create-instance/tags';
import Package from '@containers/create-instance/package';

export default ({ step, ...props }) => (
  <ViewContainer>
    <Margin top={4} bottom={4}>
      <H2>Create Instances</H2>
    </Margin>
    <Margin bottom={4}>
      <Name {...props} expanded={step === 'name'} />
    </Margin>
    <Margin bottom={4}>
      <Image {...props} expanded={step === 'image'} />
    </Margin>
    <Margin bottom={4}>
      <Package {...props} expanded={step === 'package'} />
    </Margin>
    <Margin bottom={4}>
      <Tags {...props} expanded={step === 'tags'} />
    </Margin>
    <Margin bottom={4}>
      <Metadata {...props} expanded={step === 'metadata'} />
    </Margin>
  </ViewContainer>
);
