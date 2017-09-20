import React from 'react';
import paramCase from 'param-case';
import get from 'lodash.get';

import { Breadcrumb } from 'joyent-ui-toolkit';

export default ({ match }) => {
  const instance = get(match, 'params.instance');

  const links = [
    {
      name: '/',
      pathname: '/instances'
    }
  ].concat(
    instance && [
      {
        name: paramCase(instance),
        pathname: `/instances/${instance}`
      }
    ]
  );

  return <Breadcrumb links={links.filter(Boolean)} />;
};
