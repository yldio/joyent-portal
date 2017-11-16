import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Row, Col } from 'react-styled-flexboxgrid';

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

const ListRules = ({ rule }) => (
  <FullWidthCard shadow collapsed>
    <CardHeader secondary={false} transparent={false}>
      <CardHeaderMeta>
        <Row between="xs" middle="xs">
          <Col xs={11}>
            <b>{capitalizeFirstLetter(rule.instance)}</b>
            {`: be on ${rule.be} node as the instance(s) identified by the ${
              rule.type
            } ${rule.match} "${rule.value}"`}
          </Col>
          <Col xs={1}>
            <ArrowIcon />
          </Col>
        </Row>
      </CardHeaderMeta>
    </CardHeader>
    <CardOutlet>Stuff</CardOutlet>
  </FullWidthCard>
);

export default ListRules;
