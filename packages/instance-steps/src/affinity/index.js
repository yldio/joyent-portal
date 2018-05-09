import React, { Fragment } from 'react';
import { Margin } from 'styled-components-spacing';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import { reset } from 'redux-form';
import { destroy } from 'redux-form';
import get from 'lodash.get';

import Step, {
  Header as StepHeader,
  Description as StepDescription,
  Preview as StepPreview,
  Outlet as StepOutlet
} from 'joyent-ui-resource-step';

import { AffinityIcon, Button, KeyValue } from 'joyent-ui-toolkit';

import { Rule, Header } from './components';
import { addAffinityRule as validateRule } from '../validators';
import { Forms, Values } from '../constants';

const { IC_AFF_F_ADD, IC_AFF_F_EDIT } = Forms;
const { IC_AFF_V_ADD_OPEN, IC_AFF_V_EDIT_OPEN, IC_AFF_V_AFF } = Values;

const RULE_DEFAULTS = {
  conditional: 'should',
  placement: 'same',
  type: 'name',
  pattern: 'equalling',
  name: '',
  value: ''
};

const Preview = ({
  handleAsyncValidate,
  shouldAsyncValidate,
  handleCancelEdit,
  handleRemoveAffinityRule,
  handleUpdateAffinityRule,
  handleToggleExpanded,
  editOpen = true,
  editingRule,
  exitingRule,
  disabled = false
}) => (
  <ReduxForm
    form={IC_AFF_F_EDIT}
    initialValues={exitingRule}
    destroyOnUnmount={false}
    forceUnregisterOnUnmount={false}
    shouldAsyncValidate={shouldAsyncValidate}
    asyncValidate={handleAsyncValidate}
    onSubmit={handleUpdateAffinityRule}
  >
    {formProps =>
      exitingRule ? (
        <Margin top={3}>
          <KeyValue
            {...formProps}
            expanded={editOpen}
            customHeader={<Header rule={exitingRule} />}
            method="edit"
            input={inputProps => (
              <Rule {...editingRule} {...inputProps} valid={formProps.valid} />
            )}
            type="an affinity rule"
            onCancel={handleCancelEdit}
            onRemove={handleRemoveAffinityRule}
            onToggleExpanded={
              handleToggleExpanded && (() => handleToggleExpanded(!editOpen))
            }
            disabled={disabled}
          />
        </Margin>
      ) : null
    }
  </ReduxForm>
);

const Affinity = ({
  handleGetValue,
  handleAsyncValidate,
  shouldAsyncValidate,
  handleCancelEdit,
  handleChangeAddOpen,
  handleCreateAffinityRules,
  handleRemoveAffinityRule,
  handleToggleExpanded,
  handleUpdateAffinityRule,
  preview = [],
  addOpen = true,
  editOpen = true,
  creatingRule,
  editingRule,
  exitingRule,
  ...props
}) => (
  <Step name="affinity" getValue={handleGetValue} {...props}>
    <StepHeader icon={<AffinityIcon />}>Affinity rules</StepHeader>
    <StepDescription href="https://docs.joyent.com/public-cloud/instances/docker/how/start-containers#controlling-container-placement">
      Affinity rules control the location of instances, to help reduce traffic
      across networks and keep the workload balanced. With strict rules,
      instances are only provisioned when the criteria is met.
    </StepDescription>
    <StepPreview>
      <Margin top="3">
        <Preview exitingRule={preview} disabled editOpen={false} />
      </Margin>
    </StepPreview>
    <StepOutlet>
      {({ next }) => (
        <Fragment>
          <Preview
            handleAsyncValidate={handleAsyncValidate}
            shouldAsyncValidate={shouldAsyncValidate}
            handleCancelEdit={handleCancelEdit}
            handleRemoveAffinityRule={handleRemoveAffinityRule}
            handleUpdateAffinityRule={handleUpdateAffinityRule}
            handleToggleExpanded={handleToggleExpanded}
            editOpen={editOpen}
            editingRule={editingRule}
            exitingRule={exitingRule}
          />
          <ReduxForm
            form={IC_AFF_F_ADD}
            initialValues={RULE_DEFAULTS}
            destroyOnUnmount={false}
            forceUnregisterOnUnmount={false}
            shouldAsyncValidate={shouldAsyncValidate}
            asyncValidate={handleAsyncValidate}
            onSubmit={handleCreateAffinityRules}
          >
            {formProps =>
              addOpen ? (
                <Margin top={3}>
                  <KeyValue
                    {...formProps}
                    method="create"
                    input={inputProps => (
                      <Rule
                        {...creatingRule}
                        {...inputProps}
                        valid={formProps.valid}
                      />
                    )}
                    type="an affinity rule"
                    noRemove
                    borderless
                    headless
                    onCancel={() => handleChangeAddOpen(false)}
                  />
                </Margin>
              ) : null
            }
          </ReduxForm>
          {!addOpen && !exitingRule ? (
            <Margin top={5}>
              <Button
                type="button"
                onClick={() => handleChangeAddOpen(true)}
                secondary
              >
                Create Affinity Rule
              </Button>
            </Margin>
          ) : null}
          {!addOpen && exitingRule ? (
            <Margin top={5}>
              <Button type="button" component={Link} to={next}>
                Next
              </Button>
            </Margin>
          ) : null}
        </Fragment>
      )}
    </StepOutlet>
  </Step>
);

export default compose(
  connect(({ values, form }, ownProps) => {
    const editingRule = get(form, `${IC_AFF_F_EDIT}.values`, null);
    const creatingRule = get(form, `${IC_AFF_F_ADD}.values`, null);
    const exitingRule = get(values, IC_AFF_V_AFF, null);

    const addOpen = get(values, IC_AFF_V_ADD_OPEN, true);
    const editOpen = get(values, IC_AFF_V_EDIT_OPEN, false);

    return {
      addOpen,
      editOpen,
      creatingRule,
      editingRule,
      exitingRule,
      handleGetValue: () => exitingRule
    };
  }),
  connect(null, (dispatch, { history }) => ({
    shouldAsyncValidate: ({ trigger }) => {
      return trigger === 'submit';
    },
    handleAsyncValidate: ({ type, ...aff }) => {
      return type === 'name'
        ? validateRule({ ...aff, type, name: 'default' })
        : validateRule({ ...aff, type });
    },

    handleCreateAffinityRules: value => {
      return dispatch([
        destroy(IC_AFF_F_ADD),
        set({ name: IC_AFF_V_ADD_OPEN, value: false }),
        set({ name: IC_AFF_V_AFF, value })
      ]);
    },
    handleUpdateAffinityRule: value => {
      return dispatch([
        destroy(IC_AFF_F_EDIT),
        set({ name: IC_AFF_V_EDIT_OPEN, value: false }),
        set({ name: IC_AFF_V_AFF, value })
      ]);
    },
    handleChangeAddOpen: value => {
      return dispatch([
        reset(IC_AFF_F_ADD),
        set({ name: IC_AFF_V_ADD_OPEN, value })
      ]);
    },
    handleToggleExpanded: value => {
      return dispatch(set({ name: IC_AFF_V_EDIT_OPEN, value }));
    },
    handleCancelEdit: () => {
      return dispatch([set({ name: IC_AFF_V_EDIT_OPEN, value: false })]);
    },
    handleRemoveAffinityRule: () => {
      return dispatch([
        destroy(IC_AFF_F_EDIT),
        set({ name: IC_AFF_V_AFF, value: null })
      ]);
    }
  }))
)(Affinity);
