import React from 'react';

export const Field = ({ children, ...rest }) =>
  React.createElement('a', rest, children);
