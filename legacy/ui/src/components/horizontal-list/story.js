import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Li from './li';
import Ul from './ul';

storiesOf('Unordered List', module)
  .add('Default', () => (
    <Ul>
      <Li>
        <a className='active' href=''>
          <span>
            One
          </span>
        </a>
      </Li>
      <Li>
        <a href=''>
          <span>
            Two
          </span>
        </a>
      </Li>
      <Li>
        <a href=''>
          <span>
            Three
          </span>
        </a>
      </Li>
    </Ul>
  ));
