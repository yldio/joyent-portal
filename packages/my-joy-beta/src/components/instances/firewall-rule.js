import React from 'react';
import forceArray from 'force-array';

import {
  Card,
  CardMeta,
  CardTitle,
  CardLabel,
  CardView
} from 'joyent-ui-toolkit';

export default ({ rule = '', global = false, enabled = false, first, last }) => (
  <Card collapsed flat={!last} topMargin={first} bottomless={!last} gapless>
    <CardView>
      <CardMeta>
        <CardTitle>{rule}</CardTitle>
        <CardLabel icon={global && String.fromCodePoint(0x1F30D)} />
        <CardLabel color={enabled ? 'green' : 'red'} />
      </CardMeta>
    </CardView>
  </Card>
);
