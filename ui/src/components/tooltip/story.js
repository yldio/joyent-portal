import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Tooltip from './';

storiesOf('Tooltip', module)
  .add('default', () => (
    <Tooltip>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </Tooltip>
  ))
  .add('custom position', () => {
    const arrowPosition = {
      left: '90%',
      bottom: '100%'
    };
    return (
      <Tooltip arrowPosition={arrowPosition}>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </Tooltip>
    );
  });
