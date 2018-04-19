import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { destroy } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import { set } from 'react-redux-values';
import get from 'lodash.get';
import remcalc from 'remcalc';

import {
  Card,
  CardOutlet,
  ArrowIcon,
  Divider,
  H3,
  H5,
  P,
  Button,
  CnsIcon
} from 'joyent-ui-toolkit';

import SavedIcon from '@components/saved-icon';
import Cns, { AddServiceForm } from '@components/cns';
import VerticalDivider from '@components/vertical-divider';
import Description from '@components/description';
import GetAccount from '@graphql/get-account.gql';
import { addCnsService as validateServiceName } from '@state/validators';
import { Forms, Values } from '@root/constants';

const { IC_CNS_F, IC_NAME_F } = Forms;
const { IC_CNS_V_ENABLED, IC_CNS_V_PROCEEDED, IC_CNS_V_SERVICES } = Values;

const Header = ({ expanded }) => (
  <Flex alignCenter>
    <FlexItem>
      <CnsIcon />
    </FlexItem>
    <FlexItem>
      <VerticalDivider />
    </FlexItem>
    <FlexItem>
      <H3>Add CNS</H3>
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
        <Link to={`/instances/~create/cns`}>
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

const CNSContainer = ({
  submitted,
  expanded,
  proceeded,
  serviceNames = [],
  instanceName,
  cnsEnabled = true,
  hostnames = [],
  handleNext,
  handleEdit,
  handleToggleCnsEnabled,
  handleAddService,
  handleRemoveService,
  step,
  shouldAsyncValidate,
  handleAsyncValidate
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
              <Margin top={3} bottom={4}>
                <Description>
                  Triton CNS is used to automatically update hostnames for your
                  instances. You can serve multiple instances (with multiple IP
                  addresses) under the same hostname by matching the CNS service
                  names.{' '}
                  <a
                    href="https://docs.joyent.com/private-cloud/install/cns"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read the docs
                  </a>
                </Description>
              </Margin>
            ) : null}
            <div>
              {expanded && cnsEnabled ? (
                <Cns
                  hostnames={hostnames}
                  services={serviceNames}
                  onRemoveService={handleRemoveService}
                >
                  <ReduxForm
                    form={IC_CNS_F}
                    destroyOnUnmount={false}
                    forceUnregisterOnUnmount={true}
                    onSubmit={handleAddService}
                    shouldAsyncValidate={shouldAsyncValidate}
                    asyncValidate={handleAsyncValidate}
                  >
                    {props => <AddServiceForm {...props} />}
                  </ReduxForm>
                </Cns>
              ) : null}
              {expanded ? (
                <Button type="button" onClick={handleNext}>
                  Save
                </Button>
              ) : null}
              {expanded && cnsEnabled ? (
                <Margin top={3}>
                  <P>
                    *All hostnames listed here will be confirmed after
                    deployment.
                  </P>
                </Margin>
              ) : null}
              {proceeded && !expanded ? (
                <Flex>
                  <FlexItem>
                    <SavedIcon margin={{ right: 2, left: 0 }} inverted noIcon />
                  </FlexItem>
                  <FlexItem>
                    <H3>{cnsEnabled ? 'CNS enabled' : 'CNS not enabled'}</H3>
                  </FlexItem>
                </Flex>
              ) : null}
            </div>
          </Padding>
        </CardOutlet>
      </Card>
    </Margin>
  </Fragment>
);

export default compose(
  graphql(GetAccount, {
    options: () => ({
      ssr: false
    }),
    props: ({ data }) => {
      const id = get(data, 'account.id', '<account-id>');
      const datacenter = get(data, 'datacenter.name', '<dc>');

      return {
        id,
        datacenter
      };
    }
  }),
  connect(({ form, values }, { id, datacenter }) => {
    const proceeded = get(values, IC_CNS_V_PROCEEDED, false);
    const instanceName = get(form, `${IC_NAME_F}.values.name`, '<inst-name>');
    const serviceNames = get(values, IC_CNS_V_SERVICES, []);

    const hostnames = [
      {
        values: [`${instanceName}.inst.${id}.${datacenter}.triton.zone`],
        public: true
      },
      {
        values: [`${instanceName}.inst.${id}.${datacenter}.cns.joyent.com`]
      },
      {
        values: [],
        public: true,
        service: true
      },
      {
        values: [],
        service: true
      }
    ];

    hostnames.forEach(hostname => {
      if (!hostname.service) {
        return hostname;
      }

      serviceNames.forEach(name => {
        const postfix = hostname.public ? '.triton.zone' : '.cns.joyent.com';
        const value = `${name}.svc.${id}.${datacenter}${postfix}`;
        hostname.values.push(value);
      });
    });

    return {
      cnsEnabled: get(values, IC_CNS_V_ENABLED, true),
      instanceName,
      proceeded,
      hostnames,
      serviceNames
    };
  }),
  connect(null, (dispatch, { history, cnsEnabled, serviceNames = [] }) => ({
    handleNext: () => {
      dispatch(set({ name: IC_CNS_V_PROCEEDED, value: true }));
      return history.push(
        `/instances/~create/affinity${history.location.search}`
      );
    },
    handleEdit: () => {
      dispatch(set({ name: IC_CNS_V_PROCEEDED, value: true }));
      history.push(`/instances/~create/cns${history.location.search}`);
    },
    shouldAsyncValidate: ({ trigger }) => {
      return trigger === 'submit';
    },
    handleAsyncValidate: validateServiceName,
    handleToggleCnsEnabled: ({ target }) => {
      return dispatch(set({ name: IC_CNS_V_ENABLED, value: !cnsEnabled }));
    },
    handleAddService: ({ name }) => {
      return dispatch([
        destroy(IC_CNS_F),
        set({ name: IC_CNS_V_SERVICES, value: serviceNames.concat(name) })
      ]);
    },
    handleRemoveService: value => {
      return dispatch(
        set({
          name: IC_CNS_V_SERVICES,
          value: serviceNames.filter(name => name !== value)
        })
      );
    }
  }))
)(CNSContainer);
