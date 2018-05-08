import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { connect } from 'react-redux';
import get from 'lodash.get';
import intercept from 'apr-intercept';
import { set } from 'react-redux-values';
import Fuse from 'fuse.js';

import {
  ViewContainer,
  Divider,
  StatusLoader,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import GLOBAL from '@state/global';
import ToolbarForm from '@components/toolbar';
import Empty from '@components/empty';
import { ImageType, Forms } from '@root/constants';
import ListImages from '@graphql/list-images.gql';
import { Image, Filters } from '@components/image';
import RemoveImage from '@graphql/remove-image.gql';
import parseError from '@state/parse-error';

const { LIST_TOOLBAR_FORM, LIST_TOGGLE_TYPE_FORM } = Forms;

export const List = ({
  images = [],
  allImages = [],
  loading = false,
  error = null,
  history,
  typeValue,
  handleCreateInstance,
  handleRemove
}) => (
  <ViewContainer main>
    <Margin top={4}>
      <ReduxForm form={LIST_TOOLBAR_FORM}>
        {props => <ToolbarForm {...props} actionable={!loading} />}
      </ReduxForm>
    </Margin>
    <Margin vertical={4}>
      <Divider />
    </Margin>
    {loading && !images.length ? (
      <Fragment>
        <Divider height={remcalc(30)} transparent />
        <StatusLoader />
      </Fragment>
    ) : null}
    {error && !images.length && !loading ? (
      <Margin bottom={5}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>
            An error occurred while loading your images
          </MessageDescription>
        </Message>
      </Margin>
    ) : null}
    <Fragment>
      <Margin bottom={4}>
        <ReduxForm
          form={LIST_TOGGLE_TYPE_FORM}
          initialValues={{ 'image-type': 'all' }}
        >
          {props =>
            allImages.length ? (
              <Filters selected={typeValue} {...props} />
            ) : null
          }
        </ReduxForm>
      </Margin>
      <Row>
        {images.map(image => (
          <Col sm={4}>
            <Image
              {...image}
              onCreateInstance={() => handleCreateInstance(image)}
              onRemove={() => handleRemove(image.id)}
            />
          </Col>
        ))}
        {!images.length && !loading ? (
          <Empty>No images to see here</Empty>
        ) : null}
      </Row>
    </Fragment>
  </ViewContainer>
);

export default compose(
  graphql(RemoveImage, {
    name: 'removeImage'
  }),
  graphql(ListImages, {
    options: () => ({
      ssr: false,
      pollInterval: 1000
    }),
    props: ({ data: { images = [], loading, error, refetch } }) => ({
      images: images || [],
      index: new Fuse(images || [], {
        keys: ['name', 'os', 'version', 'state', 'type']
      }),
      loading,
      error
    })
  }),
  connect(
    ({ form, values }, { index, error, images = [] }) => {
      const filter = get(form, `${LIST_TOOLBAR_FORM}.values.filter`, false);
      const mutationError = get(values, 'remove-mutation-error', null);

      const typeValue = get(
        form,
        `${LIST_TOGGLE_TYPE_FORM}.values.image-type`,
        'all'
      );

      const virtual = Object.keys(ImageType).filter(
        i => ImageType[i] === 'Hardware Virtual Machine'
      );

      const container = Object.keys(ImageType).filter(
        i => ImageType[i] === 'Infrastructure Container'
      );

      const filtered = filter ? index.search(filter) : images;

      return {
        images: filtered
          .filter(image => {
            switch (typeValue) {
              case 'all':
                return true;
              case 'hardware-virtual-machine':
                return virtual.includes(image.type);
              case 'infrastructure-container':
                return container.includes(image.type);
              default:
                return true;
            }
          })
          .map(({ id, ...image }) => ({
            ...image,
            id,
            removing: get(values, `remove-mutation-${id}-loading`, false)
          })),
        allImages: images,
        mutationError,
        typeValue
      };
    },
    (dispatch, { removeImage, history }) => ({
      handleCreateInstance: image => {
        return window
          .open(
            `${GLOBAL.origin}/instances/~create/?image=${image.name}`,
            '_blank'
          )
          .focus();
      },
      handleRemove: async id => {
        dispatch([set({ name: `remove-mutation-${id}-loading`, value: true })]);

        const [err, res] = await intercept(
          removeImage({
            variables: {
              id
            }
          })
        );

        if (err) {
          dispatch([
            set({ name: 'remove-mutation-error', value: parseError(err) }),
            set({ name: `remove-mutation-${id}-loading`, value: false })
          ]);
        }

        if (res) {
          dispatch(
            set({ name: `remove-mutation-${id}-loading`, value: false })
          );

          history.push('/images');
        }
      }
    })
  )
)(List);
