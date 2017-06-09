import { compose, graphql } from 'react-apollo';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DeploymentGroupCreateMutation from '@graphql/DeploymentGroupCreate.gql';
import DeploymentGroupProvisionMutation
  from '@graphql/DeploymentGroupProvision.gql';

import { LayoutContainer } from '@components/layout';
import { Row } from 'react-styled-flexboxgrid';
import { Input, Button } from 'joyent-ui-toolkit';

let loading = false;
let ManifestEditor = null;

class DeploymentGroupCreate extends Component {
  constructor() {
    super();

    this._refs = {};

    if (!loading && !ManifestEditor) {
      loading = true;

      this.loadDependencies()
        .catch(err => console.error(err))
        .then(({ default: _ }) => {
          ManifestEditor = _;
          loading = false;

          // force re-render
          this.forceUpdate();
        });
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleManifestChange = this.handleManifestChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  loadDependencies = async () => {
    await Promise.all([
      import('codemirror/lib/codemirror.css'),
      import('codemirror/theme/eclipse.css'),
      import('codemirror/addon/fold/foldgutter.css'),
      import('codemirror/mode/yaml/yaml'),
      import('codemirror/addon/edit/closebrackets'),
      import('codemirror/addon/edit/matchbrackets'),
      import('codemirror/addon/fold/foldcode'),
      import('codemirror/addon/fold/foldgutter'),
      import('codemirror/addon/fold/brace-fold'),
      import('codemirror/addon/fold/indent-fold'),
      import('codemirror/addon/fold/comment-fold'),
      import('codemirror/addon/hint/show-hint'),
      import('codemirror/addon/selection/active-line'),
      import('codemirror/addon/edit/closetag'),
      import('codemirror/addon/lint/lint.css')
    ]);

    await import('codemirror');
    await import('react-codemirror');

    return import('joyent-manifest-editor');
  };
  handleNameChange(ev) {
    this.setState({
      name: ev.target.value
    });
  }
  handleManifestChange(raw) {
    this.setState({
      raw
    });
  }
  handleSubmit = async () => {
    const { history, createDeploymentGroup, provisionManifest } = this.props;
    const { name, raw } = this.state;

    const { data: cdgData } = await createDeploymentGroup({ name });

    const { data: pmData } = await provisionManifest({
      deploymentGroupId: cdgData.createDeploymentGroup.id,
      type: 'COMPOSE',
      format: 'YAML',
      raw
    });

    history.push(`/deployment-groups/${cdgData.createDeploymentGroup.slug}/`);
  };
  renderEditor() {
    return (
      <LayoutContainer>
        <Row>
          <Input
            name="name"
            type="text"
            placeholder="DeploymentGroup Name:"
            onChange={this.handleNameChange}
          />
        </Row>
        <ManifestEditor mode="yaml" onChange={this.handleManifestChange} />
        <Row>
          <Button secondary>Back</Button>
          <Button onClick={this.handleSubmit} primary>Provision</Button>
        </Row>
      </LayoutContainer>
    );
  }
  render() {
    return !loading && ManifestEditor ? this.renderEditor() : <p>loading...</p>;
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
