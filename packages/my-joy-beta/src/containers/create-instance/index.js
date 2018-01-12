import React from 'react';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';

import { ViewContainer, H2, Button, Divider } from 'joyent-ui-toolkit';

import Name from '@containers/create-instance/name';
import Image from '@containers/create-instance/image';
import Metadata from '@containers/create-instance/metadata';
import Tags from '@containers/create-instance/tags';
import Package from '@containers/create-instance/package';
import Networks from '@containers/create-instance/networks';
import Affinity from '@containers/create-instance/affinity';
import CNS from '@containers/create-instance/cns';

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
    <Margin bottom={4}>
      <Networks {...props} expanded={step === 'networks'} />
    </Margin>
    <Margin bottom={4}>
      <CNS {...props} expanded={step === 'cns'} />
    </Margin>
    <Margin bottom={4}>
      <Affinity {...props} expanded={step === 'affinity'} />
    </Margin>
    {step === 'done' || step === 'affinity' ? (
      <Divider height={remcalc(1)} />
    ) : null}
    <Margin top={7} bottom={10}>
      <Button disabled={step !== 'done'} onClick={() => console.log('DONE')}>
        Deploy
      </Button>
    </Margin>
  </ViewContainer>
);
