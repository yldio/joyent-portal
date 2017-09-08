import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'joyent-ui-toolkit';

const ErrorMessage = ({ title, message = "Ooops, there's been an error" }) => (
  <Message title={title} message={message} error />
);

ErrorMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
};

export default ErrorMessage;
