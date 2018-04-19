import React from 'react';

import Step, {
  Header as StepHeader,
  Description as StepDescription
} from 'joyent-ui-resource-step';

import { InstanceTypeIcon } from 'joyent-ui-toolkit';

export default ({ expanded, optional, saved }) => (
  <Step expanded={expanded} optional={optional} saved={saved} name="image">
    <StepHeader icon={<InstanceTypeIcon />}>Instance type and image</StepHeader>
    <StepDescription href="https://docs.joyent.com/images">
      Hardware virtual machines are generally used for non-containerized
      applications. Infrastructure containers are generally for running any
      Linux image on secure, bare metal containers.
    </StepDescription>
  </Step>
);
