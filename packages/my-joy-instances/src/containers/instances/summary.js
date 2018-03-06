import React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import { Margin } from 'styled-components-spacing';
import intercept from 'apr-intercept';
import find from 'lodash.find';
import isArray from 'lodash.isarray';
import some from 'lodash.some';
import isInteger from 'lodash.isinteger';
import get from 'lodash.get';

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
import SummaryScreen from '@components/instances/summary';
import parseError from '@state/parse-error';
import Confirm from '@state/confirm';

export const Summary = ({
  instance,
  loading,
  loadingError,
  mutationError,
  handleAction,
  starting,
  stopping,
  rebooting,
  removing
}) => {
  const _loading = loading || !instance ? <StatusLoader /> : null;
  const _summary = !_loading &&
    instance && (
      <SummaryScreen
        instance={instance}
        starting={starting}
        stopping={stopping}
        rebooting={rebooting}
        removing={removing}
        onAction={handleAction}
      />
    );

  const _error = loadingError &&
    !_loading &&
    !instance && (
      <Margin bottom={4}>
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
  graphql(StartInstance, { name: 'start' }),
  graphql(RebootInstance, { name: 'reboot' }),
  graphql(RemoveInstance, { name: 'remove' }),
  graphql(GetInstance, {
    options: ({ match }) => ({
      ssr: false,
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => {
      let instance = find(get(rest, 'machines.results', []), [
        'name',
        variables.name
      ]);

      if (instance) {
        const { ips } = instance;

        const grupedIps = ips
          .map(ip => ({ ip, openness: isPrivate(ip) ? 'private' : 'public' }))
          .reduce(
            (sum, { ip, openness }) =>
              Object.assign(sum, {
                [openness]: (sum[openness] || []).concat([ip])
              }),
            {}
          );

        instance = Object.assign({}, instance, { ips: grupedIps });
      }

      return {
        instance,
        loading,
        loadingError: error
      };
    }
  }),
  connect(
    (state, ownProps) => {
      const { instance = {} } = ownProps;
      const { id } = instance;

      if (!id) {
        return ownProps;
      }

      return {
        ...ownProps,
        starting: state.values[`${id}-summary-starting`],
        stopping: state.values[`${id}-summary-stoping`],
        rebooting: state.values[`${id}-summary-rebooting`],
        removing: state.values[`${id}-summary-removeing`],
        mutationError: state.values[`${id}-summary-mutation-error`]
      };
    },
    (disptach, ownProps) => ({
      handleAction: async action => {
        const { instance } = ownProps;
        const { id } = instance;

        if (!await Confirm(`Do you want to ${action} "${instance.name}"?`)) {
          return;
        }

        const gerund = `${action}ing`;
        const name = `${id}-summary-${gerund}`;

        // sets loading to true
        disptach(
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

        return disptach([mutationError, setLoadingFalse].filter(Boolean));
      }
    })
  )
)(Summary);
