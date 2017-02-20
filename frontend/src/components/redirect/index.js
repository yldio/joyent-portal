import React from 'react';
import { Redirect } from 'react-router-dom';

export default (to) => () => (
  <Redirect to={to} />
);
