import React, { Fragment } from 'react';
import { Margin } from 'styled-components-spacing';
import Flex from 'styled-flex-component';
import { Field } from 'redux-form';
import titleCase from 'title-case';
import remcalc from 'remcalc';

import { H5, Select, Input, FormGroup } from 'joyent-ui-toolkit';

const Values = touched => (
  <Margin right={1}>
    <Select touched={touched} embedded width={remcalc(120)}>
      <option value="equalling">equalling</option>
      <option value="not-equalling">not equalling</option>
      <option value="containing">containing</option>
      <option value="starting">starting with</option>
      <option value="ending">ending with</option>
    </Select>
  </Margin>
);

export const Rule = rule => (
  <Margin top={2} bottom={4}>
    <Flex alignCenter wrap>
      <H5 inline noMargin>
        The instance
      </H5>
      <FormGroup name="rule-instance-conditional" field={Field}>
        <Select
          touched={rule['rule-instance-conditional']}
          width={remcalc(66)}
          embedded
        >
          <option value="must">must</option>
          <option value="should">should</option>
        </Select>
      </FormGroup>
      <H5 inline noMargin>
        be on
      </H5>
      <FormGroup name="rule-instance-placement" field={Field}>
        <Select
          touched={rule['rule-instance-placement']}
          width={remcalc(90)}
          embedded
        >
          <option value="same">the same</option>
          <option value="different">a different</option>
        </Select>
      </FormGroup>
      <H5 inline noMargin>
        node as the instance(s) identified by the
      </H5>
      <FormGroup name="rule-type" field={Field}>
        <Select touched={rule['rule-type']} width={remcalc(120)} embedded left>
          <option value="name">instance name</option>
          <option value="tag">tag</option>
        </Select>
      </FormGroup>
      {rule['rule-type'] === 'tag' ? (
        <Fragment>
          <FormGroup name="rule-instance-tag-key" field={Field}>
            <Input
              onBlur={null}
              small
              embedded
              type="text"
              required
              placeholder="key"
            />
          </FormGroup>
          <H5 inline noMargin>
            and value{' '}
          </H5>
          <FormGroup name="rule-instance-tag-value-pattern" field={Field}>
            {Values(rule['rule-instance-tag-value-pattern'])}
          </FormGroup>
          <FormGroup name="rule-instance-tag-value" field={Field}>
            <Input
              onBlur={null}
              small
              embedded
              type="text"
              required
              placeholder="value"
            />
          </FormGroup>
        </Fragment>
      ) : (
        <Fragment>
          <FormGroup name="rule-instance-name-pattern" field={Field}>
            {Values(rule['rule-instance-name-pattern'])}
          </FormGroup>
          <FormGroup name="rule-instance-name" field={Field}>
            <Input
              onBlur={null}
              embedded
              type="text"
              required
              placeholder="Example instance name: nginx"
            />
          </FormGroup>
        </Fragment>
      )}
    </Flex>
  </Margin>
);

export const Header = rule => (
  <Fragment>
    <b>{titleCase(rule['rule-instance-conditional'])}:</b> be on a{' '}
    {rule['rule-instance-placement']} node as the instance(s) identified by the
    instance {rule['rule-type']}
    {rule['rule-type'] === 'name' ? (
      <Fragment>
        {' '}
        {rule['rule-instance-name-pattern']} “{rule['rule-instance-name']}”
      </Fragment>
    ) : (
      <Fragment>
        {' '}
        key “{rule['rule-instance-tag-key']}" and the instance tag value{' '}
        {rule['rule-instance-tag-value-pattern'] &&
          rule['rule-instance-tag-value-pattern'].split('-').join(' ')}{' '}
        "{rule['rule-instance-tag-value']}”
      </Fragment>
    )}
  </Fragment>
);
