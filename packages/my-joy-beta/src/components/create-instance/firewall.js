import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

import {
  H3,
  FormGroup,
  Toggle,
  Divider,
  Row,
  Col,
  TagList,
  P
} from 'joyent-ui-toolkit';

import Tag from '@components/tags';
import Empty from './empty';

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const Box = styled.div`
  display: inline-block;
  background-color: ${props => props.theme.white};
  border: ${remcalc(1)} solid ${props => props.theme.grey};
  min-width: 100%;

  ${is('disabled')`
    color: ${props => props.theme.greyDark}
  `};
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

    return (
      <Margin left={0.5}>
        <Tag norMargin key={index} name={name} value={value} />
      </Margin>
    );
  }
};

const Rule = ({ enabled, rule_obj }) => {
  const { action, protocol } = rule_obj;

  const froms = rule_obj.from.map(parsePartial);
  const tos = rule_obj.to.map(parsePartial);

  return (
    <Box disabled={!enabled}>
      <Padding left={3} right={3} top={2} bottom={2}>
        <Row>
          <Col xs={3}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <b>From: </b>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <TagList>{froms}</TagList>
              </Flex>
            </Flex>
          </Col>
          <Col xs={3}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <b>To: </b>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <TagList>{tos}</TagList>
              </Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <b>Protocol: </b>
                </FlexItem>
              </Margin>
              <Flex alignCenter>{protocol.name}</Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <b>Ports: </b>
                </FlexItem>
              </Margin>
              <Flex alignCenter>{protocol.targets.join(';')}</Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <b>Action: </b>
                </FlexItem>
              </Margin>
              <Flex alignCenter>{capitalizeFirstLetter(action)}</Flex>
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
        <H3 noMargin>Default firewall rules</H3>
        <Margin top={3}>
          {defaultRules.map(rule => (
            <Margin bottom={2}>
              <Rule key={rule.id} {...rule} />
            </Margin>
          ))}
        </Margin>
      </Fragment>
    ) : null}
    {enabled && !defaultRules.length ? (
      <Margin bottom={4}>
        <Empty>Sorry, but we weren’t able to find any firewall rules.</Empty>
      </Margin>
    ) : null}
    {enabled && tagRules.length && defaultRules.length ? (
      <Divider height={remcalc(18)} transparent />
    ) : null}
    {enabled && tagRules.length ? (
      <Fragment>
        <H3 noMargin>Firewall rules from instance tags</H3>
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
