import React, { Fragment } from 'react';
import { set } from 'react-redux-values';
import { Margin } from 'styled-components-spacing';
import { compose } from 'react-apollo';
import { destroy, reset } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';

import { MetadataIcon, Button, H3 } from 'joyent-ui-toolkit';

import Title from '@components/create-instance/title';
import Description from '@components/description';
import KeyValue from '@components/key-value';

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
  handleEdit
}) => (
  <Fragment>
    <Title
      onClick={!expanded && !proceeded && handleEdit}
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
        >
          Read the docs
        </a>
      </Description>
    ) : null}
    {proceeded ? (
      <Margin bottom={4}>
        <H3>
          {metadata.length} key:value pair{metadata.length === 1 ? '' : 's'}
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
          <KeyValue
            {...props}
            initialValues={{ name, value }}
            expanded={open}
            method="edit"
            input="textarea"
            type="metadata"
            onToggleExpanded={() =>
              expanded ? handleToggleExpanded(index) : null
            }
            onCancel={() => handleCancelEdit(index)}
            onRemove={() => handleRemoveMetadata(index)}
          />
        )}
      </ReduxForm>
    ))}
    {expanded && addOpen ? (
      <ReduxForm
        form={FORM_NAME_CREATE}
        destroyOnUnmount={false}
        forceUnregisterOnUnmount={true}
        onSubmit={handleAddMetadata}
      >
        {props => (
          <KeyValue
            {...props}
            method="add"
            input="textarea"
            type="metadata"
            expanded
            onCancel={() => handleChangeAddOpen(false)}
          />
        )}
      </ReduxForm>
    ) : null}
    <div>
      {expanded ? (
        <Margin bottom={4}>
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
        <Margin bottom={4}>
          <Button type="button" onClick={handleEdit} secondary>
            Edit
          </Button>
        </Margin>
      ) : null}
    </div>
  </Fragment>
);

export default compose(
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

      return history.push('/instances/~create/user-script');
    },
    handleEdit: () => {
      return history.push(`/instances/~create/metadata`);
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
