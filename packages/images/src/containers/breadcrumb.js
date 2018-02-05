import React from 'react';
import { Link } from 'react-router-dom';
import paramCase from 'param-case';
import get from 'lodash.get';

import { Breadcrumb, BreadcrumbItem } from 'joyent-ui-toolkit';

export default ({ match }) => {
  const image = get(match, 'params.image');

  const links = [
    {
      name: 'Images',
      pathname: '/'
    }
  ]
    .concat(
      image && [
        {
          name: paramCase(image),
          pathname: `/${image}`
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
