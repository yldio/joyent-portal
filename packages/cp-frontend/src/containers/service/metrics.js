import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import ServiceMetricsQuery from '@graphql/ServiceMetrics.gql';
import { withNotFound, GqlPaths } from '@containers/navigation';
import { LayoutContainer } from '@components/layout';
import { Title } from '@components/navigation';
import { ServiceMetrics as ServiceMetricsComponent } from '@components/service';
import { Button } from 'joyent-ui-toolkit';
import { Loader, ErrorMessage } from '@components/messaging';
import { processInstancesMetrics } from '@state/selectors';
import get from 'lodash.get';

import {
  withServiceMetricsPolling,
  withServiceMetricsGql
} from '@containers/metrics';

// 'width' of graph, i.e. total duration of time it'll display and truncate data to
// amount of data we'll need to initially fetch
const GraphDurationSeconds = 90;

const ServiceMetrics = ({ service, loading, error }) => {
  const _title = <Title>Metrics</Title>;

  if (loading || !service) {
    return (
      <LayoutContainer center>
        {_title}
        <Loader />
      </LayoutContainer>
    );
  }

  if (error) {
    return (
      <LayoutContainer>
        {_title}
        <ErrorMessage
          title="Ooops!"
          message="An error occurred while loading your metrics."
        />
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer>
      {_title}
      <ServiceMetricsComponent
        metricsData={processInstancesMetrics(service.instances)}
        graphDurationSeconds={GraphDurationSeconds}
      />
    </LayoutContainer>
  );
};

export default compose(
  withServiceMetricsGql({
    gqlQuery: ServiceMetricsQuery,
    graphDurationSeconds: GraphDurationSeconds,
    updateIntervalSeconds: 15,
    variables: ({ match }) => ({ serviceSlug: match.params.service }),
    props: ({ deploymentGroup, loading, error }) => ({
      deploymentGroup,
      service: get(deploymentGroup || {}, 'services', [])[0],
      loading,
      error
    })
  }),
  withServiceMetricsPolling({ pollingInterval: 1000 }),
  withNotFound([GqlPaths.DEPLOYMENT_GROUP, GqlPaths.SERVICES])
)(ServiceMetrics);
