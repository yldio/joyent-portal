import React from 'react';
import PropTypes from 'prop-types';
import forceArray from 'force-array';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';

import {
  ViewContainer,
  StatusLoader,
  Message,
  MessageDescription,
  MessageTitle,
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  P
} from 'joyent-ui-toolkit';

import GetNetworks from '@graphql/list-networks.gql';
import { Network as InstanceNetwork } from '@components/instances';

const Networks = ({ networks = [], loading, error }) => {
  const values = forceArray(networks);
  const _loading = !(loading && !values.length) ? null : <StatusLoader />;

  const _networks =
    _loading && !values.length ? null : (
      <Table>
        <TableThead>
          <TableTr>
            <TableTh left bottom>
              <P>Name</P>
            </TableTh>
            <TableTh xs="90" left bottom>
              <P>Gateway</P>
            </TableTh>
            <TableTh xs="90" left bottom>
              <P>Subnet</P>
            </TableTh>
            <TableTh xs="90" left bottom>
              <P>Resolvers</P>
            </TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {values.map(network => (
            <InstanceNetwork key={network.id} {...network} />
          ))}
        </TableTbody>
      </Table>
    );

  const _error =
    error && !values.length && !_loading ? (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>
          An error occurred while loading your instance networks
        </MessageDescription>
      </Message>
    ) : null;

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_loading}
      {_error}
      {_networks}
    </ViewContainer>
  );
};

Networks.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  graphql(GetNetworks, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => ({
      networks: get(
        find(get(rest, 'machines', []), ['name', variables.name]),
        'networks',
        []
      ),
      loading,
      error
    })
  })
)(Networks);
