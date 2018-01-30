import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';

import {
  H3,
  FormGroup,
  FormLabel,
  Toggle,
  TagList,
  P,
  Strong,
  Card
} from 'joyent-ui-toolkit';

import Tag from '@components/tags';

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

export const ToggleFirewallForm = ({
  handleSubmit = () => null,
  submitOnChange = false,
  submitting = false,
  left = false
}) => {
  const onChange = submitOnChange
    ? (...args) => setTimeout(() => handleSubmit(...args), 16)
    : undefined;

  return (
    <form onChange={onChange}>
      <FormGroup name="enabled" type="checkbox" field={Field}>
        <Flex alignCenter>
          {left ? (
            <Fragment>
              <Toggle disabled={submitting} />
              <FormLabel marginless>Enable Firewall</FormLabel>
            </Fragment>
          ) : (
            <Fragment>
              <FormLabel marginless>Enable Firewall</FormLabel>
              <Toggle disabled={submitting} />
            </Fragment>
          )}
        </Flex>
      </FormGroup>
    </form>
  );
};

export const ToggleInactiveForm = () => (
  <form>
    <FormGroup name="inactive" type="checkbox" field={Field}>
      <Flex alignCenter>
        <Toggle>Show inactive rules</Toggle>
      </Flex>
    </FormGroup>
  </form>
);
