import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import DeploymentGroupsDeleteMutation from '@graphql/DeploymentGroupsDeleteMutation.gql';
import DeploymentGroupQuery from '@graphql/DeploymentGroup.gql';
import { Loader, ErrorMessage } from '@components/messaging';
import { DeploymentGroupDelete as DeploymentGroupDeleteComponent } from '@components/deployment-group';
import { Modal } from 'joyent-ui-toolkit';

class DeploymentGroupDelete extends Component {
  render() {
    if (this.props.loading) {
      return <Loader />;
    }
    if (this.props.error) {
      return (
        <ErrorMessage message="Oops, an error occured while loading your service." />
      );
    }

    const { deploymentGroup, deleteDeploymentGroups, history, match } = this.props;

    const handleCloseClick = evt => {
      const closeUrl = match.url.split('/').slice(0, -2).join('/');
      history.replace(closeUrl);
    };

    const handleConfirmClick = evt => {
      deleteDeploymentGroups(deploymentGroup.id).then(() => handleCloseClick());
    };

    return (
      <Modal width={460} onCloseClick={handleCloseClick}>
        <DeploymentGroupDeleteComponent
          deploymentGroup={deploymentGroup}
          onConfirmClick={handleConfirmClick}
          onCancelClick={handleCloseClick}
        />
      </Modal>
    );
  }
}

DeploymentGroupDelete.propTypes = {
  deploymentGroup: PropTypes.object,
  history: PropTypes.object,
  deleteDeploymentGroups: PropTypes.func.isRequired
};

const DeleteDeploymentGroupsGql = graphql(DeploymentGroupsDeleteMutation, {
  props: ({ mutate }) => ({
    deleteDeploymentGroups: deploymentGroupId =>
      mutate({
        variables: { ids: [deploymentGroupId] }
      })
  })
});

const DeploymentGroupGql = graphql(DeploymentGroupQuery, {
  options(props) {
    const params = props.match.params;
    const deploymentGroupSlug = params.deploymentGroup;
    return {
      variables: {
        deploymentGroupSlug
      }
    };
  },
  props: ({ data: { deploymentGroup, loading, error } }) => ({
    deploymentGroup,
    loading,
    error
  })
});

const DeploymentGroupDeleteWithData = compose(DeleteDeploymentGroupsGql, DeploymentGroupGql)(
  DeploymentGroupDelete
);

export default DeploymentGroupDeleteWithData;
