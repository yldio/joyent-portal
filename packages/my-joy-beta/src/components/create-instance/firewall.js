import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import styled from 'styled-components';
import remcalc from 'remcalc';
import constantCase from 'constant-case';

import {
  NameIcon,
  H3,
  P,
  FormGroup,
  FormLabel,
  Input,
  FormMeta,
  Button,
  Toggle,
  Card,
  CardOutlet,
  Divider,
  Row,
  Col,
  TagList
} from 'joyent-ui-toolkit';

import Tag from '@components/instances/tags';
import Title from './title';

const Box = styled.div`
  display: inline-block;
  background-color: ${props => props.theme.white};
  border: ${remcalc(1)} solid ${props => props.theme.grey};
  min-width: 100%;
`;

const Wildcards = {
  vmall: 'All VMs in DC',
  any: 'Any'
};

const parsePartial = (p, index) => {
  if (p[0] === 'wildcard') {
    return <span key={index}>{Wildcards[p[1]]}</span>;
  }

  if (p[0] === 'tag') {
    const value = Array.isArray(p[1]) ? p[1][1] : '';
    const name = Array.isArray(p[1]) ? p[1][0] : p[1];

    return <Tag key={index} name={name} value={value} />;
  }
}

const Rule = ({ enabled, rule_obj }) => {
  const { action, protocol } = rule_obj;

  const froms = rule_obj.from.map(parsePartial);
  const tos = rule_obj.to.map(parsePartial);

  return (
    <Box disabled={!enabled}>
      <Padding left={3} right={3} top={2} bottom={2}>
        <Row>
          <Col xs={3}>
            <Flex justifyStart alignCenter contentStretch>
              <FlexItem>
                <b>From:{' '}</b>
              </FlexItem>
              <FlexItem grow={1}><TagList>{froms}</TagList></FlexItem>
            </Flex>
          </Col>
          <Col xs={3}>
            <Flex justifyStart alignCenter contentStretch>
              <FlexItem>
                <b>To:{' '}</b>
              </FlexItem>
              <FlexItem grow={1}><TagList>{tos}</TagList></FlexItem>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch>
              <FlexItem>
                <b>Protocol:{' '}</b>
              </FlexItem>
              <FlexItem grow={1}>{protocol.name}</FlexItem>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch>
              <FlexItem>
                <b>Ports:{' '}</b>
              </FlexItem>
              <FlexItem grow={1}>{protocol.targets.join(';')}</FlexItem>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch>
              <FlexItem>
                <b>Action:{' '}</b>
              </FlexItem>
              <FlexItem grow={1}>{constantCase(action)}</FlexItem>
            </Flex>
          </Col>
        </Row>
      </Padding>
    </Box>
  );
};

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
    {enabled && defaultRules.length ? (
      <Fragment>
        <H3>Default firewall rules</H3>
        <span /> {/* trick H3 margin sibling rule */}
        <Margin top={3}>
          {defaultRules.map(rule => (
            <Margin bottom={2}>
              <Rule key={rule.id} {...rule} />
            </Margin>
          ))}
        </Margin>
      </Fragment>
    ) : null}
    {enabled && tagRules.length && defaultRules.length ? (
      <Divider height={remcalc(18)} transparent />
    ) : null}
    {enabled && tagRules.length ? (
      <Fragment>
        <H3>Firewall rules from instance tags</H3>
        <span /> {/* trick H3 margin sibling rule */}
        <Margin top={3}>
          {tagRules.map(rule => (
            <Margin bottom={2}>
              <Rule key={rule.id} {...rule} />
            </Margin>
          ))}
        </Margin>
      </Fragment>
    ) : null}
    {enabled && (tagRules.length || defaultRules.length) ? (
      <Divider height={remcalc(12)} transparent />
    ) : null}
  </form>
);
