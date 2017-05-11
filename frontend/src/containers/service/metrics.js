import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import MetricsQuery from '@graphql/Metrics.gql';

class Metrics extends Component {

  render() {

    const {
      instances,
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

const MetricsWithData = graphql(MetricsQuery, {
  options(props) {
    return {
      variables: {
        deploymentGroupId: props.match.params.deploymentGroup
      }
    };
  },
  props: ({ data: { deploymentGroup, loading, error } }) => {

    const instances = deploymentGroup && deploymentGroup.services ?
      deploymentGroup.services.reduce((instances, service) =>
          instances.concat(service.instances), []) : null;

    const metrics = instances ? instances.reduce((metrics, instance) =>
      metrics.concat(instance.metrics.map((m) =>
        Object.assign({}, m, {
          instance: {
            uuid: instance.uuid,
            name: instance.name
          }}))), []) : null;

    return ({
      instances,
      metrics,
      loading,
      error
    })
  }
})(Metrics)

export default MetricsWithData;
