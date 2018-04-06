import React, { Fragment } from 'react';
import { Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import { destroy } from 'redux-form';
import get from 'lodash.get';

import Step, {
  Header as StepHeader,
  Preview as StepPreview,
  Outlet as StepOutlet,
  StatusIcon
} from 'joyent-ui-resource-step';

import { H3, P, CnsIcon, Button, TickIcon } from 'joyent-ui-toolkit';

import {
  Cns,
  CnsAddServiceForm as AddServiceForm
} from 'joyent-ui-resource-widgets';

import GetAccount from '../graphql/get-account.gql';
import { addCnsService as validateServiceName } from '../validators';
import { Forms, Values } from '../constants';

const { IR_CNS_F, IR_NAME_F } = Forms;
const { IR_CNS_V_ENABLED, IR_CNS_V_SERVICES } = Values;

export const Preview = ({ enabled = false }) => (
  <Flex>
    <FlexItem>
      <Margin right="2">
        <StatusIcon
          fill="green"
          border="greenDark"
          Icon={() => <TickIcon fill="white" />}
        />
      </Margin>
    </FlexItem>
    <FlexItem>
      <H3>{enabled ? 'CNS enabled' : 'CNS not enabled'}</H3>
    </FlexItem>
  </Flex>
);

const CnsContainer = ({
  handleValidate,
  handleGetValue,
  handleAddService,
  handleRemoveService,
  handleToggleCnsEnabled,
  shouldAsyncValidate,
  preview = [],
  hostnames = [],
  serviceNames = [],
  cnsEnabled,
  ...props
}) => (
  <Step name="cns" getValue={handleGetValue} {...props}>
    <StepHeader icon={<CnsIcon />}>CNS</StepHeader>
    <StepPreview>
      <Margin top="3">
        <Preview enabled={preview.cnsEnabled} />
      </Margin>
    </StepPreview>
    <StepOutlet>
      {({ next }) => (
        <Fragment>
          <Cns
            hostnames={hostnames}
            services={serviceNames}
            onRemoveService={handleRemoveService}
          >
            <ReduxForm
              form={IR_CNS_F}
              destroyOnUnmount={false}
              forceUnregisterOnUnmount={true}
              onSubmit={handleAddService}
              shouldAsyncValidate={shouldAsyncValidate}
              asyncValidate={handleValidate}
            >
              {props => <AddServiceForm {...props} />}
            </ReduxForm>
          </Cns>
          <Margin top="5">
            <Button
              id="next-button-cns"
              type="button"
              component={Link}
              to={next}
            >
              Next
            </Button>
          </Margin>
          <Margin top="3">
            <P>
              *All hostnames listed here will be confirmed after deployment.
            </P>
          </Margin>
        </Fragment>
      )}
    </StepOutlet>
  </Step>
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
    const cnsEnabled = get(values, IR_CNS_V_ENABLED, true);

    if (!cnsEnabled) {
      return {
        cnsEnabled,
        handleGetValue: () => ({})
      };
    }

    const instanceName = get(form, `${IR_NAME_F}.values.name`, '<inst-name>');
    const serviceNames = get(values, IR_CNS_V_SERVICES, []);

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
    ].map(hostname => {
      if (!hostname.service) {
        return hostname;
      }

      const values = serviceNames.map(name => {
        const postfix = hostname.public ? '.triton.zone' : '.cns.joyent.com';
        return `${name}.svc.${id}.${datacenter}${postfix}`;
      });

      return {
        ...hostname,
        values
      };
    });

    return {
      cnsEnabled,
      instanceName,
      hostnames,
      serviceNames,
      handleGetValue: () => ({ cnsEnabled, serviceNames, hostnames })
    };
  }),
  connect(null, (dispatch, { history, cnsEnabled, serviceNames = [] }) => ({
    shouldAsyncValidate: ({ trigger }) => {
      return trigger === 'submit';
    },
    handleValidate: validateServiceName,
    handleToggleCnsEnabled: ({ target }) => {
      return dispatch(set({ name: IR_CNS_V_ENABLED, value: !cnsEnabled }));
    },
    handleAddService: ({ name }) => {
      return dispatch([
        destroy(IR_CNS_F),
        set({ name: IR_CNS_V_SERVICES, value: serviceNames.concat(name) })
      ]);
    },
    handleRemoveService: value => {
      return dispatch(
        set({
          name: IR_CNS_V_SERVICES,
          value: serviceNames.filter(name => name !== value)
        })
      );
    }
  }))
)(CnsContainer);
