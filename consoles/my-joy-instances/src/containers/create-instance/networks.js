import React, { Fragment } from 'react';
import { set } from 'react-redux-values';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import remcalc from 'remcalc';
import forceArray from 'force-array';
import includes from 'lodash.includes';
import find from 'lodash.find';
import get from 'lodash.get';

import {
  Card,
  CardOutlet,
  ArrowIcon,
  Divider,
  H3,
  NetworkIcon,
  Button,
  StatusLoader
} from 'joyent-ui-toolkit';

import SavedIcon from '@components/saved-icon';
import Network from '@components/network';
import Description from '@components/description';
import VerticalDivider from '@components/vertical-divider';
import ListNetworks from '@graphql/list-networks.gql';
import { Forms, Values } from '@root/constants';

const { IC_NW_F } = Forms;
const {
  IC_NW_V_PROCEEDED,
  IC_NW_V_INFO_EXPANDED,
  IC_NW_V_MACHINES_EXPANDED
} = Values;

const Header = ({ expanded }) => (
  <Flex alignCenter>
    <FlexItem>
      <NetworkIcon />
    </FlexItem>
    <FlexItem>
      <VerticalDivider />
    </FlexItem>
    <FlexItem>
      <H3>Attach to networks</H3>
    </FlexItem>
    <FlexItem>
      <VerticalDivider />
    </FlexItem>
    <FlexItem alignCenter>
      {expanded ? (
        <Link to={`/instances/~create`}>
          <Flex alignCenter>
            Collapse
            <Margin left={0.5}>
              <ArrowIcon direction="up" />
            </Margin>
          </Flex>
        </Link>
      ) : (
        <Link to={`/instances/~create/networks`}>
          <Flex alignCenter>
            Expand
            <Margin left={0.5}>
              <ArrowIcon />
            </Margin>
          </Flex>
        </Link>
      )}
    </FlexItem>
  </Flex>
);

export const Networks = ({
  networks = [],
  selected = [],
  expanded = false,
  proceeded = false,
  loading = false,
  initialValues,
  setInfoExpanded,
  setMachinesExpanded,
  handleNext,
  handleEdit,
  step
}) => (
  <Fragment>
    <Margin bottom={4}>
      <Card>
        <CardOutlet>
          <Padding all={4}>
            <Flex justifyBetween>
              <FlexItem>
                <Header />
              </FlexItem>
              {proceeded && selected.length ? (
                <FlexItem>
                  <SavedIcon />
                </FlexItem>
              ) : null}
            </Flex>
            {expanded || (proceeded && selected.length) ? (
              <Margin top={3}>
                <Divider height={remcalc(1)} />
              </Margin>
            ) : null}
            {expanded ? (
              <Margin top={3} bottom={4}>
                <Description>
                  Instances are automatically connected to a private fabric
                  network, which is the best choice for internal communication
                  within your application. Data center networks are the best
                  choice for exposing your application to the public internet
                  (if the data center network is a public network).{' '}
                  <a
                    target="__blank"
                    href="https://docs.joyent.com/public-cloud/network/sdn"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </a>
                </Description>
              </Margin>
            ) : null}
            <ReduxForm
              form={IC_NW_F}
              destroyOnUnmount={false}
              forceUnregisterOnUnmount={true}
              initialValues={initialValues}
            >
              {props =>
                !loading ? (
                  <form>
                    {networks.map(
                      ({
                        id,
                        selected,
                        infoExpanded,
                        machinesExpanded,
                        ...network
                      }) =>
                        expanded || (selected && proceeded) ? (
                          <Network
                            key={id}
                            id={id}
                            selected={selected}
                            infoExpanded={infoExpanded}
                            machinesExpanded={machinesExpanded}
                            small={!expanded && selected}
                            onInfoClick={() =>
                              setInfoExpanded(id, !infoExpanded)
                            }
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
            {loading && expanded ? <StatusLoader /> : null}
            {!loading && expanded ? (
              <Button type="button" onClick={handleNext}>
                Save
              </Button>
            ) : null}
          </Padding>
        </CardOutlet>
      </Card>
    </Margin>
  </Fragment>
);

export default compose(
  graphql(ListNetworks, {
    options: () => ({
      ssr: false
    }),
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
      const proceeded = get(values, IC_NW_V_PROCEEDED, false);
      const selected = get(form, `${IC_NW_F}.values`, {});
      const empty = id => !includes(Object.keys(selected), id);
      const _public = find(networks, ['name', 'Joyent-SDC-Public']);

      const initialValues = _public
        ? {
            [_public.id]: true
          }
        : {};

      const _networks = networks.map(({ id, name, ...network }) => {
        if (empty(id) && name === 'Joyent-SDC-Public') {
          selected[id] = true;
        }

        return {
          ...network,
          id,
          name,
          selected:
            empty(id) && name === 'Joyent-SDC-Public'
              ? true
              : Boolean(selected[id]),
          machinesExpanded: get(values, IC_NW_V_MACHINES_EXPANDED(id), false),
          infoExpanded: get(values, IC_NW_V_INFO_EXPANDED(id), false)
        };
      });

      return {
        proceeded,
        networks: _networks,
        initialValues,
        selected: Object.keys(selected).filter(n => selected[n])
      };
    },
    (dispatch, { history }) => ({
      handleNext: () => {
        dispatch(set({ name: IC_NW_V_PROCEEDED, value: true }));
        return history.push(
          `/instances/~create/tags${history.location.search}`
        );
      },
      handleEdit: () => {
        dispatch(set({ name: IC_NW_V_PROCEEDED, value: true }));
        return history.push(
          `/instances/~create/networks${history.location.search}`
        );
      },
      setInfoExpanded: (id, expanded) => {
        return dispatch(
          set({ name: IC_NW_V_INFO_EXPANDED(id), value: expanded })
        );
      },
      setMachinesExpanded: (id, expanded) => {
        return dispatch(
          set({ name: IC_NW_V_MACHINES_EXPANDED(id), value: expanded })
        );
      }
    })
  )
)(Networks);
