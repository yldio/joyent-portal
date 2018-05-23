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

import TemplatesList, {
  Item as TemplatesItem,
  EmptyCard as TemplatesEmptyCard,
  EmptyRow as TemplatesEmptyRow,
  LoadingRow,
  BulkFooter
} from '@components/list';

import { Toolbar } from '@components/toolbar';
import ListTemplates from '@graphql/list-templates.gql';
import RemoveTemplate from '@graphql/remove-template.gql';
import { Forms, Values } from '@root/constants';
import parseError from '@state/parse-error';
import Confirm from '@state/confirm';

const { TL_F_F, TL_T_F } = Forms;
const { TL_R_V, TL_E_V, TL_SB_V, TL_SO_V } = Values;

const Templates = ({
  filter,
  empty = false,
  checked = [],
  templates = [],
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
        <ReduxForm form={TL_F_F}>
          {() => (
            <If condition={empty}>
              <Else>
                <form>
                  <Toolbar
                    searchable={filter || templates.length}
                    searchLabel="Filter templates"
                    actionLabel="Create template"
                    actionTo="/templates/~create/name"
                    actionable={!(!loading && !templates.length && !filter)}
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
                  <Then>{error}</Then>
                  <Else>An error occurred while loading your templates</Else>
                </If>
              </MessageDescription>
            </Message>
          </Margin>
        </Then>
      </If>
      <ReduxForm form={TL_T_F}>
        {props => (
          <If condition={empty}>
            <Then>
              <TemplatesEmptyCard />
            </Then>
            <Else>
              <TemplatesList
                {...props}
                checked={checked.length === templates.length}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortBy={newSortBy =>
                  handleSortBy(newSortBy, { sortOrder, sortBy })
                }
                onToggleCheckAll={() =>
                  handleToggleCheckAll(checked.length !== templates.length)
                }
              >
                <If condition={templates.length}>
                  <Then>
                    <Fragment>
                      {templates.map(({ id, removing, ...template }) => (
                        <If condition={removing}>
                          <Then>
                            <LoadingRow key={id}>Removing...</LoadingRow>
                          </Then>
                          <Else>
                            <TemplatesItem key={id} id={id} {...template} />
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
                        <TemplatesEmptyRow />
                      </Else>
                    </If>
                  </Else>
                </If>
              </TemplatesList>
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
  graphql(RemoveTemplate, { name: 'removeTemplate' }),
  graphql(ListTemplates, {
    options: ({ location }) => ({
      ssr: true,
      pollInterval: 1000
    }),
    props: ({ data: { error, templates = [], networkStatus, refetch } }) => ({
      error,
      refetch,
      loading: networkStatus === 1,
      templates,
      index: new Fuse(templates, {
        keys: ['id', 'name', 'created']
      })
    })
  }),
  connect(
    (state, ownProps) => {
      const { form, values: flags } = state;
      const {
        templates: items,
        index,
        loading,
        error: loadingError
      } = ownProps;
      const filter = get(form, `${TL_F_F}.values.filter`, '');
      const mutationError = get(flags, TL_E_V, null);
      const sortBy = get(flags, TL_SB_V, 'name');
      const sortOrder = get(flags, TL_SO_V, 'asc');

      const templates = sort(
        (filter.length ? index.search(filter) : items).map(
          ({ id, ...template }) => ({
            ...template,
            removing: get(flags, TL_R_V(id), false),
            id
          })
        ),
        [sortBy]
      );

      const values = get(form, `${TL_T_F}.values`, {});
      const checked =
        templates.length && templates.filter(({ id }) => values[id]);

      return {
        filter,
        empty: !filter && !loading && !templates.length,
        error: Boolean(loadingError) || mutationError,
        templates: sortOrder === 'asc' ? templates : reverse(templates),
        checked,
        sortBy,
        sortOrder
      };
    },
    (dispatch, { templates = [], removeTemplate, refetch }) => {
      return {
        handleToggleCheckAll: newChecked => {
          return dispatch(
            templates.map(({ id }) => change(TL_T_F, id, newChecked))
          );
        },
        handleSortBy: (newSortBy, { sortBy: currentSortBy, sortOrder }) => {
          // sort prop is the same, toggle
          if (currentSortBy === newSortBy) {
            return dispatch(
              set({
                name: TL_SO_V,
                value: sortOrder === 'desc' ? 'asc' : 'desc'
              })
            );
          }

          dispatch([
            set({
              name: TL_SO_V,
              value: 'desc'
            }),
            set({
              name: TL_SB_V,
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
                  : `${checked.length} templates`
              }`
            )
          ) {
            return;
          }

          dispatch(
            checked.map(({ id }) =>
              set({
                name: TL_R_V(id),
                value: true
              })
            )
          );

          const [err] = await intercept(
            Promise.all(
              checked.map(({ id }) =>
                removeTemplate({
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
                  name: TL_R_V(id),
                  value: false
                })
              ),
              err
                ? set({
                    name: TL_E_V,
                    value: parseError(err)
                  })
                : undefined
            ].filter(Boolean)
          );
        }
      };
    }
  )
)(Templates);
