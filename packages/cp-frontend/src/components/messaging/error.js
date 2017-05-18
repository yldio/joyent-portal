import React from 'react';
import PropTypes from 'prop-types';

import { P } from 'joyent-ui-toolkit';

const ErrorMessage = ({ message = "Ooops, there's been an error!!!" }) => {
  return <P>{message}</P>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string
};

export default ErrorMessage;
