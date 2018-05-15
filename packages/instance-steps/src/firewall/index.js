import React, { Fragment } from 'react';
import { Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import get from 'lodash.get';
import forceArray from 'force-array';

import Step, {
  Header as StepHeader,
  Description as StepDescription,
  Preview as StepPreview,
  Outlet as StepOutlet
} from 'joyent-ui-resource-step';

import { H3, Button, P, FirewallIcon } from 'joyent-ui-toolkit';

import {
  TagRules,
  DefaultRules,
  ToggleFirewallForm,
  ToggleInactiveForm,
  Empty
} from 'joyent-ui-resource-widgets';

import { Forms, Values } from '../constants';
import { Preview } from './components';
import ListFwRules from '../graphql/list-fw-rules.gql';

const { IC_FW_F_ENABLED, IC_FW_F_INACTIVE } = Forms;
const { IC_TAG_V_TAGS } = Values;

const Firewall = ({
  handleGetValue,
  preview = {},
  defaultRules = [],
  tagRules = [],
  loading = false,
  enabled = false,
  showInactiveRules = null,
  showInactive = false,
  ...props
}) => (
  <Step name="firewall" getValue={handleGetValue} {...props}>
    <StepHeader icon={<FirewallIcon />}>Firewall rules</StepHeader>
    <StepDescription href="https://docs.joyent.com/public-cloud/network/firewall">
      Cloud firewall rules secure instances by defining network traffic rules,
      controlling incoming and outgoing traffic. Enabling the firewall applies
      only rules which match your instance. Although these rules are created in
      the firewall console, the addition of tags can alter the firewall rules.
    </StepDescription>
    <StepPreview>
      <Margin top="3">
        <Preview {...preview} />
      </Margin>
    </StepPreview>
    <StepOutlet>
      {({ next }) => (
        <Fragment>
          <Margin top={5}>
            <Flex>
              <FlexItem>
                <ReduxForm
                  form={IC_FW_F_ENABLED}
                  destroyOnUnmount={false}
                  forceUnregisterOnUnmount={true}
                >
                  {props => (
                    <Margin right={5}>
                      <ToggleFirewallForm {...props} submitting={loading} />
                    </Margin>
                  )}
                </ReduxForm>
              </FlexItem>
              <FlexItem>
                <ReduxForm
                  form={IC_FW_F_INACTIVE}
                  destroyOnUnmount={false}
                  forceUnregisterOnUnmount={true}
                >
                  {props =>
                    enabled && !loading ? (
                      <ToggleInactiveForm {...props} />
                    ) : null
                  }
                </ReduxForm>
              </FlexItem>
            </Flex>
          </Margin>
          {enabled && !loading && !defaultRules.length && !tagRules.length ? (
            <Margin top={5}>
              <Empty borderTop>
                <Fragment>
                  <H3>No Firewall rules found</H3>
                  <Margin top={1}>
                    <P>
                      Try viewing inactive rules instead to see firewalls that
                      can potentially affect your instance
                    </P>
                  </Margin>
                  <Margin top={2}>
                    <Button
                      secondary
                      onClick={showInactiveRules}
                      disabled={showInactive}
                    >
                      View Inactive Rules
                    </Button>
                  </Margin>
                </Fragment>
              </Empty>
            </Margin>
          ) : null}
          {!loading && enabled && defaultRules.length ? (
            <Margin top={5}>
              <DefaultRules rules={defaultRules} />
            </Margin>
          ) : null}
          {!loading && enabled && tagRules.length ? (
            <Margin top={5}>
              <TagRules rules={tagRules} />
            </Margin>
          ) : null}
          {!loading && enabled && (tagRules.length || defaultRules.length) ? (
            <Margin top={5}>
              <P>
                *Other firewall rules may apply as defined by wildcard(s),
                IP(s), subnet(s), tag(s) or VM(s). Please see{' '}
                <a
                  href="https://apidocs.joyent.com/cloudapi/#firewall-rule-syntax"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  firewall rule list
                </a>{' '}
                for more details.
              </P>
            </Margin>
          ) : null}
          <Margin top={5}>
            <Button
              id={'next-button-firewall'}
              type="button"
              component={Link}
              to={next}
            >
              Next
            </Button>
          </Margin>
        </Fragment>
      )}
    </StepOutlet>
  </Step>
);

export default compose(
  connect(({ form, values }, ownProps) => ({
    ...ownProps,
    enabled:
      console.log(form, values) ||
      get(form, `${IC_FW_F_ENABLED}.values.enabled`, false),
    showInactive: get(form, `${IC_FW_F_INACTIVE}.values.inactive`, false),
    tags: get(values, IC_TAG_V_TAGS, [])
  })),
  graphql(ListFwRules, {
    options: ({ tags, expanded, enabled }) => ({
      ssr: false,
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

      const rules = forceArray(firewall_rules_create_machine).filter(
        ({ enabled }) => enabled || showInactive
      );

      const defaultRules = rules.filter(
        ({ rule_obj = {} }) => rule_obj.isWildcard
      );
      const tagRules = rules.filter(
        ({ rule_obj = {} }) => rule_obj.tags.length
      );

      return {
        defaultRules,
        tagRules,
        loading,
        error,
        refetch,
        handleGetValue: () => ({ enabled, defaultRules, tagRules })
      };
    }
  }),
  connect(null, (dispatch, { ...args }) => ({
    showInactiveRules: () =>
      dispatch(change(IC_FW_F_INACTIVE, 'inactive', true))
  }))
)(Firewall);
