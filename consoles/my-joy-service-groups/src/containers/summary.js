import React, { Fragment } from 'react';
import { If, Then, Else } from 'react-if';
import { compose, graphql } from 'react-apollo';
import { Margin } from 'styled-components-spacing';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import intercept from 'apr-intercept';
import isString from 'lodash.isstring';
import get from 'lodash.get';

import {
  ViewContainer,
  StatusLoader,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import { Meta, EventLogContainer } from '@components/summary';
import GetServiceGroup from '@graphql/get-service-group.gql';
import RemoveServiceGroup from '@graphql/remove-service-group.gql';
import ListServiceGroups from '@graphql/list-service-groups.gql';
import { Values } from '@root/constants';
import parseError from '@state/parse-error';
import Confirm from '@state/confirm';

const { SGS_R_V, SGS_E_V } = Values;

const Summary = ({
  loading = false,
  error = null,
  group = null,
  removing = false,
  handleRemove
}) => (
  <ViewContainer main>
    <Margin top="5">
      <If condition={error}>
        <Then>
          <Margin bottom="3">
            <Message error>
              <MessageTitle>Ooops!</MessageTitle>
              <MessageDescription>
                <If condition={isString(error)}>
                  <Then>
                    <Fragment>{error}</Fragment>
                  </Then>
                  <Else>
                    <Fragment>
                      An error occurred while loading your service groups
                    </Fragment>
                  </Else>
                </If>
              </MessageDescription>
            </Message>
          </Margin>
        </Then>
      </If>
      <If condition={loading && !group}>
        <Then>
          <StatusLoader />
        </Then>
        <Else>
          <Fragment>
            <Margin bottom="5">
              <Meta {...group} removing={removing} onRemove={handleRemove} />
            </Margin>
            <EventLogContainer />
          </Fragment>
        </Else>
      </If>
    </Margin>
  </ViewContainer>
);

export default compose(
  graphql(RemoveServiceGroup, { name: 'removeGroup' }),
  graphql(GetServiceGroup, {
    options: ({ match }) => ({
      ssr: true,
      pollInterval: 1000,
      variables: {
        id: get(match, 'params.sg')
      }
    }),
    props: ({ data: { loading, networkStatus, error, group } }) => ({
      loading: networkStatus === 1,
      error,
      group
    })
  }),
  connect(
    ({ values }, { group = {}, error: loadingError }) => ({
      error: Boolean(loadingError) || get(values, SGS_E_V(group.id), false),
      removing: get(values, SGS_R_V(group.id), false)
    }),
    (dispatch, { history, group, removeGroup }) => ({
      handleDefocus: name => value => {
        return dispatch(set({ name, value }));
      },
      handleRemove: async () => {
        const { id, name } = group;
        if (!await Confirm(`Do you want to remove ${name}?`)) {
          return;
        }

        dispatch(set({ name: SGS_R_V(id), value: true }));

        const [err] = await intercept(
          removeGroup({
            variables: { id },
            update: proxy => {
              try {
                proxy.writeQuery({
                  query: ListServiceGroups,
                  data: {
                    groups: proxy
                      .readQuery({ query: ListServiceGroups })
                      .groups.filter(g => g.id !== id)
                  }
                });
              } catch (err) {
                // eslint-disable-next-line no-console
                console.error(err);
              }
            }
          })
        );

        dispatch(
          [
            set({ name: SGS_R_V(id), value: false }),
            err ? set({ name: SGS_E_V(id), value: parseError(err) }) : undefined
          ].filter(Boolean)
        );

        history.push('/service-groups');
      }
    })
  )
)(Summary);
