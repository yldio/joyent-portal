import React from 'react';
import { FormattedMessage } from 'react-intl';

import Column from '@ui/components/column';
import Row from '@ui/components/row';
import { P } from '@ui/components/base-elements';

export default () => (
  <Row>
    <Column xs={12}>
      <P name='empty'>
        <FormattedMessage id='no-instances' />
      </P>
    </Column>
  </Row>
);
