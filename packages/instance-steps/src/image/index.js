import React, { Fragment } from 'react';
import { Margin } from 'styled-components-spacing';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import ReduxForm from 'declarative-redux-form';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import includes from 'lodash.includes';
import sortBy from 'lodash.sortby';
import findIndex from 'lodash.findindex';
import groupBy from 'lodash.groupby';
import values from 'lodash.values';
import reverse from 'lodash.reverse';
import flatten from 'lodash.flatten';
import find from 'lodash.find';
import get from 'lodash.get';

import Step, {
  Header as StepHeader,
  Description as StepDescription,
  Preview as StepPreview,
  Outlet as StepOutlet
} from 'joyent-ui-resource-step';

import { StatusLoader, Button, InstanceTypeIcon } from 'joyent-ui-toolkit';

import GetImages from '../graphql/get-images.gql';
import { Forms, Values } from '../constants';
import imageData from './images-map.json';
import ImageView, { Preview as ImagePreview, ImageType } from './components';

const { IC_IMG_F } = Forms;
const { IC_IMG_V_VMS } = Values;

const Image = ({
  handleGetValue,
  handleSelectLatest,
  setImageType,
  preview = {},
  vms,
  image = {},
  loading,
  images,
  ...props
}) => (
  <Step name="image" getValue={handleGetValue} {...props}>
    <StepHeader icon={<InstanceTypeIcon />}>Instance type and image</StepHeader>
    <StepDescription href="https://docs.joyent.com/images">
      Hardware virtual machines are generally used for non-containerized
      applications. Infrastructure containers are generally for running any
      Linux image on secure, bare metal containers.
    </StepDescription>
    <StepPreview>
      <Margin top={3}>
        <ImagePreview {...preview} />
      </Margin>
    </StepPreview>
    <StepOutlet>
      {({ next }) => (
        <Margin top="5">
          <ReduxForm
            form={IC_IMG_F}
            destroyOnUnmount={false}
            forceUnregisterOnUnmount={true}
            enableReinitialize
            keepDirtyOnReinitialize
          >
            {props => (
              <Fragment>
                {loading ? (
                  <StatusLoader />
                ) : (
                  <Fragment>
                    <ImageType setImageType={setImageType} vms={vms} />
                    <ImageView
                      {...props}
                      images={images.filter(i => i.isVm === vms)}
                      onSelectLatest={handleSelectLatest}
                    />
                    <Margin top="2">
                      <Button
                        id={'next-button-image'}
                        type="button"
                        component={Link}
                        to={next}
                      >
                        Next
                      </Button>
                    </Margin>
                  </Fragment>
                )}
              </Fragment>
            )}
          </ReduxForm>
        </Margin>
      )}
    </StepOutlet>
  </Step>
);

export default compose(
  connect(
    ({ form, values }, ownProps) => {
      const image = get(form, `${IC_IMG_F}.values.image`, null);
      const vms = get(values, IC_IMG_V_VMS, true);

      return {
        ...ownProps,
        vms,
        image
      };
    },
    dispatch => ({
      setImageType: isVm => {
        return dispatch(set({ name: IC_IMG_V_VMS, value: isVm }));
      },
      handleSelectLatest: ({ versions }) => {
        return dispatch(change(IC_IMG_F, 'image', versions[0].id));
      }
    })
  ),
  graphql(GetImages, {
    options: ({ query = {} }) => ({
      ssr: false,
      variables: { public: !query.image }
    }),
    props: ({ ownProps, data = {} }) => {
      const { image = '', query = {} } = ownProps;
      const { loading = false, images = [] } = data;

      if (query.image) {
        return {
          loading,
          image: find(images, ['id', query.image], {}),
          hardcoded: true
        };
      }

      const _images = images
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
            published: new Date(img.published_at).getTime(),
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

          const versions = acc[index].versions.concat([version]);

          acc[index] = {
            ...acc[index],
            versions
          };

          return acc;
        }, [])
        .map(({ versions, ...img }) => {
          return {
            ...img,
            active: Boolean(find(versions, ['id', image])),
            versions: reverse(
              flatten(
                values(groupBy(versions, 'name')).map(groupedVersion =>
                  sortBy(groupedVersion, 'published').pop()
                )
              )
            )
          };
        });

      const selected = find(images, ['id', image]) || {};

      return {
        loading,
        images: _images,
        image: {
          ...selected,
          isVm: !includes(selected.type || '', 'DATASET')
        },
        handleGetValue: () => selected
      };
    }
  })
)(Image);
