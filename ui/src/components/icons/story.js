import React from 'react';
import { storiesOf } from '@kadira/storybook';

import {
  CloseIcon,
  HealthyIcon,
  HeartIcon,
  InputConfirmIcon,
  InstancesMultipleIcon,
  NotificationIcon,
  SettingsIcon,
  UploadIcon
} from './';

storiesOf('Icons', module)
  .add('Close', () => (
    <CloseIcon />
  ))
  .add('Healthy', () => (
    <HealthyIcon />
  ))
  .add('Heart', () => (
    <HeartIcon />
  ))
  .add('InputConfirm', () => (
    <InputConfirmIcon />
  ))
  .add('InstancesMultiple', () => (
    <InstancesMultipleIcon />
  ))
  .add('Notification action', () => (
    <NotificationIcon action />
  ))
  .add('Notification alert', () => (
    <NotificationIcon alert />
  ))
  .add('Notification confirmation inverted', () => (
    <NotificationIcon confirmation inverted />
  ))
  .add('Notification success', () => (
    <NotificationIcon success />
  ))
  .add('Notification warning', () => (
    <NotificationIcon warning />
  ))
  .add('Notification warning inverted', () => (
    <NotificationIcon warning inverted />
  ))
  .add('Settings', () => (
    <SettingsIcon />
  ))
  .add('Upload', () => (
    <UploadIcon />
  ));
