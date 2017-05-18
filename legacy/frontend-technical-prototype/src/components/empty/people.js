import React from 'react';
import { FormattedMessage } from 'react-intl';

import Column from '@ui/components/column';
import Row from '@ui/components/row';

export default () => (
  <Row>
    <Column xs={12}>
      <p name='empty'>
        <FormattedMessage id='no-people' />
      </p>
    </Column>
  </Row>
);
