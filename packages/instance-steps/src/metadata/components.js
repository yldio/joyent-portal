import React, { Fragment } from 'react';
import { Margin } from 'styled-components-spacing';
import ReduxForm from 'declarative-redux-form';

import { H3, KeyValue } from 'joyent-ui-toolkit';
import Editor from 'joyent-ui-toolkit/dist/es/editor';

import { Forms } from '../constants';

const { IC_MD_F_EDIT } = Forms;

export const Overview = ({ total = 0 }) => (
  <H3>
    {total} key-value pair{total === 1 ? '' : 's'}
  </H3>
);

export default ({
  metadata = [],
  handleUpdateMetadata,
  shouldAsyncValidate,
  handleAsyncValidate,
  handleToggleExpanded,
  handleRemoveMetadata,
  handleCancelEdit,
  addOpen,
  disabled
}) => (
  <Fragment>
    <Margin bottom={5}>
      <Overview total={metadata.length} />
    </Margin>
    {metadata.map(({ name, value, open }, index) => (
      <ReduxForm
        form={IC_MD_F_EDIT(index)}
        key={index}
        initialValues={{ name, value }}
        destroyOnUnmount={false}
        forceUnregisterOnUnmount={true}
        onSubmit={newValue => handleUpdateMetadata(index, newValue)}
        shouldAsyncValidate={shouldAsyncValidate}
        asyncValidate={handleAsyncValidate}
      >
        {props => (
          <Fragment>
            <KeyValue
              {...props}
              initialValues={{ name, value }}
              expanded={open}
              method="edit"
              input="textarea"
              type="metadata"
              onToggleExpanded={
                handleToggleExpanded && (() => handleToggleExpanded(index))
              }
              onCancel={handleCancelEdit && (() => handleCancelEdit(index))}
              onRemove={
                handleRemoveMetadata && (() => handleRemoveMetadata(index))
              }
              editor={Editor}
              disabled={disabled}
              shadow={false}
            />
            {addOpen || index !== metadata.length - 1 ? (
              <Margin bottom={2} />
            ) : null}
          </Fragment>
        )}
      </ReduxForm>
    ))}
  </Fragment>
);
