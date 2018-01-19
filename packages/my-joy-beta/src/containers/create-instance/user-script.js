import React, { Fragment } from 'react';
import { compose } from 'react-apollo';
import { set } from 'react-redux-values';
import ReduxForm from 'declarative-redux-form';
import { destroy } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import { connect } from 'react-redux';
import get from 'lodash.get';
import remcalc from 'remcalc';

import { ScriptIcon, Button, Divider } from 'joyent-ui-toolkit';

import KeyValue from '@components/instances/key-value';
import Description from '@components/create-instance/description';
import Title from '@components/create-instance/title';

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
  handleEdit
}) => (
  <Fragment>
    <Title onClick={!proceeded && handleEdit} icon={<ScriptIcon />}>
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
            onlyValue
          />
        )
      }
    </ReduxForm>
    <div>
      {expanded ? (
        <Margin top={formOpen || script.value ? 1 : 0} bottom={5}>
          {script.value || formOpen ? null : (
            <Button
              type="button"
              onClick={() => handleChangeOpenForm(true)}
              secondary
            >
              Add User Script
            </Button>
          )}
          {formOpen && create ? null : (
            <Button type="submit" onClick={handleNext}>
              Next
            </Button>
          )}
        </Margin>
      ) : proceeded ? (
        <Fragment>
          <Button type="button" onClick={handleEdit} secondary>
            Edit
          </Button>
          <Margin top={4}>
            <Divider height={remcalc(1)} />
          </Margin>
        </Fragment>
      ) : null}
    </div>
  </Fragment>
);

export default compose(
  connect(
    ({ values }, ownProps) => {
      const script = get(values, 'create-instance-user-script', {
        name: 'user-script'
      });
      const formOpen = get(values, 'create-instance-user-script-open', false);
      const proceeded = get(
        values,
        'create-instance-user-script-proceeded',
        false
      );

      return {
        script,
        proceeded,
        create: !script.value,
        edit: script.value,
        formOpen
      };
    },
    (dispatch, { history }) => ({
      handleEdit: () => history.push(`/instances/~create/user-script`),
      handleNext: () => {
        dispatch(
          set({ name: 'create-instance-user-script-proceeded', value: true })
        );

        return history.push(`/instances/~create/networks`);
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
