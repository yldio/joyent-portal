import React from 'react';
import paramCase from 'param-case';
import get from 'lodash.get';

import { Breadcrumb, BreadcrumbItem } from 'joyent-ui-toolkit';

export default ({ match }) => {
  const instance = get(match, 'params.instance');

  const links = [
    {
      name: 'Instances',
      pathname: '/instances'
    }
  ]
    .concat(
      instance && [
        {
          name: paramCase(instance),
          pathname: `/instances/${instance}`
        }
      ]
    )
    .filter(Boolean)
    .map(({ name, pathname }) => (
      <BreadcrumbItem key={name} to={pathname}>
        {name}
      </BreadcrumbItem>
    ));

  return <Breadcrumb>{links}</Breadcrumb>;
};
