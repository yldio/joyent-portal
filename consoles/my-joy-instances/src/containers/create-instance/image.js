import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import { Link } from 'react-router-dom';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import includes from 'lodash.includes';
import sortBy from 'lodash.sortby';
import findIndex from 'lodash.findindex';
import groupBy from 'lodash.groupby';
import values from 'lodash.values';
import reverse from 'lodash.reverse';
import flatten from 'lodash.flatten';
import find from 'lodash.find';
import get from 'lodash.get';
import remcalc from 'remcalc';

import {
  Card,
  CardOutlet,
  ArrowIcon,
  Divider,
  H3,
  Button,
  InstanceTypeIcon,
  StatusLoader
} from 'joyent-ui-toolkit';

import Image, { Preview, ImageType } from '@components/create-instance/image';
import Title from '@components/create-instance/title';
import Description from '@components/description';
import SavedIcon from '@components/saved-icon';
import VerticalDivider from '@components/vertical-divider';
import imageData from '@data/images-map.json';
import GetImages from '@graphql/get-images.gql';
import { Forms, Values } from '@root/constants';

const { IC_IMG_F } = Forms;
const { IC_IMG_V_PROCEEDED, IC_IMG_V_VMS } = Values;

const HarcodedImage = (image = {}) => (
  <Fragment>
    <Title icon={<InstanceTypeIcon />} collapsed={true}>
      Instance type and image
    </Title>
    {image.id ? (
      <ReduxForm
        form={IC_IMG_F}
        destroyOnUnmount={false}
        forceUnregisterOnUnmount={true}
        initialValues={{ image: image.id }}
      >
        {props => (
          <Margin bottom={7}>
            <Preview {...image} />
          </Margin>
        )}
      </ReduxForm>
    ) : null}
  </Fragment>
);

const Header = ({ expanded }) => (
  <Flex alignCenter>
    <FlexItem>
      <InstanceTypeIcon />
    </FlexItem>
    <FlexItem>
      <VerticalDivider />
    </FlexItem>
    <FlexItem>
      <H3>Instance type and image</H3>
    </FlexItem>
    <FlexItem>
      <VerticalDivider />
    </FlexItem>
    <FlexItem alignCenter>
      {expanded ? (
        <Link to={`/instances/~create`}>
          <Flex alignCenter>
            Collapse
            <Margin left={0.5}>
              <ArrowIcon direction="up" />
            </Margin>
          </Flex>
        </Link>
      ) : (
        <Link to={`/instances/~create/image`}>
          <Flex alignCenter>
            Expand
            <Margin left={0.5}>
              <ArrowIcon />
            </Margin>
          </Flex>
        </Link>
      )}
    </FlexItem>
  </Flex>
);

const ImageContainer = ({
  expanded,
  proceeded,
  hardcoded,
  image = {},
  handleNext,
  handleEdit,
  handleSelectLatest,
  setImageType,
  loading,
  images,
  vms,
  step
}) =>
  hardcoded ? (
    <Fragment>
      <HarcodedImage {...image} />
    </Fragment>
  ) : (
    <Fragment>
      <Margin bottom={4}>
        <Card>
          <CardOutlet>
            <Padding all={4}>
              <Flex justifyBetween>
                <FlexItem>
                  <Header />
                </FlexItem>
                {proceeded && image.id ? (
                  <FlexItem>
                    <SavedIcon />
                  </FlexItem>
                ) : null}
              </Flex>
              {expanded || image.id ? (
                <Margin vertical={3}>
                  <Divider height={remcalc(1)} />
                </Margin>
              ) : null}
              {expanded ? (
                <Margin top={3} bottom={4}>
                  <Description>
                    Hardware virtual machines are generally used for
                    non-containerized applications. Infrastructure containers
                    are generally for running any Linux image on secure, bare
                    metal containers.{' '}
                    <a
                      target="__blank"
                      href="https://docs.joyent.com/images"
                      rel="noopener noreferrer"
                    >
                      Read the docs
                    </a>
                  </Description>
                </Margin>
              ) : null}
              <ReduxForm
                form={IC_IMG_F}
                destroyOnUnmount={false}
                forceUnregisterOnUnmount={true}
                initialValues={{ vms: true }}
              >
                {props =>
                  loading && expanded ? (
                    <StatusLoader />
                  ) : expanded ? (
                    <Fragment>
                      <ImageType setImageType={setImageType} vms={vms} />
                      <Image
                        {...props}
                        images={images.filter(i => i.isVm === vms)}
                        onSelectLatest={handleSelectLatest}
                      />
                    </Fragment>
                  ) : image.id ? (
                    <Preview {...image} />
                  ) : null
                }
              </ReduxForm>
              {!loading && expanded ? (
                <Margin top={1}>
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!image.id || vms !== image.isVm}
                  >
                    Save
                  </Button>
                </Margin>
              ) : null}
            </Padding>
          </CardOutlet>
        </Card>
      </Margin>
    </Fragment>
  );

export default compose(
  connect(
    ({ form, values }, ownProps) => {
      const proceeded = get(values, IC_IMG_V_PROCEEDED, false);
      const image = get(form, `${IC_IMG_F}.values.image`, null);
      const vms = get(values, IC_IMG_V_VMS, true);

      return {
        ...ownProps,
        proceeded,
        vms,
        image
      };
    },
    (dispatch, { history }) => ({
      handleNext: () => {
        dispatch(set({ name: IC_IMG_V_PROCEEDED, value: true }));
        return history.push(
          `/instances/~create/package${history.location.search}`
        );
      },
      handleEdit: () => {
        return history.push(
          `/instances/~create/image${history.location.search}`
        );
      },
      handleSelectLatest: ({ versions }) => {
        return dispatch(change(IC_IMG_F, 'image', versions[0].id));
      },
      setImageType: isVm => {
        return dispatch(set({ name: IC_IMG_V_VMS, value: isVm }));
      }
    })
  ),
  graphql(GetImages, {
    options: ({ query }) => ({
      ssr: false,
      variables: { public: !query.image }
    }),
    props: ({ ownProps, data }) => {
      const { image = '', query } = ownProps;
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
        }
      };
    }
  })
)(ImageContainer);
