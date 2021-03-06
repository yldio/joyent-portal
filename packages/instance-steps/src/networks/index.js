import React, { Fragment } from 'react';
import { Margin, Padding } from 'styled-components-spacing';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import get from 'lodash.get';
import forceArray from 'force-array';
import includes from 'lodash.includes';
import find from 'lodash.find';
import { withTheme } from 'styled-components';

import Step, {
  Header as StepHeader,
  Description as StepDescription,
  Preview as StepPreview,
  Outlet as StepOutlet
} from 'joyent-ui-resource-step';

import { Button, StatusLoader, NetworkIcon } from 'joyent-ui-toolkit';

import ListNetworks from '../graphql/list-networks.gql';
import { Network as NetworkWidget } from 'joyent-ui-resource-widgets';
import { Forms, Values } from '../constants';

const { IR_NW_F } = Forms;
const { IR_NW_V_INFO_EXPANDED, IR_NW_V_MACHINES_EXPANDED } = Values;

const Networks = ({
  preview = [],
  initialValues,
  handleGetValue,
  selected = [],
  setInfoExpanded,
  setMachinesExpanded,
  networks = [],
  loading,
  theme = {},
  ...props
}) => (
  <Step name="networks" getValue={handleGetValue} {...props}>
    <StepHeader icon={<NetworkIcon />}>Networks</StepHeader>
    <StepDescription href="https://docs.joyent.com/public-cloud/network/sdn">
      Instances are automatically connected to a private fabric network, which
      is the best choice for internal communication within your application.
      Data center networks are the best choice for exposing your application to
      the public internet (if the data center network is a public network).
    </StepDescription>
    <StepPreview>
      <Fragment>
        {preview.map(
          ({ id, selected, infoExpanded, machinesExpanded, ...network }) => (
            <NetworkWidget
              key={id}
              id={id}
              selected={true}
              infoExpanded={infoExpanded}
              machinesExpanded={machinesExpanded}
              onInfoClick={() => setInfoExpanded(id, !infoExpanded)}
              onMachinesClick={() => setMachinesExpanded(id, !machinesExpanded)}
              small
              {...network}
            />
          )
        )}
      </Fragment>
    </StepPreview>
    <StepOutlet>
      {({ next }) => (
        <Margin top="5">
          <ReduxForm
            form={IR_NW_F}
            destroyOnUnmount={false}
            forceUnregisterOnUnmount={true}
            initialValues={initialValues}
          >
            {props =>
              loading ? (
                <StatusLoader />
              ) : (
                <Fragment>
                  <Padding top={1}>
                    <form>
                      {networks.map(
                        (
                          {
                            id,
                            selected,
                            infoExpanded,
                            machinesExpanded,
                            ...network
                          },
                          index
                        ) => (
                          <NetworkWidget
                            noMargin={index === networks.length - 1}
                            key={id}
                            id={id}
                            selected={selected}
                            infoExpanded={infoExpanded}
                            machinesExpanded={machinesExpanded}
                            onInfoClick={() =>
                              setInfoExpanded(id, !infoExpanded)
                            }
                            onMachinesClick={() =>
                              setMachinesExpanded(id, !machinesExpanded)
                            }
                            {...network}
                          />
                        )
                      )}
                    </form>
                  </Padding>
                  <Margin top="5">
                    <Button
                      id="next-button-networks"
                      type="button"
                      component={Link}
                      to={next}
                      fluid={theme.screen === 'mobile'}
                    >
                      Next
                    </Button>
                  </Margin>
                </Fragment>
              )
            }
          </ReduxForm>
        </Margin>
      )}
    </StepOutlet>
  </Step>
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
      const selected = get(form, `${IR_NW_F}.values`, {});
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
          machinesExpanded: get(values, IR_NW_V_MACHINES_EXPANDED(id), false),
          infoExpanded: get(values, IR_NW_V_INFO_EXPANDED(id), false)
        };
      });

      return {
        networks: _networks,
        initialValues,
        handleGetValue: () => _networks.filter(n => n.selected),
        selected: Object.keys(selected).filter(n => selected[n])
      };
    },
    (dispatch, { history }) => ({
      setInfoExpanded: (id, expanded) => {
        return dispatch(
          set({ name: IR_NW_V_INFO_EXPANDED(id), value: expanded })
        );
      },
      setMachinesExpanded: (id, expanded) => {
        return dispatch(
          set({ name: IR_NW_V_MACHINES_EXPANDED(id), value: expanded })
        );
      }
    })
  )
)(withTheme(({ ...rest }) => <Networks {...rest} />));
