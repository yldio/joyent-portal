import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import intercept from 'apr-intercept';
import paramCase from 'param-case';
import remove from 'lodash.remove';
import flatten from 'lodash.flatten';
import uniq from 'lodash.uniq';
import find from 'lodash.find';
import { safeLoad } from 'js-yaml';
import uuid from 'uuid/v4';
import forceArray from 'force-array';

import DeploymentGroupBySlugQuery from '@graphql/DeploymentGroupBySlug.gql';
import DeploymentGroupCreateMutation from '@graphql/DeploymentGroupCreate.gql';
import DeploymentGroupProvisionMutation from '@graphql/DeploymentGroupProvision.gql';
import DeploymentGroupConfigQuery from '@graphql/DeploymentGroupConfig.gql';

import { client } from '@state/store';
import { ErrorMessage } from '@components/messaging';
import { Environment, Name, Review, Manifest } from '@components/manifest';

const INTERPOLATE_REGEX = /\$([_a-z][_a-z0-9]*)/gi;

// TODO: move state to redux. why: because in redux we can cache transactional
// state between refreshes
class DeploymentGroupEditOrCreate extends Component {
  constructor(props) {
    super(props);

    const { create, files = [], manifest } = props;
    const type = create ? 'create' : 'edit';

    const NameForm =
      create &&
      reduxForm({
        form: `${type}-deployment-group`,
        destroyOnUnmount: true,
        forceUnregisterOnUnmount: true,
        asyncValidate: async ({ name = '' }) => {
          const [err, res] = await intercept(
            client.query({
              fetchPolicy: 'network-only',
              query: DeploymentGroupBySlugQuery,
              variables: {
                slug: paramCase(name.trim())
              }
            })
          );

          if (err) {
            return;
          }

          if (!res.data.deploymentGroups.length) {
            return;
          }

          // eslint-disable-next-line no-throw-literal
          throw { name: `"${name}" already exists!` };
        }
      })(Name);

    const ManifestForm = reduxForm({
      form: `${type}-deployment-group`
    })(Manifest);

    const ReviewForm = reduxForm({
      form: `${type}-deployment-group`
    })(Review);

    this.state = {
      type,
      defaultStage: create ? 'name' : 'edit',
      manifestStage: create ? 'manifest' : 'edit',
      name: '',
      manifest: '',
      environment: '',
      files: this.resolveManifestFiles(files, manifest),
      services: [],
      environmentToggles: {},
      loading: false,
      error: null,
      NameForm,
      ReviewForm,
      ManifestForm
    };

    this.state.EnvironmentForm = this.getEnvironmentForm(
      this.state.files,
      manifest
    );

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
    this.handleEnvironmentToggle = this.handleEnvironmentToggle.bind(this);
  }

  resolveManifestFiles(currentFiles = [], manifestStr = '') {
    if (!manifestStr.length) {
      return [];
    }

    let manifest = {};

    try {
      manifest = safeLoad(manifestStr);
    } catch (err) {
      console.error(err);
      return [];
    }

    const services = manifest.services ? manifest.services : manifest;

    const filenames = uniq(
      // eslint-disable-next-line camelcase
      flatten(Object.values(services).map(({ env_file }) => env_file))
    );

    return filenames
      .filter(Boolean)
      .filter(filename => !find(currentFiles, ['name', filename]))
      .map(this.getDefaultFile)
      .concat(currentFiles);
  }

  getEnvironmentForm(files = [], manifest = '') {
    const { type } = this.state;

    const initialValues = files.reduce(
      (acc, { id, name, value }) =>
        Object.assign(acc, {
          [`file-name-${id}`]: name,
          [`file-value-${id}`]: value
        }),
      {}
    );

    return reduxForm({
      form: `${type}-deployment-group`,
      initialValues
    })(Environment);
  }

  getEnvironmentDefaultValue() {
    const { environment = '' } = this.props;
    const { manifest = '' } = this.state;

    if (environment.length) {
      return environment;
    }

    const names = forceArray(manifest.match(INTERPOLATE_REGEX)).map(name =>
      name.replace(/^\$/, '')
    );

    const vars = uniq(names)
      .map(name => `\n${name}=`)
      .join('');

    return `# define your interpolatable variables here\n${vars}`;
  }

  getDefaultFile(name = '') {
    return {
      id: uuid(),
      name,
      value: '# define your environment variables here\n'
    };
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
    console.log(name);
    this.setState({ name }, () =>
      this.redirect({ stage: 'manifest', prog: true })
    );
  }

  handleManifestSubmit({ manifest = '' }) {
    const { files } = this.state;

    const _manifest = manifest || this.props.manifest;
    const _files = this.resolveManifestFiles(files, _manifest);

    const EnvironmentForm = this.getEnvironmentForm(_files, _manifest);

    this.setState(
      { manifest: _manifest, EnvironmentForm, files: _files },
      () => {
        this.redirect({ stage: 'environment', prog: true });
      }
    );
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

    return false;
  }

  handleFileAdd() {
    const { files = [] } = this.state;

    this.setState({
      files: files.concat([this.getDefaultFile()])
    });
  }

  handleRemoveFile(fileId) {
    const { files = [] } = this.state;

    this.setState({
      files: remove(files, ({ id }) => id !== fileId)
    });
  }

  handleEnvironmentToggle(serviceName) {
    const { environmentToggles } = this.state;

    this.setState({
      environmentToggles: Object.assign({}, environmentToggles, {
        [serviceName]: !environmentToggles[serviceName]
      })
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
    const { dataCenter } = this.props;

    return (
      <NameForm
        dataCenter={dataCenter}
        onSubmit={this.handleNameSubmit}
        onCancel={this.handleCancel}
      />
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
    const { EnvironmentForm, files, loading } = this.state;

    return (
      <EnvironmentForm
        defaultValue={this.getEnvironmentDefaultValue()}
        files={files}
        onSubmit={this.handleEnvironmentSubmit}
        onCancel={this.handleCancel}
        onAddFile={this.handleFileAdd}
        onRemoveFile={this.handleRemoveFile}
        loading={loading}
      />
    );
  }

  renderReview() {
    const { ReviewForm, environmentToggles } = this.state;

    return (
      <ReviewForm
        onSubmit={this.handleReviewSubmit}
        onCancel={this.handleCancel}
        onEnvironmentToggle={this.handleEnvironmentToggle}
        environmentToggles={environmentToggles}
        {...this.state}
      />
    );
  }

  render() {
    const { error, defaultStage, manifestStage, manifest, name } = this.state;

    if (error) {
      return <ErrorMessage title="Ooops!" message={error} />;
    }

    const { match, create } = this.props;
    const stage = match.params.stage;

    if (!stage) {
      return this.redirect({ stage: defaultStage });
    }

    if (!this.stages[stage]) {
      return this.redirect({ stage: defaultStage });
    }

    if (create && stage !== 'name' && !name) {
      return this.redirect({ stage: defaultStage });
    }

    if (stage === 'environment' && !manifest) {
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