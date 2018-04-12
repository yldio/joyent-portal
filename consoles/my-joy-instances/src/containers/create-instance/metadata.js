import React, { Fragment } from 'react';
import { set } from 'react-redux-values';
import { compose } from 'react-apollo';
import { destroy, reset } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import get from 'lodash.get';
import remcalc from 'remcalc';

import {
  Card,
  CardOutlet,
  ArrowIcon,
  Divider,
  H3,
  H5,
  MetadataIcon,
  Button,
  KeyValue
} from 'joyent-ui-toolkit';

import Editor from 'joyent-ui-toolkit/dist/es/editor';
import SavedIcon from '@components/saved-icon';
import Description from '@components/description';
import VerticalDivider from '@components/vertical-divider';
import { addMetadata as validateMetadata } from '@state/validators';
import { Forms, Values } from '@root/constants';

const { IC_MD_F_ADD, IC_MD_F_EDIT } = Forms;
const { IC_MD_V_PROCEEDED, IC_MD_V_ADD_OPEN, IC_MD_V_MD } = Values;

const Header = ({ expanded }) => (
  <Flex alignCenter>
    <FlexItem>
      <MetadataIcon />
    </FlexItem>
    <FlexItem>
      <VerticalDivider />
    </FlexItem>
    <FlexItem>
      <H3>Add Metadata</H3>
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
        <Link to={`/instances/~create/metadata`}>
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

export const Metadata = ({
  id,
  step,
  metadata = [],
  expanded,
  proceeded,
  addOpen,
  handleAddMetadata,
  handleRemoveMetadata,
  handleUpdateMetadata,
  handleToggleExpanded,
  handleCancelEdit,
  handleChangeAddOpen,
  handleNext,
  handleEdit,
  shouldAsyncValidate,
  asyncValidate
}) => (
  <Fragment>
    <Margin bottom={4}>
      <Card>
        <CardOutlet>
          <Padding all={4}>
            <Flex justifyBetween>
              <FlexItem>
                <Header expanded={expanded} />
              </FlexItem>
              {proceeded && metadata.length ? (
                <FlexItem>
                  <SavedIcon />
                </FlexItem>
              ) : (
                <FlexItem>
                  <H5>Optional</H5>
                </FlexItem>
              )}
            </Flex>
            {expanded || (proceeded && metadata.length) ? (
              <Margin vertical={3}>
                <Divider height={remcalc(1)} />
              </Margin>
            ) : null}
            {expanded ? (
              <Margin top={3} bottom={4}>
                <Description>
                  Metadata can be used to pass data to the instance. It can also
                  be used to inject a custom boot script. Unlike tags, metadata
                  is only viewable inside the instance.{' '}
                  <a
                    target="__blank"
                    href="https://docs.joyent.com/public-cloud/tags-metadata/metadata"
                    rel="noopener noreferrer"
                  >
                    Read the docs
                  </a>
                </Description>
              </Margin>
            ) : null}
            {metadata.map(({ name, value, open }, index) => (
              <ReduxForm
                form={IC_MD_F_EDIT(index)}
                key={index}
                initialValues={{ name, value }}
                destroyOnUnmount={false}
                forceUnregisterOnUnmount={true}
                onSubmit={newValue => handleUpdateMetadata(index, newValue)}
                shouldAsyncValidate={shouldAsyncValidate}
                asyncValidate={asyncValidate}
              >
                {props => (
                  <Fragment>
                    <KeyValue
                      {...props}
                      initialValues={{ name, value }}
                      expanded={open}
                      disabled={!expanded}
                      method="edit"
                      input="textarea"
                      type="metadata"
                      onToggleExpanded={() =>
                        expanded ? handleToggleExpanded(index) : null
                      }
                      onCancel={() => handleCancelEdit(index)}
                      onRemove={() => handleRemoveMetadata(index)}
                      editor={Editor}
                    />
                    {addOpen || index !== metadata.length - 1 ? (
                      <Margin bottom={2} />
                    ) : null}
                  </Fragment>
                )}
              </ReduxForm>
            ))}
            <ReduxForm
              form={IC_MD_F_ADD}
              destroyOnUnmount={false}
              forceUnregisterOnUnmount={true}
              onSubmit={handleAddMetadata}
              shouldAsyncValidate={shouldAsyncValidate}
              asyncValidate={asyncValidate}
            >
              {props =>
                expanded && addOpen ? (
                  <Fragment>
                    <KeyValue
                      {...props}
                      method="add"
                      input="textarea"
                      type="metadata"
                      onCancel={() => handleChangeAddOpen(false)}
                      editor={Editor}
                      expanded
                    />
                  </Fragment>
                ) : null
              }
            </ReduxForm>
            {expanded && !addOpen ? (
              <Margin top={2}>
                <Flex>
                  <FlexItem>
                    <Margin right={1}>
                      <Button
                        type="button"
                        onClick={() => handleChangeAddOpen(true)}
                        secondary
                      >
                        Add Metadata
                      </Button>
                    </Margin>
                  </FlexItem>
                  <FlexItem>
                    <Button type="button" onClick={handleNext}>
                      Save
                    </Button>
                  </FlexItem>
                </Flex>
              </Margin>
            ) : null}
          </Padding>
        </CardOutlet>
      </Card>
    </Margin>
  </Fragment>
);

export default compose(
  connect(({ values }, ownProps) => {
    const proceeded = get(values, IC_MD_V_PROCEEDED, false);
    const addOpen = get(values, IC_MD_V_ADD_OPEN, false);
    const metadata = get(values, IC_MD_V_MD, []);

    return {
      proceeded,
      addOpen,
      metadata
    };
  }),
  connect(null, (dispatch, { metadata = [], history }) => ({
    handleNext: () => {
      dispatch(set({ name: IC_MD_V_PROCEEDED, value: true }));
      return history.push(
        `/instances/~create/user-script${history.location.search}`
      );
    },
    handleEdit: () => {
      dispatch(set({ name: IC_MD_V_PROCEEDED, value: true }));
      return history.push(
        `/instances/~create/metadata${history.location.search}`
      );
    },
    shouldAsyncValidate: ({ trigger }) => {
      return trigger === 'submit';
    },
    handleAsyncValidate: validateMetadata,
    handleAddMetadata: value => {
      const toggleToClosed = set({ name: IC_MD_V_ADD_OPEN, value: false });

      const appendMetadata = set({
        name: IC_MD_V_MD,
        value: metadata.concat([{ ...value, open: false }])
      });

      return dispatch([destroy(IC_MD_F_ADD), toggleToClosed, appendMetadata]);
    },
    handleUpdateMetadata: (index, newMetadata) => {
      metadata[index] = {
        ...newMetadata,
        open: false
      };

      return dispatch([
        destroy(IC_MD_F_EDIT(index)),
        set({ name: IC_MD_V_MD, value: metadata.slice() })
      ]);
    },
    handleChangeAddOpen: value => {
      return dispatch([
        reset(IC_MD_F_ADD),
        set({ name: IC_MD_V_ADD_OPEN, value })
      ]);
    },
    handleToggleExpanded: index => {
      metadata[index] = {
        ...metadata[index],
        open: !metadata[index].open
      };

      return dispatch(set({ name: IC_MD_V_MD, value: metadata.slice() }));
    },
    handleCancelEdit: index => {
      metadata[index] = {
        ...metadata[index],
        open: false
      };

      return dispatch([
        reset(IC_MD_F_EDIT(index)),
        set({ name: IC_MD_V_MD, value: metadata.slice() })
      ]);
    },
    handleRemoveMetadata: index => {
      metadata.splice(index, 1);

      return dispatch([
        destroy(IC_MD_F_EDIT(index)),
        set({ name: IC_MD_V_MD, value: metadata.slice() })
      ]);
    }
  }))
)(Metadata);
