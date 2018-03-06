/* eslint-disable camelcase */

import React from 'react';
import { Margin } from 'styled-components-spacing';
import ReduxForm from 'declarative-redux-form';
import { stopAsyncValidation, SubmissionError, destroy } from 'redux-form';
import { connect } from 'react-redux';
import { set, destroyAll } from 'react-redux-values';
import { graphql, compose } from 'react-apollo';
import intercept from 'apr-intercept';
import constantCase from 'constant-case';
import queryString from 'query-string';
import get from 'lodash.get';
import lvalues from 'lodash.values';
import omit from 'lodash.omit';
import uniqBy from 'lodash.uniqby';

import {
  ViewContainer,
  H2,
  Button,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

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
import GetInstance from '@graphql/get-instance-small.gql';
import createClient from '@state/apollo-client';
import parseError from '@state/parse-error';
import { Forms, Values } from '@root/constants';

const {
  IC_F,
  IC_NAME_F,
  IC_IMG_F,
  IC_PKG_F_SELECT,
  IC_NW_F,
  IC_US_F,
  IC_FW_F_ENABLED
} = Forms;

const {
  IC_MD_V_MD,
  IC_TAG_V_TAGS,
  IC_AFF_V_AFF,
  IC_CNS_V_ENABLED,
  IC_CNS_V_SERVICES,
  IC_V_VALIDATING
} = Values;

const CreateInstance = ({
  history,
  match,
  query,
  step,
  error,
  disabled,
  shouldAsyncValidate,
  handleAsyncValidate,
  handleSubmit,
  validating
}) => (
  <ViewContainer>
    <Margin top={4} bottom={4}>
      <H2>Create Instances</H2>
    </Margin>
    {error ? (
      <Margin bottom={4}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>{error}</MessageDescription>
        </Message>
      </Margin>
    ) : null}
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
      {error ? (
        <Margin bottom={4}>
          <Message error>
            <MessageTitle>Ooops!</MessageTitle>
            <MessageDescription>{error}</MessageDescription>
          </Message>
        </Margin>
      ) : null}
      <ReduxForm
        form={IC_F}
        shouldAsyncValidate={shouldAsyncValidate}
        asyncValidate={handleAsyncValidate}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Button disabled={disabled} loading={submitting || validating}>
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
    const step = get(match, 'params.step', 'name');

    const validating = get(values, IC_V_VALIDATING, false);
    const isNameInvalid = get(form, `${IC_NAME_F}.asyncErrors.name`, null);
    const error = get(form, `${IC_F}.error`, null);
    const name = get(form, `${IC_NAME_F}.values.name`, '');
    const image = get(form, `${IC_IMG_F}.values.image`, '');
    const pkg = get(form, `${IC_PKG_F_SELECT}.values.package`, '');
    const networks = get(form, `${IC_NW_F}.values`, {});

    const enabled =
      !isNameInvalid &&
      name.length &&
      image.length &&
      pkg.length &&
      lvalues(networks).filter(Boolean).length;

    if (!enabled) {
      return {
        validating,
        error,
        query,
        disabled: !enabled,
        step
      };
    }

    const metadata = get(values, IC_MD_V_MD, []);
    const tags = get(values, IC_TAG_V_TAGS, []).map(tag => tag); // clone
    const affinity = get(values, IC_AFF_V_AFF, null);
    const cns = get(values, IC_CNS_V_ENABLED, true);
    const cnsServices = get(values, IC_CNS_V_SERVICES, null);
    const userScript = get(form, `${IC_US_F}.values.value`, '');

    const firewall_enabled = get(
      form,
      `${IC_FW_F_ENABLED}.values.enabled`,
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
      validating,
      error,
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
        'not-equalling': value => `/^!${value}$/`,
        containing: value => `/${value}/`,
        starting: value => `/^${value}/`,
        ending: value => `/${value}$/`
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
      shouldAsyncValidate: ({ trigger }) => {
        return trigger === 'submit';
      },
      handleAsyncValidate: async () => {
        dispatch(set({ name: IC_V_VALIDATING, value: true }));

        const [nameError, res] = await intercept(
          createClient().query({
            fetchPolicy: 'network-only',
            query: GetInstance,
            variables: { name }
          })
        );

        if (nameError) {
          return dispatch([
            set({ name: IC_V_VALIDATING, value: false }),
            stopAsyncValidation(IC_F, { _error: parseError(nameError) })
          ]);
        }

        const { data } = res;
        const { machines = [] } = data;

        if (machines.length) {
          return dispatch([
            set({ name: IC_V_VALIDATING, value: false }),
            stopAsyncValidation(IC_F, { _error: `${name} already exists.` })
          ]);
        }

        dispatch(set({ name: IC_V_VALIDATING, value: false }));
      },
      handleSubmit: async () => {
        const _affinity = affinity ? parseAffRule(affinity) : null;
        const _name = name.toLowerCase();
        const _metadata = metadata.map(a => omit(a, 'open'));

        const _tags = uniqBy(tags.map(a => omit(a, 'expanded')), 'name').map(
          a => omit(a, 'expanded')
        );

        const _networks = Object.keys(networks).filter(
          network => networks[network]
        );

        if (userScript && userScript.length) {
          _metadata.push({ name: 'user-script', value: userScript });
        }

        const [err, res] = await intercept(
          createInstance({
            variables: {
              name: _name,
              package: pkg,
              image,
              affinity: _affinity ? [_affinity] : [],
              metadata: _metadata,
              tags: _tags,
              firewall_enabled,
              networks: _networks.length ? _networks : undefined
            }
          })
        );

        if (err) {
          throw new SubmissionError({
            _error: parseError(err)
          });
        }

        dispatch([destroyAll(), forms.map(name => destroy(name))]);
        history.push(`/instances/${res.data.createMachine.name}`);
      }
    };
  })
)(CreateInstance);
