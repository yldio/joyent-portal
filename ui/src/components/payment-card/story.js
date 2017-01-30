const React = require('react');
const Base = require('../base');

const {
  storiesOf
} = require('@kadira/storybook');

const {
  PaymentCard,
  PaymentCardDetail,
  PaymentCardDetails,
  PaymentCardView
} = require('./');

storiesOf('Payment Card', module)
  .add('Small MasterCard', () => (
    <Base>
      <PaymentCard size='small' type='mastercard' />
    </Base>
  ))
  .add('Large MasterCard', () => (
    <Base>
      <PaymentCard size='large' type='mastercard' />
    </Base>
  ))
  .add('MasterCard with details', () => (
    <Base>
      <PaymentCardView>
        <PaymentCard size='large' type='mastercard' />
        <PaymentCardDetails>
          <PaymentCardDetail>Mastercard</PaymentCardDetail>
          <PaymentCardDetail>xxxx-xxxx-xxxx-4901</PaymentCardDetail>
        </PaymentCardDetails>
      </PaymentCardView>
    </Base>
  ))
  .add('MasterCard with label', () => (
    <Base>
      <PaymentCardView>
        <PaymentCard size='small' type='mastercard' />
        <PaymentCardDetails>
          <PaymentCardDetail>MasterCard</PaymentCardDetail>
        </PaymentCardDetails>
      </PaymentCardView>
    </Base>
  ));
