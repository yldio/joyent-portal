import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import intercept from 'apr-intercept';

import DeploymentGroupImportMutation from '@graphql/DeploymentGroupImport.gql';

import { LayoutContainer } from '@components/layout';
import { DeploymentGroupsLoading } from '@components/deployment-groups';
import { H2 } from 'joyent-ui-toolkit';

class DeploymentGroupImport extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      error: false
    };

    setTimeout(this.importDeploymentGroup, 16);
  }

  importDeploymentGroup = async () => {
    const { importDeploymentGroup, match, history } = this.props;
    const { slug } = match.params;

    const [error] = await intercept(
      importDeploymentGroup({
        slug
      })
    );

    if (error) {
      return this.setState({ loading: false, error });
    }

    history.push(`/deployment-groups/${slug}`);
  };

  render() {
    const { loading, error } = this.state;

    return (
      <LayoutContainer>
        <H2>Importing deployment group</H2>
        {loading && <DeploymentGroupsLoading />}
        {error && <span>{error.toString()}</span>}
      </LayoutContainer>
    );
  }
}

export default graphql(DeploymentGroupImportMutation, {
  props: ({ mutate }) => ({
    importDeploymentGroup: variables => mutate({ variables })
  })
})(DeploymentGroupImport);
