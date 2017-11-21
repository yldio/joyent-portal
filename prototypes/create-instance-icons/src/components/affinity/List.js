import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Row, Col } from 'react-styled-flexboxgrid';
import { withState } from 'recompose';

import {
  CardOutlet,
  CardHeader,
  CardHeaderMeta,
  Card,
  ArrowIcon
} from 'joyent-ui-toolkit';

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const FullWidthCard = styled(Card)`
  flex-basis: 100%;
  margin-bottom: ${remcalc(18)};
`;
const enhance = withState('open', 'toggleCard', true);

const ListRules = ({ rule, open, toggleCard }) => (
  <FullWidthCard shadow collapsed={open}>
    <CardHeader onClick={() => toggleCard(n => !n)} actionable secondary={false} transparent={false}>
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
            <ArrowIcon  />
          </Col>
        </Row>
      </CardHeaderMeta>
    </CardHeader>
    <CardOutlet>Stuff</CardOutlet>
  </FullWidthCard>
);

export default enhance(ListRules);
