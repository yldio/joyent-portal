import { Baseline } from '../../shared/composers';
import React from 'react';

import Warning from './svg/notification-warning.svg';
// eslint-disable-next-line max-len
import WarningInverted from './svg/notification-warning-inverted.svg';
import Success from './svg/notification-success.svg';
// eslint-disable-next-line max-len
import ConfirmationInverted from './svg/notification-confirmation-inverted.svg';
import Alert from './svg/notification-alert.svg';
import Action from './svg/notification-action.svg';

const NotificationIcon = ({
  action = false,
  alert = false,
  confirmation = false,
  inverted = false,
  success = false,
  warning = false,
  ...props
}) => {
  const icons = [
    () => action ? Action : null,
    () => alert ? Alert : null,
    () => (confirmation && inverted) ? ConfirmationInverted : null,
    () => success ? Success : null,
    () => warning ? (inverted ? WarningInverted : Warning) : null
  ];

  const Icon = icons.reduce((Icon, fn) => Icon ? Icon : fn(), null);

  if (!Icon) {
    return null;
  }

  return (
    <Icon {...props} />
  );
};

NotificationIcon.propTypes = {
  action: React.PropTypes.bool,
  alert: React.PropTypes.bool,
  confirmation: React.PropTypes.bool,
  inverted: React.PropTypes.bool,
  success: React.PropTypes.bool,
  warning: React.PropTypes.bool
};

export default Baseline(
  NotificationIcon
);
