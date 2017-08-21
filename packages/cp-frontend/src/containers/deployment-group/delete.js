import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import DeploymentGroupDeleteMutation from '@graphql/DeploymentGroupDeleteMutation.gql';
import DeploymentGroupQuery from '@graphql/DeploymentGroup.gql';
import { Loader, ModalErrorMessage } from '@components/messaging';
import { DeploymentGroupDelete as DeploymentGroupDeleteComponent } from '@components/deployment-group';
import { Modal } from 'joyent-ui-toolkit'
import { withNotFound, GqlPaths } from '@containers/navigation';

export class DeploymentGroupDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  render() {
    const { history, match, loading, error } = this.props;

    const handleCloseClick = evt => {
      const closeUrl = match.url.split('/').slice(0, -2).join('/');
      history.replace(closeUrl);
    };

    if (loading) {
      return (
        <Modal width={460} onCloseClick={handleCloseClick}>
          <Loader />
        </Modal>
      );
    }

    if (error) {
      return (
        <Modal width={460} onCloseClick={handleCloseClick}>
          <ModalErrorMessage
            title='Ooops!'
            message='An error occurred while loading your deployment group.'
            onCloseClick={handleCloseClick}
          />
        </Modal>
      );
    }

    const {
      deploymentGroup,
      deleteDeploymentGroup
    } = this.props;

    if (this.state.error) {
      return (
        <Modal width={460} onCloseClick={handleCloseClick}>
          <ModalErrorMessage
            title='Ooops!'
            message={`An error occurred while attempting to delete the ${deploymentGroup.name} deployment group.`}
            onCloseClick={handleCloseClick}
          />
        </Modal>
      );
    }

    const handleConfirmClick = evt => {
      deleteDeploymentGroup(deploymentGroup.id)
        .then(() => handleCloseClick())
        .catch(err => {
          this.setState({ error: err });
        });
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

const DeploymentGroupDeleteWithData = compose(
  DeleteDeploymentGroupGql,
  DeploymentGroupGql,
  withNotFound([ GqlPaths.DEPLOYMENT_GROUP ])
)(DeploymentGroupDelete);

export default DeploymentGroupDeleteWithData;
