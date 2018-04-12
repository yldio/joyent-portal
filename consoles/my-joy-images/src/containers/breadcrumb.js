import React from 'react';
import { Link } from 'react-router-dom';
import { Margin } from 'styled-components-spacing';
import paramCase from 'param-case';
import get from 'lodash.get';

import { Breadcrumb, BreadcrumbItem } from 'joyent-ui-toolkit';

export default ({ match }) => {
  const image = get(match, 'params.image');
  const create = get(match, 'params.step');
  const instance = get(match, 'params.instance');

  const links = [
    {
      name: 'Compute',
      pathname: '/'
    },
    {
      name: 'Images',
      pathname: '/images'
    }
  ]
    .concat(
      create && [
        {
          name: 'Create Image',
          pathname: `/images/~create`
        },
        {
          name: instance,
          pathname: `/images/~create/${instance}`
        }
      ]
    )
    .concat(
      image && [
        {
          name: paramCase(image),
          pathname: `/images/${image}`
        }
      ]
    )
    .filter(Boolean)
    .map(({ name, pathname }) => (
      <BreadcrumbItem key={name} to={pathname} component={Link}>
        <Margin horizontal={1} vertical={3}>
          {name}
        </Margin>
      </BreadcrumbItem>
    ));

  return <Breadcrumb>{links}</Breadcrumb>;
};
