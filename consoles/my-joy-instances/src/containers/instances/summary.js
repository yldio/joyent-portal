import React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import { stopSubmit } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import intercept from 'apr-intercept';
import isArray from 'lodash.isarray';
import some from 'lodash.some';
import isInteger from 'lodash.isinteger';
import get from 'lodash.get';
import ReduxForm from 'declarative-redux-form';

import {
  ViewContainer,
  StatusLoader,
  Message,
  MessageDescription,
  MessageTitle
} from 'joyent-ui-toolkit';

import GetInstance from '@graphql/get-instance.gql';
import StartInstance from '@graphql/start-instance.gql';
import StopInstance from '@graphql/stop-instance.gql';
import RebootInstance from '@graphql/reboot-instance.gql';
import RemoveInstance from '@graphql/remove-instance.gql';
import RenameMachine from '@graphql/rename-machine.gql';
import SummaryScreen from '@components/instances/summary';
import parseError from '@state/parse-error';
import Confirm from '@state/confirm';
import { instanceName as validateName } from '@state/validators';

const FORM = 'change-name';

export const Summary = ({
  instance,
  loading,
  loadingError,
  mutationError,
  handleAction,
  starting,
  stopping,
  rebooting,
  removing,
  editName,
  editingName,
  handleChangeName,
  handleAsyncValidate,
  shouldAsyncValidate
}) => {
  const _loading =
    loading || (!instance && !loadingError) ? <StatusLoader /> : null;

  const _summary = !_loading &&
    instance && (
      <ReduxForm
        form={FORM}
        onSubmit={handleChangeName}
        initialValues={{ name: instance.name }}
        asyncValidate={handleAsyncValidate}
        shouldAsyncValidate={shouldAsyncValidate}
      >
        {props => (
          <SummaryScreen
            {...props}
            instance={instance}
            starting={starting}
            stopping={stopping}
            rebooting={rebooting}
            removing={removing}
            onAction={handleAction}
            editName={editName}
            editingName={editingName}
          />
        )}
      </ReduxForm>
    );

  const _error = loadingError &&
    !_loading &&
    !instance && (
      <Margin bottom={5}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>
            An error occurred while loading your instance summary
          </MessageDescription>
        </Message>
      </Margin>
    );

  const _mutationError = mutationError && (
    <Message error>
      <MessageTitle>Ooops!</MessageTitle>
      <MessageDescription>{mutationError}</MessageDescription>
    </Message>
  );

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_loading}
      {_error}
      {_mutationError}
      {_summary}
    </ViewContainer>
  );
};

// from https://github.com/natesilva/is-in-subnet
const ipv4ToLong = ip => {
  const octets = ip.split('.');

  return (
    ((parseInt(octets[0], 10) << 24) +
      (parseInt(octets[1], 10) << 16) +
      (parseInt(octets[2], 10) << 8) +
      parseInt(octets[3], 10)) >>>
    0
  );
};

// from https://github.com/natesilva/is-in-subnet
const isInSubnet = (address, subnetOrSubnets) => {
  if (isArray(subnetOrSubnets)) {
    return some(subnetOrSubnets, subnet => isInSubnet(address, subnet));
  }

  const subnet = subnetOrSubnets;

  const [subnetAddress, prefixLengthString] = subnet.split('/');
  const prefixLength = parseInt(prefixLengthString, 10);

  if (!subnetAddress || !isInteger(prefixLength)) {
    return;
  }

  if (prefixLength < 0 || prefixLength > 32) {
    return;
  }

  // the next two lines throw if the addresses are not valid IPv4 addresses
  const subnetLong = ipv4ToLong(subnetAddress);
  const addressLong = ipv4ToLong(address);

  if (prefixLength === 0) {
    return true;
  }

  const subnetPrefix = subnetLong >> (32 - prefixLength);
  const addressPrefix = addressLong >> (32 - prefixLength);

  return subnetPrefix === addressPrefix;
};

// from https://github.com/natesilva/is-in-subnet
const isPrivate = address => {
  return isInSubnet(address, ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16']);
};

export default compose(
  graphql(StopInstance, { name: 'stop' }),
  graphql(RenameMachine, { name: 'rename' }),
  graphql(StartInstance, { name: 'start' }),
  graphql(RebootInstance, { name: 'reboot' }),
  graphql(RemoveInstance, { name: 'remove' }),
  graphql(GetInstance, {
    options: ({ match }) => ({
      ssr: false,
      pollInterval: 1000,
      variables: {
        id: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, machine, ...rest } }) => {
      if (machine) {
        const { ips } = machine;

        const grupedIps = ips
          .map(ip => ({ ip, openness: isPrivate(ip) ? 'private' : 'public' }))
          .reduce(
            (sum, { ip, openness }) =>
              Object.assign(sum, {
                [openness]: (sum[openness] || []).concat([ip])
              }),
            {}
          );

        machine = Object.assign({}, machine, { ips: grupedIps });
      }

      return {
        instance: machine,
        loading,
        loadingError: error
      };
    }
  }),
  connect(
    ({ values }, ownProps) => {
      const { instance = {} } = ownProps;
      const { id } = instance;

      if (!id) {
        return ownProps;
      }

      return {
        ...ownProps,
        editingName: get(values, 'editing-name', false),
        starting: values[`${id}-summary-starting`],
        stopping: values[`${id}-summary-stoping`],
        rebooting: values[`${id}-summary-rebooting`],
        removing: values[`${id}-summary-removeing`],
        mutationError: values[`${id}-summary-mutation-error`]
      };
    },
    (dispatch, ownProps) => ({
      shouldAsyncValidate: ({ trigger }) => {
        return trigger === 'change';
      },
      handleAsyncValidate: validateName,
      editName: () =>
        dispatch(
          set({
            name: `editing-name`,
            value: true
          })
        ),
      handleChangeName: async ({ name, id }) => {
        const { instance } = ownProps;

        if (name === instance.name) {
          return dispatch(
            set({
              name: `editing-name`,
              value: false
            })
          );
        }
        const [err] = await intercept(
          ownProps.rename({
            variables: {
              name,
              id: get(ownProps, 'match.params.instance')
            }
          })
        );

        if (err) {
          return dispatch(
            stopSubmit(FORM, {
              _error: parseError(err)
            })
          );
        }

        dispatch(
          set({
            name: `editing-name`,
            value: false
          })
        );
      },
      handleAction: async action => {
        const { instance } = ownProps;
        const { id } = instance;

        if (!await Confirm(`Do you want to ${action} "${instance.name}"?`)) {
          return;
        }

        const gerund = `${action}ing`;
        const name = `${id}-summary-${gerund}`;

        // sets loading to true
        dispatch(
          set({
            name,
            value: true
          })
        );

        // calls mutation and waits while loading is still true
        const [err] = await intercept(
          ownProps[action]({
            variables: { id }
          })
        );

        if (!err && action === 'remove') {
          const { history } = ownProps;
          return history.push('/instances');
        }

        // after mutation, sets loading back to false
        const setLoadingFalse = set({
          name,
          value: false
        });

        // if error, sets error value
        const mutationError =
          err &&
          set({
            name: `${id}-summary-mutation-error`,
            value: parseError(err)
          });

        return dispatch([mutationError, setLoadingFalse].filter(Boolean));
      }
    })
  )
)(Summary);
