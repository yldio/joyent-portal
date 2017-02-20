import a11y from 'react-a11y';
import ReactDOM from 'react-dom';
import React from 'react';
import Root from './root';

if (process.env.NODE_ENV !== 'production') {
  a11y(React, {
    ReactDOM
  });
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
