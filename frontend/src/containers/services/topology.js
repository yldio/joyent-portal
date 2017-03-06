import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '@root/prop-types';
import { TopologyGraph } from '@ui/components/topology';

import {
  orgByIdSelector,
  projectByIdSelector,
  servicesForTopologySelector
} from '@state/selectors';

const Services = (props) => {
  const {
    services = []
  } = props;

  return (
    <TopologyGraph services={services} />
  );
};

Services.propTypes = {
  services: React.PropTypes.arrayOf(PropTypes.service)
};

const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.projectId)(state),
  services: servicesForTopologySelector(match.params.projectId)(state)
});

export default connect(
  mapStateToProps
)(Services);
