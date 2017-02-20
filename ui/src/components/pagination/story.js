import { storiesOf } from '@kadira/storybook';
import Pagination from './';
import React from 'react';

storiesOf('Pagination', module)
  .add('Default', () => (
    <Pagination>
      <a>
        <span>&laquo;</span>
        <span>Previous</span>
      </a>
      <a>1</a>
      <a active>2</a>
      <a>3</a>
    </Pagination>
  ));
