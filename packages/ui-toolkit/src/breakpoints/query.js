import React from 'react';
import MediaQuery from 'react-responsive';
import pascalCase from 'pascal-case';

import screens from './screens';

const toQuery = label => ({ children, ...rest }) => (
  <MediaQuery query={screens[label]}>{children}</MediaQuery>
);

export default Object.keys(screens).reduce(
  (sum, label) => ({
    ...sum,
    [pascalCase(label)]: toQuery(label)
  }),
  {}
);
