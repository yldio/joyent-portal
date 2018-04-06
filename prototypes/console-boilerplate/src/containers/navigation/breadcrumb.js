import React from 'react';
import paramCase from 'param-case';
import get from 'lodash.get';
import { Link } from 'react-router-dom';

import { Breadcrumb, BreadcrumbItem } from 'joyent-ui-toolkit';

export default ({ match }) => {
  const resource = get(match, 'params.resource');

  const links = [
    {
      name: 'Compute',
      pathname: '/'
    },
    {
      name: 'Console',
      pathname: '/console'
    }
  ]
    .concat(
      resource && [
        {
          name: paramCase(resource),
          pathname: `/console/${resource}`
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
