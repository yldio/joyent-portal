import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { compose, graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import intercept from 'apr-intercept';
import paramCase from 'param-case';

import DeploymentGroupBySlug from '@graphql/DeploymentGroupBySlug.gql';
import DeploymentGroupCreateMutation from '@graphql/DeploymentGroupCreate.gql';
import DeploymentGroupProvisionMutation from '@graphql/DeploymentGroupProvision.gql';

import { client } from '@state/store';
import { LayoutContainer } from '@components/layout';
import { Name, Manifest, Review } from '@components/deployment-groups/create';
import { H2 } from 'joyent-ui-toolkit';

const validateName = async ({ name = '' }) => {
  const { data } = await client.query({
    fetchPolicy: 'network-only',
    query: DeploymentGroupBySlug,
    variables: {
      slug: paramCase(name.trim())
    }
  });

  if (data.deploymentGroups.length) {
    // eslint-disable-next-line no-throw-literal
    throw { name: `"${name}" already exists!` };
  }
};

const NameForm = reduxForm({
  form: 'create-deployment-group',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  asyncValidate: validateName
})(Name);

const ManifestForm = reduxForm({
  form: 'create-deployment-group',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(Manifest);

const ReviewForm = reduxForm({
  form: 'create-deployment-group',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(Review);

// TODO: move state to redux. why: because in redux we can cache transactional
// state between refreshes
class DeploymentGroupCreate extends Component {
  state = {
    deploymentGroupName: '',
    manifest: '',
    loading: false,
    error: null
  };

  constructor() {
    super();

    this.stages = {
      name: this.renderNameForm.bind(this),
      manifest: this.renderManifestEditor.bind(this),
      review: this.renderReview.bind(this)
    };

    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.handleManifestSubmit = this.handleManifestSubmit.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleNameSubmit({ name = '' }) {
    this.setState({ deploymentGroupName: name }, () =>
      this.redirect({ stage: 'manifest', prog: true })
    );
  }

  handleManifestSubmit({ manifest = '' }) {
    this.setState({ manifest }, () =>
      this.redirect({ stage: 'review', prog: true })
    );
  }

  handleReviewSubmit() {
    const { history } = this.props;

    const submit = async () => {
      const { id, slug } = await this.createDeploymentGroup();

      if (!id) {
        return;
      }

      const manifest = await this.provision(id);

      if (!manifest) {
        return;
      }

      history.push(`/deployment-groups/${slug}`);
    };

    this.setState({ loading: true }, submit);
  }

  createDeploymentGroup = async () => {
    const { deploymentGroupName } = this.state;
    const { createDeploymentGroup } = this.props;

    const [err, res] = await intercept(
      createDeploymentGroup({ name: deploymentGroupName })
    );

    if (err) {
      this.setState({
        error: err.message
      });
    }

    return err ? null : res.data.createDeploymentGroup;
  };

  provision = async deploymentGroupId => {
    const { manifest } = this.state;
    const { provisionManifest } = this.props;

    const [err] = await intercept(
      provisionManifest({
        deploymentGroupId,
        type: 'COMPOSE',
        format: 'YAML',
        raw: manifest
      })
    );

    if (err) {
      this.setState({
        error: err.message
      });
    }

    return err ? null : true;
  };

  renderNameForm() {
    return (
      <NameForm onSubmit={this.handleNameSubmit} onCancel={this.handleCancel} />
    );
  }

  renderManifestEditor() {
    return (
      <ManifestForm
        onSubmit={this.handleManifestSubmit}
        onCancel={this.handleCancel}
      />
    );
  }

  renderReview() {
    return (
      <ReviewForm
        onSubmit={this.handleReviewSubmit}
        onCancel={this.handleCancel}
        {...this.state}
      />
    );
  }

  handleCancel() {
    const { history } = this.props;

    history.push('/');
  }

  redirect({ stage = 'name', prog = false }) {
    const { match, history } = this.props;

    const pathname = match.url.replace(/~create(.*)/, '~create');
    const to = `${pathname}/${stage}`;

    if (!prog) {
      return <Redirect to={to} />;
    }

    history.push(to);
  }

  render() {
    const { match } = this.props;
    const stage = match.params.stage;

    if (!stage) {
      return this.redirect({ stage: 'name' });
    }

    if (!this.stages[stage]) {
      return this.redirect({ stage: 'name' });
    }

    const view = this.stages[stage]();

    return (
      <LayoutContainer>
        <H2>Creating deployment group</H2>
        {view}
      </LayoutContainer>
    );
  }
}

export default compose(
  graphql(DeploymentGroupCreateMutation, {
    props: ({ mutate }) => ({
      createDeploymentGroup: variables => mutate({ variables })
    })
  }),
  graphql(DeploymentGroupProvisionMutation, {
    props: ({ mutate }) => ({
      provisionManifest: variables => mutate({ variables })
    })
  })
)(DeploymentGroupCreate);
