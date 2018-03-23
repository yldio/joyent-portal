import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import { Margin } from 'styled-components-spacing';
import { connect } from 'react-redux';
import intercept from 'apr-intercept';
import { set } from 'react-redux-values';
import get from 'lodash.get';
import remcalc from 'remcalc';

import {
  ViewContainer,
  StatusLoader,
  Divider,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import ImageSummary from '@components/summary';
import GetImage from '@graphql/get-image.gql';
import RemoveImage from '@graphql/remove-image.gql';
import parseError from '@state/parse-error';

export const Summary = ({
  image,
  loading = false,
  error = null,
  removing,
  mutationError,
  handleRemove
}) => (
  <ViewContainer main>
    {loading && !image ? (
      <Fragment>
        <Divider height={remcalc(30)} transparent />
        <StatusLoader />
      </Fragment>
    ) : null}
    {error && !loading && !image ? (
      <Margin bottom={4}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>
            An error occurred while loading your instance summary
          </MessageDescription>
        </Message>
      </Margin>
    ) : null}
    {mutationError ? (
      <Margin bottom={4}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>
            There was a problem deleting your image
          </MessageDescription>
        </Message>
      </Margin>
    ) : null}
    {image ? (
      <ImageSummary removing={removing} onRemove={handleRemove} {...image} />
    ) : null}
  </ViewContainer>
);

export default compose(
  graphql(RemoveImage, { name: 'removeImage' }),
  graphql(GetImage, {
    options: ({ match }) => ({
      ssr: false,
      variables: {
        id: get(match, 'params.image')
      }
    }),
    props: ({ data }) => {
      const { loading = false, error = null, image } = data;
      return {
        image,
        loading,
        error
      };
    }
  }),
  connect(
    ({ values }, ownProps) => {
      const removing = get(values, 'remove-mutation-loading', false);
      const mutationError = get(values, 'remove-mutation-error', null);

      return {
        ...ownProps,
        removing,
        mutationError
      };
    },
    (dispatch, { removeImage, image, history }) => ({
      handleRemove: async () => {
        dispatch(set({ name: 'remove-mutation-loading', value: true }));

        const [err, res] = await intercept(
          removeImage({
            variables: {
              id: image.id
            }
          })
        );

        if (err) {
          dispatch([
            set({ name: 'remove-mutation-error', value: parseError(err) }),
            set({ name: 'remove-mutation-loading', value: false })
          ]);
        }

        if (res) {
          dispatch(set({ name: 'remove-mutation-loading', value: false }));
          history.push('/images');
        }
      }
    })
  )
)(Summary);
