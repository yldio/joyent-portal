const a11y = require('react-a11y');
const ReactDOM = require('react-dom');
const React = require('react');

if (process.env.NODE_ENV !== 'production') {
  a11y(React, {
    ReactDOM
  });
}

const render = () => {
  const Root = require('./root');
  ReactDOM.render(
    <Root />,
    document.getElementById('root')
  );
};

render();