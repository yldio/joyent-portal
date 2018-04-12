/* eslint-disable camelcase */
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
  TagItem,
  P,
  Strong,
  Card
} from 'joyent-ui-toolkit';

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const Wildcards = {
  vmall: 'All VMs in DC',
  any: 'Any'
};

const parsePartial = (p, index, style) => {
  if (p[0] === 'wildcard') {
    return <P style={style}>{Wildcards[p[1]]}</P>;
  }

  if (p[0] === 'tag') {
    const value = Array.isArray(p[1]) ? p[1][1] : '';
    const name = Array.isArray(p[1]) ? p[1][0] : p[1];

    return (
      <Margin left={0.5}>
        <TagList>
          <TagItem
            style={style}
            norMargin
            key={index}
            name={name}
            value={value}
          />
        </TagList>
      </Margin>
    );
  }

  return (
    <Margin key={index} top={0.5} bottom={0.5}>
      <P style={style}>{p[1]}</P>
    </Margin>
  );
};

const Rule = ({ enabled, rule_obj }) => {
  const { action, protocol } = rule_obj;

  const style = {
    color: enabled ? null : '#D8D8D8'
  };

  const froms = rule_obj.from.map((p, index) => parsePartial(p, index, style));
  const tos = rule_obj.to.map((p, index) => parsePartial(p, index, style));
  return (
    <Card disabled={!enabled}>
      <Padding left={3} right={3} top={2} bottom={2}>
        <Row>
          <Col xs={3}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <Strong style={style}>From: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>{froms}</Flex>
            </Flex>
          </Col>
          <Col xs={3}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <Strong style={style}>To: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>{tos}</Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <Strong style={style}>Protocol: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <P style={style}>{protocol.name}</P>
              </Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <Strong style={style}>Ports: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <P style={style}>{protocol.targets.join(';')}</P>
              </Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right={0.5}>
                <FlexItem>
                  <Strong style={style}>Action: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <P style={style}>{capitalizeFirstLetter(action)}</P>
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
    {rules.map((rule, index) => (
      <Margin key={rule.id} bottom={index === rules.length - 1 ? 0 : 2}>
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
              <Margin right={2}>
                <Toggle disabled={submitting} />
              </Margin>
              <FormLabel big marginless>
                Enable Firewall
              </FormLabel>
            </Fragment>
          ) : (
            <Fragment>
              <FormLabel big marginless>
                Enable Firewall
              </FormLabel>
              <Margin left={2}>
                <Toggle disabled={submitting} />
              </Margin>
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
        <Fragment>
          <Margin right={2}>
            <Toggle />
          </Margin>
          <FormLabel big marginless>
            Show inactive rules
          </FormLabel>
        </Fragment>
      </Flex>
    </FormGroup>
  </form>
);
