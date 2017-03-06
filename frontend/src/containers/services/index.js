import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '@root/prop-types';
import ServicesView from '@components/services/view';

import {
  orgByIdSelector,
  projectByIdSelector,
  servicesForTopologySelector
} from '@state/selectors';

const Services = (props) => {
  const {
    org = {},
    project = {},
    services = [],
    children,
    path,
    push
  } = props;

  const toggleValue = path === '/:org/projects/:projectId/services' ?
    'topology' : 'list';

  const onToggle = (value) => {
    const path = `/${org.id}/projects/${project.id}/services${
      value === 'list' ? '/list' : ''
    }`;
    push(path);
  };

  return (
    <ServicesView
      onToggle={onToggle}
      toggleValue={toggleValue}
      services={services}
    >
      {children}
    </ServicesView>
  );
};

Services.propTypes = {
  children: React.PropTypes.node,
  org: PropTypes.org,
  path: React.PropTypes.string.isRequired,
  project: PropTypes.project,
  push: React.PropTypes.func.isRequired,
  services: React.PropTypes.arrayOf(PropTypes.service)
};

const mapStateToProps = (state, {
  match = {
    params: {},
    path: ''
  },
  push
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.projectId)(state),
  services: servicesForTopologySelector(match.params.projectId)(state),
  path: match.path,
  push: push
});

export default connect(
  mapStateToProps
)(Services);
