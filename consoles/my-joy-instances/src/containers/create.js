import React, { Component } from 'react';
import { Margin, Padding } from 'styled-components-spacing';
import { graphql, compose } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { SubmissionError, destroy } from 'redux-form';
import { set, destroyAll } from 'react-redux-values';
import intercept from 'apr-intercept';
import get from 'lodash.get';

import { H3, ViewContainer, Button } from 'joyent-ui-toolkit';
import { Provider as ResourceSteps } from 'joyent-ui-resource-step';

import {
  Name,
  Image,
  Package,
  Networks,
  Tags,
  Metadata,
  UserScript,
  Firewall,
  CNS,
  Affinity,
  generatePayload
} from 'joyent-ui-instance-steps';

import { Forms } from '@root/constants';
import parseError from '@state/parse-error';
import CreateInstanceMutation from '@graphql/create-instance.gql';

const { IC_F } = Forms;
const names = {
  name: 'IC_NAME',
  image: 'IC_IMAGE',
  package: 'IC_PACKAGE',
  networks: 'IC_NETWORKS',
  tags: 'IC_TAGS',
  metadata: 'IC_METADATA',
  'user-script': 'IC_USERSCRIPT',
  firewall: 'IC_FIREWALL',
  cns: 'IC_CNS',
  affinity: 'IC_AFFINITY'
};

class CreateInstance extends Component {
  constructor(...args) {
    super(...args);
    this.isValids = {};
  }

  setIsValid = name => ref => {
    if (!ref) {
      return;
    }

    const { isValid } = ref;

    if (!isValid) {
      return;
    }

    this.isValids = Object.assign({}, this.isValids, {
      [name]: isValid
    });
  };

  isFormValid = () => {
    const { steps } = this.props;

    return Object.keys(this.isValids).every(name =>
      this.isValids[name](steps[name] || {})
    );
  };

  isStepValid = step => {
    const { steps } = this.props;
    const fn = this.isValids[step];
    const values = steps[step];

    if (!fn || !values) {
      return true;
    }

    return fn(values);
  };

  render() {
    const { match, steps, handleDefocus, handleSubmit, disabled } = this.props;
    const { params } = match;
    const { step } = params;

    const {
      name,
      image,
      package: pkg,
      networks,
      tags,
      metadata,
      firewall,
      cns,
      affinity
    } = steps;

    return (
      <ViewContainer main>
        <Margin top="5">
          <H3>Create Instance</H3>
        </Margin>
        <Padding top="5">
          <ResourceSteps namespace="instances/~create">
            <Margin bottom="5">
              <Name
                ref={this.setIsValid('name')}
                expanded={step === 'name'}
                next="image"
                saved={get(steps, 'name.name', false)}
                onDefocus={handleDefocus('name')}
                preview={name}
                isValid={this.isStepValid('name')}
              />
            </Margin>
            <Margin bottom="5">
              <Image
                ref={this.setIsValid('image')}
                expanded={step === 'image'}
                next="package"
                saved={steps.image && steps.image.id}
                onDefocus={handleDefocus('image')}
                preview={image}
              />
            </Margin>
            <Margin bottom="5">
              <Package
                ref={this.setIsValid('package')}
                expanded={step === 'package'}
                next="networks"
                saved={steps.package}
                onDefocus={handleDefocus('package')}
                preview={pkg}
              />
            </Margin>
            <Margin bottom="5">
              <Networks
                ref={this.setIsValid('networks')}
                expanded={step === 'networks'}
                next="tags"
                saved={steps.networks}
                onDefocus={handleDefocus('networks')}
                preview={networks}
              />
            </Margin>
            <Margin bottom="5">
              <Tags
                ref={this.setIsValid('tags')}
                expanded={step === 'tags'}
                next="metadata"
                saved={steps.tags && steps.tags.length}
                onDefocus={handleDefocus('tags')}
                preview={tags}
                optional
              />
            </Margin>
            <Margin bottom="5">
              <Metadata
                ref={this.setIsValid('metadata')}
                expanded={step === 'metadata'}
                next="user-script"
                saved={steps.metadata && steps.metadata.length}
                onDefocus={handleDefocus('metadata')}
                preview={metadata}
                optional
              />
            </Margin>
            <Margin bottom="5">
              <UserScript
                ref={this.setIsValid('user-script')}
                expanded={step === 'user-script'}
                next="firewall"
                saved={get(steps, 'user-script.lines', false)}
                onDefocus={handleDefocus('user-script')}
                preview={steps['user-script']}
                optional
              />
            </Margin>
            <Margin bottom="5">
              <Firewall
                ref={this.setIsValid('firewall')}
                expanded={step === 'firewall'}
                next="cns"
                saved={steps.firewall}
                onDefocus={handleDefocus('firewall')}
                preview={firewall}
                optional
              />
            </Margin>
            <Margin bottom="5">
              <CNS
                ref={this.setIsValid('cns')}
                expanded={step === 'cns'}
                next="affinity"
                saved={steps.cns}
                onDefocus={handleDefocus('cns')}
                preview={cns}
                optional
              />
            </Margin>
            <Margin bottom="5">
              <Affinity
                ref={this.setIsValid('affinity')}
                expanded={step === 'affinity'}
                next=""
                saved={steps.affinity}
                onDefocus={handleDefocus('affinity')}
                preview={affinity}
                optional
              />
            </Margin>
          </ResourceSteps>
          <Margin bottom="5">
            <ReduxForm form={IC_F} onSubmit={handleSubmit}>
              {({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <Button
                    disabled={disabled || !this.isFormValid()}
                    loading={submitting}
                  >
                    Deploy
                  </Button>
                </form>
              )}
            </ReduxForm>
          </Margin>
        </Padding>
      </ViewContainer>
    );
  }
}

export default compose(
  graphql(CreateInstanceMutation, { name: 'createInstance' }),
  connect(({ form, values = {} }, { match, location }) => {
    const steps = {
      name: values[names.name],
      image: values[names.image],
      package: values[names.package],
      networks: values[names.networks],
      tags: values[names.tags],
      metadata: values[names.metadata],
      'user-script': values[names['user-script']],
      firewall: values[names.firewall],
      cns: values[names.cns],
      affinity: values[names.affinity]
    };

    const error = get(form, `${IC_F}.error`, null);

    // Maybe re-use saved to only write the rule once
    const disabled = !(
      !error &&
      steps.name &&
      steps.name.name &&
      steps.image &&
      steps.image.id &&
      steps.package &&
      steps.package.id &&
      steps.networks &&
      Array.isArray(steps.networks)
    );

    return {
      disabled,
      forms: Object.keys(form), // improve this
      error,
      steps
    };
  }),
  connect(null, (dispatch, { steps = {}, forms, history, createInstance }) => {
    return {
      handleDefocus: name => value => {
        return dispatch(set({ name: names[name], value }));
      },

      handleSubmit: async () => {
        const [err, res] = await intercept(
          createInstance({
            variables: generatePayload(steps)
          })
        );

        if (err) {
          throw new SubmissionError({
            _error: parseError(err)
          });
        }

        dispatch([destroyAll(), forms.map(name => destroy(name))]);
        history.push(`/instances/${res.data.createMachine.id}`);
      }
    };
  })
)(CreateInstance);
