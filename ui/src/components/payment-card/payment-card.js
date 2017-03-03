// icons: https://github.com/muffinresearch/payment-icons/tree/master/svg/single

import { remcalc } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import { boxes, colors } from '../../shared/constants';
import PaymentCardIcon, { types } from '../icons/payment-card';
import styled from 'styled-components';
import React from 'react';

const sizes = {
  small: {
    width: 50,
    height: 35
  },
  large: {
    width: 86,
    height: 56
  }
};

const Card = styled.div`
  box-sizing: border-box;
  box-shadow: ${boxes.bottomShaddow};
  border: ${remcalc(1)} solid ${colors.base.grey};
  border-radius: ${boxes.borderRadius};
  background-color: ${colors.base.white};
`;

const SmallCard = styled(Card)`
  width: ${remcalc(54)};
  height: ${remcalc(37)};
`;

const LargeCard = styled(Card)`
  width: ${remcalc(89)};
  height: ${remcalc(60)};
`;

const PaymentCard = ({
  type = 'mastercard',
  size = 'small',
  ...props
}) => {
  const view = {
    small: () => (
      <SmallCard {...props}>
        <PaymentCardIcon type={type} {...sizes[size]} />
      </SmallCard>
    ),
    large: () => (
      <LargeCard {...props}>
        <PaymentCardIcon type={type} {...sizes[size]} />
      </LargeCard>
    )
  };

  return view[size]();
};

PaymentCard.propTypes = {
  size: React.PropTypes.oneOf([
    'small',
    'large'
  ]),
  type: React.PropTypes.oneOf(types).isRequired
};

export default Baseline(
  PaymentCard
);
