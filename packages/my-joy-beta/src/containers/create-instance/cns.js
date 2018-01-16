import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { destroy } from 'redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { Margin, Padding } from 'styled-components-spacing';
import Flex from 'styled-flex-component';
import { set } from 'react-redux-values';
import punycode from 'punycode';
import remcalc from 'remcalc';

import {
  CnsIcon,
  P,
  Card,
  H3,
  Button,
  FormGroup,
  FormLabel,
  Toggle,
  Divider,
  TagList,
  StatusLoader
} from 'joyent-ui-toolkit';

import getAccount from '../../graphql/get-account.gql';

import {
  Hostname,
  Header,
  AddServiceForm,
  HostnamesHeader
} from '@components/create-instance/cns';
import Title from '@components/create-instance/title';
import Tag from '@components/instances/tags';
import Description from '@components/create-instance/description';

const CNS_FORM = 'create-instance-cns';

const CNSContainer = ({
  submitted,
  expanded,
  proceeded,
  serviceNames,
  instanceName,
  cnsEnabled = true,
  hostnames = [],
  handleNext,
  handleEdit,
  handleToggleCnsEnabled,
  handleAddService,
  handleRemoveService,
  loading
}) => (
  <Fragment>
    <Title icon={<CnsIcon />}>Container Name Service</Title>
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
        <Card>
          <Padding all={4} bottom={0}>
            <Header />
            {loading ? (
              <Margin all={2}>
                {' '}
                <StatusLoader />
              </Margin>
            ) : (
              <Flex column>
                {hostnames
                  .filter(({ service }) => !service)
                  .map(({ value, ...hostname }) => (
                    <Hostname key={value} value={value} {...hostname} />
                  ))}
              </Flex>
            )}
            <Divider height={remcalc(1)} />
            <Margin top={4}>
              <HostnamesHeader />
              {serviceNames.length ? (
                <Margin bottom={3}>
                  <FormLabel>Existing CNS service name(s)</FormLabel>
                  <Margin top={1}>
                    <TagList>
                      {serviceNames.map((value, index) => (
                        <Tag
                          active
                          key={index}
                          value={value}
                          onRemoveClick={() => handleRemoveService(index)}
                        />
                      ))}
                    </TagList>
                  </Margin>
                </Margin>
              ) : null}
              <ReduxForm
                form={`${CNS_FORM}-new-service`}
                destroyOnUnmount={false}
                forceUnregisterOnUnmount={true}
                onSubmit={handleAddService}
              >
                {props => <AddServiceForm {...props} />}
              </ReduxForm>
              <Margin top={4}>
                <Flex column>
                  {hostnames
                    .filter(({ service }) => service)
                    .map(({ value, ...hostname }) => (
                      <Hostname key={value} value={value} {...hostname} />
                    ))}
                </Flex>
              </Margin>
            </Margin>
          </Padding>
        </Card>
      ) : null}
      {expanded ? (
        <Fragment>
          <Margin bottom={4} top={4}>
            <FormGroup name="cns-enabled">
              <Flex alignCenter>
                <FormLabel>Disabled CNS</FormLabel>
                <Toggle checked={cnsEnabled} onChange={handleToggleCnsEnabled}>
                  Enabled CNS
                </Toggle>
              </Flex>
            </FormGroup>
          </Margin>
          <Margin bottom={4}>
            <P>
              *All hostnames listed here will be confirmed after deployment.
            </P>
          </Margin>
          <Margin bottom={4}>
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          </Margin>
        </Fragment>
      ) : null}
      {proceeded && !expanded ? (
        <Fragment>
          <Margin bottom={4}>
            <H3>{cnsEnabled ? 'CNS Enabled' : 'CNS Not Enabled'}</H3>
          </Margin>
          {cnsEnabled && serviceNames.length ? (
            <Fragment>
              <FormLabel>Existing CNS service name(s)</FormLabel>
              <Margin top={0.5}>
                <TagList>
                  {serviceNames.map((value, index) => (
                    <Tag key={index} value={value} />
                  ))}
                </TagList>
              </Margin>
            </Fragment>
          ) : null}
          <Margin bottom={4}>
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
  graphql(getAccount, {
    props: ({ data: { loading, account: { id } = [] } }) => ({
      loading,
      id
    })
  }),
  connect(({ form, values }, { id }) => {
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

    hostnames.map(hostname => {
      if (!hostname.service) {
        return hostname;
      }

      return serviceNames.map(name => {
        const postfix = hostname.public ? '.triton.zone' : '.cns.joyent.com';
        const value = `${name}.svc.${id}.${dataCenter}${postfix}`;
        hostname.values.push(value);
      });
    });

    return {
      cnsEnabled: get(values, `${CNS_FORM}-enabled`, true),
      instanceName,
      proceeded: get(values, `${CNS_FORM}-proceeded`, false),
      hostnames,
      serviceNames
    };
  }),
  connect(null, (dispatch, { history, cnsEnabled, serviceNames = [] }) => ({
    handleNext: () => {
      dispatch(set({ name: `${CNS_FORM}-proceeded`, value: true }));
      return history.push(`/instances/~create/affinity`);
    },
    handleEdit: () => history.push(`/instances/~create/cns`),
    handleToggleCnsEnabled: ({ target }) =>
      dispatch(set({ name: `${CNS_FORM}-enabled`, value: !cnsEnabled })),
    handleAddService: ({ name }) => {
      const serviceName = punycode.encode(
        name
          .toLowerCase()
          .split(' ')
          .join('-')
      );
      dispatch([
        destroy(`${CNS_FORM}-new-service`),
        set({
          name: `${CNS_FORM}-services`,
          value: serviceNames.concat(serviceName)
        })
      ]);
    },
    handleRemoveService: index => {
      serviceNames.splice(index, 1);

      return dispatch(
        set({ name: `${CNS_FORM}-services`, value: serviceNames.slice() })
      );
    }
  }))
)(CNSContainer);
