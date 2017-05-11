import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import SingleMetricsQuery from '@graphql/SingleMetrics.gql';

class SingleMetrics extends Component {

  render() {

    const {
      metrics
    } = this.props;

    return (
      <div>
        <div>
          <h4>Metrics</h4>
          <p>{JSON.stringify(metrics)}</p>
        </div>
      </div>
    );
  }
}

const SingleMetricsWithData = graphql(SingleMetricsQuery, {
  options: {
    pollInterval: 15*1000
  },
  props: ({ data: { instanceMetric, loading, error } }) => ({
    metrics: instanceMetric,
    loading,
    error
  })
})(SingleMetrics)

export default SingleMetricsWithData;
