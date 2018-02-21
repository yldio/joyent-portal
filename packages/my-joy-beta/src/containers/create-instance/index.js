/* eslint-disable camelcase */

import React from 'react';
import { Margin } from 'styled-components-spacing';
import ReduxForm from 'declarative-redux-form';
import { stopSubmit, destroy } from 'redux-form';
import { connect } from 'react-redux';
import { destroyAll } from 'react-redux-values';
import { graphql, compose } from 'react-apollo';
import intercept from 'apr-intercept';
import constantCase from 'constant-case';
import queryString from 'query-string';
import get from 'lodash.get';
import Values from 'lodash.values';
import omit from 'lodash.omit';
import uniqBy from 'lodash.uniqby';

import { ViewContainer, H2, Button } from 'joyent-ui-toolkit';

import Name from '@containers/create-instance/name';
import Image from '@containers/create-instance/image';
import Package from '@containers/create-instance/package';
import Tags from '@containers/create-instance/tags';
import Metadata from '@containers/create-instance/metadata';
import UserScript from '@containers/create-instance/user-script';
import Networks from '@containers/create-instance/networks';
import Firewall from '@containers/create-instance/firewall';
import CNS from '@containers/create-instance/cns';
import Affinity from '@containers/create-instance/affinity';
import CreateInstanceMutation from '@graphql/create-instance.gql';
import parseError from '@state/parse-error';

const CREATE_FORM = 'CREATE-INSTANCE';

const CreateInstance = ({
  step,
  disabled,
  handleSubmit,
  history,
  match,
  query
}) => (
  <ViewContainer>
    <Margin top={4} bottom={4}>
      <H2>Create Instances</H2>
    </Margin>
    {query.image ? (
      <Image
        history={history}
        match={match}
        query={query}
        step="image"
        expanded={step === 'image'}
      />
    ) : null}
    <Name
      history={history}
      match={match}
      query={query}
      step="name"
      expanded={step === 'name'}
    />
    {!query.image ? (
      <Image
        history={history}
        match={match}
        query={query}
        step="image"
        expanded={step === 'image'}
      />
    ) : null}
    <Package
      history={history}
      match={match}
      step="package"
      expanded={step === 'package'}
    />
    <Tags
      history={history}
      match={match}
      step="tags"
      expanded={step === 'tags'}
    />
    <Metadata
      history={history}
      match={match}
      step="metadata"
      expanded={step === 'metadata'}
    />
    <UserScript
      history={history}
      match={match}
      step="user-script"
      expanded={step === 'user-script'}
    />
    <Networks
      history={history}
      match={match}
      step="networks"
      expanded={step === 'networks'}
    />
    <Firewall
      history={history}
      match={match}
      step="firewall"
      expanded={step === 'firewall'}
    />
    <CNS history={history} match={match} step="cns" expanded={step === 'cns'} />
    <Affinity
      history={history}
      match={match}
      step="affinity"
      expanded={step === 'affinity'}
    />
    <Margin top={7} bottom={10}>
      <ReduxForm form={CREATE_FORM} onSubmit={handleSubmit}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Button disabled={disabled} loading={submitting}>
              Deploy
            </Button>
          </form>
        )}
      </ReduxForm>
    </Margin>
  </ViewContainer>
);

export default compose(
  graphql(CreateInstanceMutation, { name: 'createInstance' }),
  connect(({ form, values }, { match, location }) => {
    const query = queryString.parse(location.search);
    const FORM_NAME = 'create-instance-name';
    const step = get(match, 'params.step', 'name');

    const name = get(form, `${FORM_NAME}.values.name`, '');
    const image = get(form, 'create-instance-image.values.image', '');
    const pkg = get(form, 'create-instance-package.values.package', '');
    const networks = get(form, 'CREATE-INSTANCE-NETWORKS.values', {});

    const enabled =
      name.length &&
      image.length &&
      pkg.length &&
      Values(networks).filter(Boolean).length;

    if (!enabled) {
      return {
        disabled: !enabled,
        step
      };
    }

    const metadata = get(values, 'create-instance-metadata', []);
    const receivedTags = get(values, 'create-instance-tags', []);
    const affinity = get(values, 'create-instance-affinity', []);
    const cns = get(values, 'create-instance-cns-enabled', true);
    const cnsServices = get(values, 'create-instance-cns-services', null);
    const userScript = get(values, 'create-instance-user-script', {});
    const tags = receivedTags.map(a => omit(a, 'expanded'));

    const firewall_enabled = get(
      form,
      'CREATE-INSTANCE-FIREWALL.values.enabled',
      false
    );

    tags.push({
      name: 'triton.cns.disable',
      value: !cns
    });

    if (cnsServices && cns) {
      tags.push({
        name: 'triton.cns.services',
        value: cnsServices.join(',')
      });
    }

    return {
      query,
      forms: Object.keys(form), // improve this
      name,
      pkg,
      image,
      affinity,
      metadata,
      userScript,
      tags,
      firewall_enabled,
      networks,
      step
    };
  }),
  connect(null, (dispatch, ownProps) => {
    const {
      name,
      pkg,
      image,
      affinity,
      metadata,
      userScript,
      tags,
      firewall_enabled,
      networks,
      forms,
      createInstance,
      history
    } = ownProps;

    return {
      handleSubmit: async () => {
        const _affinity = affinity
          .map(aff => ({
            conditional: aff['rule-instance-conditional'],
            placement: aff['rule-instance-placement'],
            identity: aff['rule-type'],
            key: aff['rule-instance-tag-key'],
            pattern: aff['rule-instance-tag-value-pattern'],
            value:
              aff['rule-type'] === 'name'
                ? aff['rule-instance-name']
                : aff['rule-instance-tag-value']
          }))
          .map(({ conditional, placement, identity, key, pattern, value }) => {
            const type = constantCase(
              `${conditional}_${placement === 'same' ? 'equal' : 'not_equal'}`
            );

            const patterns = {
              equalling: value => value,
              'not-equalling': value => `/^!${value}$/`,
              containing: value => `/${value}/`,
              starting: value => `/^${value}/`,
              ending: value => `/${value}$/`
            };

            const _key = identity === 'name' ? 'instance' : key;
            const _value = patterns[pattern](value);

            return {
              type,
              key: _key,
              value: _value
            };
          });

        const _name = name.toLowerCase();
        const _metadata = metadata.map(a => omit(a, 'open'));
        const _tags = uniqBy(tags, 'name').map(a => omit(a, 'expanded'));
        const _networks = Object.keys(networks).filter(
          network => networks[network]
        );

        if (userScript && userScript.value) {
          _metadata.push({ name: 'user-script', value: userScript.value });
        }

        const [err, res] = await intercept(
          createInstance({
            variables: {
              name: _name,
              package: pkg,
              image,
              affinity: _affinity.length ? _affinity : undefined,
              metadata: _metadata,
              tags: _tags,
              firewall_enabled,
              networks: _networks.length ? _networks : undefined
            }
          })
        );

        if (err) {
          return dispatch(
            stopSubmit(CREATE_FORM, {
              _error: parseError(err)
            })
          );
        }

        dispatch([destroyAll(), forms.map(name => destroy(name))]);

        history.push(`/${res.data.createMachine.name}`);
      }
    };
  })
)(CreateInstance);
