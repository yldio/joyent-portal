import React, { Fragment } from 'react';
import { set } from 'react-redux-values';
import { Margin } from 'styled-components-spacing';
import { compose } from 'react-apollo';
import { destroy, reset } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';
import remcalc from 'remcalc';

import { AffinityIcon, Button, Divider, KeyValue } from 'joyent-ui-toolkit';

import Title from '@components/create-instance/title';
import { Rule, Header } from '@components/create-instance/affinity';
import Description from '@components/description';
import { addAffinityRule as validateRule } from '@state/validators';
import { Forms, Values } from '@root/constants';

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

export const Affinity = ({
  step,
  expanded,
  addOpen,
  editOpen,
  editingRule,
  creatingRule,
  exitingRule,
  shouldAsyncValidate,
  handleAsyncValidate,
  handleCreateAffinityRules,
  handleRemoveAffinityRule,
  handleUpdateAffinityRule,
  handleToggleExpanded,
  handleCancelEdit,
  handleChangeAddOpen,
  handleEdit
}) => (
  <Fragment>
    <Title
      id={step}
      onClick={!expanded && !exitingRule && handleEdit}
      collapsed={!expanded && !exitingRule}
      icon={<AffinityIcon />}
    >
      Affinity
    </Title>
    {expanded ? (
      <Description>
        Control placement of instances on the physical servers. Design
        applications to adapt at failure by distributing application components.
        Instances are only provisioned when the exact criteria is met.{' '}
        <a
          target="__blank"
          href="https://docs.joyent.com/public-cloud/instances/docker/how/start-containers#controlling-container-placement"
          rel="noopener noreferrer"
        >
          Read the docs
        </a>
      </Description>
    ) : null}
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
          <Fragment>
            <KeyValue
              {...formProps}
              expanded={editOpen}
              customHeader={<Header rule={exitingRule} />}
              method="edit"
              input={inputProps => (
                <Rule
                  {...editingRule}
                  {...inputProps}
                  valid={formProps.valid}
                />
              )}
              type="an affinity rule"
              onToggleExpanded={() =>
                handleToggleExpanded(!exitingRule.expanded)
              }
              onCancel={handleCancelEdit}
              onRemove={handleRemoveAffinityRule}
            />
            <Divider height={remcalc(12)} transparent />
          </Fragment>
        ) : null
      }
    </ReduxForm>
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
        expanded && addOpen ? (
          <Fragment>
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
              expanded
              noRemove
              onCancel={() => handleChangeAddOpen(false)}
            />
            <Divider height={remcalc(12)} transparent />
          </Fragment>
        ) : null
      }
    </ReduxForm>
    {expanded ? (
      <Margin top={2} bottom={4}>
        {!addOpen && !exitingRule ? (
          <Button
            type="button"
            onClick={() => handleChangeAddOpen(true)}
            secondary
          >
            Create Affinity Rule
          </Button>
        ) : null}
      </Margin>
    ) : exitingRule ? (
      <Margin top={2} bottom={4}>
        <Button type="button" onClick={handleEdit} secondary>
          Edit
        </Button>
      </Margin>
    ) : null}
    <Margin bottom={7}>
      {expanded ? <Divider height={remcalc(1)} /> : null}
    </Margin>
  </Fragment>
);

export default compose(
  connect(({ values, form }, ownProps) => {
    const editingRule = get(form, `${IC_AFF_F_EDIT}.values`, null);
    const creatingRule = get(form, `${IC_AFF_F_ADD}.values`, null);
    const exitingRule = get(values, IC_AFF_V_AFF, null);

    const addOpen = get(values, IC_AFF_V_ADD_OPEN, false);
    const editOpen = get(values, IC_AFF_V_EDIT_OPEN, false);

    return {
      addOpen,
      editOpen,
      creatingRule,
      editingRule,
      exitingRule
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
    handleEdit: () => {
      return history.push(
        `/instances/~create/affinity${history.location.search}`
      );
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
