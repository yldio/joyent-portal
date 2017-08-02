import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import intercept from 'apr-intercept';

import DeploymentGroupImportMutation from '@graphql/DeploymentGroupImport.gql';

import { LayoutContainer } from '@components/layout';
import { Title } from '@components/navigation';
import { ErrorMessage, Loader } from '@components/messaging';

class DeploymentGroupImport extends Component {
  constructor() {
    super();

    this.state = {
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

    const _title = <Title>Importing deployment group</Title>;

    if (error) {
      return (
        <LayoutContainer>
          {_title}
          <ErrorMessage
            title='Ooops!'
            message='An error occurred while importing your deployment groups.' />
        </LayoutContainer>
      );
    }

    return (
      <LayoutContainer center>
        {_title}
        <Loader />
      </LayoutContainer>
    );
  }
}

export default graphql(DeploymentGroupImportMutation, {
  props: ({ mutate }) => ({
    importDeploymentGroup: variables => mutate({ variables })
  })
})(DeploymentGroupImport);
