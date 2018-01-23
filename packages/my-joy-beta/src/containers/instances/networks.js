import React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import forceArray from 'force-array';
import { Margin } from 'styled-components-spacing';
import find from 'lodash.find';
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

import Network from '@components/network';
import Description from '@components/description';
import GetNetworks from '@graphql/list-instance-networks.gql';

export const Networks = ({
  networks = [],
  loading = false,
  error = null,
  setMachinesExpanded,
  setInfoExpanded
}) => (
  <ViewContainer main>
    <Margin bottom={1}>
      <Description>
        Use predefined or customized fabric networks which can be public-facing
        or private. All fabrics are isolated from other customers giving you
        complete control over the network environment. Read more on fabrics.{' '}
        <a
          target="__blank"
          href="https://docs.joyent.com/public-cloud/network/sdn"
        >
          Read more
        </a>
      </Description>
    </Margin>
    <H3>Networks attached to this instance</H3>
    {loading ? <StatusLoader /> : null}
    {!loading && error ? (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>
          An error occurred while loading your networks
        </MessageDescription>
      </Message>
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
  </ViewContainer>
);

export default compose(
  graphql(GetNetworks, {
    options: ({ match }) => ({
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data }) => {
      const { machines, loading, error, variables } = data;
      const { name } = variables;

      const instance = find(forceArray(machines), ['name', name]);
      const values = get(instance, 'networks', []);
      const networks = sortBy(values, 'public').reverse();

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
