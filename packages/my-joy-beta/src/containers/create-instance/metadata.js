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
import Animated from '@containers/create-instance/animated';
import Description from '@components/description';

const FORM_NAME_CREATE = 'CREATE-INSTANCE-METADATA-ADD';
const FORM_NAME_EDIT = i => `CREATE-INSTANCE-METADATA-EDIT-${i}`;

export const Metadata = ({
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
  id,
  step
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
        form={FORM_NAME_EDIT(index)}
        key={index}
        initialValues={{ name, value }}
        destroyOnUnmount={false}
        forceUnregisterOnUnmount={true}
        onSubmit={newValue => handleUpdateMetadata(index, newValue)}
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
      form={FORM_NAME_CREATE}
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      onSubmit={handleAddMetadata}
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
  Animated,
  connect(({ values }, ownProps) => ({
    proceeded: get(values, 'create-instance-metadata-proceeded', false),
    addOpen: get(values, 'create-instance-metadata-add-open', false),
    metadata: get(values, 'create-instance-metadata', [])
  })),
  connect(null, (dispatch, { metadata = [], history }) => ({
    handleNext: () => {
      dispatch(
        set({ name: 'create-instance-metadata-proceeded', value: true })
      );

      return history.push(`/~create/user-script${history.location.search}`);
    },
    handleEdit: () => {
      return history.push(`/~create/metadata${history.location.search}`);
    },
    handleAddMetadata: value => {
      const toggleToClosed = set({
        name: `create-instance-metadata-add-open`,
        value: false
      });

      const appendMetadata = set({
        name: `create-instance-metadata`,
        value: metadata.concat([{ ...value, open: false }])
      });

      return dispatch([
        destroy(FORM_NAME_CREATE),
        toggleToClosed,
        appendMetadata
      ]);
    },
    handleUpdateMetadata: (index, newMetadata) => {
      metadata[index] = {
        ...newMetadata,
        open: false
      };

      return dispatch([
        destroy(FORM_NAME_EDIT(index)),
        set({ name: `create-instance-metadata`, value: metadata.slice() })
      ]);
    },
    handleChangeAddOpen: value => {
      return dispatch([
        reset(FORM_NAME_CREATE),
        set({ name: `create-instance-metadata-add-open`, value })
      ]);
    },
    handleToggleExpanded: index => {
      metadata[index] = {
        ...metadata[index],
        open: !metadata[index].open
      };

      return dispatch(
        set({
          name: `create-instance-metadata`,
          value: metadata.slice()
        })
      );
    },
    handleCancelEdit: index => {
      metadata[index] = {
        ...metadata[index],
        open: false
      };

      return dispatch([
        reset(FORM_NAME_EDIT(index)),
        set({ name: `create-instance-metadata`, value: metadata.slice() })
      ]);
    },
    handleRemoveMetadata: index => {
      metadata.splice(index, 1);

      return dispatch([
        destroy(FORM_NAME_EDIT(index)),
        set({ name: `create-instance-metadata`, value: metadata.slice() })
      ]);
    }
  }))
)(Metadata);
