import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { destroy } from 'redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { Margin } from 'styled-components-spacing';
import { set } from 'react-redux-values';
import punycode from 'punycode';

import { CnsIcon, H3, Button } from 'joyent-ui-toolkit';

import Title from '@components/create-instance/title';
import Cns, { Footer, AddServiceForm } from '@components/cns';
import Description from '@components/description';
import GetAccount from '@graphql/get-account.gql';
import { fieldError } from '@root/constants';

const CNS_FORM = 'create-instance-cns';

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
        Triton CNS is used to automatically update hostnames for your
        instances*. You can serve multiple instances (with multiple IP
        addresses) under the same hostname by matching the CNS service names.{' '}
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
              form={`${CNS_FORM}-new-service`}
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
    props: ({ data: { account: { id = '<account-id>' } = [] } }) => ({
      id
    })
  }),
  connect(({ form, values }, { id }) => {
    const proceeded = get(values, `${CNS_FORM}-proceeded`, false);
    const instanceName = get(
      form,
      'create-instance-name.values.name',
      '<instance-name>'
    );

    const serviceNames = get(values, `${CNS_FORM}-services`, []);

    // REPLACE WITH  DATA CENTER
    const dataCenter = 'us-east-1';

    const hostnames = [
      {
        values: [`${instanceName}.inst.${id}.${dataCenter}.triton.zone`],
        public: true
      },
      {
        values: [`${instanceName}.inst.${id}.${dataCenter}.cns.joyent.com`]
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
        const value = `${name}.svc.${id}.${dataCenter}${postfix}`;
        hostname.values.push(value);
      });
    });

    return {
      cnsEnabled: get(values, `${CNS_FORM}-enabled`, true),
      instanceName,
      proceeded: proceeded || serviceNames.length,
      hostnames,
      serviceNames
    };
  }),
  connect(null, (dispatch, { history, cnsEnabled, serviceNames = [] }) => ({
    handleNext: () => {
      dispatch(set({ name: `${CNS_FORM}-proceeded`, value: true }));
      return history.push(`/~create/affinity${history.location.search}`);
    },
    handleEdit: () => {
      dispatch(set({ name: `${CNS_FORM}-proceeded`, value: true }));
      history.push(`/~create/cns${history.location.search}`);
    },
    shouldAsyncValidate: ({ trigger }) => trigger === 'change',
    handleAsyncValidate: async ({ name = '', value = '' }) => {
      const isNameValid = /^[a-zA-Z_.-]{1,16}$/.test(name);
      const isValueValid = /^[a-zA-Z_.-]{1,16}$/.test(value);

      if (isNameValid && isValueValid) {
        return;
      }

      throw {
        name: isNameValid ? null : fieldError,
        value: isValueValid ? null : fieldError
      };
    },
    handleToggleCnsEnabled: ({ target }) =>
      dispatch(set({ name: `${CNS_FORM}-enabled`, value: !cnsEnabled })),
    handleAddService: ({ name }) => {
      const serviceName = punycode
        .encode(name.toLowerCase().replace(/\s/g, '-'))
        .replace(/-$/, '');

      dispatch([
        destroy(`${CNS_FORM}-new-service`),
        set({
          name: `${CNS_FORM}-services`,
          value: serviceNames.concat(serviceName)
        })
      ]);
    },
    handleRemoveService: value => {
      return dispatch(
        set({
          name: `${CNS_FORM}-services`,
          value: serviceNames.filter(name => name !== value)
        })
      );
    }
  }))
)(CNSContainer);