import React from 'react';
import { NotFound } from '@components/navigation';

const pathsExample = {
  title: 'I have no memory of this place',
  message:
    'HTTP 404: We can’t find what you are looking for. Next time, always follow your nose.',
  link: 'Back home',
  to: '/'
};
const NotFoundHOC = (paths = pathsExample) => (
  <NotFound
    title={paths.title}
    message="Sorry, but our princess is in another castle."
    to={paths.to}
    link={paths.link}
  />
);

export default NotFoundHOC;
