import React from 'react';

export const Link = ({ children, ...rest }) =>
  React.createElement('a', rest, children);
