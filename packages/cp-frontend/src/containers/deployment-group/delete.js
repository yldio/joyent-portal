import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import DeploymentGroupDeleteMutation from '@graphql/DeploymentGroupDeleteMutation.gql';
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

    const { deploymentGroup, deleteDeploymentGroup, history, match } = this.props;

    const handleCloseClick = evt => {
      const closeUrl = match.url.split('/').slice(0, -2).join('/');
      history.replace(closeUrl);
    };

    const handleConfirmClick = evt => {
      console.log('deploymentGroup = ', deploymentGroup);
      deleteDeploymentGroup(deploymentGroup.id).then(() => handleCloseClick());
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
  deleteDeploymentGroup: PropTypes.func.isRequired
};

const DeleteDeploymentGroupGql = graphql(DeploymentGroupDeleteMutation, {
  props: ({ mutate }) => ({
    deleteDeploymentGroup: deploymentGroupId =>
      mutate({
        variables: { id: deploymentGroupId }
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

const DeploymentGroupDeleteWithData = compose(DeleteDeploymentGroupGql, DeploymentGroupGql)(
  DeploymentGroupDelete
);

export default DeploymentGroupDeleteWithData;
