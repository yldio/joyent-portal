import React from 'react';
import { ServiceDelete as ServiceDeleteComponent } from '@components/service';
import { ServiceModal } from '@containers/service';

const ServiceDelete = props => (
  <ServiceModal {...props}>
    <ServiceDeleteComponent />
  </ServiceModal>
);

export default ServiceDelete;
