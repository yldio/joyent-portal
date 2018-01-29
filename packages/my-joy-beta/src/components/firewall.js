import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import remcalc from 'remcalc';

import {
  H3,
  FormGroup,
  FormLabel,
  Toggle,
  Divider,
  Row,
  Col,
  TagList,
  P,
  Strong,
  Card
} from 'joyent-ui-toolkit';

import Tag from '@components/tags';
import Empty from '@components/empty';

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const Wildcards = {
  vmall: 'All VMs in DC',
  any: 'Any'
};

const parsePartial = (p, index) => {
  if (p[0] === 'wildcard') {
    return (
      <Margin key={index} top={0.5} bottom={0.5}>
        <P>{Wildcards[p[1]]}</P>
      </Margin>
    );
  }

  if (p[0] === 'tag') {
    const value = Array.isArray(p[1]) ? p[1][1] : '';
    const name = Array.isArray(p[1]) ? p[1][0] : p[1];

    return (
      <Margin left={0.5}>
        <TagList>
          <Tag norMargin key={index} name={name} value={value} />
        </TagList>
      </Margin>
    );
  }
};

const Rule = ({ enabled, rule_obj }) => {
  const { action, protocol } = rule_obj;

  const froms = rule_obj.from.map(parsePartial);
  const tos = rule_obj.to.map(parsePartial);

  return (
    <Card disabled={!enabled}>
      <Padding left={3} right={3} top={1.5} bottom={1.5}>
        <Row>
          <Col xs={3}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <Strong>From: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>{froms}</Flex>
            </Flex>
          </Col>
          <Col xs={3}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <Strong>To: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>{tos}</Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <Strong>Protocol: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <Margin top={0.5} bottom={0.5}>
                  <P>{protocol.name}</P>
                </Margin>
              </Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <Strong>Ports: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <Margin top={0.5} bottom={0.5}>
                  <P>{protocol.targets.join(';')}</P>
                </Margin>
              </Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <Strong>Action: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <Margin top={0.5} bottom={0.5}>
                  <P>{capitalizeFirstLetter(action)}</P>
                </Margin>
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Padding>
    </Card>
  );
};

export const Rules = ({ rules = [] }) => (
  <Fragment>
    {rules.map(rule => (
      <Margin key={rule.id} bottom={2}>
        <Rule {...rule} />
      </Margin>
    ))}
  </Fragment>
);

export const DefaultRules = ({ rules = [] }) => (
  <Fragment>
    <H3 noMargin>Default firewall rules</H3>
    <Margin top={3}>
      <Rules rules={rules} />
    </Margin>
  </Fragment>
);

export const TagRules = ({ rules = [] }) => (
  <Fragment>
    <H3 noMargin>Firewall rules from instance tags</H3>
    <Margin top={3}>
      <Rules rules={rules} />
    </Margin>
  </Fragment>
);

export const ToggleFirewallForm = ({ handleSubmit, submitting }) => (
  <form onChange={(...args) => setTimeout(() => handleSubmit(...args), 16)}>
    <FormGroup name="enabled" type="checkbox" field={Field}>
      <Flex alignCenter>
        <FormLabel>Enable Firewall</FormLabel>
        <Toggle disabled={submitting} />
      </Flex>
    </FormGroup>
  </form>
);

export const ToggleInactiveForm = () => (
  <form>
    <FormGroup name="inactive" type="checkbox" field={Field}>
      <Flex alignCenter>
        <Toggle>Show inactive rules</Toggle>
      </Flex>
    </FormGroup>
  </form>
);

export default ({
  defaultRules = [],
  tagRules = [],
  enabled = false,
  handleSubmit
}) => (
  <form onSubmit={handleSubmit}>
    <Margin bottom={4}>
      <FormGroup name="enabled" field={Field}>
        <Toggle>Enable firewall rules</Toggle>
      </FormGroup>
      {enabled ? (
        <FormGroup name="show-inactive" field={Field}>
          <Toggle>Show inactive rules</Toggle>
        </FormGroup>
      ) : null}
    </Margin>
    {enabled ? <DefaultRules rules={defaultRules} /> : null}
    {enabled && !tagRules.length && !defaultRules.length ? (
      <Margin top={5}>
        <Empty>Sorry, but we weren’t able to find any firewall rules.</Empty>
      </Margin>
    ) : null}
    {enabled && tagRules.length && defaultRules.length ? (
      <Divider height={remcalc(18)} transparent />
    ) : null}
    {enabled && tagRules.length ? <TagRules rules={tagRules} /> : null}
    {enabled && (tagRules.length || defaultRules.length) ? (
      <Divider height={remcalc(12)} transparent />
    ) : null}
    {enabled ? (
      <Margin bottom={4}>
        <P>
          *Other firewall rules may apply as defined by wildcard(s), IP(s),
          subnet(s), tag(s) or VM(s). Please see{' '}
          <a
            href="https://apidocs.joyent.com/cloudapi/#firewall-rule-syntax"
            target="_blank"
            rel="noopener noreferrer"
          >
            firewall rule list
          </a>{' '}
          for more details.
        </P>
      </Margin>
    ) : null}
  </form>
);
