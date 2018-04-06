import React, { Fragment } from 'react';
import { set, destroyAll } from 'react-redux-values';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { Margin } from 'styled-components-spacing';
import intercept from 'apr-intercept';
import get from 'lodash.get';
import isString from 'lodash.isstring';
import find from 'lodash.find';

import {
  ViewContainer,
  StatusLoader,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import { Meta, Template } from '@components/summary';
import GetTemplate from '@graphql/get-template.gql';
import RemoveTemplate from '@graphql/remove-template.gql';
import Confirm from '@state/confirm';
import parseError from '@state/parse-error';
import { Values } from '@root/constants';

const { TS_R_V, TS_E_V } = Values;

const Summary = ({
  loading = false,
  error = null,
  template = null,
  removing = false,
  handleDuplicate,
  handleRemove
}) => (
  <ViewContainer main>
    <Margin top="5">
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
      {loading && !template ? (
        <StatusLoader />
      ) : (
        <Fragment>
          <Margin bottom="5">
            <Meta
              {...template}
              removing={removing}
              onDuplicate={handleDuplicate}
              onRemove={handleRemove}
            />
          </Margin>
          <Template {...template} />
        </Fragment>
      )}
    </Margin>
  </ViewContainer>
);

export default compose(
  graphql(RemoveTemplate, { name: 'removeTemplate' }),
  graphql(GetTemplate, {
    options: ({ match }) => ({
      ssr: true,
      variables: {
        id: get(match, 'params.template')
      }
    }),
    props: ({ data: { loading, error, template } }) => ({
      loading,
      error,
      template: template
        ? {
            ...template,
            metadata: get(template, 'metadata', []).filter(
              ({ name }) =>
                name !== 'user-script' && name.indexOf('triton.') < 0
            ),
            tags: get(template, 'tags', []).filter(
              ({ name }) => name.indexOf('triton.') < 0
            ),
            cnsEnabled: !JSON.parse(
              get(
                find(get(template, 'tags', []), ['name', 'triton.cns.disable']),
                'value',
                'false'
              )
            ),
            userScript: get(
              find(get(template, 'metadata', []), ['name', 'user-script']),
              'value',
              ''
            )
          }
        : null
    })
  }),
  connect(
    ({ values }, { template = {}, error: loadingError }) => {
      const mutationError = get(values, TS_E_V(get(template, 'id')), null);
      const removing = get(values, TS_R_V(get(template, 'id')), false);

      return {
        error: Boolean(loadingError) || mutationError,
        removing
      };
    },
    (dispatch, { history, template = {}, removeTemplate }) => ({
      handleRemove: async () => {
        const { id } = template;

        // eslint-disable-next-line no-alert
        if (!(await Confirm(`Do you want to remove ${template.name}`))) {
          return;
        }

        dispatch(
          set({
            name: TS_R_V(id),
            value: true
          })
        );

        const [err] = await intercept(
          removeTemplate({
            variables: { id }
          })
        );

        if (err) {
          return dispatch([
            set({
              name: TS_E_V(id),
              value: parseError(err)
            }),
            set({
              name: TS_R_V(id),
              value: false
            })
          ]);
        }

        dispatch(destroyAll());
        history.push('/templates/');
      }
    })
  )
)(Summary);
