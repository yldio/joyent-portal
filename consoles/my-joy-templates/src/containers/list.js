import React from 'react';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import { compose, graphql } from 'react-apollo';
import { change } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import { Margin } from 'styled-components-spacing';
import intercept from 'apr-intercept';
import get from 'lodash.get';
import isString from 'lodash.isstring';
import Fuse from 'fuse.js';

import {
  ViewContainer,
  StatusLoader,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import TemplatesList, {
  Item as TemplatesItem,
  Empty as TemplatesEmpty,
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
const { TL_R_V, TL_E_V } = Values;

const Templates = ({
  filter,
  checked = [],
  templates = [],
  error = false,
  loading = false,
  handleToggleCheckAll,
  handleRemove
}) => (
  <ViewContainer main>
    <Margin top="5">
      <Margin bottom="3">
        <ReduxForm form={TL_F_F}>
          {() => (
            <form>
              <Toolbar
                searchable={filter || templates.length}
                searchLabel="Filter templates"
                actionLabel="Create template"
                actionTo="/templates/~create/name"
                actionable={!(!loading && !templates.length && !filter)}
              />
            </form>
          )}
        </ReduxForm>
      </Margin>
      {error ? (
        <Margin bottom="3">
          <Message error>
            <MessageTitle>Ooops!</MessageTitle>
            <MessageDescription>
              {isString(error)
                ? error
                : 'An error occurred while loading your templates'}
            </MessageDescription>
          </Message>
        </Margin>
      ) : null}
      <ReduxForm form={TL_T_F}>
        {props =>
          loading ? (
            <Margin top="5">
              <StatusLoader />
            </Margin>
          ) : (
            <TemplatesList
              {...props}
              checked={checked.length === templates.length}
              onToggleCheckAll={() =>
                handleToggleCheckAll(checked.length !== templates.length)
              }
            >
              {templates.length ? (
                templates.map(
                  ({ id, removing, ...template }) =>
                    removing ? (
                      <LoadingRow key={id}>Removing...</LoadingRow>
                    ) : (
                      <TemplatesItem key={id} id={id} {...template} />
                    )
                )
              ) : (
                <TemplatesEmpty filter={Boolean(filter)} />
              )}
            </TemplatesList>
          )
        }
      </ReduxForm>
      {checked.length ? (
        <BulkFooter items={checked} onRemove={handleRemove} />
      ) : null}
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
    props: ({ data: { error, templates = [], networkStatus } }) => ({
      error,
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
      const { templates: items, index, error: loadingError } = ownProps;
      const filter = get(form, `${TL_F_F}.values.filter`, '');
      const mutationError = get(flags, TL_E_V, null);

      const templates = (filter.length ? index.search(filter) : items).map(
        ({ id, ...template }) => ({
          ...template,
          removing: get(flags, TL_R_V(id), false),
          id
        })
      );

      const values = get(form, `${TL_T_F}.values`, {});
      const checked = templates.filter(({ id }) => values[id]);

      return {
        filter,
        error: Boolean(loadingError) || mutationError,
        templates,
        checked
      };
    },
    (dispatch, { templates = [], removeTemplate }) => {
      return {
        handleToggleCheckAll: newChecked => {
          return dispatch(
            templates.map(({ id }) => change(TL_T_F, id, newChecked))
          );
        },
        handleRemove: async (ev, checked = []) => {
          // eslint-disable-next-line no-alert
          if (
            !(await Confirm(
              `Do you want to remove ${
                checked.length === 1
                  ? `"${checked[0].name}"`
                  : `${checked.length} templates`
              }`
            ))
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

          dispatch([
            set({
              name: TL_E_V,
              value: parseError(err)
            }),
            ...checked.map(({ id }) =>
              set({
                name: TL_R_V(id),
                value: false
              })
            )
          ]);
        }
      };
    }
  )
)(Templates);
