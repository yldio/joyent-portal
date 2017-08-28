import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import ServiceMetricsQuery from '@graphql/ServiceMetrics.gql';
import { withNotFound, GqlPaths } from '@containers/navigation';
import { LayoutContainer } from '@components/layout';
import { ServiceMetrics as ServiceMetricsComponent } from '@components/service';
import { Button } from 'joyent-ui-toolkit';
import { Loader, ErrorMessage } from '@components/messaging';

import {
  withServiceMetricsPolling,
  withServiceMetricsGql
} from '@containers/metrics';

// 'width' of graph, i.e. total duration of time it'll display and truncate data to
// amount of data we'll need to initially fetch
const GraphDurationSeconds = 90;

const ServiceMetrics = ({ service, loading, error }) => {
  if (loading || !service) {
    return (
      <LayoutContainer center>
        <Loader />
      </LayoutContainer>
    );
  }

  if (error) {
    return (
      <LayoutContainer>
        <ErrorMessage
          title="Ooops!"
          message="An error occurred while loading your metrics."
        />
      </LayoutContainer>
    );
  }

  // metricsData should prob be an array rather than an object
  const metricsData = service.instances.reduce((metrics, instance) => {
    // gather metrics of instances according to type
    instance.metrics.forEach(instanceMetrics => {
      if (!metrics[instanceMetrics.name]) {
        metrics[instanceMetrics.name] = [];
      }
      metrics[instanceMetrics.name].push(instanceMetrics);
    });
    return metrics;
  }, {});

  return (
    <LayoutContainer>
      <ServiceMetricsComponent
        metricsData={metricsData}
        graphDurationSeconds={GraphDurationSeconds}
      />
    </LayoutContainer>
  );
};

export default compose(
  withServiceMetricsGql({
    gqlQuery: ServiceMetricsQuery,
    graphDurationSeconds: GraphDurationSeconds,
    updateIntervalSeconds: 15
  }),
  withServiceMetricsPolling({ pollingInterval: 1000 }),
  withNotFound([GqlPaths.DEPLOYMENT_GROUP, GqlPaths.SERVICES])
)(ServiceMetrics);

/*
const metricNames = [
  'AVG_MEM_BYTES',
  'AVG_LOAD_PERCENT',
  'AGG_NETWORK_BYTES'
];

class ServiceMetrics extends Component {

  componentDidMount() {

    this._poll = setInterval(() => {
      const {
        loading,
        deploymentGroup,
        service,
        fetchMoreMetrics
      } = this.props;

      if(!loading && service) {
        const previousEnd = service.instances[0].metrics[0].end;
        fetchMoreMetrics(previousEnd);
      }

    }, 1000); // TODO this is the polling interval - think about amount is the todo I guess...
  }

  componentWillUnmount() {
    clearInterval(this._poll);
  }

  render () {

    const {
      service,
      loading,
      error,
      fetchMoreMetrics
    } = this.props;

    if (loading || !service) {
      return (
        <LayoutContainer center>
          <Loader />
        </LayoutContainer>
      );
    }

    if (error) {
      return (
        <LayoutContainer>
          <ErrorMessage
            title="Ooops!"
            message="An error occurred while loading your metrics."
          />
        </LayoutContainer>
      );
    }

    // metricsData should prob be an array rather than an object
    const metricsData = service.instances.reduce((metrics, instance) => {
      // gather metrics of instances according to type
      instance.metrics.forEach((instanceMetrics) => {
        if(!metrics[instanceMetrics.name]) {
          metrics[instanceMetrics.name] = [];
        }
        metrics[instanceMetrics.name].push(instanceMetrics);
      });
      return metrics;
    }, {});

    return (
      <LayoutContainer>
        <ServiceMetricsComponent metricsData={metricsData} />
      </LayoutContainer>
    );
  }
};

const getPreviousMetrics = (previousResult, serviceId, instanceId, metricName) => {
  return previousResult.deploymentGroup.services
    .find(s => s.id === serviceId).instances
    .find(i => i.id === instanceId).metrics
    .find(m => m.name === metricName).metrics;
}

const getNextResult = (previousResult, fetchNextResult) => {
  const deploymentGroup = fetchNextResult.deploymentGroup;
  const nextResult = {
    deploymentGroup: {
      ...deploymentGroup,
      services: deploymentGroup.services.map(service => ({
        ...service,
        instances: service.instances.map(instance => ({
          ...instance,
          metrics: instance.metrics.map(metric => ({
            ...metric,
            metrics: getPreviousMetrics(
                previousResult,
                service.id,
                instance.id,
                metric.name
              ).concat(metric.metrics)
          }))
        }))
      }))
    }
  }
  return nextResult;
}

const ServiceMetricsGql = graphql(ServiceMetricsQuery, {
  options(props) {
    const params = props.match.params;
    const deploymentGroupSlug = params.deploymentGroup;
    const serviceSlug = params.service;

    // this is potentially prone to overfetching if we already have data within timeframe and we leave the page then come back to it
    const end = moment();
    const start = moment(end).subtract(105, 'seconds'); // TODO initial amount of data we wanna get - should be the same as what we display + 15 secs

    return {
      variables: {
        deploymentGroupSlug,
        serviceSlug,
        metricNames,
        start: start.utc().format(),
        end: end.utc().format()
      }
    };
  },
  props: ({ data: { deploymentGroup, loading, error, variables, fetchMore }}) => {

    const fetchMoreMetrics = (previousEnd) => {
      fetchMore({
        variables: {
          ...variables,
          start: previousEnd,
          end: moment().utc().format()
        },
        updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
          return getNextResult(previousResult, fetchMoreResult);
        }
      });
    }
    return ({
      deploymentGroup,
      service: !loading && deploymentGroup ? deploymentGroup.services[0] : null,
      loading,
      error,
      fetchMoreMetrics
    })
  }
});

export default compose(
  ServiceMetricsGql,
  withNotFound([
    GqlPaths.DEPLOYMENT_GROUP,
    GqlPaths.SERVICES
  ])
)(ServiceMetrics); */
