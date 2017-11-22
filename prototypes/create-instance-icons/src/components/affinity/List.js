import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Row, Col } from 'react-styled-flexboxgrid';
import { compose, withState } from 'recompose';
import { Margin } from 'styled-components-spacing';
import { FadeIn, SlideInDown } from 'animate-css-styled-components';

import {
  CardOutlet,
  CardHeader,
  CardHeaderMeta,
  Card,
  ArrowIcon,
  Input,
  Button,
  Select,
  H5
} from 'joyent-ui-toolkit';

const MarginInline = styled(Margin)`
  display: inline;
`;

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const FullWidthCard = styled(Card)`
  flex-basis: 100%;
  margin-bottom: ${remcalc(18)};
  overflow: hidden;
  height: auto;
`;
const enhance = compose(withState('open', 'toggleCard', true));

const ListRules = ({ rule, open, toggleCard, updateRule, deleteRule }) => (
  <FadeIn duration="0.8s">
    <FullWidthCard shadow collapsed={open}>
      <CardHeader
        onClick={() => toggleCard(n => !n)}
        actionable
        secondary={false}
        transparent={false}
      >
        <CardHeaderMeta>
          <Row between="xs" middle="xs">
            <Col xs={11}>
              <b>{capitalizeFirstLetter(rule.instance)}</b>
              {`: be on ${rule.be} node as the instance(s) identified by the `}
              {!rule.tagKey
                ? `${rule.type} ${rule.match} "${rule.value}"`
                : `tag key ${rule.tagKeyType} "${rule.tagKey}" and tag value ${rule.tagValueType} "${rule.tagValue}"`}
            </Col>
            <Col>
              <ArrowIcon />
            </Col>
          </Row>
        </CardHeaderMeta>
      </CardHeader>
      <CardOutlet>
        <SlideInDown duration="0.5s">
          <div>
            <H5 inline>The instance</H5>
            <Select
              fluid
              embedded
              value={rule.instance}
              onChange={e => updateRule({ ...rule, instance: e.target.value })}
            >
              <option>must</option>
              <option>should</option>
            </Select>
            <H5 inline>be on</H5>
            <Select
              fluid
              embedded
              value={rule.be}
              onChange={e => updateRule({ ...rule, be: e.target.value })}
            >
              <option>the same</option>
              <option>a different</option>
            </Select>
            <H5 inline>node as the instance(s) identified by the</H5>
            <div>
              <Select
                fluid
                embedded
                left
                value={rule.type}
                onChange={e => updateRule({ ...rule, type: e.target.value })}
              >
                <option>instance name</option>
                <option>tag</option>
              </Select>
              {rule.type === 'instance name'
                ? [
                    <MarginInline right={1}>
                      <Select
                        fluid
                        embedded
                        value={rule.match}
                        onChange={e =>
                          updateRule({ ...rule, match: e.target.value })}
                      >
                        <option>containing</option>
                        <option>equalling</option>
                        <option>not equalling</option>
                        <option>starting with</option>
                        <option>ending with</option>
                      </Select>
                    </MarginInline>,
                    <Input
                      embedded
                      type="text"
                      required
                      value={rule.value}
                      onChange={e =>
                        updateRule({ ...rule, value: e.target.value })}
                      placeholder="Example instance name: nginx"
                    />
                  ]
                : [
                    <MarginInline right={1}>
                      <Select
                        fluid
                        embedded
                        value={rule.tagKeyType}
                        onChange={e =>
                          updateRule({ ...rule, tagKeyType: e.target.value })}
                      >
                        <option>equalling</option>
                        <option>not equalling</option>
                        <option>containing</option>
                        <option>starting with</option>
                        <option>ending with</option>
                      </Select>
                    </MarginInline>,
                    <Input
                      small
                      embedded
                      type="text"
                      required
                      value={rule.tagKey}
                      onChange={e =>
                        updateRule({ ...rule, tagKey: e.target.value })}
                      placeholder="key"
                    />,
                    <H5 inline>and value</H5>,
                    <MarginInline right={1}>
                      <Select
                        fluid
                        embedded
                        value={rule.tagValueType}
                        onChange={e =>
                          updateRule({ ...rule, tagValueType: e.target.value })}
                      >
                        <option>equalling</option>
                        <option>not equalling</option>
                        <option>containing</option>
                        <option>starting with</option>
                        <option>ending with</option>
                      </Select>
                    </MarginInline>,
                    <Input
                      small
                      embedded
                      type="text"
                      required
                      onChange={e =>
                        updateRule({ ...rule, tagValue: e.target.value })}
                      value={rule.tagValue}
                      placeholder="value"
                    />
                  ]}
            </div>
            <div>
              <Button secondary onClick={() => toggleCard(n => !n)}>
                Cancel
              </Button>
              <Button secondary onClick={() => deleteRule(rule.id)}>
                Delete
              </Button>
              <Button onClick={() => toggleCard(n => !n)}>Edit</Button>
            </div>
          </div>
        </SlideInDown>
      </CardOutlet>
    </FullWidthCard>
  </FadeIn>
);

export default enhance(ListRules);
