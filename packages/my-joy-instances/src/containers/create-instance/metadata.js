import React, { Fragment } from 'react';
import { set } from 'react-redux-values';
import { Margin } from 'styled-components-spacing';
import { compose } from 'react-apollo';
import { destroy, reset } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';
import remcalc from 'remcalc';

import { MetadataIcon, Button, H3, Divider, KeyValue } from 'joyent-ui-toolkit';
import Editor from 'joyent-ui-toolkit/dist/es/editor';

import Title from '@components/create-instance/title';
import Description from '@components/description';
import { addMetadata as validateMetadata } from '@state/validators';
import { Forms, Values } from '@root/constants';

const { IC_MD_F_ADD, IC_MD_F_EDIT } = Forms;
const { IC_MD_V_PROCEEDED, IC_MD_V_ADD_OPEN, IC_MD_V_MD } = Values;

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
    <Title
      id={step}
      onClick={!expanded && !proceeded && handleEdit}
      collapsed={!expanded && !proceeded}
      icon={<MetadataIcon />}
    >
      Metadata
    </Title>
    {expanded ? (
      <Description>
        Metadata can be used to pass data to the instance. It can also be used
        to inject a custom boot script. Unlike tags, metadata is only viewable
        inside the instance.{' '}
        <a
          target="__blank"
          href="https://docs.joyent.com/public-cloud/tags-metadata/metadata"
          rel="noopener noreferrer"
        >
          Read the docs
        </a>
      </Description>
    ) : null}
    {proceeded || expanded ? (
      <Margin bottom={3}>
        <H3>
          {metadata.length} key—value pair{metadata.length === 1 ? '' : 's'}
        </H3>
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
            <Divider
              height={remcalc(index === metadata.length - 1 ? 18 : 12)}
              transparent
            />
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
            <Divider height={remcalc(18)} transparent />
          </Fragment>
        ) : null
      }
    </ReduxForm>
    {expanded ? (
      <Margin top={1} bottom={7}>
        <Button
          type="button"
          onClick={() => handleChangeAddOpen(true)}
          secondary
        >
          Add Metadata
        </Button>
        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      </Margin>
    ) : proceeded ? (
      <Margin top={1} bottom={7}>
        <Button type="button" onClick={handleEdit} secondary>
          Edit
        </Button>
      </Margin>
    ) : null}
  </Fragment>
);

export default compose(
  connect(({ values }, ownProps) => {
    const proceeded = get(values, IC_MD_V_PROCEEDED, false);
    const addOpen = get(values, IC_MD_V_ADD_OPEN, false);
    const metadata = get(values, IC_MD_V_MD, []);

    return {
      proceeded: proceeded || metadata.length,
      addOpen,
      metadata
    };
  }),
  connect(null, (dispatch, { metadata = [], history }) => ({
    handleNext: () => {
      dispatch(set({ name: IC_MD_V_PROCEEDED, value: true }));
      return history.push(`/~create/user-script${history.location.search}`);
    },
    handleEdit: () => {
      dispatch(set({ name: IC_MD_V_PROCEEDED, value: true }));
      return history.push(`/~create/metadata${history.location.search}`);
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
