import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import DeploymentGroupsQuery from '@graphql/DeploymentGroups.gql';

class DeploymentGroupList extends Component {

  render() {

    const {
      location,
      deploymentGroups,
      loading,
      error
    } = this.props;

    const deploymentGroupList =
      loading ? <p>Loading...</p> :
      error ? <p>Error!!!</p> :
      deploymentGroups.map((deploymentGroup, index) => {
        return (
          <p key={index}>
            <Link
              to={`${location.pathname}/${deploymentGroup.id}/services`}
            >
              {deploymentGroup.name}
            </Link>
          </p>)});

    return (
      <div>
        <div>
          <h2>Deployment Group List</h2>
        </div>
        { deploymentGroupList }
      </div>
    );
  }
}

const DeploymentGroupListWithData = graphql(DeploymentGroupsQuery, {
  props: ({ data: { deploymentGroups, loading, error }}) => ({
    deploymentGroups,
    loading,
    error
  })
})(DeploymentGroupList);

export default DeploymentGroupListWithData;
