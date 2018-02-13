import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { connect } from 'react-redux';
import get from 'lodash.get';
import find from 'lodash.find';
import Index from '@state/gen-index';

import {
  ViewContainer,
  Divider,
  StatusLoader,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import ToolbarForm from '@components/toolbar';
import Empty from '@components/empty';
import { ImageType } from '@root/constants';
import ListImages from '@graphql/list-images.gql';
import { Image, Filters } from '@components/image';

const TOGGLE_FORM_DETAILS = 'images-list-toggle';
const MENU_FORM_DETAILS = 'images-list-menu';

export const List = ({
  images = [],
  allImages = [],
  loading = false,
  error = null,
  history,
  typeValue
}) => (
  <ViewContainer main>
    <Divider height={remcalc(30)} transparent />
    <ReduxForm form={MENU_FORM_DETAILS}>
      {props => <ToolbarForm {...props} actionable={!loading} />}
    </ReduxForm>
    <Divider height={remcalc(1)} />
    <Divider height={remcalc(24)} transparent />
    {loading && !images.length ? (
      <Fragment>
        <Divider height={remcalc(30)} transparent />
        <StatusLoader />
      </Fragment>
    ) : null}
    {error && !images.length && !loading ? (
      <Margin bottom={4}>
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
          form={TOGGLE_FORM_DETAILS}
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
            <Image {...image} />
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
  graphql(ListImages, {
    props: ({ data: { images, loading, error, refetch } }) => {
      return {
        images,
        loading,
        error
      };
    }
  }),
  connect(({ form, values }, { index, error, images = [] }) => {
    const filter = get(form, `${MENU_FORM_DETAILS}.values.filter`, false);
    const typeValue = get(
      form,
      `${TOGGLE_FORM_DETAILS}.values.image-type`,
      'all'
    );

    const virtual = Object.keys(ImageType).filter(
      i => ImageType[i] === 'Hardware Virtual Machine'
    );
    const container = Object.keys(ImageType).filter(
      i => ImageType[i] === 'Infrastructure Container'
    );

    const filtered = filter
      ? Index(images)
          .search(filter)
          .map(({ ref }) => find(images, ['id', ref]))
      : images;

    return {
      images: filtered.filter(image => {
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
      }),
      allImages: images,
      typeValue
    };
  })
)(List);
