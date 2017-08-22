import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { serviceMetricsParamsForGQLRequestSelector } from '@state/selectors';

const metricTypes = [
  'AVG_MEM_BYTES',
  'AVG_LOAD_PERCENT',
  'AGG_NETWORK_BYTES'
];

const ServiceMetrics = ({

}) => {
  return <p>METRICS CONTAINER</p>;
};

const connectMetrics = connect(
  (state, ownProps) => {
    const params = ownProps.match.params;
    const deploymentGroupSlug = params.deploymentGroup;
    const serviceSlug = params.service;
    const gqlQueryParams = serviceMetricsParamsForGQLRequestSelector(
      deploymentGroupSlug,
      serviceSlug
    )(state);

    console.log('gqlQueryParams = ', gqlQueryParams);

    /* if ((deploymentGroupSlug || '').match(/^~/)) {
      return {};
    }

    const sections = serviceSlug
      ? state.ui.sections.services
      : deploymentGroupSlug ? state.ui.sections.deploymentGroups : null; */

    return {};
  },
  dispatch => ({})
);

export default connectMetrics(ServiceMetrics);
