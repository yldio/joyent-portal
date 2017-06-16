import { graphql } from 'react-apollo';
import InstancesQuery from '@graphql/Instances.gql';

export default graphql(InstancesQuery, {
  options(props) {
    const params = props.match.params;
    const deploymentGroupSlug = params.deploymentGroup;
    const serviceSlug = params.service;
    return {
      variables: {
        deploymentGroupSlug,
        serviceSlug
      }
    };
  },
  props: ({ data: { deploymentGroup, loading, error } }) => ({
    service: deploymentGroup &&
      deploymentGroup.services &&
      deploymentGroup.services.length
      ? deploymentGroup.services[0]
      : null,
    loading,
    error
  })
});
