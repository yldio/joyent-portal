import React from 'react';
import get from 'lodash.get';

import Menu from '@components/menu';

const SECTIONS = [
  { name: 'Summary', pathname: 'summary' },
  { name: 'Tags', pathname: 'tags' }
];

export default ({ match }) => {
  const imageId = get(match, 'params.image');
  const sections = imageId !== '~create' ? SECTIONS : [];

  const links = sections.map(({ name, pathname }) => ({
    name,
    pathname: `/images/${imageId}/${pathname}`
  }));

  return <Menu links={links} />;
};
