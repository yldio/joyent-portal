import React from 'react';

import {
  Card,
  CardMeta,
  CardTitle,
  CardLabel,
  CardView
} from 'joyent-ui-toolkit';

export default ({
  rule = '',
  global = false,
  enabled = false,
  first,
  last
}) => (
  <Card collapsed flat={!last} topMargin={first} bottomless={!last} gapless>
    <CardView>
      <CardMeta>
        <CardTitle>{rule}</CardTitle>
        <CardLabel icon={global && String.fromCodePoint(0x1f30d)} />
        <CardLabel color={enabled ? 'green' : 'red'} />
      </CardMeta>
    </CardView>
  </Card>
);
