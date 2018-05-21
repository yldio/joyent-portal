import React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import forceArray from 'force-array';
import { Margin } from 'styled-components-spacing';
import find from 'lodash.find';
import reverse from 'lodash.reverse';
import sortBy from 'lodash.sortby';
import get from 'lodash.get';

import {
  ViewContainer,
  StatusLoader,
  Message,
  MessageTitle,
  MessageDescription,
  H3
} from 'joyent-ui-toolkit';

import { Network, Empty } from 'joyent-ui-resource-widgets';
import Description from '@components/instances/description';
import GetNetworks from '@graphql/list-instance-networks.gql';

export const Networks = ({
  networks = [],
  loading = false,
  error = null,
  setMachinesExpanded,
  setInfoExpanded
}) => (
  <ViewContainer main>
    <Margin bottom={3}>
      <Description href="https://docs.joyent.com/public-cloud/network/sdn">
        Use predefined or customized fabric networks which can be public-facing
        or private. All fabrics are isolated from other customers giving you
        complete control over the network environment. Read more on fabrics.
      </Description>
    </Margin>
    <Margin bottom={3}>
      <H3>Networks attached to this instance</H3>
    </Margin>
    {loading ? <StatusLoader /> : null}
    {!loading && error && !networks.length ? (
      <Margin bottom={5}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>
            An error occurred while loading your networks
          </MessageDescription>
        </Message>
      </Margin>
    ) : null}
    {!loading &&
      networks.map(({ id, infoExpanded, machinesExpanded, ...network }) => (
        <Network
          {...network}
          key={id}
          id={id}
          infoExpanded={infoExpanded}
          machinesExpanded={machinesExpanded}
          onInfoClick={() => setInfoExpanded(id, !infoExpanded)}
          onMachinesClick={() => setMachinesExpanded(id, !machinesExpanded)}
          selected
          readOnly
        />
      ))}
    {!loading && !error && !networks.length ? (
      <Empty transparent borderTop>
        You have no networks attached to this instance
      </Empty>
    ) : null}
  </ViewContainer>
);

export default compose(
  graphql(GetNetworks, {
    options: ({ match }) => ({
      variables: {
        id: get(match, 'params.instance')
      }
    }),
    props: ({ data }) => {
      console.log(data);
      const { loading, error, variables } = data;
      const { id } = variables;

      const machines = get(data, 'machine', []);
      const instance = find(forceArray(machines), ['id', id]);
      const values = get(instance, 'networks', []);
      const networks = reverse(sortBy(values, 'public'));
      return {
        networks,
        instance,
        loading,
        error
      };
    }
  }),
  connect(
    ({ values }, { networks }) => ({
      networks: networks.map(({ id, ...network }) => ({
        ...network,
        infoExpanded: get(values, `networks-${id}-info-expanded`, false),
        machinesExpanded: get(
          values,
          `networks-${id}-machines-expanded`,
          false
        ),
        id
      }))
    }),
    dispatch => ({
      setMachinesExpanded: (id, expanded) => {
        return dispatch(
          set({ name: `networks-${id}-machines-expanded`, value: expanded })
        );
      },
      setInfoExpanded: (id, expanded) => {
        return dispatch(
          set({ name: `networks-${id}-info-expanded`, value: expanded })
        );
      }
    })
  )
)(Networks);
