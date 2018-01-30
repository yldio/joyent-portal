import React, { Fragment } from 'react';
import { set } from 'react-redux-values';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { Margin } from 'styled-components-spacing';
import forceArray from 'force-array';
import includes from 'lodash.includes';
import get from 'lodash.get';

import { NetworkIcon, Button, H3, StatusLoader } from 'joyent-ui-toolkit';

import Title from '@components/create-instance/title';
import Network from '@components/create-instance/network';
import Animated from '@containers/create-instance/animated';
import Description from '@components/description';
import ListNetworks from '@graphql/list-networks.gql';

const FORM_NAME = 'CREATE-INSTANCE-NETWORKS';

export const Networks = ({
  networks = [],
  selected = [],
  expanded = false,
  proceeded = false,
  loading = false,
  setInfoExpanded,
  setMachinesExpanded,
  handleNext,
  handleEdit,
  step
}) => (
  <Fragment>
    <Title
      id={step}
      onClick={!expanded && !proceeded && handleEdit}
      collapsed={!expanded && !proceeded}
      icon={<NetworkIcon />}
    >
      Networks
    </Title>
    {expanded ? (
      <Description>
        Instances are automatically connected to a private fabric network, which
        is the best choice for internal communication within your application.
        Data center networks are the best choice for exposing your application
        to the public internet (if the data center network is a public network).{' '}
        <a
          target="__blank"
          href="https://docs.joyent.com/public-cloud/network/sdn"
          rel="noopener noreferrer"
        >
          Read more
        </a>
      </Description>
    ) : null}
    {proceeded && !expanded ? (
      <H3>
        {selected.length} network{selected.length === 1 ? '' : 's'} added
      </H3>
    ) : null}
    {loading && expanded ? <StatusLoader /> : null}
    <ReduxForm
      form={FORM_NAME}
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
    >
      {props =>
        !loading ? (
          <form>
            {networks.map(
              ({ id, selected, infoExpanded, machinesExpanded, ...network }) =>
                expanded || (selected && proceeded) ? (
                  <Network
                    key={id}
                    id={id}
                    selected={selected}
                    infoExpanded={infoExpanded}
                    machinesExpanded={machinesExpanded}
                    small={!expanded && selected}
                    onInfoClick={() => setInfoExpanded(id, !infoExpanded)}
                    onMachinesClick={() =>
                      setMachinesExpanded(id, !machinesExpanded)
                    }
                    {...network}
                  />
                ) : null
            )}
          </form>
        ) : null
      }
    </ReduxForm>
    {!loading ? (
      expanded ? (
        <Margin bottom={7}>
          <Button type="button" onClick={handleNext}>
            Next
          </Button>
        </Margin>
      ) : proceeded ? (
        <Margin top={4} bottom={7}>
          <Button type="button" onClick={handleEdit} secondary>
            Edit
          </Button>
        </Margin>
      ) : null
    ) : null}
  </Fragment>
);

export default compose(
  Animated,
  graphql(ListNetworks, {
    props: ({ data }) => {
      const { networks = [], loading = false, error = null, refetch } = data;

      return {
        networks: forceArray(networks),
        loading,
        error,
        refetch
      };
    }
  }),
  connect(
    ({ values, form }, { networks }) => {
      const selected = get(form, `${FORM_NAME}.values`, {});
      const empty = id => !includes(Object.keys(selected), id);

      const _networks = networks
        .map(({ id, name, ...network }) => ({
          ...network,
          name,
          selected:
            empty(id) && name === 'Joyent-SDC-Public'
              ? true
              : Boolean(selected[id]),
          infoExpanded: get(
            values,
            `create-instance-networks-${id}-info-expanded`,
            false
          ),
          machinesExpanded: get(
            values,
            `create-instance-networks-${id}-machines-expanded`,
            false
          ),
          id
        }))
        .sort((a, b) => a.name < b.name);

      return {
        proceeded: get(values, 'create-instance-networks-proceeded', false),
        networks: networks
          .map(({ id, name, ...network }) => ({
            ...network,
            name,
            selected:
              empty(id) && name === 'Joyent-SDC-Public'
                ? true
                : Boolean(selected[id]),
            infoExpanded: get(
              values,
              `create-instance-networks-${id}-expanded`,
              false
            ),
            id
          }))
          .sort((a, b) => a.name < b.name)
      };
    },
    (dispatch, { history }) => ({
      handleNext: () => {
        dispatch(
          set({ name: 'create-instance-networks-proceeded', value: true })
        );

        return history.push('/instances/~create/firewall');
      },
      handleEdit: () => {
        return history.push('/instances/~create/networks');
      },
      setInfoExpanded: (id, expanded) => {
        return dispatch(
          set({
            name: `create-instance-networks-${id}-info-expanded`,
            value: expanded
          })
        );
      },
      setMachinesExpanded: (id, expanded) => {
        return dispatch(
          set({
            name: `create-instance-networks-${id}-machines-expanded`,
            value: expanded
          })
        );
      }
    })
  )
)(Networks);
