import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';

import { InstanceTypeIcon } from 'joyent-ui-toolkit';
import Image from '@components/create-instance/image';
import Title from '@components/create-instance/title';
import imageData from '../../data/images-map.json';

import getImages from '../../graphql/get-images.gql';

const ImageContainer = ({
  expanded,
  image,
  handleSubmit,
  handleCancel,
  loading,
  images,
  vms
}) => (
  <Fragment>
    <Title icon={<InstanceTypeIcon />}>Instance type and image</Title>
    <ReduxForm
      form="create-instance-image"
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      onSubmit={handleSubmit}
    >
      {props => (
        <Image
          {...props}
          isVmSelected={vms}
          loading={loading}
          imageID={image}
          images={images}
          expanded={expanded}
          onCancel={handleCancel}
        />
      )}
    </ReduxForm>
  </Fragment>
);

export default compose(
  withRouter,
  connect(
    (state, ownProps) => {
      return {
        ...ownProps,
        vms: get(state, 'form.create-instance-image.values.vms', false),
        image: get(state, 'form.create-instance-image.values.image', null)
      };
    },
    (dispatch, { history }) => ({
      handleSubmit: () => history.push(`/instances/~create/package`),
      handleCancel: () => history.push(`/instances/~create/image`)
    })
  ),
  graphql(getImages, {
    props: ({ ownProps: { vms = false }, data: { loading, images = [] } }) => ({
      loading,
      images: images.reduce((accumulator, image) => {
        const isVm = !image.type.includes('DATASET');

        if (isVm && !vms) {
          return accumulator;
        }

        const name =
          imageData[
            image.name
              .split('-')[0]
              .split(' ')[0]
              .toLowerCase()
          ];

        const exists = Boolean(
          accumulator.filter(e => e.imageName === name && isVm === e.isVm)
            .length
        );

        if (!exists) {
          return accumulator.concat([
            {
              imageName: name,
              versions: [
                {
                  name: image.name,
                  version: image.version,
                  id: image.id
                }
              ],
              isVm
            }
          ]);
        }

        return accumulator.map(({ versions, ...rest }) => ({
          ...rest,
          versions:
            rest.imageName === name && rest.isVm === isVm
              ? versions.concat([
                  { name: image.name, version: image.version, id: image.id }
                ])
              : versions
        }));
      }, [])
    })
  })
)(ImageContainer);
