import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import { Margin } from 'styled-components-spacing';
import find from 'lodash.find';
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

export const Summary = ({ image, loading = false, error = null }) => (
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
    {image ? <ImageSummary {...image} /> : null}
  </ViewContainer>
);

export default compose(
  graphql(GetImage, {
    options: ({ match }) => ({
      variables: {
        name: get(match, 'params.image')
      }
    }),
    props: ({
      data: { loading = false, error = null, variables, ...rest }
    }) => ({
      image: find(get(rest, 'images', []), ['name', variables.name]),
      loading,
      error
    })
  })
)(Summary);
