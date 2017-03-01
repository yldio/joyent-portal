import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '@root/prop-types';
import { TopologyGraph } from '@ui/components/topology';
import ServicesView from '@components/services/view';

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
    <ServicesView {...props}>
      <TopologyGraph services={services} />
    </ServicesView>
  );
};

Services.propTypes = {
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
  services: servicesForTopologySelector(match.params.projectId)(state)
});

export default connect(
  mapStateToProps
)(Services);
