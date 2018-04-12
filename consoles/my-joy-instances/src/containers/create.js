import React, { Component } from 'react';
import { Margin, Padding } from 'styled-components-spacing';
import { graphql, compose } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { SubmissionError, destroy } from 'redux-form';
import { set, destroyAll } from 'react-redux-values';
import intercept from 'apr-intercept';
import get from 'lodash.get';
import omit from 'lodash.omit';
import uniqBy from 'lodash.uniqby';
import constantCase from 'constant-case';

import { H3, ViewContainer, Button } from 'joyent-ui-toolkit';
import { Forms } from '../constants';
import { Provider as ResourceSteps } from 'joyent-ui-resource-step';
import parseError from '../state/parse-error';
import CreateInstanceMutation from '../graphql/create-instance.gql';

import {
  Name,
  Image,
  Package,
  Network,
  Tags,
  Metadata,
  UserScript,
  Firewall,
  CNS,
  Affinity
} from 'joyent-ui-instance-steps';

const { IC_F } = Forms;
const names = {
  name: 'IC_NAME',
  image: 'IC_IMAGE',
  package: 'IC_PACKAGE',
  network: 'IC_NETWORK',
  tags: 'IC_TAGS',
  metadata: 'IC_METADATA',
  userScript: 'IC_USERSCRIPT',
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

    return Object.keys(this.isValids).filter(
      name => !this.isValids[name](steps[name] || {})
    ).length;
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
      package: packageResult,
      network,
      tags,
      metadata,
      userScript,
      firewall,
      cns,
      affinity
    } = steps;

    return (
      <ViewContainer main>
        <Margin top={5}>
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
                next="network"
                saved={steps.package}
                onDefocus={handleDefocus('package')}
                preview={packageResult}
              />
            </Margin>
            <Margin bottom="5">
              <Network
                ref={this.setIsValid('network')}
                expanded={step === 'network'}
                next="tags"
                saved={steps.network}
                onDefocus={handleDefocus('network')}
                preview={network}
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
                ref={this.setIsValid('userScript')}
                expanded={step === 'user-script'}
                next="firewall"
                saved={steps.userScript && steps.userScript.lines}
                onDefocus={handleDefocus('user-script')}
                preview={userScript}
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
          <Margin bottom={5}>
            <ReduxForm form={IC_F} onSubmit={handleSubmit}>
              {({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <Button disabled={disabled} loading={submitting}>
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
      network: values[names.network],
      tags: values[names.tags],
      metadata: values[names.metadata],
      userScript: values[names.userScript],
      firewall: values[names.firewall],
      cns: values[names.cns],
      affinity: values[names.affinity]
    };

    const error = get(form, `${IC_F}.error`, null);

    // Maybe re-use saved to only write the rule once
    const disabled = Boolean(
      !this.isFormValid &&
        steps.name &&
        steps.image &&
        steps.image.id &&
        steps.package &&
        steps.network
    );

    return {
      disabled: !disabled,
      forms: Object.keys(form), // improve this
      error,
      steps
    };
  }),
  connect(null, (dispatch, { steps = {}, forms, history, createInstance }) => {
    const parseAffRule = ({
      conditional,
      placement,
      identity,
      name,
      pattern,
      value
    }) => {
      const type = constantCase(
        `${conditional}_${placement === 'same' ? 'equal' : 'not_equal'}`
      );

      const patterns = {
        equalling: value => value,
        starting: value => `/^${value}/`
      };

      const _name = identity === 'name' ? 'instance' : name;
      const _value = patterns[pattern](type === 'name' ? name : value);

      return {
        type,
        key: _name,
        value: _value
      };
    };

    return {
      handleDefocus: name => value =>
        dispatch(set({ name: names[name], value })),

      handleSubmit: async () => {
        const _affinity = steps.affinity ? parseAffRule(steps.affinity) : null;
        const _name = steps.name && steps.name.name.toLowerCase();

        const _metadata =
          steps.metadata && steps.metadata.map(a => omit(a, 'open'));

        const _tags =
          steps.tags &&
          uniqBy(steps.tags.map(a => omit(a, 'expanded')), 'name').map(a =>
            omit(a, 'expanded')
          );

        const _networks =
          steps.networks &&
          Object.keys(steps.networks).filter(
            network => steps.networks[network]
          );

        if (steps.userScript && steps.userScript.length) {
          _metadata.push({ name: 'user-script', value: steps.userScript });
        }

        steps.tags &&
          steps.cns &&
          steps.tags.push({
            name: 'triton.cns.disable',
            value: !steps.cns.cnsEnabled
          });

        if (steps.cns && (steps.cns.cnsServices && steps.cns.cnsEnabled)) {
          steps.tags.push({
            name: 'triton.cns.services',
            value: steps.cns.cnsServices.join(',')
          });
        }

        const [err, res] = await intercept(
          createInstance({
            variables: {
              name: _name,
              package: steps.package.id,
              image: steps.image.id,
              affinity: _affinity ? [_affinity] : [],
              metadata: _metadata,
              tags: _tags,
              firewall_enabled: steps.firewall
                ? steps.firewall.enabled
                : undefined,
              networks: _networks && _networks.length ? _networks : undefined
            }
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
