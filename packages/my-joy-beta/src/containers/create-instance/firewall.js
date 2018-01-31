/* eslint-disable camelcase */
import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { set } from 'react-redux-values';
import { connect } from 'react-redux';
import { Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import get from 'lodash.get';
import forceArray from 'force-array';

import { FirewallIcon, H3, Button, P } from 'joyent-ui-toolkit';

import {
  ToggleFirewallForm,
  ToggleInactiveForm,
  TagRules,
  DefaultRules
} from '@components/firewall';

import Title from '@components/create-instance/title';
import Animated from '@containers/create-instance/animated';
import Description from '@components/description';
import Empty from '@components/empty';
import ListFwRules from '@graphql/list-fw-rules.gql';

const FORM_NAME = 'CREATE-INSTANCE-FIREWALL';

const Firewall = ({
  defaultRules = [],
  tagRules = [],
  expanded = false,
  proceeded = false,
  loading = false,
  enabled = false,
  handleNext,
  handleEdit,
  step
}) => (
  <Fragment>
    <Title
      id={step}
      onClick={!expanded && !proceeded && handleEdit}
      collapsed={!expanded && !proceeded}
      icon={<FirewallIcon />}>
      Firewall
    </Title>
    {expanded ? (
      <Description>
        Cloud Firewall rules control traffic across instances. Enabling the firewall adds a default
        set of rules and rules defined by your chosen tags.{' '}
        <a
          target="__blank"
          href="https://docs.joyent.com/public-cloud/network/firewall"
          rel="noopener noreferrer">
          Read more
        </a>
      </Description>
    ) : null}
    <Flex>
      <FlexItem>
        <ReduxForm
          form={`${FORM_NAME}-enabled`}
          destroyOnUnmount={false}
          forceUnregisterOnUnmount={true}>
          {props =>
            expanded ? (
              <Margin right={4}>
                <ToggleFirewallForm {...props} submitting={loading} left />
              </Margin>
            ) : null}
        </ReduxForm>
      </FlexItem>
      <FlexItem>
        <ReduxForm
          form={`${FORM_NAME}-inactive`}
          destroyOnUnmount={false}
          forceUnregisterOnUnmount={true}>
          {props => (enabled && expanded && !loading ? <ToggleInactiveForm {...props} /> : null)}
        </ReduxForm>
      </FlexItem>
    </Flex>
    {enabled && expanded && !loading && !defaultRules.length && !tagRules.length ? (
      <Margin top={4}>
        <Empty>Sorry, but we weren’t able to find any firewall rules.</Empty>
      </Margin>
    ) : null}
    {!loading && expanded && enabled && defaultRules.length ? (
      <Margin top={4}>
        <DefaultRules rules={defaultRules} />
      </Margin>
    ) : null}
    {!loading && expanded && enabled && tagRules.length ? (
      <Margin top={4}>
        <TagRules rules={tagRules} />
      </Margin>
    ) : null}
    {!loading && expanded && enabled && (tagRules.length || defaultRules.length) ? (
      <Margin TOP={4}>
        <P>
          *Other firewall rules may apply as defined by wildcard(s), IP(s), subnet(s), tag(s) or
          VM(s). Please see{' '}
          <a
            href="https://apidocs.joyent.com/cloudapi/#firewall-rule-syntax"
            target="_blank"
            rel="noopener noreferrer">
            firewall rule list
          </a>{' '}
          for more details.
        </P>
      </Margin>
    ) : null}
    {proceeded && !expanded ? (
      <Margin bottom={4}>
        <H3>{enabled ? 'Firewall Enabled' : 'Firewall Not Enabled'}</H3>
      </Margin>
    ) : null}
    {expanded ? (
      <Margin top={4} bottom={7}>
        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      </Margin>
    ) : proceeded ? (
      <Margin top={4} bottom={7}>
        <Button type="button" onClick={handleEdit} secondary>
          Edit
        </Button>
      </Margin>
    ) : null}
  </Fragment>
);

export default compose(
  Animated,
  connect(
    ({ form, values }, ownProps) => ({
      ...ownProps,
      proceeded: get(values, 'create-instance-firewall-proceeded', false),
      enabled: get(form, `${FORM_NAME}-enabled.values.enabled`, false),
      showInactive: get(form, `${FORM_NAME}-inactive.values.inactive`, false),
      tags: get(values, 'create-instance-tags', [])
    }),
    (dispatch, { history }) => ({
      handleNext: () => {
        dispatch(set({ name: 'create-instance-firewall-proceeded', value: true }));

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
      const { showInactive } = ownProps;

      const { firewall_rules_create_machine = [], loading, error, refetch } = data;

      const rules = forceArray(firewall_rules_create_machine).filter(
        ({ enabled }) => enabled || showInactive
      );

      return {
        defaultRules: rules.filter(({ rule_obj = {} }) => rule_obj.isWildcard),
        tagRules: rules.filter(({ rule_obj = {} }) => rule_obj.tags.length),
        loading,
        error,
        refetch
      };
    }
  })
)(Firewall);

// <ReduxForm
//   form="fw-enabled"
//   destroyOnUnmount={false}
//   forceUnregisterOnUnmount={true}
//   initialValues={{ enabled }}
//   onSubmit={handleEnabledToggle}
// >
//   {props =>
//     loading ? null : (
//       <Fragment>
//         <Margin bottom={7}>
//           <ToggleFirewallForm {...props} />
//         </Margin>
//         <Divider height={remcalc(1)} />
//       </Fragment>
//     )
//   }
// </ReduxForm>
// <ReduxForm
//   form="fw-inactive"
//   destroyOnUnmount={false}
//   forceUnregisterOnUnmount={true}
//   initialValues={{ inactive }}
// >
//   {props =>
//     !enabled || loading ? null : (
//       <Margin top={4}>
//         <ToggleInactiveForm {...props} />
//       </Margin>
//     )
//   }
// </ReduxForm>
// {!loading && !defaultRules.length && !tagRules.length ? (
//   <Margin top={5}>
//     <Empty>Sorry, but we weren’t able to find any firewall rules.</Empty>
//   </Margin>
// ) : null}
// {!loading && enabled && defaultRules.length ? (
//   <Margin top={5}>
//     <DefaultRules rules={defaultRules} />
//   </Margin>
// ) : null}
// {!loading && enabled && tagRules.length ? (
//   <Margin top={8}>
//     <TagRules rules={tagRules} />
//   </Margin>
// ) : null}
//
//
//
//
//
//
// <ReduxForm
//   form={FORM_NAME}
//   destroyOnUnmount={false}
//   forceUnregisterOnUnmount={true}
// >
//   {props =>
//     expanded && !loading ? (
//       <FirewallForm
//         {...props}
//         defaultRules={defaultRules}
//         tagRules={tagRules}
//         enabled={enabled}
//       />
//     ) : null
//   }
// </ReduxForm>
// {expanded ? (
//   <Margin bottom={4}>
//     <Button type="button" onClick={handleNext}>
//       Next
//     </Button>
//   </Margin>
// ) : proceeded ? (
//   <Margin bottom={4}>
//     <Button type="button" onClick={handleEdit} secondary>
//       Edit
//     </Button>
//   </Margin>
// ) : null}
