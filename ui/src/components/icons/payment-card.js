import { Baseline } from '../../shared/composers';
import React from 'react';

import alipayIcon from './svg/alipay.svg';
import amexIcon from './svg/amex.svg';
import dinersIcon from './svg/diners.svg';
import discoverIcon from './svg/discover.svg';
import hipercardIcon from './svg/hipercard.svg';
import jcbIcon from './svg/jcb.svg';
import maestroIcon from './svg/maestro.svg';
import mastercardIcon from './svg/mastercard.svg';
import paypalIcon from './svg/paypal.svg';
import unionpayIcon from './svg/unionpay.svg';
import visaIcon from './svg/visa.svg';

const types = {
  alipay: alipayIcon,
  amex: amexIcon,
  diners: dinersIcon,
  discover: discoverIcon,
  hipercard: hipercardIcon,
  jcb: jcbIcon,
  maestro: maestroIcon,
  mastercard: mastercardIcon,
  paypal: paypalIcon,
  unionpay: unionpayIcon,
  visa: visaIcon
};

const typeNames = Object.keys(types);

const PaymentCardIcon = ({
  alipay = false,
  amex = false,
  diners = false,
  discover = false,
  hipercard = false,
  jcb = false,
  maestro = false,
  mastercard = false,
  paypal = false,
  unionpay = false,
  visa = false,
  type,
  ...props
}) => {
  const TypeIcon = types[type];

  const PropIcon = typeNames.reduce((icon, name) => {
    return icon ? icon : types[name];
  }, null);

  const Icon = TypeIcon
    ? TypeIcon
    : PropIcon;

  if (!Icon) {
    return null;
  }

  return (
    <Icon {...props} />
  );
};

PaymentCardIcon.propTypes = {
  alipay: React.PropTypes.bool,
  amex: React.PropTypes.bool,
  diners: React.PropTypes.bool,
  discover: React.PropTypes.bool,
  hipercard: React.PropTypes.bool,
  jcb: React.PropTypes.bool,
  maestro: React.PropTypes.bool,
  mastercard: React.PropTypes.bool,
  paypal: React.PropTypes.bool,
  type: React.PropTypes.oneOf(typeNames),
  unionpay: React.PropTypes.bool,
  visa: React.PropTypes.bool
};

export default Baseline(
  PaymentCardIcon
);

export {
  typeNames as types
};
