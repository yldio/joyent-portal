// icons: https://github.com/muffinresearch/payment-icons/tree/master/svg/single

import { remcalc } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import { boxes, colors } from '../../shared/constants';
import MastercardIcon from './mastercard.svg';
import styled from 'styled-components';
import React from 'react';

const icons = {
  mastercard: MastercardIcon
};

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
  const icon = React.createElement(
    icons[type],
    sizes[size]
  );

  const view = {
    small: () => (
      <SmallCard {...props}>
        {icon}
      </SmallCard>
    ),
    large: () => (
      <LargeCard {...props}>
        {icon}
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
  type: React.PropTypes.oneOf([
    'mastercard'
  ]).isRequired
};

export default Baseline(
  PaymentCard
);
