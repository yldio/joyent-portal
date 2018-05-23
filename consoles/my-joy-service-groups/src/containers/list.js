import React, { Fragment } from 'react';
import { If, Then, Else } from 'react-if';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import { compose, graphql } from 'react-apollo';
import { change } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import { Margin } from 'styled-components-spacing';
import intercept from 'apr-intercept';
import get from 'lodash.get';
import isString from 'lodash.isstring';
import sort from 'lodash.sortby';
import reverse from 'lodash.reverse';
import Fuse from 'fuse.js';

import {
  ViewContainer,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import ServiceGroupsList, {
  Item as ServiceGroupsItem,
  EmptyCard as ServiceGroupsEmptyCard,
  EmptyRow as ServiceGroupsEmptyRow,
  LoadingRow,
  BulkFooter
} from '@components/list';

import { Toolbar } from '@components/toolbar';
import ListServiceGroups from '@graphql/list-service-groups.gql';
import RemoveServiceGroup from '@graphql/remove-service-group.gql';
import { Forms, Values } from '@root/constants';
import parseError from '@state/parse-error';
import Confirm from '@state/confirm';

const { SGL_F_F, SGL_T_F } = Forms;
const { SGL_R_V, SGL_E_V, SGL_SB_V, SGL_SO_V } = Values;

const ServiceGroups = ({
  filter,
  empty,
  checked = [],
  groups = [],
  error = false,
  loading = false,
  sortBy = 'name',
  sortOrder = 'asc',
  handleSortBy,
  handleToggleCheckAll,
  handleRemove
}) => (
  <ViewContainer main>
    <Margin top="5">
      <Margin bottom="3">
        <ReduxForm form={SGL_F_F}>
          {() => (
            <If condition={empty}>
              <Else>
                <form>
                  <Toolbar
                    searchable={filter || groups.length}
                    searchLabel="Filter service groups"
                    actionLabel="Create service group"
                    actionTo="/service-groups/~create/template"
                    actionable={!(!loading && !groups.length && !filter)}
                  />
                </form>
              </Else>
            </If>
          )}
        </ReduxForm>
      </Margin>
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
      <ReduxForm form={SGL_T_F}>
        {props => (
          <If condition={empty}>
            <Then>
              <ServiceGroupsEmptyCard />
            </Then>
            <Else>
              <ServiceGroupsList
                {...props}
                checked={checked.length === groups.length}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortBy={newSortBy =>
                  handleSortBy(newSortBy, { sortOrder, sortBy })
                }
                onToggleCheckAll={() =>
                  handleToggleCheckAll(checked.length !== groups.length)
                }
              >
                <If condition={groups.length}>
                  <Then>
                    <Fragment>
                      {groups.map(({ id, removing, ...group }) => (
                        <If condition={removing}>
                          <Then>
                            <LoadingRow key={id}>Removing...</LoadingRow>
                          </Then>
                          <Else>
                            <ServiceGroupsItem key={id} id={id} {...group} />
                          </Else>
                        </If>
                      ))}
                    </Fragment>
                  </Then>
                  <Else>
                    <If condition={loading}>
                      <Then>
                        <LoadingRow />
                      </Then>
                      <Else>
                        <ServiceGroupsEmptyRow />
                      </Else>
                    </If>
                  </Else>
                </If>
              </ServiceGroupsList>
            </Else>
          </If>
        )}
      </ReduxForm>
      <If condition={checked.length}>
        <Then>
          <BulkFooter items={checked} onRemove={handleRemove} />
        </Then>
      </If>
    </Margin>
  </ViewContainer>
);

export default compose(
  graphql(RemoveServiceGroup, { name: 'removeGroup' }),
  graphql(ListServiceGroups, {
    options: ({ location }) => ({
      ssr: true,
      pollInterval: 1000
    }),
    props: ({ data: { error, groups = [], networkStatus, refetch } }) => ({
      refetch,
      error,
      loading: networkStatus === 1,
      groups,
      index: new Fuse(groups, {
        keys: ['id', 'name', 'created']
      })
    })
  }),
  connect(
    (state, ownProps) => {
      const { form, values: flags } = state;
      const { groups: items, index, loading, error: loadingError } = ownProps;
      const filter = get(form, `${SGL_F_F}.values.filter`, '');
      const mutationError = get(flags, SGL_E_V, null);
      const sortBy = get(flags, SGL_SB_V, 'name');
      const sortOrder = get(flags, SGL_SO_V, 'asc');

      const groups = sort(
        (filter.length ? index.search(filter) : items).map(
          ({ id, ...groups }) => ({
            ...groups,
            removing: get(flags, SGL_R_V(id), false),
            id
          })
        ),
        [sortBy]
      );

      const values = get(form, `${SGL_T_F}.values`, {});
      const checked = groups.length && groups.filter(({ id }) => values[id]);

      return {
        filter,
        empty: !filter && !loading && !groups.length,
        error: Boolean(loadingError) || mutationError,
        groups: sortOrder === 'asc' ? groups : reverse(groups),
        checked,
        sortBy,
        sortOrder
      };
    },
    (dispatch, { templates = [], refetch, removeGroup }) => {
      return {
        handleToggleCheckAll: newChecked => {
          return dispatch(
            templates.map(({ id }) => change(SGL_T_F, id, newChecked))
          );
        },
        handleSortBy: (newSortBy, { sortBy: currentSortBy, sortOrder }) => {
          // sort prop is the same, toggle
          if (currentSortBy === newSortBy) {
            return dispatch(
              set({
                name: SGL_SO_V,
                value: sortOrder === 'desc' ? 'asc' : 'desc'
              })
            );
          }

          dispatch([
            set({
              name: SGL_SO_V,
              value: 'desc'
            }),
            set({
              name: SGL_SB_V,
              value: newSortBy
            })
          ]);
        },
        handleRemove: async (ev, checked = []) => {
          // eslint-disable-next-line no-alert
          if (
            !await Confirm(
              `Do you want to remove ${
                checked.length === 1
                  ? `"${checked[0].name}"`
                  : `${checked.length} service groups`
              }`
            )
          ) {
            return;
          }

          dispatch(
            checked.map(({ id }) =>
              set({
                name: SGL_R_V(id),
                value: true
              })
            )
          );

          const [err] = await intercept(
            Promise.all(
              checked.map(({ id }) =>
                removeGroup({
                  variables: { id }
                })
              )
            )
          );

          await refetch();

          dispatch(
            [
              ...checked.map(({ id }) =>
                set({
                  name: SGL_R_V(id),
                  value: false
                })
              ),
              err
                ? set({
                    name: SGL_E_V,
                    value: parseError(err)
                  })
                : undefined
            ].filter(Boolean)
          );
        }
      };
    }
  )
)(ServiceGroups);
