import React from 'react';

import { Card, CardMeta, CardTitle, CardView } from 'joyent-ui-toolkit';

export default ({ name }) => (
  <Card collapsed>
    <CardView>
      <CardMeta>
        <CardTitle to={`/instances/${name}`}>{name}</CardTitle>
      </CardMeta>
    </CardView>
  </Card>
);
