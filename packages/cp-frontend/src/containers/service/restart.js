import React from 'react';
import { ServiceRestart as ServiceRestartComponent } from '@components/service';
import { ServiceModal } from '@containers/service';

const ServiceRestart = props => (
  <ServiceModal {...props}>
    <ServiceRestartComponent />
  </ServiceModal>
);

export default ServiceRestart;
