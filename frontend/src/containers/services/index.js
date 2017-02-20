import React from 'react';
import { connect } from 'react-redux';
import EmptyServices from '@components/empty/services';
import PropTypes from '@root/prop-types';
import ServiceItem from '@components/service/item';
import ServiceViewToggle from '@components/service/view-toggle';
import Row from '@ui/components/row';
import Column from '@ui/components/column';
import { H2 } from '@ui/components/base-elements';

import {
  orgByIdSelector,
  projectByIdSelector,
  servicesByProjectIdSelector,
  servicesForTopologySelector
} from '@state/selectors';

const Services = ({
  org = {},
  project = {},
  services = [],
  servicesForTopology = []
}) => {
  const empty = services.length ? null : (
    <EmptyServices />
  );

  const serviceList = services.map((service) => (
    <ServiceItem
      key={service.uuid}
      org={org.id}
      project={project.id}
      service={service}
    />
  ));

  return (
    <Row>
      <Column xs={12}>
        <H2>Services</H2>
        <ServiceViewToggle />
        {empty}
        {serviceList}
      </Column>
    </Row>
  );
};

Services.propTypes = {
  org: PropTypes.org,
  project: PropTypes.project,
  services: React.PropTypes.arrayOf(PropTypes.service),
  servicesForTopology: React.PropTypes.arrayOf(React.PropTypes.object)
};

const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.projectId)(state),
  services: servicesByProjectIdSelector(match.params.projectId)(state),
  servicesForTopology:
    servicesForTopologySelector(match.params.projectId)(state)
});

export default connect(
  mapStateToProps
)(Services);
