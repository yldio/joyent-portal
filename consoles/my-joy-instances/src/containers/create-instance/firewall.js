/* eslint-disable camelcase */
import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { set } from 'react-redux-values';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import get from 'lodash.get';
import forceArray from 'force-array';
import remcalc from 'remcalc';

import {
  Card,
  CardOutlet,
  ArrowIcon,
  Divider,
  FirewallIcon,
  H3,
  H5,
  Button,
  P
} from 'joyent-ui-toolkit';

import {
  ToggleFirewallForm,
  ToggleInactiveForm,
  TagRules,
  DefaultRules
} from '@components/firewall';

import SavedIcon from '@components/saved-icon';
import Description from '@components/description';
import VerticalDivider from '@components/vertical-divider';
import Empty from '@components/empty';
import ListFwRules from '@graphql/list-fw-rules.gql';
import { Forms, Values } from '@root/constants';

const { IC_FW_F_ENABLED, IC_FW_F_INACTIVE } = Forms;
const { IC_FW_V_PROCEEDED, IC_TAG_V_TAGS } = Values;

const Header = ({ expanded }) => (
  <Flex alignCenter>
    <FlexItem>
      <FirewallIcon />
    </FlexItem>
    <FlexItem>
      <VerticalDivider />
    </FlexItem>
    <FlexItem>
      <H3>Enable firewall rules</H3>
    </FlexItem>
    <FlexItem>
      <VerticalDivider />
    </FlexItem>
    <FlexItem alignCenter>
      {expanded ? (
        <Link to={`/instances/~create`}>
          <Flex alignCenter>
            Collapse
            <Margin left={0.5}>
              <ArrowIcon direction="up" />
            </Margin>
          </Flex>
        </Link>
      ) : (
        <Link to={`/instances/~create/firewall`}>
          <Flex alignCenter>
            Expand
            <Margin left={0.5}>
              <ArrowIcon />
            </Margin>
          </Flex>
        </Link>
      )}
    </FlexItem>
  </Flex>
);

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
    <Margin bottom={4}>
      <Card>
        <CardOutlet>
          <Padding all={4}>
            <Flex justifyBetween>
              <FlexItem>
                <Header expanded={expanded} />
              </FlexItem>
              {proceeded ? (
                <FlexItem>
                  <SavedIcon />
                </FlexItem>
              ) : (
                <FlexItem>
                  <H5>Optional</H5>
                </FlexItem>
              )}
            </Flex>
            {expanded || proceeded ? (
              <Margin vertical={3}>
                <Divider height={remcalc(1)} />
              </Margin>
            ) : null}
            {expanded ? (
              <Description>
                Cloud Firewall rules control traffic across instances. Enabling
                the firewall adds a default set of rules and rules defined by
                your chosen tags.{' '}
                <a
                  target="__blank"
                  href="https://docs.joyent.com/public-cloud/network/firewall"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              </Description>
            ) : null}
            {expanded ? (
              <Margin top={4}>
                <Flex>
                  <FlexItem>
                    <ReduxForm
                      form={IC_FW_F_ENABLED}
                      destroyOnUnmount={false}
                      forceUnregisterOnUnmount={true}
                    >
                      {props =>
                        expanded ? (
                          <Margin right={4}>
                            <ToggleFirewallForm
                              {...props}
                              submitting={loading}
                              left
                            />
                          </Margin>
                        ) : null
                      }
                    </ReduxForm>
                  </FlexItem>
                  <FlexItem>
                    <ReduxForm
                      form={IC_FW_F_INACTIVE}
                      destroyOnUnmount={false}
                      forceUnregisterOnUnmount={true}
                    >
                      {props =>
                        enabled && expanded && !loading ? (
                          <ToggleInactiveForm {...props} />
                        ) : null
                      }
                    </ReduxForm>
                  </FlexItem>
                </Flex>
              </Margin>
            ) : null}
            {enabled &&
            expanded &&
            !loading &&
            !defaultRules.length &&
            !tagRules.length ? (
              <Margin top={4}>
                <Empty borderTop>
                  Sorry, but we weren’t able to find any firewall rules.
                </Empty>
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
            {!loading &&
            expanded &&
            enabled &&
            (tagRules.length || defaultRules.length) ? (
              <Margin TOP={4}>
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
            {proceeded && !expanded ? (
              <Flex>
                <FlexItem>
                  <SavedIcon margin={{ right: 2, left: 0 }} inverted noIcon />
                </FlexItem>
                <FlexItem>
                  <H3>
                    {enabled ? 'Firewall enabled' : 'Firewall not enabled'}
                  </H3>
                </FlexItem>
              </Flex>
            ) : null}
            {expanded ? (
              <Margin top={4}>
                <Button type="button" onClick={handleNext}>
                  Save
                </Button>
              </Margin>
            ) : null}
          </Padding>
        </CardOutlet>
      </Card>
    </Margin>
  </Fragment>
);

export default compose(
  connect(
    ({ form, values }, ownProps) => ({
      ...ownProps,
      proceeded: get(values, IC_FW_V_PROCEEDED, false),
      enabled: get(form, `${IC_FW_F_ENABLED}.values.enabled`, false),
      showInactive: get(form, `${IC_FW_F_INACTIVE}.values.inactive`, false),
      tags: get(values, IC_TAG_V_TAGS, [])
    }),
    (dispatch, { history }) => ({
      handleNext: () => {
        dispatch(set({ name: IC_FW_V_PROCEEDED, value: true }));
        return history.push(`/instances/~create/cns${history.location.search}`);
      },
      handleEdit: () => {
        dispatch(set({ name: IC_FW_V_PROCEEDED, value: true }));
        return history.push(
          `/instances/~create/firewall${history.location.search}`
        );
      }
    })
  ),
  graphql(ListFwRules, {
    options: ({ tags, expanded, enabled }) => ({
      ssr: false,
      fetchPolicy: expanded && enabled ? 'cache-first' : 'cache-only',
      variables: {
        tags: tags.map(({ name, value }) => ({ name, value }))
      }
    }),
    props: ({ ownProps, data }) => {
      const { showInactive } = ownProps;

      const {
        firewall_rules_create_machine = [],
        loading,
        error,
        refetch
      } = data;

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
