import React, { Fragment } from 'react';
import { compose } from 'react-apollo';
import { set } from 'react-redux-values';
import ReduxForm from 'declarative-redux-form';
import { Margin } from 'styled-components-spacing';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Flex from 'styled-flex-component';

import { ScriptIcon, Button } from 'joyent-ui-toolkit';

import Title from '@components/create-instance/title';
import Description from '@components/description';
import UserScriptForm, { Overview } from '@components/create-instance/user-script';

const FORM_NAME = 'create-instance-user-script';

export const UserScript = ({
  expanded,
  proceeded,
  create,
  edit,
  formOpen,
  script = {},
  lines,
  handleChangeOpenForm,
  handleSubmit,
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
      <Fragment>
        <Description>
          User script can be used to inject a custom boot script.
        </Description>
        {formOpen ? (
          <ReduxForm
            form={FORM_NAME}
            destroyOnUnmount={false}
            forceUnregisterOnUnmount={true}
            onSubmit={handleSubmit}
          >
            {props => <UserScriptForm {...props} />}
          </ReduxForm>
        ) : null}
      </Fragment>
    ) : null}
    {expanded ? (
      <Margin top={formOpen || script.value ? 4 : 2} bottom={7}>
        {script.value || formOpen ? null : (
          <Flex alignCenter>
            <Button
              type="button"
              onClick={() => handleChangeOpenForm(true)}
              secondary
            >
              Add User Script
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Next
            </Button>
          </Flex>
        )}
      </Margin>
    ) : proceeded ? (
      <Fragment>
        <Overview script={script} lines={lines} />
        <Margin top={4} bottom={7}>
          <Button type="button" onClick={handleEdit} secondary>
            Edit
          </Button>
        </Margin>
      </Fragment>
    ) : null}
  </Fragment>
);

export default compose(
  connect(
    ({ values, form }, ownProps) => {
      const formOpen = get(values, 'create-instance-user-script-open', false);
      const script = get(form, `${FORM_NAME}.values.value`, '');
      const lines = script.split('\n').length;

      const proceeded = get(
        values,
        'create-instance-user-script-proceeded',
        false
      );

      return {
        script,
        lines,
        proceeded: proceeded || script.value,
        create: !script.value,
        edit: script.value,
        formOpen
      };
    },
    (dispatch, { history }) => ({
      handleEdit: () => {
        dispatch([
          set({ name: 'create-instance-user-script-proceeded', value: true }),
          set({ name: `create-instance-user-script-open`, value: true })
        ]);

        return history.push(`/~create/user-script${history.location.search}`);
      },
      handleChangeOpenForm: value => {
        return dispatch([
          set({ name: `create-instance-user-script-open`, value })
        ]);
      },
      handleSubmit: value => {
        dispatch([
          set({ name: `create-instance-user-script-open`, value: false }),
          set({ name: 'create-instance-user-script-proceeded', value: true })
        ]);

        return history.push(`/~create/networks${history.location.search}`);
      }
    })
  )
)(UserScript);
