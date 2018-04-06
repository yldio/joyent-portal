import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Margin } from 'styled-components-spacing';
import Flex from 'styled-flex-component';
import { Field } from 'redux-form';
import titleCase from 'title-case';
import remcalc from 'remcalc';

import {
  H5,
  Select as BaseSelect,
  Input as BaseInput,
  FormGroup,
  FormMeta
} from 'joyent-ui-toolkit';

const style = {
  lineHeight: remcalc(48),
  fontSize: remcalc(18)
};

const Bold = styled.span`
  font-weight: ${props => props.theme.font.weight.semibold};
`;

const Select = styled(BaseSelect)`
  color: rgba(73, 73, 73, 0.5);
  border-color: rgba(73, 73, 73, 0.5);
`;

const Input = styled(BaseInput)`
  border-color: rgba(73, 73, 73, 0.5);
`;

const Values = touched => (
  <Margin right="1">
    <Select
      id="affinity-rule-3-select"
      style={style}
      touched={touched}
      width={remcalc(130)}
      embedded
    >
      <option id="affinity-rule-3-equalling" value="equalling">
        equalling
      </option>
      <option id="affinity-rule-3-starting" value="starting">
        starting with
      </option>
    </Select>
  </Margin>
);

export const Rule = ({ valid, ...rule }) => (
  <Margin bottom={valid ? '4' : '8'}>
    <Flex alignCenter wrap>
      <H5 style={style} inline noMargin>
        The instance
      </H5>
      <Margin horizontal="1">
        <FormGroup name="conditional" field={Field}>
          <Select
            style={style}
            touched={rule.conditional}
            width={remcalc(86)}
            embedded
            id="affinity-rule-0-select"
          >
            <option id="affinity-rule-0-should" value="should">
              should
            </option>
            <option id="affinity-rule-0-must" value="must">
              must
            </option>
          </Select>
        </FormGroup>
      </Margin>
      <H5 style={style} inline noMargin>
        be on
      </H5>
      <Margin horizontal="1">
        <FormGroup name="placement" field={Field}>
          <Select
            style={style}
            touched={rule.placement}
            width={remcalc(100)}
            embedded
            id="affinity-rule-1-select"
          >
            <option id="affinity-rule-1-same" value="same">
              the same
            </option>
            <option id="affinity-rule-1-different" value="different">
              a different
            </option>
          </Select>
        </FormGroup>
      </Margin>
      <H5 style={style} inline noMargin>
        node as the instance(s) identified by the
      </H5>
      <Margin horizontal="1">
        <FormGroup name="type" field={Field}>
          <Select
            id="affinity-rule-2-select"
            style={style}
            touched={rule.type}
            width={remcalc(135)}
            embedded
            left
          >
            <option id="affinity-rule-2-name" value="name">
              instance name
            </option>
            <option id="affinity-rule-2-tag" value="tag">
              tag
            </option>
          </Select>
        </FormGroup>
      </Margin>
      <FormGroup name="pattern" field={Field}>
        {Values(rule.pattern)}
      </FormGroup>
      <FormGroup id="affinity-rule-input" name="value" field={Field}>
        <Input
          onBlur={null}
          style={style}
          type="text"
          placeholder="Example instance name: nginx"
          embedded
          required
        />
        <FormMeta absolute />
      </FormGroup>
    </Flex>
  </Margin>
);

export const Header = ({ rule }) => (
  <Fragment>
    <Bold>{titleCase(rule.conditional)}:</Bold> be on a {rule.placement} node as
    the instance(s) identified by the instance {rule.type}
    {rule.type === 'name' ? (
      <Fragment>
        {' '}
        {rule.pattern} “{rule.value}”
      </Fragment>
    ) : (
      <Fragment>
        {' '}
        key “{rule.name}" and the instance tag value{' '}
        {rule.pattern && rule.pattern.split('-').join(' ')} "{rule.value}”
      </Fragment>
    )}
  </Fragment>
);
