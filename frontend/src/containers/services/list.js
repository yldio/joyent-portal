import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '@root/prop-types';
import ServiceItem from '@components/service/item';
import UnmanagedInstances  from '@components/services/unmanaged-instances';

import {
  orgByIdSelector,
  projectByIdSelector,
  servicesByProjectIdSelector
} from '@state/selectors';

const Services = (props) => {
  const {
    org = {},
    project = {},
    services = []
  } = props;

  const instances = 5;
  const serviceList = services.map((service) => (
    <ServiceItem
      key={service.uuid}
      org={org.id}
      project={project.id}
      service={service}
    />
  ));

  return (
    <div>
      { serviceList }
      { instances && <UnmanagedInstances instances={instances} /> }
    </div>
  );
};

Services.propTypes = {
  org: PropTypes.org,
  project: PropTypes.project,
  services: React.PropTypes.arrayOf(PropTypes.service)
};

const mapStateToProps = (state, {
  match = {
    params: {}
  },
  push
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.projectId)(state),
  services: servicesByProjectIdSelector(match.params.projectId)(state)
});

export default connect(
  mapStateToProps
)(Services);
