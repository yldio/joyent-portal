import React, { Fragment } from 'react';
import { set } from 'react-redux-values';
import { Margin } from 'styled-components-spacing';
import { compose } from 'react-apollo';
import { destroy, reset } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';
import remcalc from 'remcalc';

import { AffinityIcon, Button, H3, Divider, KeyValue } from 'joyent-ui-toolkit';

import Title from '@components/create-instance/title';
import { Rule, Header } from '@components/create-instance/affinity';
import Description from '@components/description';

const FORM_NAME_CREATE = 'CREATE-INSTANCE-AFFINITY-ADD';
const FORM_NAME_EDIT = i => `CREATE-INSTANCE-AFFINITY-EDIT-${i}`;

const RULE_DEFAULTS = {
  'rule-instance-name': '',
  'rule-instance-conditional': 'must',
  'rule-instance-placement': 'same',
  'rule-instance-tag-key-pattern': 'equalling',
  'rule-instance-tag-value-pattern': 'equalling',
  'rule-instance-name-pattern': 'equalling',
  'rule-instance-tag-value': '',
  'rule-instance-tag-key': '',
  'rule-type': 'name'
};

export const Affinity = ({
  affinityRules = [],
  expanded,
  proceeded,
  addOpen,
  handleAddAffinityRules,
  handleRemoveAffinityRule,
  handleUpdateAffinityRule,
  handleToggleExpanded,
  handleCancelEdit,
  handleChangeAddOpen,
  handleEdit,
  rule,
  step
}) => (
  <Fragment>
    <Title
      id={step}
      onClick={!expanded && !proceeded && handleEdit}
      collapsed={!expanded && !proceeded}
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
    {proceeded ? (
      <Margin bottom={4}>
        <H3>{affinityRules.length} Affinity Rule</H3>
      </Margin>
    ) : null}
    {affinityRules.map((rule, index) => (
      <ReduxForm
        form={FORM_NAME_EDIT(index)}
        key={index}
        initialValues={rule}
        destroyOnUnmount={false}
        forceUnregisterOnUnmount={true}
        onSubmit={newValue => handleUpdateAffinityRule(index, newValue)}
      >
        {props => (
          <Fragment>
            <KeyValue
              {...props}
              expanded={rule.expanded}
              customHeader={<Header {...rule} />}
              method="edit"
              input={props => <Rule {...rule} {...props} />}
              type="an affinity rule"
              onToggleExpanded={() => handleToggleExpanded(index)}
              onCancel={() => handleCancelEdit(index)}
              onRemove={() => handleRemoveAffinityRule(index)}
            />
            <Divider height={remcalc(12)} transparent />
          </Fragment>
        )}
      </ReduxForm>
    ))}
    <ReduxForm
      form={FORM_NAME_CREATE}
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      onSubmit={handleAddAffinityRules}
    >
      {props =>
        expanded && addOpen ? (
          <Fragment>
            <KeyValue
              {...props}
              method="create"
              input={props => <Rule {...rule} {...props} />}
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
        {affinityRules.length === 0 ? (
          <Button
            type="button"
            onClick={() => handleChangeAddOpen(true)}
            secondary
          >
            Create Affinity Rule
          </Button>
        ) : null}
      </Margin>
    ) : proceeded ? (
      <Margin top={2} bottom={4}>
        <Button type="button" onClick={handleEdit} secondary>
          Edit
        </Button>
      </Margin>
    ) : null}
    <Margin bottom={7}>
      {expanded || proceeded ? <Divider height={remcalc(1)} /> : null}
    </Margin>
  </Fragment>
);

export default compose(
  connect(({ values, form }, ownProps) => {
    const proceeded = get(values, 'create-instance-affinity-proceeded', false);
    const addOpen = get(values, 'create-instance-affinity-add-open', false);
    const affinityRules = get(values, 'create-instance-affinity', []);
    const rule = get(form, `${FORM_NAME_CREATE}.values`, {});

    return {
      proceeded: proceeded || affinityRules.length,
      addOpen,
      affinityRules,
      rule,
    };
  }),
  connect(null, (dispatch, { affinityRules = [], history }) => ({
    handleEdit: () => {
      return history.push(`/~create/affinity${history.location.search}`);
    },
    handleAddAffinityRules: ({ ...rule }) => {
      const toggleToClosed = set({
        name: `create-instance-affinity-add-open`,
        value: false
      });

      const appendAffinityRule = set({
        name: `create-instance-affinity`,
        value: affinityRules.concat([
          { ...RULE_DEFAULTS, ...rule, expanded: false }
        ])
      });

      return dispatch([
        destroy(FORM_NAME_CREATE),
        toggleToClosed,
        appendAffinityRule
      ]);
    },
    handleUpdateAffinityRule: (index, newAffinityRule) => {
      affinityRules[index] = {
        ...newAffinityRule,
        expanded: false
      };

      return dispatch([
        destroy(FORM_NAME_EDIT(index)),
        set({ name: `create-instance-affinity`, value: affinityRules.slice() })
      ]);
    },
    handleChangeAddOpen: value => {
      return dispatch([
        reset(FORM_NAME_CREATE),
        set({ name: `create-instance-affinity-add-open`, value })
      ]);
    },
    handleToggleExpanded: index => {
      affinityRules[index] = {
        ...affinityRules[index],
        expanded: !affinityRules[index].expanded
      };

      return dispatch(
        set({
          name: `create-instance-affinity`,
          value: affinityRules.slice()
        })
      );
    },
    handleCancelEdit: index => {
      affinityRules[index] = {
        ...affinityRules[index],
        expanded: false
      };

      return dispatch([
        reset(FORM_NAME_EDIT(index)),
        set({ name: `create-instance-affinity`, value: affinityRules.slice() })
      ]);
    },
    handleRemoveAffinityRule: index => {
      affinityRules.splice(index, 1);

      return dispatch([
        destroy(FORM_NAME_EDIT(index)),
        set({ name: `create-instance-affinity`, value: affinityRules.slice() })
      ]);
    }
  }))
)(Affinity);
