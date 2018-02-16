import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import { Margin } from 'styled-components-spacing';
import includes from 'lodash.includes';
import sortBy from 'lodash.sortby';
import findIndex from 'lodash.findindex';
import find from 'lodash.find';
import reverse from 'lodash.reverse';
import get from 'lodash.get';

import { InstanceTypeIcon, StatusLoader, Button } from 'joyent-ui-toolkit';

import Image, { Preview, ImageType } from '@components/create-instance/image';
import Title from '@components/create-instance/title';
import Animated from '@containers/create-instance/animated';
import Description from '@components/description';
import imageData from '@data/images-map.json';
import GetImages from '@graphql/get-images.gql';

const ImageContainer = ({
  expanded,
  proceeded,
  image = {},
  handleNext,
  handleEdit,
  handleSelectLatest,
  loading,
  images,
  vms,
  step
}) => (
  <Fragment>
    <Title
      id={step}
      onClick={!expanded && !proceeded && handleEdit}
      collapsed={!expanded && !proceeded}
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
      form="create-instance-vms"
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      initialValues={{ vms: true }}
    >
      {props => (loading || !expanded ? null : <ImageType {...props} />)}
    </ReduxForm>
    <ReduxForm
      form="create-instance-image"
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      initialValues={{ vms: true }}
    >
      {props =>
        loading && expanded ? (
          <StatusLoader />
        ) : expanded ? (
          <Image
            {...props}
            images={images.filter(i => i.isVm === vms)}
            onSelectLatest={handleSelectLatest}
          />
        ) : image.id ? (
          <Preview {...image} />
        ) : null
      }
    </ReduxForm>
    {expanded ? (
      <Margin top={1} bottom={7}>
        <Button
          type="button"
          onClick={handleNext}
          disabled={!image.id || vms !== image.isVm}
        >
          Next
        </Button>
      </Margin>
    ) : proceeded ? (
      <Margin top={4} bottom={7}>
        <Button type="button" onClick={handleEdit} secondary>
          Edit
        </Button>
      </Margin>
    ) : null}
  </Fragment>
);

export default compose(
  Animated,
  connect(
    ({ form, values }, ownProps) => {
      return {
        ...ownProps,
        proceeded: get(values, 'create-instance-image-proceeded', false),
        vms: get(form, 'create-instance-vms.values.vms', false),
        image: get(form, 'create-instance-image.values.image', null)
      };
    },
    (dispatch, { history }) => ({
      handleNext: () => {
        dispatch(set({ name: 'create-instance-image-proceeded', value: true }));

        return history.push(`/instances/~create/package`);
      },
      handleEdit: () => history.push(`/instances/~create/image`),
      handleSelectLatest: ({ versions }) => {
        const id = versions[0].id;
        return dispatch(change('create-instance-image', 'image', id));
      }
    })
  ),
  graphql(GetImages, {
    props: ({ ownProps, data }) => {
      const { image = '' } = ownProps;
      const { loading = false, images = [] } = data;

      const values = images
        .reduce((acc, img) => {
          const isVm = !includes(img.type, 'DATASET');

          const imageName =
            imageData[
              img.name
                .split('-')[0]
                .split(' ')[0]
                .toLowerCase()
            ];

          const exists = Boolean(find(acc, { imageName, isVm }));

          const version = {
            name: img.name,
            version: img.version,
            id: img.id
          };

          if (!exists) {
            return acc.concat([
              {
                isVm,
                imageName,
                versions: [version]
              }
            ]);
          }

          const index = findIndex(acc, {
            imageName,
            isVm
          });

          acc[index] = {
            ...acc[index],
            versions: acc[index].versions.concat([version])
          };

          return acc;
        }, [])
        .map(({ versions, ...img }) => ({
          ...img,
          active: Boolean(find(versions, ['id', image])),
          versions: reverse(sortBy(versions, ['name']))
        }));

      const selected = find(images, ['id', image]) || {};

      return {
        loading,
        images: values,
        image: {
          ...selected,
          isVm: !includes(selected.type || '', 'DATASET')
        }
      };
    }
  })
)(ImageContainer);
