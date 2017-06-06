import React from 'react';
import { ServiceStop as ServiceStopComponent } from '@components/service';
import { ServiceModal } from '@containers/service';

const ServiceStop = props => (
  <ServiceModal {...props}>
    <ServiceStopComponent />
  </ServiceModal>
);

export default ServiceStop;
