/* eslint-disable camelcase */
import React, { Fragment } from 'react';
import intercept from 'apr-intercept';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { SubmissionError } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';
import isBoolean from 'lodash.isboolean';
import get from 'lodash.get';

import {
  ViewContainer,
  Message,
  MessageTitle,
  MessageDescription,
  StatusLoader,
  Divider
} from 'joyent-ui-toolkit';

import {
  ToggleFirewallForm,
  ToggleInactiveForm,
  DefaultRules,
  TagRules
} from '@components/firewall';

import Description from '@components/description';
import Empty from '@components/empty';
import GetFirewallRules from '@graphql/list-instance-fw-rules.gql';
import EnableFirewall from '@graphql/enable-instance-fw.gql';
import DisableFirewall from '@graphql/disable-instance-fw.gql';
import parseError from '@state/parse-error';

export const Firewall = ({
  defaultRules = [],
  tagRules = [],
  enabled,
  inactive = false,
  loading = false,
  loadingError = null,
  mutationError = null,
  handleEnabledToggle
}) => (
  <ViewContainer main>
    <Margin bottom={1}>
      <Description>
        Cloud Firewall rules control traffic across instances. Enabling the
        firewall adds a default set of rules and rules defined by your chosen
        tags.{' '}
        <a
          href="https://docs.joyent.com/private-cloud/install/cns"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the docs
        </a>
      </Description>
    </Margin>
    {loading ? <StatusLoader /> : null}
    {!loading && loadingError ? (
      <Margin bottom={4}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>
            An error occurred while loading your firewall rules
          </MessageDescription>
        </Message>
      </Margin>
    ) : null}
    {!loading && mutationError ? (
      <Margin bottom={4}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>{mutationError}</MessageDescription>
        </Message>
      </Margin>
    ) : null}
    <ReduxForm
      form="fw-enabled"
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      {...{ initialValues: isBoolean(enabled) ? { enabled } : undefined }}
      onSubmit={handleEnabledToggle}
    >
      {props =>
        loading ? null : (
          <Fragment>
            <Margin bottom={7}>
              <ToggleFirewallForm {...props} submitOnChange />
            </Margin>
            <Divider height={remcalc(1)} />
          </Fragment>
        )
      }
    </ReduxForm>
    <ReduxForm
      form="fw-inactive"
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      initialValues={{ inactive }}
    >
      {props =>
        !enabled || loading ? null : (
          <Margin top={4}>
            <ToggleInactiveForm {...props} />
          </Margin>
        )
      }
    </ReduxForm>
    {!loading && !defaultRules.length && !tagRules.length ? (
      <Margin top={5}>
        <Empty borderTop>
          Sorry, but we weren’t able to find any firewall rules.
        </Empty>
      </Margin>
    ) : null}
    {!loading && enabled && defaultRules.length ? (
      <Margin top={5}>
        <DefaultRules rules={defaultRules} />
      </Margin>
    ) : null}
    {!loading && enabled && tagRules.length ? (
      <Margin top={8}>
        <TagRules rules={tagRules} />
      </Margin>
    ) : null}
  </ViewContainer>
);

export default compose(
  graphql(EnableFirewall, { name: 'enableFirewall' }),
  graphql(DisableFirewall, { name: 'disableFirewall' }),
  graphql(GetFirewallRules, {
    options: ({ match }) => ({
      ssr: false,
      variables: {
        fetchPolicy: 'network-only',
        id: get(match, 'params.instance')
      }
    }),
    props: ({ data }) => {
      const { loading, error, machine } = data;

      const enabled = get(machine, 'firewall_enabled');
      const rules = get(machine, 'firewall_rules', []);

      return {
        enabled,
        defaultRules: rules,
        tagRules: rules.filter(({ rule_obj = {} }) => rule_obj.tags.length),
        instance: machine,
        loading,
        loadingError: error
      };
    }
  }),
  connect(
    (state, ownProps) => {
      const { form } = state;
      const { enabled, defaultRules, tagRules } = ownProps;

      const inactive = get(form, `fw-inactive.values.inactive`, false);

      return {
        inactive,
        mutationError: get(form, `fw-enabled.error`, null),
        enabled: get(form, `fw-enabled.values.enabled`, enabled),
        defaultRules: defaultRules.filter(({ enabled }) => enabled || inactive),
        tagRules: tagRules.filter(({ enabled }) => enabled || inactive)
      };
    },
    (dispatch, ownProps) => {
      const { instance, enableFirewall, disableFirewall } = ownProps;

      return {
        handleEnabledToggle: async ({ enabled }) => {
          const mutation = enabled ? disableFirewall : enableFirewall;

          const [err] = await intercept(
            mutation({
              variables: {
                id: instance.id
              }
            })
          );

          if (err) {
            throw new SubmissionError({
              _error: parseError(err)
            });
          }
        }
      };
    }
  )
)(Firewall);
