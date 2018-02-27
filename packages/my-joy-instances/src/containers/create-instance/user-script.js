import React, { Fragment } from 'react';
import { compose } from 'react-apollo';
import { set } from 'react-redux-values';
import ReduxForm from 'declarative-redux-form';
import { destroy } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import { connect } from 'react-redux';
import get from 'lodash.get';

import { ScriptIcon, Button, KeyValue } from 'joyent-ui-toolkit';
import Editor from 'joyent-ui-toolkit/dist/es/editor';

import Title from '@components/create-instance/title';
import Description from '@components/description';

const FORM_NAME = 'create-instance-user-script';

export const UserScript = ({
  expanded,
  proceeded,
  create,
  edit,
  formOpen,
  script = {},
  handleChangeOpenForm,
  handleSubmit,
  handleRemove,
  handleNext,
  handleEdit,
  step
}) => (
  <Fragment>
    <Title
      id={step}
      onClick={!proceeded && handleEdit}
      icon={<ScriptIcon />}
      collapsed={!expanded && !proceeded}
    >
      User Script
    </Title>
    {expanded ? (
      <Description>
        User script can be used to inject a custom boot script.
      </Description>
    ) : null}
    <ReduxForm
      form={FORM_NAME}
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      initialValues={script}
      onSubmit={handleSubmit}
    >
      {props =>
        !formOpen && create ? null : (
          <KeyValue
            {...props}
            expanded={formOpen}
            method={edit ? 'edit' : 'add'}
            input="textarea"
            type="user script"
            onToggleExpanded={() => handleChangeOpenForm(!formOpen)}
            onCancel={() => handleChangeOpenForm(false)}
            onRemove={handleRemove}
            editor={Editor}
            onlyValue
          />
        )
      }
    </ReduxForm>
    {expanded ? (
      <Margin top={formOpen || script.value ? 4 : 2} bottom={7}>
        {script.value || formOpen ? null : (
          <Button
            type="button"
            onClick={() => handleChangeOpenForm(true)}
            secondary
          >
            Add User Script
          </Button>
        )}
        <Button type="submit" onClick={handleNext}>
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
  connect(
    ({ values }, ownProps) => {
      const formOpen = get(values, 'create-instance-user-script-open', false);

      const script = get(values, 'create-instance-user-script', {
        name: 'user-script'
      });

      const proceeded = get(
        values,
        'create-instance-user-script-proceeded',
        false
      );

      return {
        script,
        proceeded: proceeded || script.value,
        create: !script.value,
        edit: script.value,
        formOpen
      };
    },
    (dispatch, { history }) => ({
      handleNext: () => {
        dispatch(
          set({ name: 'create-instance-user-script-proceeded', value: true })
        );

        return history.push(`/~create/networks${history.location.search}`);
      },
      handleEdit: () => {
        dispatch(
          set({ name: 'create-instance-user-script-proceeded', value: true })
        );

        return history.push(`/~create/user-script${history.location.search}`);
      },
      handleChangeOpenForm: value => {
        return dispatch([
          set({ name: `create-instance-user-script-open`, value })
        ]);
      },
      handleSubmit: value => {
        return dispatch([
          set({ name: `create-instance-user-script`, value: { ...value } }),
          set({ name: `create-instance-user-script-open`, value: false })
        ]);
      },
      handleRemove: () => {
        return dispatch([
          destroy(FORM_NAME),
          set({
            name: `create-instance-user-script`,
            value: { name: 'user-script' }
          }),
          set({ name: `create-instance-user-script-open`, value: false })
        ]);
      }
    })
  )
)(UserScript);
