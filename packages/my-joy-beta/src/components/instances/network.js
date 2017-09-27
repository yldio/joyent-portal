import React from 'react';
import forceArray from 'force-array';

import {
  Card,
  CardMeta,
  CardTitle,
  CardLabel,
  CardView
} from 'joyent-ui-toolkit';

export default ({ name, gateway, subnet, resolvers = [], first, last }) => (
  <Card collapsed flat={!last} topMargin={first} bottomless={!last} gapless>
    <CardView>
      <CardMeta>
        <CardTitle>{name}</CardTitle>
        <CardLabel>{gateway}</CardLabel>
        <CardLabel>{subnet}</CardLabel>
        <CardLabel>{forceArray(resolvers).join('\u00B7')}</CardLabel>
      </CardMeta>
    </CardView>
  </Card>
);
