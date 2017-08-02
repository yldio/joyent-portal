import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import intercept from 'apr-intercept';
import paramCase from 'param-case';
import remove from 'lodash.remove';
import uuid from 'uuid/v4';

import DeploymentGroupBySlugQuery from '@graphql/DeploymentGroupBySlug.gql';
import DeploymentGroupCreateMutation from '@graphql/DeploymentGroupCreate.gql';
import DeploymentGroupProvisionMutation from '@graphql/DeploymentGroupProvision.gql';
import DeploymentGroupConfigQuery from '@graphql/DeploymentGroupConfig.gql';

import { client } from '@state/store';
import { ErrorMessage } from '@components/messaging';
import {
  Name,
  Manifest,
  Environment,
  Review
} from '@components/manifest/edit-or-create';

// TODO: move state to redux. why: because in redux we can cache transactional
// state between refreshes
class DeploymentGroupEditOrCreate extends Component {
  constructor(props) {
    super(props);

    const { create, edit, files = [] } = props;
    const type = create ? 'create' : 'edit';

    const NameForm =
      create &&
      reduxForm({
        form: `${type}-deployment-group`,
        destroyOnUnmount: true,
        forceUnregisterOnUnmount: true,
        asyncValidate: async ({ name = '' }) => {
          const { data } = await client.query({
            fetchPolicy: 'network-only',
            query: DeploymentGroupBySlugQuery,
            variables: {
              slug: paramCase(name.trim())
            }
          });

          if (data.deploymentGroups.length) {
            // eslint-disable-next-line no-throw-literal
            throw { name: `"${name}" already exists!` };
          }
        }
      })(Name);

    const ManifestForm = reduxForm({
      form: `${type}-deployment-group`,
      destroyOnUnmount: true,
      forceUnregisterOnUnmount: true
    })(Manifest);

    const EnvironmentForm = reduxForm({
      form: `${type}-deployment-group`,
      destroyOnUnmount: true,
      forceUnregisterOnUnmount: true
    })(Environment);

    const ReviewForm = reduxForm({
      form: `${type}-deployment-group`,
      destroyOnUnmount: true,
      forceUnregisterOnUnmount: true
    })(Review);

    if (!files.length) {
      files.push({
        id: uuid(),
        name: '',
        value: '#'
      });
    }

    this.state = {
      defaultStage: create ? 'name' : 'edit',
      manifestStage: create ? 'manifest' : 'edit',
      name: '',
      manifest: '',
      environment: '',
      files,
      services: [],
      loading: false,
      error: null,
      NameForm,
      ManifestForm,
      EnvironmentForm,
      ReviewForm
    };

    this.stages = {
      name: create && this.renderNameForm.bind(this),
      [create ? 'manifest' : 'edit']: this.renderManifestEditor.bind(this),
      environment: this.renderEnvironmentEditor.bind(this),
      review: this.renderReview.bind(this)
    };

    this.handleNameSubmit =
      type === 'create' && this.handleNameSubmit.bind(this);

    this.handleManifestSubmit = this.handleManifestSubmit.bind(this);
    this.handleEnvironmentSubmit = this.handleEnvironmentSubmit.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFileAdd = this.handleFileAdd.bind(this);
    this.handleRemoveFile = this.handleRemoveFile.bind(this);

    if (edit) {
      setTimeout(this.getDeploymentGroup, 16);
    }
  }

  createDeploymentGroup = async () => {
    const { createDeploymentGroup, deploymentGroup, edit } = this.props;

    if (edit && (!deploymentGroup || !deploymentGroup.id)) {
      this.setState({
        error: 'Unexpected Error: Inexistent DeploymentGroup!'
      });

      return {};
    }

    if (deploymentGroup && deploymentGroup.id) {
      return deploymentGroup;
    }

    const { name } = this.state;

    const [err, res] = await intercept(createDeploymentGroup({ name }));

    if (err) {
      this.setState({
        error: err.message
      });
    }

    return err ? {} : res.data.createDeploymentGroup;
  };

  provision = async deploymentGroupId => {
    const { manifest, environment, files } = this.state;
    const { provisionManifest } = this.props;

    const [err] = await intercept(
      provisionManifest({
        deploymentGroupId,
        type: 'COMPOSE',
        format: 'YAML',
        environment: environment || '',
        files,
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

  handleNameSubmit({ name = '' }) {
    this.setState({ name }, () =>
      this.redirect({ stage: 'manifest', prog: true })
    );
  }

  handleManifestSubmit({ manifest = '' }) {
    this.setState({ manifest: manifest || this.props.manifest }, () => {
      this.redirect({ stage: 'environment', prog: true });
    });
  }

  handleEnvironmentSubmit(change) {
    const { environment = '' } = change;
    const { name, manifest } = this.state;

    const files = Object.values(
      Object.keys(change).reduce((acc, key) => {
        const match = key.match(/file-(name|value)-(.*)/);

        if (!match) {
          return acc;
        }

        const [_, type, id] = match;

        if (!acc[id]) {
          acc[id] = {
            id
          };
        }

        acc[id][type] = change[key];
        return acc;
      }, {})
    );

    const getConfig = async () => {
      const { environment } = this.state;

      const [err, conf] = await intercept(
        client.query({
          query: DeploymentGroupConfigQuery,
          fetchPolicy: 'network-only',
          variables: {
            deploymentGroupName: name,
            type: 'COMPOSE',
            format: 'YAML',
            environment: environment || '',
            files,
            raw: manifest
          }
        })
      );

      if (err) {
        return this.setState({
          error: err.message
        });
      }

      const { data } = conf;
      const { config: services } = data;

      this.setState({ loading: false, services, files }, () => {
        this.redirect({ stage: 'review', prog: true });
      });
    };

    this.setState(
      { environment: environment || this.props.environment, loading: true },
      getConfig
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

  handleCancel() {
    const { history, create, deploymentGroup } = this.props;

    history.push(create ? '/' : `/deployment-groups/${deploymentGroup.slug}`);
  }

  handleFileAdd() {
    this.setState({
      files: this.state.files.concat([
        {
          id: uuid(),
          name: '',
          value: '#'
        }
      ])
    });
  }

  handleRemoveFile(fileId) {
    this.setState({
      files: remove(this.state.files, ({ id }) => id !== fileId)
    });
  }

  redirect({ stage = 'name', prog = false }) {
    const { match, history, create } = this.props;

    const regex = create ? /\/~create(.*)/ : /\/manifest(.*)/;
    const to = match.url.replace(
      regex,
      create ? `/~create/${stage}` : `/manifest/${stage}`
    );

    if (!prog) {
      return <Redirect to={to} />;
    }

    history.push(to);
  }

  renderNameForm() {
    const { NameForm } = this.state;

    return (
      <NameForm onSubmit={this.handleNameSubmit} onCancel={this.handleCancel} />
    );
  }

  renderManifestEditor() {
    const { ManifestForm } = this.state;

    return (
      <ManifestForm
        defaultValue={this.props.manifest}
        onSubmit={this.handleManifestSubmit}
        onCancel={this.handleCancel}
      />
    );
  }

  renderEnvironmentEditor() {
    const { EnvironmentForm } = this.state;

    return (
      <EnvironmentForm
        defaultValue={this.props.environment}
        files={this.state.files}
        onSubmit={this.handleEnvironmentSubmit}
        onCancel={this.handleCancel}
        onAddFile={this.handleFileAdd}
        onRemoveFile={this.handleRemoveFile}
        loading={this.state.loading}
      />
    );
  }

  renderReview() {
    const { ReviewForm } = this.state;

    return (
      <ReviewForm
        onSubmit={this.handleReviewSubmit}
        onCancel={this.handleCancel}
        {...this.state}
      />
    );
  }

  render() {
    const { error, loading, defaultStage, manifestStage } = this.state;

    if (error) {
      return <ErrorMessage
        title='Ooops!'
        message={error} />;
    }

    const { match, create } = this.props;
    const stage = match.params.stage;

    if (!stage) {
      return this.redirect({ stage: defaultStage });
    }

    if (!this.stages[stage]) {
      return this.redirect({ stage: defaultStage });
    }

    if (create && stage !== 'name' && !this.state.name) {
      return this.redirect({ stage: defaultStage });
    }

    if (stage === 'environment' && !this.state.manifest) {
      return this.redirect({ stage: manifestStage });
    }

    return this.stages[stage]();
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
)(withRouter(DeploymentGroupEditOrCreate));
