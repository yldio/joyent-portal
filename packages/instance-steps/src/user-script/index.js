import React, { Fragment } from 'react';
import { Margin } from 'styled-components-spacing';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import get from 'lodash.get';

import Step, {
  Header as StepHeader,
  Description as StepDescription,
  Preview as StepPreview,
  Outlet as StepOutlet
} from 'joyent-ui-resource-step';

import { ScriptIcon, Button } from 'joyent-ui-toolkit';

import { Forms, Values } from '../constants';
import UserScriptForm, { Overview } from './components';

const { IR_US_F } = Forms;
const { IR_US_V_OPEN } = Values;

const UserScript = ({
  handleGetValue,
  preview = {},
  script = {},
  lines,
  handleChangeOpenForm,
  handleSubmit,
  handleEdit,
  ...props
}) => (
  <Step name="user-script" getValue={handleGetValue} {...props}>
    <StepHeader icon={<ScriptIcon />}>User script</StepHeader>
    <StepDescription href="https://docs.joyent.com/private-cloud/instances/using-mdata#UsingtheMetadataAPI-ListofMetadataKeys">
      Insert code to execute when the machine starts (first boot only for KVM,
      every boot for infrastructure containers).
    </StepDescription>
    <StepPreview>
      <Overview lines={preview.lines} />
    </StepPreview>
    <StepOutlet>
      {({ next }) => (
        <Margin top="5">
          <ReduxForm
            form={IR_US_F}
            destroyOnUnmount={false}
            forceUnregisterOnUnmount={true}
            onSubmit={handleSubmit}
          >
            {props => (
              <Fragment>
                <UserScriptForm {...props} />
                <Margin top="5">
                  <Button
                    id="next-button-userscript"
                    type="button"
                    component={Link}
                    to={next}
                  >
                    Next
                  </Button>
                </Margin>
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
    ({ values, form }, ownProps) => {
      const formOpen = get(values, IR_US_V_OPEN, false);
      const script = get(form, `${IR_US_F}.values.value`, '');
      const lines = script.trim() === '' ? 0 : script.trim().split('\n').length;

      return {
        script,
        lines,
        handleGetValue: () => ({ script, lines }),
        create: !script.value,
        edit: script.value,
        formOpen
      };
    },
    (dispatch, { history }) => ({
      handleEdit: () => {
        dispatch([set({ name: IR_US_V_OPEN, value: true })]);
      },
      handleChangeOpenForm: value => {
        return dispatch([set({ name: IR_US_V_OPEN, value })]);
      },
      handleSubmit: value => {
        dispatch([set({ name: IR_US_V_OPEN, value: false })]);
      }
    })
  )
)(UserScript);
