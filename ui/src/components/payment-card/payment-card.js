// icons: https://github.com/muffinresearch/payment-icons/tree/master/svg/single

const React = require('react');
const Styled = require('styled-components');
const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');

const MastercardIcon = require(
  '!babel-loader!svg-react-loader!./mastercard.svg?name=MastercardIcon'
);

const {
  default: styled
} = Styled;

const {
  boxes,
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  Baseline
} = composers;

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
  size = 'small'
}) => {
  const icon = React.createElement(
    icons[type],
    sizes[size]
  );

  return size === 'small' ? (
    <SmallCard>{icon}</SmallCard>
  ) : (
    <LargeCard>{icon}</LargeCard>
  );
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

module.exports = Baseline(
  PaymentCard
);
