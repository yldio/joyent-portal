/* eslint-disable camelcase */

import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import { Margin } from 'styled-components-spacing';
import ReduxForm from 'declarative-redux-form';
import { set } from 'react-redux-values';
import { connect } from 'react-redux';
import get from 'lodash.get';
import forceArray from 'force-array';

import Title from '@components/create-instance/title';
import Description from '@components/create-instance/description';
import FirewallForm from '@components/create-instance/firewall';
import ListFwRules from '@graphql/list-fw-rules.gql';

import { StatusLoader, FirewallIcon, H3, Button } from 'joyent-ui-toolkit';

const FORM_NAME = 'CREATE-INSTANCE-FIREWALL';

const Firewall = ({
  defaultRules = [],
  tagRules = [],
  expanded = false,
  proceeded = false,
  loading = false,
  enabled = false,
  handleNext,
  handleEdit
}) => (
  <Fragment>
    <Title icon={<FirewallIcon />}>Firewall</Title>
    {expanded ? (
      <Description>
        Cloud Firewall rules control traffic across instances. Enabling the
        firewall adds a default set of rules and rules defined by your chosen
        tags.{' '}
        <a
          target="__blank"
          href="https://docs.joyent.com/public-cloud/network/firewall"
        >
          Read more
        </a>
      </Description>
    ) : null}
    {loading && expanded ? <StatusLoader /> : null}
    {!loading ? (
      <ReduxForm
        form={FORM_NAME}
        destroyOnUnmount={false}
        forceUnregisterOnUnmount={true}
      >
        {props =>
          expanded ? (
            <FirewallForm
              {...props}
              defaultRules={defaultRules}
              tagRules={tagRules}
              enabled={enabled}
            />
          ) : null}
      </ReduxForm>
    ) : null}
    {proceeded && !expanded ? (
      <Margin bottom={4}>
        <H3>{enabled ? 'Firewall Enabled' : 'Firewall Not Enabled'}</H3>
      </Margin>
    ) : null}
    <Fragment>
      {expanded ? (
        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      ) : proceeded ? (
        <Button type="button" onClick={handleEdit} secondary>
          Edit
        </Button>
      ) : null}
    </Fragment>
  </Fragment>
);

export default compose(
  connect(
    ({ form, values }, ownProps) => ({
      ...ownProps,
      proceeded: get(values, 'create-instance-firewall-proceeded', false),
      enabled: get(form, `${FORM_NAME}.values.enabled`, false),
      showInactive: get(form, `${FORM_NAME}.values.show-inactive`, false),
      tags: get(values, 'create-instance-tags', [])
    }),
    (dispatch, { history }) => ({
      handleNext: () => {
        dispatch(
          set({ name: 'create-instance-firewall-proceeded', value: true })
        );

        return history.push('/instances/~create/cns');
      },
      handleEdit: () => {
        return history.push('/instances/~create/firewall');
      }
    })
  ),
  graphql(ListFwRules, {
    options: ({ tags, expanded, enabled }) => ({
      fetchPolicy: expanded && enabled ? 'cache-first' : 'cache-only',
      variables: {
        tags: tags.map(({ name, value }) => ({ name, value }))
      }
    }),
    props: ({ ownProps, data }) => {
      const { enabled, showInactive } = ownProps;

      const {
        firewall_rules_create_machine = [],
        loading,
        error,
        refetch
      } = data;

      const rules = forceArray(firewall_rules_create_machine)
        .filter(({ enabled }) => enabled || showInactive)
        .map(({ rule_obj, ...rule }) => ({
          ...rule,
          rule_obj: {
            ...rule_obj,
            from: forceArray(rule_obj.from).map(f => forceArray(f)),
            to: forceArray(rule_obj.to).map(t => forceArray(t))
          }
        }));

      return {
        defaultRules: rules.filter(({ tag }) => !tag),
        tagRules: rules.filter(({ tag }) => tag),
        loading,
        error,
        refetch
      };
    }
  })
)(Firewall);
