import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'joyent-ui-toolkit';

const WarningMessage = ({ title, message }) => (
  <Message title={title} message={message} warning />
);

WarningMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired
};

export default WarningMessage;
