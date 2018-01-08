import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import get from 'lodash.get';

import { InstanceTypeIcon, StatusLoader } from 'joyent-ui-toolkit';
import Image, { Preview } from '@components/create-instance/image';
import Title from '@components/create-instance/title';
import Description from '@components/create-instance/description';
import imageData from '../../data/images-map.json';

import getImages from '../../graphql/get-images.gql';

const ImageContainer = ({
  expanded,
  image,
  handleNext,
  handleEdit,
  loading,
  images,
  vms
}) => (
  <Fragment>
    <Title
      onClick={!expanded && !image && handleEdit}
      icon={<InstanceTypeIcon />}
    >
      Instance type and image
    </Title>
    {expanded ? (
      <Description>
        Hardware virtual machines are generally used for non-containerized
        applications. Infrastructure containers are generally for running any
        Linux image on secure, bare metal containers.{' '}
        <a
          href="https://docs.joyent.com/private-cloud/images"
          rel="noopener noreferrer"
          target="_blank"
        >
          Read the docs
        </a>
      </Description>
    ) : null}
    <ReduxForm
      form="create-instance-image"
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      onSubmit={handleNext}
    >
      {props =>
        loading && expanded ? (
          <StatusLoader />
        ) : expanded ? (
          <Image
            {...props}
            isVmSelected={vms}
            imageID={image}
            images={images}
          />
        ) : image ? (
          <Preview
            isVmSelected={vms}
            imageID={image}
            images={images}
            onEdit={handleEdit}
          />
        ) : null
      }
    </ReduxForm>
  </Fragment>
);

export default compose(
  connect(
    (state, ownProps) => {
      return {
        ...ownProps,
        vms: get(state, 'form.create-instance-image.values.vms', false),
        image: get(state, 'form.create-instance-image.values.image', null)
      };
    },
    (dispatch, { history }) => ({
      handleNext: () => {
        dispatch(set({ name: 'create-instance-image-proceeded', value: true }));

        return history.push(`/instances/~create/package`);
      },
      handleEdit: () => history.push(`/instances/~create/image`)
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
