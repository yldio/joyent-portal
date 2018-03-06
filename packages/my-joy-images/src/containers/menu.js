import React from 'react';
import get from 'lodash.get';

import Menu from '@components/menu';

const SECTIONS = [
  { name: 'Summary', pathname: 'summary' },
  { name: 'Tags', pathname: 'tags' }
];

export default ({ match }) => {
  const imageSlug = get(match, 'params.image');
  const sections = imageSlug !== '~create' ? SECTIONS : [];

  const links = sections.map(({ name, pathname }) => ({
    name,
    pathname: `/images/${imageSlug}/${pathname}`
  }));

  return <Menu links={links} />;
};
