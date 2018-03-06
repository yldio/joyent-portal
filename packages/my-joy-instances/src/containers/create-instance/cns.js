import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { destroy } from 'redux-form';
import { connect } from 'react-redux';
import { Margin } from 'styled-components-spacing';
import { set } from 'react-redux-values';
import get from 'lodash.get';

import { CnsIcon, H3, Button } from 'joyent-ui-toolkit';

import Title from '@components/create-instance/title';
import Cns, { Footer, AddServiceForm } from '@components/cns';
import Description from '@components/description';
import GetAccount from '@graphql/get-account.gql';
import { addCnsService as validateServiceName } from '@state/validators';
import { Forms, Values } from '@root/constants';

const { IC_CNS_F, IC_NAME_F } = Forms;
const { IC_CNS_V_ENABLED, IC_CNS_V_PROCEEDED, IC_CNS_V_SERVICES } = Values;

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
    <Title
      id={step}
      onClick={!expanded && !proceeded && handleEdit}
      collapsed={!expanded && !proceeded}
      icon={<CnsIcon />}
    >
      Container Name Service
    </Title>
    {expanded ? (
      <Description>
        Triton CNS is used to automatically update hostnames for your instances.
        You can serve multiple instances (with multiple IP addresses) under the
        same hostname by matching the CNS service names.{' '}
        <a
          href="https://docs.joyent.com/private-cloud/install/cns"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the docs
        </a>
      </Description>
    ) : null}
    <div>
      {expanded && cnsEnabled ? (
        <Margin bottom={4}>
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
        </Margin>
      ) : null}
      {expanded ? (
        <Fragment>
          <Footer enabled={cnsEnabled} onToggle={handleToggleCnsEnabled} />
          <Margin bottom={7}>
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          </Margin>
        </Fragment>
      ) : null}
      {proceeded && !expanded ? (
        <Fragment>
          <Margin bottom={4}>
            <H3>{cnsEnabled ? 'CNS enabled' : 'CNS not enabled'}</H3>
          </Margin>
          <Margin bottom={7}>
            <Button type="button" onClick={handleEdit} secondary>
              Edit
            </Button>
          </Margin>
        </Fragment>
      ) : null}
    </div>
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
      proceeded: proceeded || serviceNames.length,
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
