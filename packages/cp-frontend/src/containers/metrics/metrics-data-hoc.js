import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import moment from 'moment';

export const MetricNames = [
  'AVG_MEM_BYTES',
  'AVG_LOAD_PERCENT',
  'AGG_NETWORK_BYTES'
];

export const withServiceMetricsPolling = ({
  pollingInterval = 1000 // in milliseconds
}) => {
  return (WrappedComponent) => {

    return class extends Component {

      componentDidMount() {

        this._poll = setInterval(() => {
          const {
            loading,
            error,
            service,
            fetchMoreMetrics
          } = this.props;

          if(!loading && !error && service) {
            const previousEnd = service.instances[0].metrics[0].end;
            fetchMoreMetrics(previousEnd);
          }

        }, pollingInterval); // TODO this is the polling interval - think about amount is the todo I guess...
      }

      componentWillUnmount() {
        clearInterval(this._poll);
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }
  }
}

export const withServiceMetricsGql = ({
  gqlQuery,
  graphDurationSeconds,
  updateIntervalSeconds
}) => {

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

  return graphql(gqlQuery, {
    options(props) {
      const params = props.match.params;
      const deploymentGroupSlug = params.deploymentGroup;
      const serviceSlug = params.service;

      // this is potentially prone to overfetching if we already have data within timeframe and we leave the page then come back to it
      const end = moment();
      const start = moment(end).subtract(graphDurationSeconds + updateIntervalSeconds, 'seconds'); // TODO initial amount of data we wanna get - should be the same as what we display + 15 secs

      return {
        variables: {
          deploymentGroupSlug,
          serviceSlug,
          metricNames: MetricNames,
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
}
