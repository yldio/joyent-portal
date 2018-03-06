import React from 'react';
import paramCase from 'param-case';
import get from 'lodash.get';
import { Link } from 'react-router-dom';

import { Breadcrumb, BreadcrumbItem } from 'joyent-ui-toolkit';

export default ({ match }) => {
  const instance = get(match, 'params.instance');

  const links = [
    {
      name: 'Compute',
      pathname: '/'
    },
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
      <BreadcrumbItem key={name} to={pathname} component={Link}>
        {name}
      </BreadcrumbItem>
    ));

  return <Breadcrumb>{links}</Breadcrumb>;
};
