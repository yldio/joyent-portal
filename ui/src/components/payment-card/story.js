import { storiesOf } from '@kadira/storybook';
import React from 'react';

import {
  PaymentCard,
  PaymentCardDetail,
  PaymentCardDetails,
  PaymentCardView
} from './';

storiesOf('Payment Card', module)
  .add('Small MasterCard', () => (
    <PaymentCard size='small' type='mastercard' />
  ))
  .add('Large MasterCard', () => (
    <PaymentCard size='large' type='mastercard' />
  ))
  .add('MasterCard with details', () => (
    <PaymentCardView>
      <PaymentCard size='large' type='mastercard' />
      <PaymentCardDetails>
        <PaymentCardDetail>Mastercard</PaymentCardDetail>
        <PaymentCardDetail>xxxx-xxxx-xxxx-4901</PaymentCardDetail>
      </PaymentCardDetails>
    </PaymentCardView>
  ))
  .add('MasterCard with label', () => (
    <PaymentCardView>
      <PaymentCard size='small' type='mastercard' />
      <PaymentCardDetails>
        <PaymentCardDetail>MasterCard</PaymentCardDetail>
      </PaymentCardDetails>
    </PaymentCardView>
  ));
