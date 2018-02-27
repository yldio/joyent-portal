import React from 'react';
import { Link } from 'react-router-dom';
import paramCase from 'param-case';
import get from 'lodash.get';

import { Breadcrumb, BreadcrumbItem } from 'joyent-ui-toolkit';

export default ({ match }) => {
  const image = get(match, 'params.image');
  const create = get(match, 'params.step');
  const instance = get(match, 'params.instance');

  const links = [
    {
      name: 'Images',
      pathname: '/'
    }
  ]
    .concat(
      create && [
        {
          name: 'Create Image',
          pathname: `/~create`
        },
        {
          name: instance,
          pathname: `/~create/${instance}`
        }
      ]
    )
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
