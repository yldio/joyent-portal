import React from 'react';

export const Field = ({ component = 'input', children, ...rest }) =>
  React.createElement(component, rest, children);
